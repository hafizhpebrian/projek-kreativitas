import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import TopRightNav from '../components/TopRightNav';
import { fetchApi } from '../lib/api';
import Sidebar from '../components/Sidebar';

export default function SettingsPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '', phone: '', jobTitle: '', department: '', language: 'en'
  });
  const [prefs, setPrefs] = useState({ notifyEmail: true, notifyPush: false, notifySms: false });

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await fetchApi('/users/me');
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
        setFormData({
          name: data.name || '',
          phone: data.phone || '',
          jobTitle: data.jobTitle || '',
          department: data.department || '',
          language: data.language || 'en',
        });
        setPrefs({
          notifyEmail: data.notifyEmail ?? true,
          notifyPush: data.notifyPush ?? false,
          notifySms: data.notifySms ?? false,
        });
      }
    } catch (e) {
      console.error('Failed to load profile:', e);
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async () => {
    setSaving(true);
    try {
      const res = await fetchApi('/users/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
        showToast('Profile saved successfully!');
      } else {
        showToast('Failed to save profile', 'error');
      }
    } catch (e) {
      showToast('An error occurred', 'error');
    } finally {
      setSaving(false);
    }
  };

  const togglePref = async (key) => {
    const newPrefs = { ...prefs, [key]: !prefs[key] };
    setPrefs(newPrefs);
    try {
      await fetchApi('/users/me/preferences', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPrefs),
      });
      showToast('Preference updated!');
    } catch (e) {
      showToast('Failed to update preference', 'error');
      setPrefs(prefs); // revert
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    { icon: 'dashboard', label: 'Dashboard', path: '/dashboard' },
    { icon: 'meeting_room', label: 'Rooms', path: '/rooms' },
    { icon: 'calendar_today', label: 'Calendar', path: '/calendar' },
    { icon: 'event_available', label: 'My Bookings', path: '/bookings' },
    ...(user?.role === 'admin' ? [
      { icon: 'admin_panel_settings', label: 'Admin Management', path: '/admin' },
      { icon: 'bar_chart', label: 'Reports', path: '/reports' },
    ] : []),
    { icon: 'settings', label: 'Settings', path: '/settings', active: true },
  ];

  if (loading) {
    return (
      <div className="bg-surface text-on-surface min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="bg-surface text-on-surface min-h-screen flex">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-xl shadow-xl text-white font-bold text-sm flex items-center gap-2 animate-[slideDown_0.3s_ease] ${toast.type === 'error' ? 'bg-error' : 'bg-primary'}`}>
          <span className="material-symbols-outlined text-sm">{toast.type === 'error' ? 'error' : 'check_circle'}</span>
          {toast.msg}
        </div>
      )}

      {/* SideNavBar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 ml-0 lg:ml-64 min-h-screen">
        {/* TopNavBar */}
        <header className="w-full h-16 sticky top-0 z-40 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md flex items-center justify-between pl-16 pr-4 lg:px-8 shadow-sm">
          <div className="flex items-center gap-4">
            <h2 className="font-headline tracking-tight font-bold text-slate-900 dark:text-slate-50">Settings & Profile</h2>
          </div>
          <TopRightNav />
        </header>

        {/* Canvas Content */}
        <div className="p-10 max-w-6xl mx-auto space-y-12">
          {/* Page Header */}
          <section className="relative">
            <h1 className="text-5xl font-extrabold font-headline tracking-tighter text-primary mb-2">User Profile</h1>
            <p className="text-on-surface-variant font-body max-w-lg">Manage your digital concierge experience, personal details, and how we communicate with you.</p>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start font-body">
            {/* Profile Left: Personal Information */}
            <div className="lg:col-span-8 space-y-8">
              <div className="bg-surface-container-lowest p-8 rounded-[2rem] shadow-[0_20px_40px_rgba(0,27,60,0.06)] relative overflow-hidden">
                <div className="flex flex-col md:flex-row gap-10 items-start">
                  <div className="relative group">
                    <div className="w-32 h-32 rounded-3xl overflow-hidden ring-4 ring-surface-container-low shadow-xl bg-primary flex items-center justify-center text-white">
                      <span className="text-5xl font-bold">{profile?.name?.charAt(0)?.toUpperCase() || 'U'}</span>
                    </div>
                  </div>
                  <div className="flex-1 w-full space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant ml-1">Full Name</label>
                        <input className="w-full bg-surface-container border-none outline-none rounded-xl px-4 py-3 text-sm focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary/10 transition-all font-medium" type="text"
                          value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant ml-1">Job Title</label>
                        <input className="w-full bg-surface-container border-none outline-none rounded-xl px-4 py-3 text-sm focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary/10 transition-all font-medium" type="text"
                          value={formData.jobTitle} onChange={e => setFormData({...formData, jobTitle: e.target.value})} />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant ml-1">Email Address</label>
                        <input className="w-full bg-surface-container border-none outline-none rounded-xl px-4 py-3 text-sm focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary/10 transition-all font-medium opacity-60 cursor-not-allowed" type="email"
                          value={profile?.email || ''} disabled />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant ml-1">Phone Number</label>
                        <input className="w-full bg-surface-container border-none outline-none rounded-xl px-4 py-3 text-sm focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary/10 transition-all font-medium" type="tel"
                          value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="+62 812 3456 7890" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant ml-1">Department</label>
                        <input className="w-full bg-surface-container border-none outline-none rounded-xl px-4 py-3 text-sm focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary/10 transition-all font-medium" type="text"
                          value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} placeholder="Engineering" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant ml-1">Interface Language</label>
                        <select className="w-full bg-surface-container border-none outline-none rounded-xl px-4 py-3 text-sm focus:ring-0 font-medium"
                          value={formData.language} onChange={e => setFormData({...formData, language: e.target.value})}>
                          <option value="en">English</option>
                          <option value="id">Bahasa Indonesia</option>
                        </select>
                      </div>
                    </div>
                    <div className="pt-4 flex justify-end">
                      <button onClick={saveProfile} disabled={saving}
                        className="bg-primary text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-primary/20 transition-all disabled:opacity-50 flex items-center gap-2">
                        {saving && <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>}
                        {saving ? 'Saving...' : 'Save Profile'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notification Preferences */}
              <div className="bg-surface-container-low p-10 rounded-[2rem] space-y-8">
                <div>
                  <h3 className="text-2xl font-bold font-headline text-primary">Notification Preferences</h3>
                  <p className="text-sm text-on-surface-variant mt-1">Select how you'd like to stay informed about bookings and alerts.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Email */}
                  <div onClick={() => togglePref('notifyEmail')} className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm space-y-4 hover:shadow-md transition-shadow cursor-pointer group">
                    <div className="flex justify-between items-start">
                      <div className="w-10 h-10 rounded-lg bg-tertiary-container flex items-center justify-center text-tertiary-fixed">
                        <span className="material-symbols-outlined">mail</span>
                      </div>
                      <div className={`w-12 h-6 rounded-full relative p-1 flex items-center transition-all ${prefs.notifyEmail ? 'bg-tertiary-container justify-end' : 'bg-surface-container-highest justify-start'}`}>
                        <div className={`w-4 h-4 rounded-full shadow-sm ${prefs.notifyEmail ? 'bg-tertiary-fixed' : 'bg-on-surface-variant'}`}></div>
                      </div>
                    </div>
                    <div>
                      <p className="font-bold text-sm">Email Alerts</p>
                      <p className="text-xs text-on-surface-variant mt-1">Confirmations, cancellations, and weekly summaries.</p>
                    </div>
                  </div>
                  {/* Push */}
                  <div onClick={() => togglePref('notifyPush')} className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm space-y-4 hover:shadow-md transition-shadow cursor-pointer group">
                    <div className="flex justify-between items-start">
                      <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center text-on-primary-container">
                        <span className="material-symbols-outlined">send_to_mobile</span>
                      </div>
                      <div className={`w-12 h-6 rounded-full relative p-1 flex items-center transition-all ${prefs.notifyPush ? 'bg-tertiary-container justify-end' : 'bg-surface-container-highest justify-start'}`}>
                        <div className={`w-4 h-4 rounded-full shadow-sm ${prefs.notifyPush ? 'bg-tertiary-fixed' : 'bg-on-surface-variant'}`}></div>
                      </div>
                    </div>
                    <div>
                      <p className="font-bold text-sm">Push Notifications</p>
                      <p className="text-xs text-on-surface-variant mt-1">Real-time alerts via mobile and desktop browser.</p>
                    </div>
                  </div>
                  {/* SMS */}
                  <div onClick={() => togglePref('notifySms')} className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm space-y-4 hover:shadow-md transition-shadow cursor-pointer group">
                    <div className="flex justify-between items-start">
                      <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface-variant">
                        <span className="material-symbols-outlined">sms</span>
                      </div>
                      <div className={`w-12 h-6 rounded-full relative p-1 flex items-center transition-all ${prefs.notifySms ? 'bg-tertiary-container justify-end' : 'bg-surface-container-highest justify-start'}`}>
                        <div className={`w-4 h-4 rounded-full shadow-sm ${prefs.notifySms ? 'bg-tertiary-fixed' : 'bg-on-surface-variant'}`}></div>
                      </div>
                    </div>
                    <div>
                      <p className="font-bold text-sm">SMS Messages</p>
                      <p className="text-xs text-on-surface-variant mt-1">Urgent room changes and emergency alerts.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Right: Account Settings */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-surface-container-lowest p-8 rounded-[2rem] shadow-[0_20px_40px_rgba(0,27,60,0.04)] space-y-8">
                <div>
                  <h3 className="text-xl font-bold font-headline text-primary">Account Security</h3>
                  <p className="text-xs text-on-surface-variant mt-1">Protect your executive workspace.</p>
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between px-1">
                      <span className="text-xs font-semibold">Role</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${profile?.role === 'admin' ? 'bg-tertiary-container text-tertiary-fixed' : 'bg-surface-container-high text-on-surface-variant'}`}>
                        {profile?.role?.toUpperCase() || 'USER'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between px-1">
                      <span className="text-xs font-semibold">Email Verified</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${profile?.emailVerified ? 'bg-tertiary-container text-tertiary-fixed' : 'bg-error-container text-error'}`}>
                        {profile?.emailVerified ? 'VERIFIED' : 'NOT VERIFIED'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between px-1">
                      <span className="text-xs font-semibold">Member Since</span>
                      <span className="text-[10px] bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded-full font-bold">
                        {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long' }) : '-'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Usage Stats Card */}
              <div className="bg-primary rounded-[2rem] p-8 text-white space-y-6 shadow-xl relative overflow-hidden group">
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary-container rounded-full blur-3xl opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="relative z-10">
                  <p className="text-[10px] uppercase tracking-[0.2em] opacity-60 font-bold mb-4">Account Info</p>
                  <h4 className="text-2xl font-black font-headline">{profile?.name || 'User'}</h4>
                  <p className="text-sm opacity-80 mt-1">{profile?.email}</p>
                  <div className="mt-6 flex items-end gap-2">
                    <span className="text-sm opacity-60">{profile?.department || 'No department set'}</span>
                  </div>
                  <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center">
                    <span className="text-[10px] font-bold tracking-widest uppercase py-1 px-3 bg-white/10 rounded-full">
                      {profile?.role === 'admin' ? '🛡️ Administrator' : '👤 Member'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
