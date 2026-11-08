import demo from '../../../data/demo-database.json';

export function ContributionScene({ active }: { active: boolean }) {
  const record = demo[0];

  return (
    <section className="contribution-scene" aria-hidden={!active} style={{ visibility: active ? 'visible' : 'hidden' }}>
      <div className="contribution-backdrop" aria-hidden="true" />
      <div className="contribution-title-mask"><h1 className="contribution-title">Who did what?</h1></div>
      <div className="contribution-perspective">
        <div className="contribution-camera">
          <section className="contribution-workspace contribution-ai" aria-labelledby="contribution-ai-heading">
            <h2 id="contribution-ai-heading" className="contribution-role contribution-ai-role">AI-assisted</h2>
            <div className="contribution-login" role="img" aria-label="Northline Studio demo login with email and password fields and a Log in to demo button.">
              <div className="browser-chrome" aria-hidden="true">
                <div className="window-dots"><i /><i /><i /></div>
                <div className="browser-address">Northline Studio</div>
                <span className="chrome-spacer" />
              </div>
              <div className="contribution-login-page" aria-hidden="true" inert>
                <header className="contribution-login-header"><strong>Northline Studio</strong><span>Client login</span></header>
                <div className="contribution-login-form">
                  <div className="contribution-login-field">
                    <label htmlFor="contribution-email">Email</label>
                    <input id="contribution-email" type="email" value={record.email} readOnly tabIndex={-1} />
                  </div>
                  <div className="contribution-login-field">
                    <label htmlFor="contribution-password">Password</label>
                    <input id="contribution-password" type="password" value={record.password} readOnly tabIndex={-1} />
                  </div>
                  <button className="contribution-login-submit" type="button" tabIndex={-1}>Log in to demo</button>
                </div>
              </div>
            </div>
            <ul className="contribution-ai-labels">
              <li>Website development</li>
              <li>Login &amp; database</li>
              <li>Presentation development</li>
            </ul>
          </section>

          <section className="contribution-workspace contribution-me" aria-labelledby="contribution-me-heading">
            <h2 id="contribution-me-heading" className="contribution-role contribution-me-role">My contribution</h2>
            <div className="contribution-note contribution-research">
              <h3>Research question</h3>
              <p>Identify security risks</p>
            </div>
            <div className="contribution-note contribution-scenario">
              <h3>Security scenario</h3>
              <p className="contribution-scenario-sequence"><span>Deployment decision</span><span aria-hidden="true">→</span><span>Reveal</span></p>
            </div>
            <div className="contribution-note contribution-critical">
              <h3>Critical analysis</h3>
              <p className="contribution-observation"><span>Working login ≠</span><span className="contribution-storage">secure password storage<span className="contribution-annotation-stroke" aria-hidden="true" /></span></p>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
