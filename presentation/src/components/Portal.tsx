import { useReducedMotion } from '../hooks/useReducedMotion';
import { AnimatePresence, motion } from 'motion/react';
import { Check, MousePointer2 } from 'lucide-react';
import { revealEase } from '../animations/motion';
import { useStaticFrame } from './FrameContext';

export type PortalView = 'register' | 'login' | 'dashboard';

// Faithful, deterministic representation of the existing portal. No authentication or storage.
export function Portal({ view }: { view: PortalView }) {
  const reduce = useReducedMotion();
  const staticFrame = useStaticFrame();
  return <div className="portal">
    <header className="portal-header"><strong>Northline Studio</strong><span>Create account <span className="portal-nav-gap">Client login</span></span></header>
    <p className="portal-notice">Fictional interactive scenario. Use the provided demo details only.</p>
    <AnimatePresence initial={false} mode="wait">
      <motion.div key={view} className="portal-view" initial={staticFrame ? false : { opacity: 0, transform: reduce ? 'none' : 'translateY(16px)' }}
        animate={{ opacity: 1, transform: 'translateY(0px)' }} exit={{ opacity: 0, transform: reduce ? 'none' : 'translateY(-12px)' }} transition={{ duration: staticFrame ? 0 : reduce ? 0.1 : 0.22, ease: revealEase }}>
        {view === 'dashboard' ? <div className="portal-dashboard">
          <p className="northline-green">Client portal</p><h3>Welcome, Alex Morgan.</h3><p>Your current projects with Northline Studio.</p>
          <div className="portal-project"><strong>Fieldwork — brand identity</strong><span>In review</span><p>Visual direction and brand guidelines</p></div>
          <div className="portal-project"><strong>Fieldwork — website</strong><span>In progress</span><p>Website design and handoff</p></div>
          <div className="portal-project"><strong>Spring campaign</strong><span>Completed</span><p>Print and digital launch assets</p></div>
          <div className="portal-account"><span>Alex Morgan</span><span>alex@example.test</span><span className="portal-cta">Review for deployment</span></div>
        </div> : <div className="portal-form-layout">
          <div className="portal-intro"><p className="northline-green">Independent design, shared direction.</p><h3>Good work starts with a clear conversation.</h3><p>Northline Studio is a fictional design company creating thoughtful brands and digital experiences.</p><div className="portal-services">Brand identity · Digital design · Creative direction</div></div>
          <div className="portal-form"><h3>{view === 'register' ? 'Create your account' : 'Log in'}</h3><p>Demo only. Fixed fictional details.</p>
            {view === 'register' && <div className="replica-field"><span>Name</span><div>Alex Morgan</div></div>}
            <div className="replica-field"><span>Email</span><div>alex@example.test</div></div>
            <div className="replica-field"><span>Password</span><div className="masked-input">••••••••••••</div></div>
            <div className="replica-submit"><Check size={16}/>{view === 'register' ? 'Register demo account' : 'Log in to demo'}</div>
          </div>
        </div>}
      </motion.div>
    </AnimatePresence>
    <motion.div className="demo-cursor" aria-hidden="true" animate={{ transform: view === 'register' ? 'translate(854px, 397px)' : view === 'login' ? 'translate(855px, 356px)' : 'translate(910px, 412px)' }} transition={{ duration: staticFrame || reduce ? 0 : 0.7, ease: revealEase }}><MousePointer2 size={29} fill="#202020" stroke="white" strokeWidth={1.6}/></motion.div>
    
  </div>;
}
