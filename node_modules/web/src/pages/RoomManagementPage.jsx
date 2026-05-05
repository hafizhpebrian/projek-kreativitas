import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopRightNav from '../components/TopRightNav';
import Sidebar from '../components/Sidebar';

export default function RoomManagementPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-surface text-on-surface min-h-screen font-body">
      {/* SideNavBar */}
      <Sidebar />

      {/* TopNavBar */}
      <header className="fixed top-0 right-0 w-full lg:w-[calc(100%-16rem)] h-16 bg-slate-50/50 dark:bg-slate-950/50 backdrop-blur-md flex items-center justify-between pl-16 pr-4 lg:px-8 z-40 transition-shadow focus-within:shadow-lg">
        <div className="flex items-center bg-surface-container rounded-lg px-3 py-1.5 w-96">
          <span className="material-symbols-outlined text-on-surface-variant text-sm mr-2">search</span>
          <input className="bg-transparent border-none focus:ring-0 text-sm w-full text-on-surface-variant placeholder-on-surface-variant/50 outline-none" placeholder="Search for bookings or rooms..." type="text"/>
        </div>
        <TopRightNav />
      </header>

      {/* Main Content Canvas */}
      <main className="ml-0 lg:ml-64 pt-16 min-h-screen">
        <div className="max-w-[1400px] mx-auto p-10 space-y-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-on-primary-container font-bold">Workspace Portfolio</span>
              <h2 className="text-5xl font-headline font-extrabold tracking-tight text-primary mt-2">Room Management</h2>
            </div>
            <button className="bg-gradient-to-br from-primary to-primary-container text-white px-8 py-3.5 rounded-xl font-semibold shadow-[0_10px_20px_rgba(0,9,27,0.2)] flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-transform">
              <span className="material-symbols-outlined text-[20px]">add</span>
              Add New Room
            </button>
          </div>

          {/* Bento Filter Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2 bg-surface-container-lowest p-4 rounded-2xl shadow-[0_20px_40px_rgba(0,27,60,0.06)] flex items-center gap-3">
              <span className="material-symbols-outlined text-outline">filter_list</span>
              <input className="w-full bg-transparent border-none focus:ring-0 text-sm outline-none" placeholder="Quick find by name or floor..." type="text"/>
            </div>
            <div className="bg-surface-container-lowest p-4 rounded-2xl shadow-[0_20px_40px_rgba(0,27,60,0.06)]">
              <select className="w-full bg-transparent border-none focus:ring-0 text-sm font-medium text-on-surface-variant outline-none appearance-none">
                <option>All Floors</option>
                <option>Executive Floor (12)</option>
                <option>Ground Floor (0)</option>
                <option>Research Wing (4)</option>
              </select>
            </div>
            <div className="bg-surface-container-lowest p-4 rounded-2xl shadow-[0_20px_40px_rgba(0,27,60,0.06)]">
              <select className="w-full bg-transparent border-none focus:ring-0 text-sm font-medium text-on-surface-variant outline-none appearance-none">
                <option>All Statuses</option>
                <option>Available</option>
                <option>Occupied</option>
                <option>Maintenance</option>
              </select>
            </div>
          </div>

          {/* Room Table Section */}
          <div className="bg-surface-container-low rounded-3xl overflow-hidden shadow-[0_20px_40px_rgba(0,27,60,0.04)]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-high">
                  <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-wider text-on-surface-variant/70">Visual</th>
                  <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-wider text-on-surface-variant/70">Room Name</th>
                  <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-wider text-on-surface-variant/70">Location</th>
                  <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-wider text-on-surface-variant/70">Capacity</th>
                  <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-wider text-on-surface-variant/70">Amenities</th>
                  <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-wider text-on-surface-variant/70">Status</th>
                  <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-wider text-on-surface-variant/70 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-transparent">
                {/* Row 1 */}
                <tr className="bg-surface-container-lowest hover:bg-white transition-colors group">
                  <td className="px-6 py-4">
                    <img alt="Meeting Room" className="w-16 h-10 object-cover rounded-lg shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvbMF4osdao6YC6ul7n_f6OEQn4xYw_uU25knTSk68rNFbp-YTSM5JklER227Jg-IEQb1fqfLu9grdMI-poDVjupS_wQxdHdOulOFKin2yGhzdT-o6ezlnGCK4QwcuV3klhKXjqE2B-1YmnRJRZBx34fHvdUnlmHPvDwPXHA3W0OGrbbtI8pQj67vAAE4VC8W_ghn0Mb6MIqmrpicY0IDjS6ipeutHiqOHQRpvbfXY5OOXlm231CO-pfUC9vfJpViyswUMW3EkWq4"/>
                  </td>
                  <td className="px-6 py-4">
                    <span className="block font-bold text-slate-900">Apollo Suite</span>
                    <span className="text-xs text-slate-500">ID: RM-1024</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">Floor 12, West Wing</td>
                  <td className="px-6 py-4 text-sm font-medium">12 People</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1.5">
                      <span className="material-symbols-outlined text-[18px] text-slate-400" title="Video Conf">videocam</span>
                      <span className="material-symbols-outlined text-[18px] text-slate-400" title="Smart Board">cast</span>
                      <span className="material-symbols-outlined text-[18px] text-slate-400" title="AC">ac_unit</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-tertiary-container text-tertiary-fixed">
                      Available
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 rounded-lg hover:bg-surface-container-high transition-colors text-on-surface-variant" title="Edit">
                        <span className="material-symbols-outlined text-[20px]">edit</span>
                      </button>
                      <button className="p-2 rounded-lg hover:bg-error-container hover:text-error transition-colors text-on-surface-variant" title="Delete">
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
                {/* Row 2 */}
                <tr className="bg-surface-container-low hover:bg-surface-container transition-colors group">
                  <td className="px-6 py-4">
                    <img alt="Meeting Room" className="w-16 h-10 object-cover rounded-lg shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6bXWU7vt6kDzpAs3i-1PlZgR-GkidAZA4cTOK54C6Sizv2FtnE67b9xXVGRs49UeuS-eX4kK6ZAeQpPk62Acx7FAaGxqZ1vkYv7eIcktwjEta2NVu4NEeKOKvuYbsuPZRiolOl3VHLyb60cgaK-if06EYtSDXQNKUWC8y545v7ysBwaXs4DZf_xCnc-prCFBn08PT3_DZFFl0eGJIxd7diVWCEH8_s43OFIWZGKnJqC24ZJLLSJq1_OYOaG7X3TIY1MD1Xxth6sM"/>
                  </td>
                  <td className="px-6 py-4">
                    <span className="block font-bold text-slate-900">Innovation Hub</span>
                    <span className="text-xs text-slate-500">ID: RM-1025</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">Floor 4, South Wing</td>
                  <td className="px-6 py-4 text-sm font-medium">6 People</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1.5">
                      <span className="material-symbols-outlined text-[18px] text-slate-400">wifi</span>
                      <span className="material-symbols-outlined text-[18px] text-slate-400">coffee</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-error-container text-on-error-container">
                      Occupied
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 rounded-lg hover:bg-surface-container-high transition-colors text-on-surface-variant" title="Edit">
                        <span className="material-symbols-outlined text-[20px]">edit</span>
                      </button>
                      <button className="p-2 rounded-lg hover:bg-error-container hover:text-error transition-colors text-on-surface-variant" title="Delete">
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
                {/* Row 3 */}
                <tr className="bg-surface-container-lowest hover:bg-white transition-colors group">
                  <td className="px-6 py-4">
                    <img alt="Meeting Room" className="w-16 h-10 object-cover rounded-lg shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBushGrMYp9q4hyPrRW2lq4gw14Mx8dvrtyEybytFGOAb0iCiQg73-yD1vVHBlEALmH4Ie-g-yE716P6I0hMxuIFoU-dBldQAi7oRq_T3aiMm-Hg02Ha7YSZ_LMfFQjx9Fu2bbPHioVlYB3r6qaatASEVj7aU7ihPUcnCLAeUQe0nClkh9IR-hHLtLTng7euMbF5wAjXb-1hN6ZiSnHTZ0OdoU5EfTvhc56zr4cNSjupNoztkr4KQfn6rPlXNfI0OmlGJzVxZ9jkzI"/>
                  </td>
                  <td className="px-6 py-4">
                    <span className="block font-bold text-slate-900">Focus Pod A</span>
                    <span className="text-xs text-slate-500">ID: RM-1026</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">Ground Floor</td>
                  <td className="px-6 py-4 text-sm font-medium">1 Person</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1.5">
                      <span className="material-symbols-outlined text-[18px] text-slate-400">mic</span>
                      <span className="material-symbols-outlined text-[18px] text-slate-400">power</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-surface-container-highest text-on-surface-variant">
                      Maintenance
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 rounded-lg hover:bg-surface-container-high transition-colors text-on-surface-variant" title="Edit">
                        <span className="material-symbols-outlined text-[20px]">edit</span>
                      </button>
                      <button className="p-2 rounded-lg hover:bg-error-container hover:text-error transition-colors text-on-surface-variant" title="Delete">
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
                {/* Row 4 */}
                <tr className="bg-surface-container-low hover:bg-surface-container transition-colors group">
                  <td className="px-6 py-4">
                    <img alt="Meeting Room" className="w-16 h-10 object-cover rounded-lg shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCK41oD-KaYTcWG3veeqkypCpVu5zISPT2CJ1VHcSiBq3OJYUmOqWlj0J3XhVCzeytJmd9DgcTCrAgHqt7mOmGtxTCjR687BwsGS6TWYkc1UMNQ6rnFWzykvgHak-sN5-4aRo9NeBgfwWHtp7hr6CJU07cux3b0N0WBxgP1q2Qz1wHC7wnnuGGIN4BZH5kVuAyECQRnVbefLvT3WOPwPxBorxGDGNm-r5m8NiSq15J38f1FzYMu_WLVhnT6nCw-zDAJyQUerS1lxQs"/>
                  </td>
                  <td className="px-6 py-4">
                    <span className="block font-bold text-slate-900">Townhall Hall</span>
                    <span className="text-xs text-slate-500">ID: RM-1027</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">Floor 2, East Wing</td>
                  <td className="px-6 py-4 text-sm font-medium">50 People</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1.5">
                      <span className="material-symbols-outlined text-[18px] text-slate-400">surround_sound</span>
                      <span className="material-symbols-outlined text-[18px] text-slate-400">podium</span>
                      <span className="material-symbols-outlined text-[18px] text-slate-400">event_seat</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-tertiary-container text-tertiary-fixed">
                      Available
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 rounded-lg hover:bg-surface-container-high transition-colors text-on-surface-variant" title="Edit">
                        <span className="material-symbols-outlined text-[20px]">edit</span>
                      </button>
                      <button className="p-2 rounded-lg hover:bg-error-container hover:text-error transition-colors text-on-surface-variant" title="Delete">
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between py-6">
            <p className="text-xs text-slate-500">Showing <span className="font-bold text-slate-900">1-4</span> of <span className="font-bold text-slate-900">32</span> rooms</p>
            <div className="flex gap-2">
              <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface-container text-outline hover:bg-surface-container-high transition-colors">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary text-white font-bold shadow-md">1</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface-container-lowest text-slate-600 hover:bg-surface-container transition-colors">2</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface-container-lowest text-slate-600 hover:bg-surface-container transition-colors">3</button>
              <span className="w-10 h-10 flex items-center justify-center text-slate-400">...</span>
              <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface-container-lowest text-slate-600 hover:bg-surface-container transition-colors">8</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface-container text-outline hover:bg-surface-container-high transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Branding Accent */}
      <div className="fixed bottom-10 right-10 z-50">
        <div className="bg-primary-container/80 backdrop-blur-xl p-4 rounded-full shadow-2xl border border-white/10 group cursor-pointer hover:scale-110 transition-transform">
          <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>support_agent</span>
        </div>
      </div>
    </div>
  );
}
