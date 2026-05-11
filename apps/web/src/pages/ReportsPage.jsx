import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import TopRightNav from '../components/TopRightNav';
import { fetchApi } from '../lib/api';
import { formatRupiah } from '../lib/formatRupiah';
import Sidebar from '../components/Sidebar';
import { useTranslation } from 'react-i18next';

export default function ReportsPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { t } = useTranslation();
  const [kpi, setKpi] = useState(null);
  const [trends, setTrends] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [roomUtil, setRoomUtil] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    return {
      startDate: start.toISOString().split('T')[0],
      endDate: now.toISOString().split('T')[0],
    };
  });

  useEffect(() => {
    loadAllData();
  }, [dateRange]);

  const loadAllData = async () => {
    setLoading(true);
    const qs = `?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`;
    try {
      const [kpiRes, trendsRes, deptRes, utilRes] = await Promise.all([
        fetchApi(`/reports/kpi${qs}`),
        fetchApi(`/reports/trends${qs}`),
        fetchApi(`/reports/by-department${qs}`),
        fetchApi(`/reports/room-utilization${qs}`),
      ]);
      if (kpiRes.ok) setKpi(await kpiRes.json());
      if (trendsRes.ok) setTrends(await trendsRes.json());
      if (deptRes.ok) setDepartments(await deptRes.json());
      if (utilRes.ok) setRoomUtil(await utilRes.json());
    } catch (e) {
      console.error('Failed to load reports:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    { icon: 'dashboard', label: 'Dashboard', path: '/dashboard' },
    { icon: 'meeting_room', label: 'Rooms', path: '/rooms' },
    { icon: 'calendar_month', label: 'Calendar', path: '/calendar' },
    { icon: 'event_available', label: 'My Bookings', path: '/bookings' },
    ...(user?.role === 'admin' ? [
      { icon: 'admin_panel_settings', label: 'Admin Management', path: '/admin' },
    ] : []),
    { icon: 'bar_chart', label: 'Reports', path: '/reports', active: true },
    { icon: 'settings', label: 'Settings', path: '/settings' },
  ];

  const formatDateLabel = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
  };

  const formatRangeLabel = () => {
    const s = new Date(dateRange.startDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    const e = new Date(dateRange.endDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    return `${s} - ${e}`;
  };

  // SVG path for trend chart
  const trendPath = (() => {
    if (trends.length < 2) return '';
    const maxCount = Math.max(...trends.map(t => t.count), 1);
    const points = trends.map((t, i) => {
      const x = (i / (trends.length - 1)) * 1000;
      const y = 100 - (t.count / maxCount) * 90;
      return `${x},${y}`;
    });
    return `M${points.join(' L')}`;
  })();

  const trendAreaPath = trendPath ? `${trendPath} L1000,100 L0,100 Z` : '';

  // Donut chart calculation
  const totalDept = departments.reduce((s, d) => s + d.count, 0);
  const deptColors = ['stroke-primary', 'stroke-secondary', 'stroke-on-primary-container', 'stroke-tertiary', 'stroke-error'];
  const dotColors = ['bg-primary', 'bg-secondary', 'bg-on-primary-container', 'bg-tertiary', 'bg-error'];

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      {/* SideNavBar */}
      <Sidebar />

      {/* TopNavBar */}
      <header className="fixed top-0 right-0 w-full lg:w-[calc(100%-16rem)] h-16 z-40 bg-slate-50/50 dark:bg-slate-950/50 backdrop-blur-md">
        <div className="flex items-center justify-between pl-16 pr-4 lg:px-8 w-full h-full">
          <div className="flex items-center flex-1">
            <h2 className="font-headline tracking-tight font-bold text-slate-900 dark:text-slate-50">Reports & Analytics</h2>
          </div>
          <TopRightNav />
        </div>
      </header>

      {/* Main Content */}
      <main className="ml-0 lg:ml-64 pt-24 pb-12 px-10 min-h-screen">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <h2 className="text-4xl font-bold tracking-tight text-primary mb-2 font-headline">{t('reports.title')}</h2>
            <p className="font-body text-on-surface-variant max-w-lg">{t('reports.subtitle')}</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Date Range Picker */}
            <div className="font-body flex items-center gap-3">
              <input type="date" value={dateRange.startDate} onChange={e => setDateRange({...dateRange, startDate: e.target.value})}
                className="bg-surface-container-lowest rounded-xl px-4 py-2.5 shadow-sm text-sm font-medium border-none outline-none focus:ring-1 focus:ring-primary/20" />
              <span className="text-slate-400">—</span>
              <input type="date" value={dateRange.endDate} onChange={e => setDateRange({...dateRange, endDate: e.target.value})}
                className="bg-surface-container-lowest rounded-xl px-4 py-2.5 shadow-sm text-sm font-medium border-none outline-none focus:ring-1 focus:ring-primary/20" />
            </div>
            <button onClick={loadAllData} className="flex items-center gap-2 bg-gradient-to-br from-primary to-primary-container text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all active:scale-95">
              <span className="material-symbols-outlined text-lg">refresh</span>
              <span className="font-body">{t('reports.refresh')}</span>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <>
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 font-body">
              <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_20px_40px_rgba(0,27,60,0.06)] flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">query_stats</span>
                  </div>
                </div>
                <p className="text-label-sm uppercase tracking-widest text-outline text-[10px] font-bold mb-1">{t('reports.utilization')}</p>
                <p className="text-3xl font-bold text-primary">{kpi?.utilization || 0}%</p>
              </div>
              <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_20px_40px_rgba(0,27,60,0.06)] flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary-fixed flex items-center justify-center">
                    <span className="material-symbols-outlined text-secondary">schedule</span>
                  </div>
                </div>
                <p className="text-label-sm uppercase tracking-widest text-outline text-[10px] font-bold mb-1">{t('reports.avgDuration')}</p>
                <p className="text-3xl font-bold text-primary">{kpi?.avgDuration || 0}h</p>
              </div>
              <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_20px_40px_rgba(0,27,60,0.06)] flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-tertiary-fixed flex items-center justify-center">
                    <span className="material-symbols-outlined text-on-tertiary-fixed-variant">calendar_month</span>
                  </div>
                </div>
                <p className="text-label-sm uppercase tracking-widest text-outline text-[10px] font-bold mb-1">{t('reports.totalBookings')}</p>
                <p className="text-3xl font-bold text-primary">{kpi?.totalBookings || 0}</p>
              </div>
              <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_20px_40px_rgba(0,27,60,0.06)] flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center">
                    <span className="material-symbols-outlined text-on-surface">group</span>
                  </div>
                </div>
                <p className="text-label-sm uppercase tracking-widest text-outline text-[10px] font-bold mb-1">{t('reports.uniqueUsers')}</p>
                <p className="text-3xl font-bold text-primary">{kpi?.uniqueUsers || 0}</p>
              </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-12 gap-8 font-body">
              {/* Trend Chart */}
              <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest p-8 rounded-2xl shadow-[0_20px_40px_rgba(0,27,60,0.06)]">
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <h3 className="text-xl font-bold text-primary font-headline">Booking Trend</h3>
                    <p className="text-sm text-on-surface-variant">Daily booking frequency in the selected period</p>
                  </div>
                </div>
                {trends.length > 1 ? (
                  <>
                    <div className="relative h-64 w-full overflow-hidden">
                      <div className="absolute inset-0 flex flex-col justify-between py-2">
                        {[0,1,2,3].map(i => <div key={i} className="border-b border-surface-container-high w-full"></div>)}
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-primary/5 to-transparent pointer-events-none"></div>
                      <svg className="absolute bottom-0 left-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 100">
                        <path d={trendAreaPath} fill="rgba(0, 9, 27, 0.08)" />
                        <path className="text-primary" d={trendPath} fill="none" stroke="currentColor" strokeWidth="3" />
                      </svg>
                      {/* Points */}
                      <div className="absolute inset-0 flex items-end">
                        {trends.map((t, i) => {
                          const maxCount = Math.max(...trends.map(t => t.count), 1);
                          const left = (i / (trends.length - 1)) * 100;
                          const bottom = (t.count / maxCount) * 90;
                          return (
                            <div key={i} className="absolute group" style={{ left: `${left}%`, bottom: `${bottom}%` }}>
                              <div className="w-2.5 h-2.5 bg-primary border-2 border-surface-container-lowest rounded-full shadow-md -ml-1.5 -mb-1.5 hover:scale-150 transition-transform"></div>
                              <div className="hidden group-hover:block absolute bottom-full mb-2 -ml-8 bg-slate-900 text-white text-[10px] px-2 py-1 rounded-md whitespace-nowrap">
                                {formatDateLabel(t.date)}: {t.count} bookings
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="flex justify-between mt-4 px-2 text-[10px] font-bold text-outline uppercase tracking-widest">
                      {trends.length > 0 && <span>{formatDateLabel(trends[0].date)}</span>}
                      {trends.length > 2 && <span>{formatDateLabel(trends[Math.floor(trends.length / 2)].date)}</span>}
                      {trends.length > 0 && <span>{formatDateLabel(trends[trends.length - 1].date)}</span>}
                    </div>
                  </>
                ) : (
                  <div className="h-64 flex items-center justify-center text-slate-400">
                    <div className="text-center">
                      <span className="material-symbols-outlined text-5xl mb-3 block">show_chart</span>
                      <p className="font-medium">No trend data available for this period</p>
                    </div>
                  </div>
                )}
              </div>

              {/* By Department Donut */}
              <div className="col-span-12 lg:col-span-4 bg-surface-container-lowest p-8 rounded-2xl shadow-[0_20px_40px_rgba(0,27,60,0.06)]">
                <h3 className="text-xl font-bold text-primary mb-2 font-headline">By Department</h3>
                <p className="text-sm text-on-surface-variant mb-10">Resource allocation by team</p>
                {departments.length > 0 ? (
                  <>
                    <div className="relative w-48 h-48 mx-auto mb-10">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <circle className="stroke-surface-container-low" cx="18" cy="18" fill="none" r="16" strokeWidth="3.5"></circle>
                        {departments.map((dept, i) => {
                          const offset = departments.slice(0, i).reduce((s, d) => s + d.percentage, 0);
                          return (
                            <circle key={i} className={deptColors[i % deptColors.length]} cx="18" cy="18" fill="none" r="16"
                              strokeDasharray={`${dept.percentage}, 100`} strokeDashoffset={-offset} strokeWidth="4" />
                          );
                        })}
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold text-primary">{totalDept}</span>
                        <span className="text-[10px] uppercase tracking-widest text-outline font-bold">Total</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {departments.map((dept, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${dotColors[i % dotColors.length]}`}></div>
                            <span className="text-sm font-medium text-on-surface">{dept.department}</span>
                          </div>
                          <span className="text-sm font-bold text-primary">{dept.percentage}%</span>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="h-48 flex items-center justify-center text-slate-400">
                    <div className="text-center">
                      <span className="material-symbols-outlined text-4xl mb-2 block">donut_small</span>
                      <p className="text-sm font-medium">No department data</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Room Utilization Bars */}
              <div className="col-span-12 bg-surface-container-low p-10 rounded-2xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-primary font-headline">Utilization per Room</h3>
                    <p className="text-on-surface-variant">Comparative performance of specific meeting zones</p>
                  </div>
                </div>
                {roomUtil.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-8">
                      {roomUtil.slice(0, Math.ceil(roomUtil.length / 2)).map((r, i) => (
                        <div key={i}>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-bold text-primary">{r.roomName}</span>
                            <span className="text-sm font-bold text-primary">{r.utilization}%</span>
                          </div>
                          <div className="w-full h-2.5 bg-surface-container-highest rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full transition-all duration-700" style={{ width: `${r.utilization}%` }}></div>
                          </div>
                          <p className="text-[10px] text-slate-400 mt-1">{r.totalHours}h total usage</p>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-8">
                      {roomUtil.slice(Math.ceil(roomUtil.length / 2)).map((r, i) => (
                        <div key={i}>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-bold text-primary">{r.roomName}</span>
                            <span className="text-sm font-bold text-primary">{r.utilization}%</span>
                          </div>
                          <div className="w-full h-2.5 bg-surface-container-highest rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full transition-all duration-700" style={{ width: `${r.utilization}%` }}></div>
                          </div>
                          <p className="text-[10px] text-slate-400 mt-1">{r.totalHours}h total usage</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="py-16 text-center text-slate-400">
                    <span className="material-symbols-outlined text-5xl mb-3 block">bar_chart</span>
                    <p className="font-medium">No room utilization data for this period</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
