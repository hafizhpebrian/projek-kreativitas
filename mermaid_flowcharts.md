# 📊 Mermaid Flowcharts — SI-BOOK
**Sistem Informasi Booking Ruangan Meeting**

---

## 1. Sitemap & Navigasi Utama

```mermaid
graph TD
    subgraph PUBLIC["🌐 Public"]
        LOGIN["/login<br/>Halaman Login"]
    end

    subgraph AUTH["🔐 Authenticated"]
        direction TB

        subgraph USER_PAGES["👤 User Pages"]
            DASH_U["/dashboard<br/>Dashboard User"]
            ROOMS["/rooms<br/>Room Explorer"]
            ROOM_D["/rooms/:id<br/>Room Detail"]
            CAL["/calendar<br/>Booking Calendar"]
            BOOK["/booking/new<br/>Form Booking"]
            MY["/my-bookings<br/>Booking Saya"]
        end

        subgraph ADMIN_PAGES["🛡️ Admin Pages"]
            DASH_A["/admin<br/>Dashboard Admin"]
            ROOM_M["/admin/rooms<br/>Manajemen Ruangan"]
            ROOM_ADD["/admin/rooms/new<br/>Tambah Ruangan"]
            ROOM_EDIT["/admin/rooms/:id/edit<br/>Edit Ruangan"]
            ALL_BOOK["/admin/bookings<br/>Semua Reservasi"]
            REPORT_A["/admin/reports<br/>Laporan Admin"]
        end

        subgraph MGMT_PAGES["📈 Management Pages"]
            REPORT_M["/reports<br/>Dashboard Manajemen"]
            REPORT_U["/reports/usage<br/>Statistik Ruangan"]
            REPORT_AN["/reports/analytics<br/>Analitik Meeting"]
        end
    end

    LOGIN -->|"Login Success<br/>(Role: User)"| DASH_U
    LOGIN -->|"Login Success<br/>(Role: Admin)"| DASH_A
    LOGIN -->|"Login Success<br/>(Role: Management)"| REPORT_M

    DASH_U --> ROOMS
    DASH_U --> CAL
    DASH_U --> MY
    ROOMS --> ROOM_D
    ROOM_D -->|"Book Now"| BOOK
    CAL -->|"Klik Slot Kosong"| BOOK

    DASH_A --> ROOM_M
    DASH_A --> ALL_BOOK
    DASH_A --> REPORT_A
    ROOM_M --> ROOM_ADD
    ROOM_M --> ROOM_EDIT

    REPORT_M --> REPORT_U
    REPORT_M --> REPORT_AN

    style PUBLIC fill:#ffdad6,stroke:#93000a,color:#93000a
    style USER_PAGES fill:#d6e3ff,stroke:#002045,color:#002045
    style ADMIN_PAGES fill:#e0e3e5,stroke:#43474e,color:#43474e
    style MGMT_PAGES fill:#6ffbbe,stroke:#003e28,color:#003e28
```

---

## 2. Alur Login & Autentikasi

```mermaid
flowchart TD
    START((🚀 Start)) --> OPEN["User membuka<br/>SI-BOOK"]
    OPEN --> CHECK{"Token valid<br/>di localStorage?"}

    CHECK -->|Ya| ROLE_CHECK{"Cek Role<br/>User"}
    CHECK -->|Tidak| LOGIN_PAGE["Tampilkan<br/>Halaman Login"]

    LOGIN_PAGE --> INPUT["User input<br/>Email & Password"]
    INPUT --> VALIDATE{"Validasi<br/>Input"}

    VALIDATE -->|"Email kosong /<br/>format salah"| ERR_INPUT["❌ Tampilkan<br/>error validasi"]
    ERR_INPUT --> INPUT

    VALIDATE -->|Valid| API_CALL["📡 POST /api/auth/login"]
    API_CALL --> API_RESP{"Response<br/>Status?"}

    API_RESP -->|"401 Unauthorized"| ERR_AUTH["❌ Email atau password<br/>salah"]
    ERR_AUTH --> INPUT

    API_RESP -->|"429 Too Many"| ERR_RATE["⏳ Terlalu banyak percobaan<br/>Tunggu 60 detik"]
    ERR_RATE --> INPUT

    API_RESP -->|"200 OK"| SAVE["💾 Simpan Token<br/>& User Data"]
    SAVE --> ROLE_CHECK

    ROLE_CHECK -->|"role: user"| DASH_USER["🏠 Dashboard User"]
    ROLE_CHECK -->|"role: admin"| DASH_ADMIN["🛡️ Dashboard Admin"]
    ROLE_CHECK -->|"role: management"| DASH_MGMT["📈 Dashboard Management"]

    LOGIN_PAGE --> SSO{"Pilih SSO?"}
    SSO -->|Google| GOOGLE["🔗 Google OAuth"]
    SSO -->|Microsoft| MS["🔗 Microsoft OAuth"]
    GOOGLE --> SAVE
    MS --> SAVE

    style START fill:#003e28,stroke:#003e28,color:#fff
    style DASH_USER fill:#d6e3ff,stroke:#002045,color:#002045
    style DASH_ADMIN fill:#e0e3e5,stroke:#43474e,color:#002045
    style DASH_MGMT fill:#6ffbbe,stroke:#003e28,color:#003e28
    style ERR_INPUT fill:#ffdad6,stroke:#93000a,color:#93000a
    style ERR_AUTH fill:#ffdad6,stroke:#93000a,color:#93000a
    style ERR_RATE fill:#ffdad6,stroke:#93000a,color:#93000a
```

---

## 3. Alur Booking Ruangan (User Flow Utama)

```mermaid
flowchart TD
    START((📅 Mulai<br/>Booking)) --> ENTRY{"Masuk dari<br/>mana?"}

    ENTRY -->|"Dashboard ➜<br/>Quick Book"| SELECT_ROOM["Pilih Ruangan"]
    ENTRY -->|"Room Explorer ➜<br/>Book Now"| PRE_ROOM["Ruangan sudah<br/>terpilih otomatis"]
    ENTRY -->|"Calendar ➜<br/>Klik Slot Kosong"| PRE_SLOT["Ruangan & waktu<br/>terpilih otomatis"]
    ENTRY -->|"Sidebar ➜<br/>Booking Baru"| SELECT_ROOM

    SELECT_ROOM --> FORM["📝 Tampilkan<br/>Form Booking"]
    PRE_ROOM --> FORM
    PRE_SLOT --> FORM

    FORM --> FILL["User mengisi:<br/>• Judul Meeting<br/>• Jumlah Peserta<br/>• Tanggal<br/>• Jam Mulai & Selesai<br/>• Catatan (opsional)"]

    FILL --> PRIVACY{"🔒 Mode Privasi<br/>Judul Meeting?"}

    PRIVACY -->|"🌐 Publik"| SET_PUBLIC["Judul tampil normal<br/>di kalender bersama<br/>& notifikasi peserta"]
    PRIVACY -->|"🔒 Privat"| SET_PRIVATE["Judul disamarkan jadi<br/>'Ruangan Terpakai'<br/>untuk user lain.<br/>Hanya pemesan & peserta<br/>melihat judul asli"]
    PRIVACY -->|"👥 Hanya Peserta"| SET_PARTICIPANTS["Judul hanya terlihat oleh<br/>pemesan & peserta undangan.<br/>User lain melihat<br/>'Meeting Privat'"]

    SET_PUBLIC --> VALIDATE_FORM
    SET_PRIVATE --> VALIDATE_FORM
    SET_PARTICIPANTS --> VALIDATE_FORM

    VALIDATE_FORM{"Validasi<br/>Form"}

    VALIDATE_FORM -->|"Judul < 3 karakter"| ERR1["❌ Judul terlalu pendek"]
    VALIDATE_FORM -->|"Tanggal di masa lalu"| ERR2["❌ Tanggal tidak valid"]
    VALIDATE_FORM -->|"Jam selesai ≤ jam mulai"| ERR3["❌ Waktu tidak valid"]
    VALIDATE_FORM -->|"Peserta > kapasitas"| ERR4["❌ Melebihi kapasitas"]

    ERR1 --> FILL
    ERR2 --> FILL
    ERR3 --> FILL
    ERR4 --> FILL

    VALIDATE_FORM -->|"✅ Semua Valid"| CHECK_AVAIL["📡 Cek Ketersediaan<br/>API: GET /api/rooms/:id/availability"]

    CHECK_AVAIL --> AVAIL{"Slot<br/>Tersedia?"}

    AVAIL -->|"❌ Bentrok"| CONFLICT["⚠️ Tampilkan<br/>Conflict Alert"]
    CONFLICT --> SUGGEST["💡 Saran slot alternatif<br/>terdekat yang kosong"]
    SUGGEST --> FILL

    AVAIL -->|"✅ Kosong"| CONFIRM["Tampilkan<br/>Ringkasan Booking"]
    CONFIRM --> USER_CONFIRM{"User<br/>Konfirmasi?"}

    USER_CONFIRM -->|"Batal"| FILL
    USER_CONFIRM -->|"Konfirmasi"| API_BOOK["📡 POST /api/bookings"]

    API_BOOK --> BOOK_RESULT{"Booking<br/>Berhasil?"}

    BOOK_RESULT -->|"❌ Error"| ERR_SERVER["❌ Gagal menyimpan<br/>Coba lagi"]
    ERR_SERVER --> CONFIRM

    BOOK_RESULT -->|"✅ Sukses"| SUCCESS["✅ Booking Berhasil!"]
    SUCCESS --> NOTIFY["📧 Kirim Notifikasi<br/>• Email konfirmasi<br/>• Calendar invite<br/>• Reminder 15 menit"]
    NOTIFY --> REDIRECT["Redirect ke<br/>Booking Saya"]

    style START fill:#002045,stroke:#002045,color:#fff
    style SUCCESS fill:#003e28,stroke:#003e28,color:#fff
    style CONFLICT fill:#ffdad6,stroke:#93000a,color:#93000a
    style PRIVACY fill:#43474e,stroke:#43474e,color:#fff
    style SET_PRIVATE fill:#1a365d,stroke:#1a365d,color:#fff
    style SET_PARTICIPANTS fill:#1a365d,stroke:#1a365d,color:#fff
    style SET_PUBLIC fill:#d6e3ff,stroke:#002045,color:#002045
    style ERR1 fill:#ffdad6,stroke:#93000a,color:#93000a
    style ERR2 fill:#ffdad6,stroke:#93000a,color:#93000a
    style ERR3 fill:#ffdad6,stroke:#93000a,color:#93000a
    style ERR4 fill:#ffdad6,stroke:#93000a,color:#93000a
    style ERR_SERVER fill:#ffdad6,stroke:#93000a,color:#93000a
    style NOTIFY fill:#d6e3ff,stroke:#002045,color:#002045
```

---

## 4. Alur Pembatalan Booking

```mermaid
flowchart TD
    START((🗑️ Mulai)) --> MY_BOOK["Buka halaman<br/>Booking Saya"]
    MY_BOOK --> SELECT["Pilih booking<br/>yang akan dibatalkan"]
    SELECT --> CLICK["Klik tombol<br/>Batalkan"]
    CLICK --> MODAL["Modal Konfirmasi:<br/>'Anda yakin ingin<br/>membatalkan booking ini?'"]

    MODAL --> DECIDE{"User memilih?"}
    DECIDE -->|"Tidak, Kembali"| MY_BOOK
    DECIDE -->|"Ya, Batalkan"| CHECK_TIME{"Waktu meeting<br/>< 30 menit lagi?"}

    CHECK_TIME -->|Ya| WARNING["⚠️ Warning:<br/>'Meeting dimulai kurang<br/>dari 30 menit lagi.<br/>Tetap batalkan?'"]
    WARNING --> FINAL{"Konfirmasi<br/>Akhir?"}
    FINAL -->|Tidak| MY_BOOK
    FINAL -->|Ya| API_CANCEL

    CHECK_TIME -->|Tidak| API_CANCEL["📡 PATCH /api/bookings/:id<br/>status: cancelled"]

    API_CANCEL --> RESULT{"Berhasil?"}
    RESULT -->|"❌ Error"| ERR["❌ Gagal membatalkan"]
    ERR --> MY_BOOK
    RESULT -->|"✅ Sukses"| CANCELLED["✅ Booking Dibatalkan"]

    CANCELLED --> NOTIFY["📧 Notifikasi pembatalan<br/>ke semua peserta"]
    CANCELLED --> UPDATE["🔄 Update kalender:<br/>slot kembali tersedia"]
    NOTIFY --> DONE((✔️ Selesai))
    UPDATE --> DONE

    style START fill:#93000a,stroke:#93000a,color:#fff
    style CANCELLED fill:#003e28,stroke:#003e28,color:#fff
    style WARNING fill:#ffdad6,stroke:#93000a,color:#93000a
    style DONE fill:#003e28,stroke:#003e28,color:#fff
```

---

## 5. Alur CRUD Ruangan (Admin)

```mermaid
flowchart TD
    START((🏢 Mulai)) --> MANAGE["Buka halaman<br/>Manajemen Ruangan"]

    MANAGE --> ACTION{"Pilih Aksi"}

    ACTION -->|"➕ Tambah"| ADD_MODAL["Buka Modal<br/>Tambah Ruangan"]
    ACTION -->|"✏️ Edit"| EDIT_MODAL["Buka Modal<br/>Edit Ruangan"]
    ACTION -->|"🗑️ Hapus"| DEL_CONFIRM["Modal Konfirmasi<br/>Hapus"]
    ACTION -->|"🔍 Cari"| SEARCH["Filter & Search<br/>Tabel Ruangan"]

    SEARCH --> MANAGE

    ADD_MODAL --> FILL_ADD["Isi Data Ruangan:<br/>• Nama Ruangan<br/>• Lantai<br/>• Kapasitas<br/>• Fasilitas<br/>• Upload Foto"]
    FILL_ADD --> VALIDATE_ADD{"Validasi"}
    VALIDATE_ADD -->|"❌ Tidak Valid"| ERR_ADD["Tampilkan Error"]
    ERR_ADD --> FILL_ADD
    VALIDATE_ADD -->|"✅ Valid"| API_ADD["📡 POST /api/rooms"]
    API_ADD --> SUCCESS_ADD["✅ Ruangan Ditambahkan"]
    SUCCESS_ADD --> MANAGE

    EDIT_MODAL --> LOAD["📡 GET /api/rooms/:id<br/>Load data existing"]
    LOAD --> FILL_EDIT["Edit Data Ruangan"]
    FILL_EDIT --> VALIDATE_EDIT{"Validasi"}
    VALIDATE_EDIT -->|"❌ Tidak Valid"| ERR_EDIT["Tampilkan Error"]
    ERR_EDIT --> FILL_EDIT
    VALIDATE_EDIT -->|"✅ Valid"| API_EDIT["📡 PUT /api/rooms/:id"]
    API_EDIT --> SUCCESS_EDIT["✅ Ruangan Diperbarui"]
    SUCCESS_EDIT --> MANAGE

    DEL_CONFIRM --> DEL_DECIDE{"Konfirmasi?"}
    DEL_DECIDE -->|"Batal"| MANAGE
    DEL_DECIDE -->|"Hapus"| CHECK_BOOKING{"Ada booking<br/>aktif?"}
    CHECK_BOOKING -->|"Ya"| WARN_DEL["⚠️ Warning:<br/>'Ruangan ini memiliki<br/>X booking aktif.<br/>Semua akan dibatalkan.'"]
    WARN_DEL --> FORCE{"Force delete?"}
    FORCE -->|"Batal"| MANAGE
    FORCE -->|"Hapus paksa"| API_DEL
    CHECK_BOOKING -->|"Tidak"| API_DEL["📡 DELETE /api/rooms/:id"]
    API_DEL --> SUCCESS_DEL["✅ Ruangan Dihapus"]
    SUCCESS_DEL --> MANAGE

    style START fill:#002045,stroke:#002045,color:#fff
    style SUCCESS_ADD fill:#003e28,stroke:#003e28,color:#fff
    style SUCCESS_EDIT fill:#003e28,stroke:#003e28,color:#fff
    style SUCCESS_DEL fill:#003e28,stroke:#003e28,color:#fff
    style WARN_DEL fill:#ffdad6,stroke:#93000a,color:#93000a
```

---

## 6. Alur Melihat Ketersediaan & Kalender

```mermaid
flowchart TD
    START((📅 Start)) --> CAL_PAGE["Buka Halaman<br/>Kalender Booking"]

    CAL_PAGE --> LOAD["📡 Load Events<br/>GET /api/bookings?<br/>month=current"]

    LOAD --> VIEW["Tampilkan Kalender<br/>(Default: Week View)"]

    VIEW --> USER_ACT{"User Action"}

    USER_ACT -->|"Navigasi Bulan<br/>← →"| CHANGE_MONTH["Update periode"]
    CHANGE_MONTH --> LOAD

    USER_ACT -->|"Ganti View"| SWITCH{"Pilih View"}
    SWITCH -->|"Hari"| DAY_VIEW["📋 Day View<br/>Timeline per jam"]
    SWITCH -->|"Minggu"| WEEK_VIEW["📋 Week View<br/>Grid 7 hari × ruangan"]
    SWITCH -->|"Bulan"| MONTH_VIEW["📋 Month View<br/>Kalender tradisional"]
    DAY_VIEW --> VIEW
    WEEK_VIEW --> VIEW
    MONTH_VIEW --> VIEW

    USER_ACT -->|"Hover Event"| CHECK_PRIVACY{"🔒 Meeting<br/>Privat?"}
    CHECK_PRIVACY -->|"🌐 Publik"| POPOVER["📌 Popover Detail:<br/>• Judul Meeting<br/>• Nama Pemesan<br/>• Waktu<br/>• Jumlah Peserta"]
    CHECK_PRIVACY -->|"🔒 Privat &<br/>bukan pemesan"| POPOVER_PRIVATE["📌 Popover:<br/>• 'Ruangan Terpakai'<br/>• Waktu<br/>• ── judul tersembunyi ──"]
    CHECK_PRIVACY -->|"🔒 Privat &<br/>adalah pemesan/peserta"| POPOVER
    POPOVER --> VIEW
    POPOVER_PRIVATE --> VIEW

    USER_ACT -->|"Klik Slot Kosong"| QUICK_BOOK["⚡ Quick Book:<br/>Pre-fill ruangan<br/>& waktu ke form"]
    QUICK_BOOK --> BOOKING_FORM["Redirect ke<br/>Form Booking"]

    USER_ACT -->|"Klik Event Sendiri"| DETAIL["📋 Detail Booking<br/>+ opsi Edit/Batal"]
    DETAIL --> EDIT_OR_CANCEL{"Aksi?"}
    EDIT_OR_CANCEL -->|"Edit"| BOOKING_FORM
    EDIT_OR_CANCEL -->|"Batal"| CANCEL_FLOW["Alur Pembatalan"]
    EDIT_OR_CANCEL -->|"Tutup"| VIEW

    USER_ACT -->|"Filter Ruangan"| FILTER["Pilih ruangan<br/>tertentu"]
    FILTER --> LOAD

    style START fill:#002045,stroke:#002045,color:#fff
    style QUICK_BOOK fill:#d6e3ff,stroke:#002045,color:#002045
    style POPOVER fill:#e0e3e5,stroke:#43474e,color:#43474e
    style POPOVER_PRIVATE fill:#1a365d,stroke:#1a365d,color:#fff
    style CHECK_PRIVACY fill:#43474e,stroke:#43474e,color:#fff
```

---

## 7. Alur Notifikasi & Reminder

```mermaid
flowchart TD
    TRIGGER{"🔔 Trigger<br/>Notifikasi"} --> TYPE{"Tipe Event?"}

    TYPE -->|"Booking Baru"| CHECK_PRIV_NOTIF{"🔒 Mode<br/>Privasi?"}
    CHECK_PRIV_NOTIF -->|"🌐 Publik"| N_NEW["📧 Email Konfirmasi<br/>Judul: tampil lengkap"]
    CHECK_PRIV_NOTIF -->|"🔒 Privat"| N_NEW_PRIV["📧 Email Konfirmasi<br/>Judul: hanya ke pemesan<br/>& peserta undangan"]
    TYPE -->|"Booking Dibatalkan"| N_CANCEL["📧 Email Pembatalan"]
    TYPE -->|"Booking Diedit"| N_EDIT["📧 Email Perubahan"]
    TYPE -->|"Reminder 15 menit"| N_REMIND["⏰ Reminder"]

    N_NEW --> CHANNEL
    N_NEW_PRIV --> CHANNEL
    N_CANCEL --> CHANNEL
    N_EDIT --> CHANNEL
    N_REMIND --> CHANNEL

    CHANNEL{"Channel<br/>Pengiriman"} --> EMAIL["📧 Email<br/>(SMTP)"]
    CHANNEL --> WA["📱 WhatsApp<br/>(Gateway API)"]
    CHANNEL --> IN_APP["🔔 In-App<br/>Notification"]
    CHANNEL --> GCAL["📅 Google<br/>Calendar Invite"]

    EMAIL --> RECIPIENT
    WA --> RECIPIENT
    IN_APP --> RECIPIENT
    GCAL --> RECIPIENT

    RECIPIENT{"Penerima"} --> BOOKER["👤 Pemesan"]
    RECIPIENT --> PARTICIPANTS["👥 Peserta<br/>(jika ada email)"]
    RECIPIENT --> ADMIN_NOTIF["🛡️ Admin<br/>(untuk pembatalan)"]

    subgraph REMINDER_SCHEDULER["⏰ Reminder Scheduler"]
        CRON["Cron Job<br/>setiap 5 menit"] --> CHECK["Cek booking<br/>T-15 menit"]
        CHECK --> FOUND{"Ada booking<br/>dimulai 15 mnt?"}
        FOUND -->|Ya| N_REMIND
        FOUND -->|Tidak| WAIT["Tunggu 5 menit"]
        WAIT --> CRON
    end

    style TRIGGER fill:#002045,stroke:#002045,color:#fff
    style EMAIL fill:#d6e3ff,stroke:#002045,color:#002045
    style WA fill:#003e28,stroke:#003e28,color:#fff
    style IN_APP fill:#e0e3e5,stroke:#43474e,color:#43474e
    style GCAL fill:#d6e3ff,stroke:#002045,color:#002045
```

---

## 8. Alur Laporan & Export

```mermaid
flowchart TD
    START((📈 Start)) --> REPORT_PAGE["Buka Halaman<br/>Laporan & Analitik"]

    REPORT_PAGE --> SELECT_PERIOD["Pilih Periode<br/>(Date Range Picker)"]

    SELECT_PERIOD --> LOAD_DATA["📡 GET /api/reports<br/>?from=...&to=..."]

    LOAD_DATA --> DISPLAY["Tampilkan Data"]

    DISPLAY --> CHARTS["📊 Render Charts:<br/>• Tren Penggunaan (Area)<br/>• Utilisasi per Ruangan (Bar)<br/>• Booking per Departemen (Pie)<br/>• Ruangan Terpopuler (Ranking)"]

    DISPLAY --> KPI["📋 Render KPI Cards:<br/>• Tingkat Utilisasi (%)<br/>• Durasi Rata-rata<br/>• Total Booking<br/>• Unique Users"]

    CHARTS --> USER_ACT{"User Action?"}
    KPI --> USER_ACT

    USER_ACT -->|"Ganti Periode"| SELECT_PERIOD

    USER_ACT -->|"Export"| EXPORT_TYPE{"Format<br/>Export?"}
    EXPORT_TYPE -->|"Excel"| GEN_EXCEL["📄 Generate XLSX<br/>dengan data tabel"]
    EXPORT_TYPE -->|"PDF"| GEN_PDF["📄 Generate PDF<br/>dengan charts + tabel"]
    GEN_EXCEL --> DOWNLOAD["📥 Download File"]
    GEN_PDF --> DOWNLOAD

    USER_ACT -->|"Drill Down"| DRILL["Klik chart/ranking<br/>untuk detail"]
    DRILL --> DETAIL_VIEW["Tampilkan detail:<br/>Booking list per ruangan<br/>atau per departemen"]
    DETAIL_VIEW --> USER_ACT

    style START fill:#002045,stroke:#002045,color:#fff
    style DOWNLOAD fill:#003e28,stroke:#003e28,color:#fff
    style CHARTS fill:#d6e3ff,stroke:#002045,color:#002045
    style KPI fill:#d6e3ff,stroke:#002045,color:#002045
```

---

## 9. Component Hierarchy (Arsitektur Komponen)

```mermaid
graph TD
    APP["🏗️ App.jsx<br/>(Router + Providers)"]

    APP --> AUTH_PROVIDER["🔐 AuthProvider"]
    APP --> THEME_PROVIDER["🎨 ThemeProvider"]

    AUTH_PROVIDER --> ROUTES["React Router"]

    ROUTES --> PUBLIC_ROUTE["Public Route"]
    ROUTES --> PROTECTED_ROUTE["Protected Route<br/>(Auth Guard)"]

    PUBLIC_ROUTE --> LOGIN_PAGE["LoginPage"]
    LOGIN_PAGE --> LOGIN_HERO["LoginHero"]
    LOGIN_PAGE --> LOGIN_FORM["LoginForm"]

    PROTECTED_ROUTE --> APP_SHELL["🏛️ AppShell"]

    APP_SHELL --> SIDEBAR["Sidebar<br/>(Glassmorphism)"]
    APP_SHELL --> TOP_BAR["TopBar<br/>(Search + Profile)"]
    APP_SHELL --> CONTENT["ContentArea<br/>(Outlet)"]

    SIDEBAR --> NAV_ITEM["NavItem × N"]
    TOP_BAR --> SEARCH_BAR["SearchBar"]
    TOP_BAR --> NOTIF_BELL["NotificationBell"]
    TOP_BAR --> PROFILE_MENU["ProfileMenu"]

    CONTENT --> DASH_PAGE["DashboardPage"]
    CONTENT --> ROOM_PAGE["RoomExplorerPage"]
    CONTENT --> CAL_PAGE["CalendarPage"]
    CONTENT --> BOOK_PAGE["BookingFormPage"]
    CONTENT --> MY_PAGE["MyBookingsPage"]
    CONTENT --> ADMIN_PAGE["AdminDashboardPage"]
    CONTENT --> MGMT_PAGE["RoomManagementPage"]
    CONTENT --> RPT_PAGE["ReportsPage"]

    DASH_PAGE --> STAT_CARD["StatCard × 3"]
    DASH_PAGE --> UPCOMING["UpcomingBookings"]
    DASH_PAGE --> MINI_CAL["MiniCalendar"]
    DASH_PAGE --> POP_ROOMS["PopularRooms"]

    ROOM_PAGE --> ROOM_CARD["RoomCard × N"]
    ROOM_PAGE --> FILTER_BAR["FilterBar"]

    CAL_PAGE --> FULL_CAL["BookingCalendar<br/>(FullCalendar)"]
    CAL_PAGE --> EVENT_POP["EventPopover"]

    BOOK_PAGE --> BOOKING_FORM["BookingForm"]
    BOOKING_FORM --> ROOM_SEL["RoomSelector"]
    BOOKING_FORM --> DATE_PICK["DatePicker"]
    BOOKING_FORM --> TIME_RANGE["TimeRangePicker"]
    BOOKING_FORM --> TIMELINE["AvailabilityTimeline"]
    BOOKING_FORM --> CONFLICT["ConflictAlert"]

    MY_PAGE --> TAB_FILTER["BookingTabFilter"]
    MY_PAGE --> BOOK_ITEM["BookingListItem × N"]

    style APP fill:#002045,stroke:#002045,color:#fff
    style APP_SHELL fill:#1a365d,stroke:#1a365d,color:#fff
    style SIDEBAR fill:#43474e,stroke:#43474e,color:#fff
    style TOP_BAR fill:#43474e,stroke:#43474e,color:#fff
```

---

## 10. State Management Flow

```mermaid
flowchart LR
    subgraph CONTEXTS["React Contexts"]
        AUTH["🔐 AuthContext<br/>• user<br/>• token<br/>• role<br/>• login()<br/>• logout()"]
        BOOKING["📅 BookingContext<br/>• bookings[]<br/>• selectedRoom<br/>• dateRange<br/>• create()<br/>• cancel()<br/>• update()"]
        THEME["🎨 ThemeContext<br/>• mode (light/dark)<br/>• toggle()"]
    end

    subgraph HOOKS["Custom Hooks"]
        USE_AUTH["useAuth()"]
        USE_ROOMS["useRooms()"]
        USE_BOOKINGS["useBookings()"]
        USE_MEDIA["useMediaQuery()"]
    end

    subgraph SERVICES["API Services"]
        AUTH_SVC["authService<br/>• login()<br/>• register()<br/>• refresh()"]
        ROOM_SVC["roomService<br/>• getAll()<br/>• getById()<br/>• create()<br/>• update()<br/>• delete()"]
        BOOK_SVC["bookingService<br/>• getAll()<br/>• getMine()<br/>• create()<br/>• cancel()<br/>• checkAvailability()"]
        RPT_SVC["reportService<br/>• getUsage()<br/>• getTrends()<br/>• export()"]
    end

    subgraph API["Axios Instance"]
        AXIOS["api.js<br/>• baseURL<br/>• interceptors<br/>  (auth token,<br/>   error handling)"]
    end

    AUTH --> USE_AUTH
    BOOKING --> USE_BOOKINGS
    THEME --> USE_MEDIA

    USE_AUTH --> AUTH_SVC
    USE_ROOMS --> ROOM_SVC
    USE_BOOKINGS --> BOOK_SVC

    AUTH_SVC --> AXIOS
    ROOM_SVC --> AXIOS
    BOOK_SVC --> AXIOS
    RPT_SVC --> AXIOS

    AXIOS -->|"HTTP"| BACKEND["🖥️ Backend API<br/>(Laravel / Node.js)"]

    style CONTEXTS fill:#d6e3ff,stroke:#002045,color:#002045
    style HOOKS fill:#e0e3e5,stroke:#43474e,color:#43474e
    style SERVICES fill:#f1f4f6,stroke:#74777f,color:#43474e
    style BACKEND fill:#002045,stroke:#002045,color:#fff
```

---

## 11. Role-Based Access Control (RBAC)

```mermaid
flowchart TD
    REQUEST["🌐 User Request<br/>ke Protected Route"] --> GUARD["🛡️ Auth Guard<br/>(ProtectedRoute Component)"]

    GUARD --> HAS_TOKEN{"Token<br/>ada?"}

    HAS_TOKEN -->|Tidak| REDIRECT_LOGIN["↩️ Redirect ke /login"]

    HAS_TOKEN -->|Ya| VERIFY["📡 Verify Token<br/>GET /api/auth/me"]

    VERIFY --> VALID{"Token<br/>Valid?"}
    VALID -->|Tidak| REFRESH["🔄 Refresh Token"]
    REFRESH --> STILL_INVALID{"Masih<br/>Invalid?"}
    STILL_INVALID -->|Ya| REDIRECT_LOGIN
    STILL_INVALID -->|Tidak| CHECK_ROLE

    VALID -->|Ya| CHECK_ROLE{"Cek Role<br/>vs Required Role"}

    CHECK_ROLE -->|"✅ Authorized"| RENDER["✅ Render Page"]

    CHECK_ROLE -->|"❌ Forbidden"| FORBIDDEN["🚫 403 Forbidden<br/>Redirect ke Dashboard<br/>sesuai role"]

    subgraph ROLES["Role Permissions"]
        USER_ROLE["👤 User<br/>───────────<br/>✅ Dashboard User<br/>✅ Room Explorer<br/>✅ Room Detail<br/>✅ Calendar<br/>✅ Booking Form<br/>✅ My Bookings<br/>❌ Admin Pages<br/>❌ Reports"]

        ADMIN_ROLE["🛡️ Admin<br/>───────────<br/>✅ All User Pages<br/>✅ Admin Dashboard<br/>✅ Room Management<br/>✅ All Bookings<br/>✅ Reports<br/>✅ Cancel Any Booking"]

        MGMT_ROLE["📈 Management<br/>───────────<br/>✅ Reports Dashboard<br/>✅ Usage Statistics<br/>✅ Analytics<br/>✅ Export Data<br/>❌ Booking CRUD<br/>❌ Room CRUD"]
    end

    style REDIRECT_LOGIN fill:#ffdad6,stroke:#93000a,color:#93000a
    style FORBIDDEN fill:#ffdad6,stroke:#93000a,color:#93000a
    style RENDER fill:#003e28,stroke:#003e28,color:#fff
    style USER_ROLE fill:#d6e3ff,stroke:#002045,color:#002045
    style ADMIN_ROLE fill:#e0e3e5,stroke:#43474e,color:#002045
    style MGMT_ROLE fill:#6ffbbe,stroke:#003e28,color:#003e28
```

---

## 12. Responsive Layout Adaptation

```mermaid
flowchart TD
    VIEWPORT["📐 Detect Viewport Width"] --> BP{"Breakpoint?"}

    BP -->|"< 768px<br/>📱 Mobile"| MOBILE
    BP -->|"768 - 1024px<br/>📱 Tablet"| TABLET
    BP -->|"> 1024px<br/>🖥️ Desktop"| DESKTOP

    subgraph MOBILE["📱 Mobile Layout"]
        M1["Sidebar → Bottom Nav (4 items)"]
        M2["Grid → Single Column"]
        M3["Calendar → Day View default"]
        M4["Table → Card-based view"]
        M5["Room Cards → Horizontal Scroll"]
        M6["FAB → Fixed bottom-right"]
        M7["Hamburger → Full menu drawer"]
    end

    subgraph TABLET["📱 Tablet Layout"]
        T1["Sidebar → Collapsed (icon-only, 64px)"]
        T2["Grid → 2 Column"]
        T3["Calendar → Week View"]
        T4["Table → Scrollable horizontal"]
        T5["Room Cards → 2 per row"]
        T6["Sidebar expand on hover"]
    end

    subgraph DESKTOP["🖥️ Desktop Layout"]
        D1["Sidebar → Full (260px, fixed)"]
        D2["Grid → 3 Column"]
        D3["Calendar → Week View"]
        D4["Table → Full width"]
        D5["Room Cards → 3 per row"]
        D6["Side panels & previews"]
    end

    style MOBILE fill:#ffdad6,stroke:#93000a,color:#93000a
    style TABLET fill:#d6e3ff,stroke:#002045,color:#002045
    style DESKTOP fill:#003e28,stroke:#003e28,color:#fff
```

---

> [!TIP]
> **Cara menggunakan diagram ini:**
> - Diagram #2 dan #3 adalah **core user flows** — gunakan sebagai basis untuk development
> - Diagram #9 dan #10 adalah **arsitektur teknis** — gunakan sebagai panduan struktur kode
> - Diagram #11 adalah **security reference** — implementasikan di `ProtectedRoute` component
