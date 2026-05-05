import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function SignUpPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <main className="flex h-screen w-full relative">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-4 right-4 z-50 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-slide-up
          ${toast.type === 'success' ? 'bg-primary-container text-on-primary-container border border-primary/20' : 
            toast.type === 'error' ? 'bg-error-container text-on-error-container border border-error/20' : 
            'bg-surface-container-high text-on-surface border border-surface-variant'}`}
        >
          <span className="material-symbols-outlined">
            {toast.type === 'success' ? 'check_circle' : toast.type === 'error' ? 'error' : 'info'}
          </span>
          <span className="font-bold text-sm">{toast.message}</span>
        </div>
      )}
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
            Join the Executive Network
          </h1>
          <p className="text-on-primary-container text-xl max-w-md font-medium leading-relaxed">
            Create an account to discover and book premium meeting spaces across our facilities.
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

      {/* Right Panel: Sign Up Interface */}
      <section className="w-full lg:w-1/2 flex items-center justify-center bg-surface-container-lowest p-8 lg:p-24 overflow-y-auto">
        <div className="w-full max-w-md flex flex-col items-center py-10">
          
          {/* Brand Anchor (Mobile & Form Header) */}
          <div className="flex flex-col items-center mb-10">
            <div className="lg:hidden flex items-center gap-2 mb-8">
              <span className="material-symbols-outlined text-primary-container text-3xl">meeting_room</span>
              <span className="font-headline font-extrabold text-primary-container text-2xl tracking-tighter">SI-BOOK</span>
            </div>
            <h2 className="font-headline font-bold text-4xl text-on-surface mb-3 tracking-tight">Create Account</h2>
            <p className="text-on-surface-variant font-medium text-center">Register for a corporate account.</p>
          </div>

          {/* Form Content */}
          <form className="w-full space-y-5" onSubmit={async (e) => { 
            e.preventDefault(); 
            const name = e.target.fullName.value;
            const email = e.target.email.value;
            const password = e.target.password.value;
            
            if (name && email && password) {
              setLoading(true);
              const result = await register(name, email, password);
              setLoading(false);
              
              if (result.success) {
                showToast('Account created successfully!', 'success');
                setTimeout(() => {
                  navigate('/dashboard'); 
                }, 1500);
              } else {
                showToast(`Registration failed: ${result.error}`, 'error');
              }
            }
          }}>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-on-surface-variant tracking-wide px-1">FULL NAME</label>
              <input 
                name="fullName"
                className="w-full h-14 px-5 bg-surface-container border-none rounded-xl focus:ring-2 focus:ring-primary-container focus:bg-surface-container-lowest transition-all duration-300 outline-none text-on-surface" 
                placeholder="John Doe" 
                type="text"
                required
              />
            </div>

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
              <label className="block text-sm font-semibold text-on-surface-variant tracking-wide px-1">PASSWORD</label>
              <input 
                name="password"
                className="w-full h-14 px-5 bg-surface-container border-none rounded-xl focus:ring-2 focus:ring-primary-container focus:bg-surface-container-lowest transition-all duration-300 outline-none text-on-surface" 
                placeholder="••••••••" 
                type="password"
                minLength="8"
                required
              />
            </div>
            
            {/* Primary Action */}
            <button 
              className={`w-full h-14 bg-gradient-to-br from-primary to-primary-container text-white font-headline font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform active:scale-[0.98] tracking-widest text-sm mt-4 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              type="submit"
              disabled={loading}
            >
              {loading ? 'CREATING ACCOUNT...' : 'SIGN UP'}
            </button>
          </form>

          {/* Divider */}
          <div className="w-full flex items-center my-8">
            <div className="flex-grow h-px bg-surface-container-high"></div>
            <span className="px-4 text-xs font-bold text-outline uppercase tracking-widest">Or register with</span>
            <div className="flex-grow h-px bg-surface-container-high"></div>
          </div>

          {/* SSO Options */}
          <div className="grid grid-cols-2 gap-4 w-full">
            <button className="flex items-center justify-center gap-3 h-14 rounded-xl bg-surface-container-lowest border-2 border-surface-container-high hover:bg-surface-container-low transition-all duration-200 group">
              <img 
                alt="Google" 
                className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPx7oMpZxxPNatc1A4T1OXR5FNoGGH3Zp70nu-AMUWuHLhS17UHPLLC0AV8R8_VXZ208p7S1K-lmzsz0p0dWo_WsxHCnE_pk0ZIEbg0zs0T0tx2Sb3MwcyHKpy6SkMddg7fdCF0zOZzDnEo3O2vxFjFe_eHT800eXgY8Hp-aZoiUi61pOsehti55eR8Y6oQkb5RvTZgwQ2KHx2FrqlpKlJxDfuUWex3PZq-dyJlBAyG8_GwyZlc6hGYVj4gCPC-m-p_6a2jSoRIeg"
              />
              <span className="text-sm font-bold text-on-surface-variant">Google</span>
            </button>
            <button className="flex items-center justify-center gap-3 h-14 rounded-xl bg-surface-container-lowest border-2 border-surface-container-high hover:bg-surface-container-low transition-all duration-200 group">
              <img 
                alt="Microsoft" 
                className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwAh1NSRQ-HuJ4LRTpkFvL-TWk2P9GGBpAK8YRoOA80RwaN_gJrgFWtl9IGmuO_aLP4hWnw_WmIOqS3olLtZrZuMlCWUAD2sS0cUNFg2SvwSg_3uWwEssh9H6E0OdYNCDmU79tgpm13wX-B6ctx4PLPnol5F9oVTd_OTyE4NFsHFsG2yqmb-nY_rJDGofCrAo2h5vJar1IVSg-JVP33vF_z6MVViObkxgOgdJzARJqD53qr2R8hcw5FEU00JVoDls4tnQVjYWxuc4"
              />
              <span className="text-sm font-bold text-on-surface-variant">Microsoft</span>
            </button>
          </div>

          <p className="mt-10 text-sm text-on-surface-variant font-medium">
            Already have an account? <Link to="/login" className="text-primary-container font-bold hover:underline">Sign In</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
