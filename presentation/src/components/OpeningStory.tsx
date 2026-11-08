export function OpeningStory({ active, step, decision }: { active: boolean; step: number; decision: boolean }) {
  return (
    <section className="opening-story" data-opening-step={decision ? 'decision' : step} aria-hidden={!active} style={{ visibility: active ? 'visible' : 'hidden' }}>
      <div className="opening-introduction" aria-hidden={decision} style={{ visibility: active && !decision ? 'visible' : 'hidden' }}>
        <h1 className="opening-statement">It works.</h1>
        <div className="opening-safety-mask">
          <h2 className="opening-safety">But is it <span>safe?</span></h2>
        </div>
        <div className="opening-research" aria-hidden={step !== 1} style={{ visibility: active && !decision && step === 1 ? 'visible' : 'hidden' }}>
          <p className="opening-research-label">MY RESEARCH QUESTION</p>
          <p className="opening-research-question">How does relying on AI coding agents affect a junior web developer's ability to <span>identify security risks</span> before deploying a website that handles users' personal data?</p>
        </div>
      </div>
      <div className="opening-decision-mask" aria-hidden={!decision} style={{ visibility: active && decision ? 'visible' : 'hidden' }}>
        <h1 className="opening-decision">Would you approve this for deployment?</h1>
      </div>
    </section>
  );
}
