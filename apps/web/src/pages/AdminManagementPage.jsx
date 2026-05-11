import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { fetchApi } from '../lib/api';
import TopRightNav from '../components/TopRightNav';
import Sidebar from '../components/Sidebar';
import { useTranslation } from 'react-i18next';

export default function AdminManagementPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { t } = useTranslation();
  
  const [stats, setStats] = useState({
    totalBookingsToday: 0,
    occupancyRate: 0,
    activeRooms: 0,
    totalRooms: 0,
    issues: 0
  });
  const [activities, setActivities] = useState([]);
  const [trends, setTrends] = useState([]);
  const [roomUtil, setRoomUtil] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        setLoading(true);
        const endDate = new Date().toISOString().split('T')[0];
        const startDate = new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // Last 7 days
        const qs = `?startDate=${startDate}&endDate=${endDate}`;

        const [statsRes, activityRes, trendsRes, utilRes] = await Promise.all([
          fetchApi('/admin/stats'),
          fetchApi('/admin/activity'),
          fetchApi(`/reports/trends${qs}`),
          fetchApi(`/reports/room-utilization${qs}`)
        ]);
        
        if (statsRes.ok) setStats(await statsRes.json());
        if (activityRes.ok) setActivities(await activityRes.json());
        if (trendsRes.ok) setTrends(await trendsRes.json());
        if (utilRes.ok) setRoomUtil(await utilRes.json());
      } catch (err) {
        console.error('Failed to load admin data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, []);

  return (
    <div className="bg-surface text-on-surface selection:bg-primary-fixed selection:text-on-primary-fixed min-h-screen">
      {/* SideNavBar Anchor */}
      <Sidebar />

      {/* TopNavBar Anchor */}
      <header className="fixed top-0 right-0 w-full lg:w-[calc(100%-16rem)] h-16 z-40 bg-slate-50/50 dark:bg-slate-950/50 backdrop-blur-md">
        <div className="flex items-center justify-between pl-16 pr-4 lg:px-8 w-full h-full">
          <div className="flex items-center flex-1">
            <div className="relative w-full max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
              <input className="font-body w-full pl-10 pr-4 py-2 bg-surface-container border-none outline-none rounded-lg text-sm focus:bg-surface-container-lowest focus:ring-0 transition-all" placeholder="Search analytics, rooms, or users..." type="text" />
            </div>
          </div>
          <TopRightNav />
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="ml-0 lg:ml-64 px-4 pb-4 pt-20 md:px-8 md:pb-8 md:pt-24 min-h-screen bg-surface">
        {/* Header Section */}
        <div className="mb-10 flex justify-between items-end">
          <div>
            <h2 className="text-4xl font-extrabold tracking-tight text-primary font-headline mb-2">{t('admin.executiveOverview')}</h2>
            <p className="text-on-surface-variant font-medium">{t('admin.welcomeBack')} {user?.name?.split(' ')[0] || 'Administrator'}. {t('admin.conciergeStatus')}</p>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-2.5 rounded-xl bg-surface-container-lowest text-on-surface font-semibold text-sm shadow-[0_20px_40px_rgba(0,27,60,0.06)] hover:shadow-lg transition-all flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">file_download</span>
              {t('admin.exportReport')}
            </button>
            <button onClick={() => navigate('/rooms/manage')} className="px-6 py-2.5 rounded-xl bg-gradient-to-br from-primary to-primary-container text-white font-semibold text-sm shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">edit_square</span>
              {t('admin.manageRooms')}
            </button>
          </div>
        </div>

        {/* Stat Row: High-Impact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {/* Card 1 */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_20px_40px_rgba(0,27,60,0.06)] flex flex-col gap-4 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl"></div>
            <div className="flex justify-between items-start">
              <div className="p-2 bg-primary-fixed rounded-lg text-on-primary-fixed">
                <span className="material-symbols-outlined">event_available</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-on-surface-variant mb-1">{t('admin.totalBookingsToday')}</p>
              <h3 className="text-3xl font-extrabold text-primary tracking-tighter">
                {loading ? '...' : stats.totalBookingsToday}
              </h3>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_20px_40px_rgba(0,27,60,0.06)] flex flex-col gap-4 relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div className="p-2 bg-secondary-container rounded-lg text-on-secondary-container">
                <span className="material-symbols-outlined">analytics</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-on-surface-variant mb-1">{t('admin.occupancyRate')}</p>
              <h3 className="text-3xl font-extrabold text-primary tracking-tighter">
                {loading ? '...' : `${stats.occupancyRate}%`}
              </h3>
            </div>
            <div className="w-full bg-surface-container rounded-full h-1.5 mt-1">
              <div className="bg-primary h-1.5 rounded-full" style={{ width: `${stats.occupancyRate}%` }}></div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_20px_40px_rgba(0,27,60,0.06)] flex flex-col gap-4 relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div className="p-2 bg-tertiary-fixed rounded-lg text-on-tertiary-fixed-variant">
                <span className="material-symbols-outlined">meeting_room</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-on-surface-variant mb-1">{t('admin.activeRooms')}</p>
              <h3 className="text-3xl font-extrabold text-primary tracking-tighter">
                {loading ? '...' : <>{stats.activeRooms} <span className="text-sm font-medium text-slate-400">/ {stats.totalRooms}</span></>}
              </h3>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_20px_40px_rgba(0,27,60,0.06)] flex flex-col gap-4 relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div className="p-2 bg-error-container rounded-lg text-on-error-container">
                <span className="material-symbols-outlined">warning</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-on-surface-variant mb-1">{t('admin.conflictsIssues')}</p>
              <h3 className="text-3xl font-extrabold text-primary tracking-tighter">
                {loading ? '...' : stats.issues}
              </h3>
            </div>
          </div>
        </div>

        {/* Charts Section: Bento Grid */}
        <div className="grid grid-cols-12 gap-8 mb-10">
          {/* Line Chart: Booking Trends */}
          <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-3xl p-8 shadow-[0_20px_40px_rgba(0,27,60,0.06)]">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h4 className="text-xl font-bold text-primary">{t('admin.bookingTrends')}</h4>
                <p className="text-sm text-on-surface-variant">{t('admin.dailyVolume')}</p>
              </div>
              <div className="flex gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-fixed text-on-primary-fixed">{t('admin.weekly')}</span>
              </div>
            </div>
            
            <div className="h-64 w-full relative flex items-end justify-between px-2">
              <div className="absolute inset-0 flex flex-col justify-between py-2 border-l border-b border-outline-variant/10">
                <div className="w-full border-t border-outline-variant/5"></div>
                <div className="w-full border-t border-outline-variant/5"></div>
                <div className="w-full border-t border-outline-variant/5"></div>
                <div className="w-full border-t border-outline-variant/5"></div>
              </div>
              
              <svg className="absolute inset-0 w-full h-full px-2" preserveAspectRatio="none" viewBox="0 0 700 200">
                <defs>
                  <linearGradient id="gradient" x1="0%" x2="100%" y1="0%" y2="0%">
                    <stop offset="0%" stopColor="#00091b"></stop>
                    <stop offset="100%" stopColor="#7089b3"></stop>
                  </linearGradient>
                </defs>
                {!loading && trends.length > 0 && (
                  <path 
                    d={(() => {
                      const maxCount = Math.max(...trends.map(t => t.count), 1);
                      if (trends.length === 1) return `M0,180 L350,${180 - (trends[0].count / maxCount) * 160} L700,180`;
                      const points = trends.map((t, i) => {
                        const x = (i / (trends.length - 1)) * 700;
                        const y = 180 - (t.count / maxCount) * 160;
                        return `${x},${y}`;
                      });
                      return `M${points.join(' L')}`;
                    })()} 
                    fill="none" stroke="url(#gradient)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"
                  />
                )}
                {!loading && trends.length === 0 && (
                  <path d="M0,180 L700,180" fill="none" stroke="url(#gradient)" strokeLinecap="round" strokeWidth="4" strokeDasharray="8 8" />
                )}
              </svg>
              
              <div className="flex justify-between w-full mt-4 translate-y-8 px-2 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest z-10">
                {!loading && trends.length > 0 ? (
                  trends.map((t, i) => (
                    <span key={i} className="text-center truncate max-w-[40px] block">
                      {new Date(t.date).toLocaleDateString('en-US', { weekday: 'short' })}
                    </span>
                  ))
                ) : (
                  <><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></>
                )}
              </div>
            </div>
          </div>

          {/* Bar Chart: Room Utilization */}
          <div className="col-span-12 lg:col-span-4 bg-surface-container-lowest rounded-3xl p-8 shadow-[0_20px_40px_rgba(0,27,60,0.06)]">
            <h4 className="text-xl font-bold text-primary mb-1">{t('admin.roomUtilization')}</h4>
            <p className="text-sm text-on-surface-variant mb-8">{t('admin.rankedByUsage')}</p>
            <div className="space-y-6">
              {loading ? (
                <div className="text-center text-slate-500 py-4">Loading...</div>
              ) : roomUtil.length === 0 ? (
                <div className="text-center text-slate-500 py-4">No data available</div>
              ) : (
                roomUtil.slice(0, 4).map((room, idx) => {
                  const colors = [
                    'bg-primary', 
                    'bg-secondary-container', 
                    'bg-outline-variant', 
                    'bg-surface-container-highest'
                  ];
                  return (
                    <div key={room.roomId} className="space-y-2">
                      <div className="flex justify-between text-xs font-bold uppercase tracking-wide">
                        <span className="truncate pr-4">{room.roomName}</span>
                        <span className="text-primary">{room.utilization}%</span>
                      </div>
                      <div className="w-full bg-surface-container rounded-full h-3">
                        <div className={`${colors[idx % colors.length]} h-3 rounded-full shadow-sm`} style={{ width: `${Math.max(room.utilization, 2)}%` }}></div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            <button onClick={() => navigate('/reports')} className="w-full mt-8 py-3 text-xs font-bold uppercase tracking-widest text-primary border-t border-outline-variant/10 hover:text-on-primary-container transition-colors">
              {t('admin.viewAllAssets')}
            </button>
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="bg-surface-container-lowest rounded-3xl p-8 shadow-[0_20px_40px_rgba(0,27,60,0.06)]">
          <div className="flex justify-between items-center mb-8">
            <h4 className="text-xl font-bold text-primary">{t('admin.recentActivity')}</h4>
            <button className="text-sm font-semibold text-secondary hover:underline transition-all">{t('admin.viewFullLogs')}</button>
          </div>
          <div className="space-y-1">
            {loading ? (
              <div className="p-8 text-center text-slate-500">Loading activities...</div>
            ) : activities.length === 0 ? (
              <div className="p-8 text-center text-slate-500">No recent activity.</div>
            ) : (
              activities.map((activity, idx) => {
                let icon = 'info';
                let iconBg = 'bg-surface-container/30';
                let iconColor = 'text-slate-500';
                let statusBg = 'bg-surface-container';
                let statusColor = 'text-on-surface-variant';
                
                if (activity.type === 'booking') {
                  icon = 'book_online';
                  iconBg = 'bg-primary-fixed/30';
                  iconColor = 'text-primary-container';
                  statusBg = 'bg-tertiary-container';
                  statusColor = 'text-tertiary-fixed';
                } else if (activity.type === 'cancellation') {
                  icon = 'cancel';
                  iconBg = 'bg-error-container/30';
                  iconColor = 'text-error';
                  statusBg = 'bg-surface-container-highest';
                } else if (activity.type === 'user_registered') {
                  icon = 'person_add';
                  iconBg = 'bg-secondary-container/30';
                  iconColor = 'text-secondary';
                  statusBg = 'bg-secondary-container';
                  statusColor = 'text-on-secondary-container';
                }

                const diff = new Date() - new Date(activity.timestamp);
                const mins = Math.floor(diff / 60000);
                const timeStr = mins < 60 ? `${mins} mins ago` : `${Math.floor(mins/60)} hrs ago`;

                return (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-2xl hover:bg-surface-container-low transition-all group">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center ${iconColor}`}>
                        <span className="material-symbols-outlined">{icon}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{activity.message}</p>
                        <p className="text-xs text-on-surface-variant">{activity.detail}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-slate-400 group-hover:text-slate-500">{timeStr}</p>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${statusBg} ${statusColor} mt-1`}>
                        {activity.status}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
