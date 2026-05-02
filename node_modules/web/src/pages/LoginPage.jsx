import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: '', message: '' });
  const [resetEmail, setResetEmail] = useState('');

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setModalConfig({ 
      isOpen: true, 
      type: 'prompt', 
      message: 'Enter your email address to receive a password reset link:' 
    });
  };

  const handleSocialLogin = (provider) => {
    setModalConfig({ 
      isOpen: true, 
      type: 'info', 
      message: `Redirecting to ${provider} login...\n\n(Note: This is a demo. To make this work in production, configure ${provider} Client ID and Secret in the backend .env file).` 
    });
  };

  return (
    <main className="flex h-screen w-full relative">
      {/* Left Panel: Brand Experience */}
      <section className="hidden lg:flex w-1/2 relative flex-col justify-between p-16 bg-gradient-to-br from-primary-container to-[#1a365d] overflow-hidden">
        {/* Decorative Grain / Ambient Glow */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, #aec7f5 0%, transparent 50%)' }}
        ></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center">
              <span className="material-symbols-outlined text-white">meeting_room</span>
            </div>
            <span className="font-headline font-extrabold text-white text-2xl tracking-tighter">SI-BOOK</span>
          </div>
        </div>
        
        <div className="relative z-10">
          <h1 className="font-headline font-bold text-6xl text-white tracking-tight leading-[1.1] mb-6">
            Curate Your Executive Space
          </h1>
          <p className="text-on-primary-container text-xl max-w-md font-medium leading-relaxed">
            Manage your meeting spaces with elegance and efficiency. Experience the next generation of corporate hospitality.
          </p>
        </div>
        
        <div className="relative z-10 w-full aspect-video rounded-2xl overflow-hidden shadow-2xl">
          <img 
            className="w-full h-full object-cover" 
            alt="Ultra-modern glass-walled executive conference room" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtPIxsoe7LMrl5kYp4_UhqUuHv6DTvR_lcjoDh1jXuFGiHPNgIzvGZ_YbxSgEwhw48ANLwzycRRxkDbpg7IStjl2uMlKMlkZuElmF4L_L57QUEbLqwMZdjRWd9HH9Y1LTDxrpp-mTCotNFEdzpAgZiBVHcNYxucDRjlczwDuXNC00e6E1r9oKsG9qRTqj-I3mv8Wl0kdsQAZ2o7J4OhGEnWEXGeTv1KsPDSxfxKLfDLqXmQzCPqnf3IQvm8oLeDmB-iRfunZp9bcQ"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-container/80 to-transparent"></div>
        </div>
      </section>

      {/* Right Panel: Login Interface */}
      <section className="w-full lg:w-1/2 flex items-center justify-center bg-surface-container-lowest p-8 lg:p-24 overflow-y-auto">
        <div className="w-full max-w-md flex flex-col items-center">
          
          {/* Brand Anchor (Mobile & Form Header) */}
          <div className="flex flex-col items-center mb-12">
            <div className="lg:hidden flex items-center gap-2 mb-8">
              <span className="material-symbols-outlined text-primary-container text-3xl">meeting_room</span>
              <span className="font-headline font-extrabold text-primary-container text-2xl tracking-tighter">SI-BOOK</span>
            </div>
            <h2 className="font-headline font-bold text-4xl text-on-surface mb-3 tracking-tight">Welcome Back</h2>
            <p className="text-on-surface-variant font-medium text-center">Log in to your corporate account.</p>
          </div>

          {/* Form Content */}
          <form className="w-full space-y-6" onSubmit={async (e) => { 
            e.preventDefault(); 
            const email = e.target.email.value;
            const password = e.target.password.value;
            
            if (email && password) {
              setLoading(true);
              const result = await login(email, password);
              setLoading(false);
              
              if (result.success) {
                navigate('/dashboard'); 
              } else {
                setModalConfig({ isOpen: true, type: 'error', message: `Login failed: ${result.error}` });
              }
            }
          }}>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-on-surface-variant tracking-wide px-1">EMAIL ADDRESS</label>
              <input 
                name="email"
                className="w-full h-14 px-5 bg-surface-container border-none rounded-xl focus:ring-2 focus:ring-primary-container focus:bg-surface-container-lowest transition-all duration-300 outline-none text-on-surface" 
                placeholder="john.doe@company.com" 
                type="email"
                required
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="block text-sm font-semibold text-on-surface-variant tracking-wide">PASSWORD</label>
                <a onClick={handleForgotPassword} className="text-sm font-semibold text-primary-container hover:underline cursor-pointer">Forgot password?</a>
              </div>
              <input 
                name="password"
                className="w-full h-14 px-5 bg-surface-container border-none rounded-xl focus:ring-2 focus:ring-primary-container focus:bg-surface-container-lowest transition-all duration-300 outline-none text-on-surface" 
                placeholder="••••••••" 
                type="password"
                required
              />
            </div>
            
            <div className="flex items-center space-x-3 px-1">
              <input 
                className="w-5 h-5 rounded border-outline-variant text-primary-container focus:ring-primary-container cursor-pointer bg-surface-container" 
                id="remember" 
                type="checkbox"
              />
              <label className="text-sm font-medium text-on-surface-variant cursor-pointer" htmlFor="remember">
                Remember this device for 30 days
              </label>
            </div>
            
            {/* Primary Action */}
            <button 
              className="w-full h-14 bg-gradient-to-br from-primary to-primary-container text-white font-headline font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform active:scale-[0.98] tracking-widest text-sm" 
              type="submit"
            >
              SIGN IN
            </button>
          </form>

          {/* Divider */}
          <div className="w-full flex items-center my-10">
            <div className="flex-grow h-px bg-surface-container-high"></div>
            <span className="px-4 text-xs font-bold text-outline uppercase tracking-widest">Or continue with</span>
            <div className="flex-grow h-px bg-surface-container-high"></div>
          </div>

          {/* SSO Options */}
          <div className="grid grid-cols-2 gap-4 w-full">
            <button type="button" onClick={() => handleSocialLogin('Google')} className="flex items-center justify-center gap-3 h-14 rounded-xl bg-surface-container-lowest border-2 border-surface-container-high hover:bg-surface-container-low transition-all duration-200 group">
              <img 
                alt="Google" 
                className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPx7oMpZxxPNatc1A4T1OXR5FNoGGH3Zp70nu-AMUWuHLhS17UHPLLC0AV8R8_VXZ208p7S1K-lmzsz0p0dWo_WsxHCnE_pk0ZIEbg0zs0T0tx2Sb3MwcyHKpy6SkMddg7fdCF0zOZzDnEo3O2vxFjFe_eHT800eXgY8Hp-aZoiUi61pOsehti55eR8Y6oQkb5RvTZgwQ2KHx2FrqlpKlJxDfuUWex3PZq-dyJlBAyG8_GwyZlc6hGYVj4gCPC-m-p_6a2jSoRIeg"
              />
              <span className="text-sm font-bold text-on-surface-variant">Google</span>
            </button>
            <button type="button" onClick={() => handleSocialLogin('Microsoft')} className="flex items-center justify-center gap-3 h-14 rounded-xl bg-surface-container-lowest border-2 border-surface-container-high hover:bg-surface-container-low transition-all duration-200 group">
              <img 
                alt="Microsoft" 
                className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwAh1NSRQ-HuJ4LRTpkFvL-TWk2P9GGBpAK8YRoOA80RwaN_gJrgFWtl9IGmuO_aLP4hWnw_WmIOqS3olLtZrZuMlCWUAD2sS0cUNFg2SvwSg_3uWwEssh9H6E0OdYNCDmU79tgpm13wX-B6ctx4PLPnol5F9oVTd_OTyE4NFsHFsG2yqmb-nY_rJDGofCrAo2h5vJar1IVSg-JVP33vF_z6MVViObkxgOgdJzARJqD53qr2R8hcw5FEU00JVoDls4tnQVjYWxuc4"
              />
              <span className="text-sm font-bold text-on-surface-variant">Microsoft</span>
            </button>
          </div>

          <p className="mt-12 text-sm text-on-surface-variant font-medium">
            New to SI-BOOK? <Link to="/signup" className="text-primary-container font-bold hover:underline">Request access</Link>
          </p>
        </div>
      </section>

      {/* Custom Modal Overlay */}
      {modalConfig.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className={`p-6 border-b border-surface-container flex items-center gap-4 ${modalConfig.type === 'error' ? 'text-error' : modalConfig.type === 'success' ? 'text-green-600' : 'text-primary'}`}>
              <span className="material-symbols-outlined text-3xl">
                {modalConfig.type === 'error' ? 'error' : modalConfig.type === 'prompt' ? 'mark_email_read' : modalConfig.type === 'success' ? 'check_circle' : 'info'}
              </span>
              <h3 className="font-headline font-bold text-xl">
                {modalConfig.type === 'error' ? 'Authentication Error' : modalConfig.type === 'prompt' ? 'Reset Password' : modalConfig.type === 'success' ? 'Success' : 'Information'}
              </h3>
            </div>
            
            {/* Modal Body */}
            <div className="p-6">
              <p className="text-on-surface-variant font-medium whitespace-pre-wrap">
                {modalConfig.message}
              </p>
              
              {modalConfig.type === 'prompt' && (
                <div className="mt-4">
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="nama@perusahaan.com"
                    className="w-full h-12 px-4 bg-surface-container border border-surface-container-high rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    autoFocus
                  />
                </div>
              )}
            </div>
            
            {/* Modal Footer */}
            <div className="p-4 bg-surface-container-low flex justify-end gap-3">
              <button 
                onClick={() => {
                  setModalConfig({ isOpen: false, type: '', message: '' });
                  setResetEmail('');
                }}
                className="px-5 py-2.5 rounded-xl font-bold text-slate-500 hover:bg-surface-container-highest transition-colors"
              >
                {modalConfig.type === 'prompt' ? 'Cancel' : 'Close'}
              </button>
              
              {modalConfig.type === 'prompt' && (
                <button 
                  onClick={() => {
                    if (resetEmail) {
                      setModalConfig({ 
                        isOpen: true, 
                        type: 'success', 
                        message: `A password reset link has been sent to ${resetEmail}.\n\n(Note: This is a demo. To make this work in production, configure the SMTP server in the backend).` 
                      });
                      setResetEmail('');
                    }
                  }}
                  className="px-5 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 hover:shadow-lg transition-all"
                >
                  Send Reset Link
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
