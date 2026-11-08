import demo from '../../../data/demo-database.json';

export function ConsequencesScene({ active, handoff }: { active: boolean; handoff: boolean }) {
  const record = demo[0];

  return (
    <section className="consequences-scene" aria-hidden={!active} style={{ visibility: active || handoff ? 'visible' : 'hidden' }}>
      <div className="consequences-handoff">
        <div className="consequences-atmosphere" aria-hidden="true" />
        <p className="consequences-disclosure">Simulated scenario · fictional what-if</p>
        <div className="consequences-time">
          <p>The website was deployed.</p>
          <h1>Three weeks later.</h1>
        </div>
        <div className="consequences-perspective">
          <div className="consequences-world">
            <div className="consequences-exposure-status">
              <h2>Simulated data exposure</h2>
              <p>A copy is exposed. Plaintext makes the password readable.</p>
            </div>

            <div className="consequences-evidence">
              <div className="consequences-record-shell">
                <div className="consequences-copy-edge" aria-hidden="true" />
                <div className="consequences-record">
                  <header><span>Northline Studio</span><strong>users</strong><span>Exposed copy · same fictional record</span></header>
                  <dl className="consequences-fields">
                    <div className="consequences-record-context"><dt>id</dt><dd>{record.id}</dd></div>
                    <div className="consequences-record-context"><dt>name</dt><dd>{record.name}</dd></div>
                    <div className="consequences-record-context"><dt>email</dt><dd>{record.email}</dd></div>
                    <div><dt>password</dt><dd className="consequences-password-well"><span className="sr-only">{record.password}</span></dd></div>
                  </dl>
                </div>
              </div>
              <span className="consequences-password" aria-hidden="true">{record.password}</span>
            </div>

            <div className="consequences-person">
              <p>The account holder</p>
              <h2>{record.name}</h2>
              <span>{record.email}</span>
            </div>
            <div className="consequences-reuse-link" aria-hidden="true" />
            <div className="consequences-reuse-boundary">
              <p>Other accounts</p><span>Only if reused</span>
            </div>
            <div className="consequences-user-message">
              <h2>A password exposed.</h2>
              <p>Other accounts could be at risk if it was reused.</p>
            </div>

            <div className="consequences-company">
              <h2>Northline Studio</h2>
              <div className="consequences-company-impact">
                <p>Possible consequences</p>
                <ul><li>Incident response</li><li>Loss of trust</li><li>Possible GDPR obligations</li></ul>
                <span>Legal duties depend on the circumstances.</span>
              </div>
            </div>
          </div>
        </div>
        <div className="consequences-question-mask"><h1 className="consequences-question">Who pays the price for a missed check?</h1></div>
      </div>
    </section>
  );
}
