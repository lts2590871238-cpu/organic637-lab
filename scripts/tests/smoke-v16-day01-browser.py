import json
import time
from playwright.sync_api import sync_playwright

BASE = 'http://127.0.0.1:8765'
STATE_KEY = 'organic637_clean_v1_state:smoke-user'
AUTH_KEY = 'organic637_clean_v1_auth'


def get_state(page):
    raw = page.evaluate("key => localStorage.getItem(key)", STATE_KEY)
    return json.loads(raw) if raw else None


def current_step(page, state):
    cursor = int(state['days']['1']['v16']['cursor'])
    return page.evaluate("cursor => window.Organic637.V16Director.getStep(1, cursor)", cursor)


def question_for_step(page, state, step):
    if step['type'] == 'question-group':
        step_state = state['days']['1']['v16'].get('stepState', {}).get(step['id'], {})
        idx = int(step_state.get('index', 0))
        ref = step['refs'][idx]
    else:
        ref = step['ref']
    return page.evaluate("ref => window.Organic637Data.days[1].questions.find(q => q.id === ref)", ref)


def finish_lesson(page, step):
    lesson = page.evaluate("ref => window.Organic637Data.days[1].lessons.find(x => x.id === ref)", step['ref'])
    # Move every storyboard and why-chain to its final frame.
    for selector in ('[data-story-next]', '[data-why-next]'):
        while True:
            button = page.locator(selector)
            if button.count() == 0 or button.is_disabled():
                break
            button.click()
    micro = (lesson or {}).get('microCheck')
    if micro:
        page.locator(f'[data-micro-option="{int(micro["answer"])}"]').click()
    assert not page.locator('#nextLesson').is_disabled(), f"lesson gate did not open for {step['ref']}"
    page.locator('#nextLesson').click()


def answer_question(page, state, step):
    q = question_for_step(page, state, step)
    qtype = q.get('type', 'choice')
    answer = q.get('answer')
    if qtype in ('choice', 'structure-choice'):
        if isinstance(answer, int):
            option = q['options'][answer]
            answer_id = str(option.get('id', answer) if isinstance(option, dict) else answer)
        elif isinstance(answer, dict):
            answer_id = str(answer.get('id') or answer.get('optionId') or answer.get('value'))
        else:
            answer_id = str(answer)
        page.locator(f'[data-option="{answer_id}"]').click()
    elif qtype == 'multi-choice':
        for answer_id in answer:
            page.locator(f'[data-option="{answer_id}"]').click()
    elif qtype == 'electron-arrow':
        for arrow in q.get('expectedArrows', []):
            page.locator(f'[data-hotspot="{arrow["source"]}"]').click()
            page.locator(f'[data-hotspot="{arrow["target"]}"]').click()
    else:
        raise AssertionError(f'Unsupported smoke question type: {qtype} ({q["id"]})')
    assert not page.locator('#submitAnswer').is_disabled(), f"submit stayed disabled for {q['id']}"
    page.locator('#submitAnswer').click()
    next_button = page.locator('#nextAfterFeedback')
    next_button.wait_for(state='visible')
    next_button.click()


def assert_no_horizontal_overflow(page, label):
    metrics = page.evaluate("""() => ({
      viewport: window.innerWidth,
      body: document.body.scrollWidth,
      doc: document.documentElement.scrollWidth
    })""")
    widest = max(metrics['body'], metrics['doc'])
    assert widest <= metrics['viewport'] + 1, f"{label} overflow: {metrics}"


def main():
    errors = []
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True, executable_path='/usr/bin/chromium', args=['--no-sandbox'])
        context = browser.new_context(viewport={'width': 360, 'height': 800})
        context.add_init_script(f"""
          localStorage.setItem({json.dumps(AUTH_KEY)}, JSON.stringify({{
            token: 'smoke-token',
            user: {{id:'smoke-user', username:'smoke'}},
            expires_at: Date.now() + 86400000
          }}));
          localStorage.removeItem({json.dumps(STATE_KEY)});
          localStorage.removeItem({json.dumps(STATE_KEY + ':backup')});
        """)
        page = context.new_page()

        def api_route(route):
            url = route.request.url
            if url.endswith('/auth/me'):
                route.fulfill(status=200, content_type='application/json', body=json.dumps({'ok': True, 'user': {'id':'smoke-user','username':'smoke'}}))
            elif url.endswith('/sync/pull'):
                route.fulfill(status=200, content_type='application/json', body=json.dumps({'ok': True, 'chunks': {}}))
            elif url.endswith('/sync/push'):
                route.fulfill(status=200, content_type='application/json', body=json.dumps({'ok': True}))
            else:
                route.fulfill(status=200, content_type='application/json', body=json.dumps({'ok': True}))

        page.route('https://organic637-lab-api.lts2590871238.workers.dev/**', api_route)
        page.on('pageerror', lambda exc: errors.append(str(exc)))
        page.goto(BASE + '/index.html', wait_until='networkidle')
        page.locator('#openPortal').wait_for(state='visible')
        page.locator('#openPortal').click()
        page.locator('[data-go="#home"]').click()
        assert_no_horizontal_overflow(page, 'home@360')
        page.locator('#openCaseBoard').click()
        page.locator('.case-board-shell').wait_for(state='visible')
        assert_no_horizontal_overflow(page, 'case-board@360')
        page.locator('#caseBoardBack').click()
        location_ok = page.locator('#backPortal')
        location_ok.wait_for(state='visible')
        page.locator('#backPortal').click()
        page.locator('[data-go="#day/1"]').click()

        seen = []
        evidence_zoom_checked = False
        for _ in range(80):
            page.wait_for_timeout(50)
            state = get_state(page)
            assert state is not None, 'state was not persisted'
            if 1 in state.get('completedDays', []) or '1' in state.get('completedDays', []):
                break
            step = current_step(page, state)
            assert step is not None, f"cursor escaped plan before completion: {state['days']['1']['v16']['cursor']}"
            seen.append(step['id'])
            if step['type'] == 'comic':
                page.locator('[data-v16-comic-continue]').wait_for(state='visible')
                assert_no_horizontal_overflow(page, f"comic:{step['id']}@360")
                if not evidence_zoom_checked and page.locator('[data-v16-evidence-zoom]').count():
                    page.locator('[data-v16-evidence-zoom]').first.click()
                    page.locator('.v16-evidence-lightbox').wait_for(state='visible')
                    assert_no_horizontal_overflow(page, 'evidence-lightbox@360')
                    page.locator('.v16-evidence-lightbox-close').click()
                    evidence_zoom_checked = True
                page.locator('[data-v16-comic-continue]').click()
            elif step['type'] == 'lesson':
                finish_lesson(page, step)
            elif step['type'] in ('question','interaction','case-apply','question-group'):
                answer_question(page, state, step)
            else:
                raise AssertionError(f"Unhandled Director step during smoke: {step['type']} / {step['id']}")
        else:
            raise AssertionError('Day1 smoke exceeded 80 UI transitions')

        final = get_state(page)
        assert 1 in final['completedDays'], f"Day1 did not complete: {final.get('completedDays')}"
        assert final['days']['1']['finished'] is True
        assert final['schemaVersion'] == 3
        assert final['days']['1']['v16']['cursor'] == len(page.evaluate('window.Organic637.V16Director.getDayPlan(1).sequence'))
        assert final['v16']['story']['unlockedScenes'] == ['case01-open','case01-return','case01-cliffhanger']
        assert 'zero_sample_missing_appearance' in final['v16']['story']['confirmedFacts']
        assert not errors, f'page JS errors: {errors}'
        print('V16_DAY1_BROWSER_PASS')
        print('steps=', ' -> '.join(seen))
        print('attempts=', len(final.get('attempts', [])))
        browser.close()

if __name__ == '__main__':
    main()
