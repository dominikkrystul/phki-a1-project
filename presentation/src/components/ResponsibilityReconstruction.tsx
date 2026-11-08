export function ResponsibilityReconstruction({ active, password }: { active: boolean; password: string }) {
  return (
    <section className="responsibility-reconstruction" aria-hidden={!active} style={{ visibility: active ? 'visible' : 'hidden' }}>
      <div className="reconstruction-light" aria-hidden="true" />
      <div className="reconstruction-perspective">
        <div className="reconstruction-camera">
          <div className="generation-station">
            <div className="generation-bed" aria-hidden="true"><span>Suggestion</span></div>
            <div className="intervention intervention-agent">
              <h2>AI Coding Agent</h2>
              <p>Could suggest this code.</p>
            </div>
          </div>

          <div className="review-station">
            <div className="review-frame" aria-hidden="true" />
            <div className="intervention intervention-developer">
              <h2>Junior Developer</h2>
              <p>Who checked this?</p>
            </div>
            <p className="review-opportunity">Possible review · inspect and question</p>
          </div>

          <div className="illustrative-assignment">
            <div className="editor-surface" aria-hidden="true" />
            <header className="assignment-context assignment-caption">
              <span>Illustrative code · fictional reconstruction</span><span>TypeScript</span>
            </header>
            <div className="assignment-context assignment-surrounding assignment-before" aria-hidden="true">
              <span className="assignment-line-number">01</span><span>{'const record = { ...account };'}</span>
            </div>
            <div className="assignment-focus" aria-hidden="true" />
            <div className="assignment-line">
              <span className="assignment-context assignment-line-number" aria-hidden="true">02</span>
              <span className="assignment-context">{'record.password = "'}</span>
              <span className="reconstruction-token">{password}</span>
              <span className="assignment-context">{'";'}</span>
            </div>
            <div className="assignment-context assignment-surrounding assignment-after" aria-hidden="true">
              <span className="assignment-line-number">03</span><span>{'return record;'}</span>
            </div>
            <div className="review-mark" aria-hidden="true"><span /></div>
          </div>

          <div className="release-gate">
            <div className="release-boundary" aria-hidden="true" />
            <div className="intervention intervention-organization">
              <h2>Organization</h2>
              <p>Who could stop<br />deployment?</p>
            </div>
            <p className="release-remit">Security controls<br />&amp; release authority</p>
            <span className="release-status">Awaiting decision</span>
          </div>
        </div>
      </div>
      <div className="reflection-shade" aria-hidden="true" />
      <div className="reconstruction-question-mask"><h1 className="reconstruction-question">Who could have stopped it?</h1></div>
    </section>
  );
}
