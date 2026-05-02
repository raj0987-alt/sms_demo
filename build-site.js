const fs = require("fs");
const path = require("path");

const root = __dirname;
const pagesDir = path.join(root, "pages");
const cssDir = path.join(root, "css");
const jsDir = path.join(root, "js");

for (const dir of [pagesDir, cssDir, jsDir]) fs.mkdirSync(dir, { recursive: true });

const navGroups = [
  ["Overview", [["Dashboard", "index.html", "dashboard"]]],
  ["Students", [
    ["Admission Entry", "pages/admission-entry.html", "admission"],
    ["Student List", "pages/student-list.html", "students"],
    ["Inactive Students", "pages/inactive-students.html", "inactive"],
    ["Student Profile", "pages/student-profile.html", "student-profile"],
    ["Student ID Card", "pages/student-id-card.html", "id-card"],
  ]],
  ["Teachers", [
    ["Teacher List", "pages/teacher-list.html", "teachers"],
    ["Teacher Profile", "pages/teacher-profile.html", "teacher-profile"],
    ["Assign Subject", "pages/assign-subject.html", "assign-subject"],
  ]],
  ["Operations", [
    ["Attendance", "pages/attendance.html", "attendance"],
    ["Fee Collection", "pages/fee-collection.html", "fees"],
    ["Fee History", "pages/fee-history.html", "fee-history"],
    ["Class Routine", "pages/class-routine.html", "routine"],
    ["Routine List", "pages/routine-list.html", "routine-list"],
  ]],
  ["Academics", [
    ["Exam Schedule", "pages/exam-schedule.html", "exam"],
    ["Admit Card", "pages/admit-card.html", "admit-card"],
    ["Marks Entry", "pages/marks-entry.html", "marks"],
    ["Result", "pages/result.html", "result"],
    ["Grade System", "pages/grade-system.html", "grades"],
    ["Mark Distribution", "pages/mark-distribution.html", "distribution"],
  ]],
  ["Front Office", [
    ["Admission Enquiry", "pages/admission-enquiry.html", "enquiry"],
    ["Complain", "pages/complain.html", "complain"],
  ]],
  ["Resources", [
    ["Library", "pages/library.html", "library"],
    ["Transport", "pages/transport.html", "transport"],
    ["Inventory", "pages/inventory.html", "inventory"],
    ["Reports", "pages/reports.html", "reports"],
    ["Settings", "pages/settings.html", "settings"],
  ]],
];

const icons = {
  dashboard: "grid", admission: "spark", students: "users", inactive: "pause", "student-profile": "user", "id-card": "card",
  teachers: "briefcase", "teacher-profile": "user", "assign-subject": "book", attendance: "check", fees: "wallet",
  "fee-history": "clock", routine: "calendar", "routine-list": "list", exam: "calendar", "admit-card": "ticket",
  marks: "edit", result: "award", grades: "layers", distribution: "bars", enquiry: "message", complain: "alert",
  library: "book", transport: "bus", inventory: "box", reports: "chart", settings: "settings",
};

function icon(name) {
  const paths = {
    grid: '<path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z"/>',
    spark: '<path d="M12 2l1.9 6.1L20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.9z"/><path d="M5 18l.8 2.2L8 21l-2.2.8L5 24l-.8-2.2L2 21l2.2-.8z"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    pause: '<path d="M8 5v14M16 5v14"/>',
    user: '<path d="M20 21a8 8 0 1 0-16 0"/><circle cx="12" cy="7" r="4"/>',
    card: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M7 9h4M7 13h10M7 16h6"/>',
    briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H21"/><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H21v20H6.5A2.5 2.5 0 0 1 4 19.5z"/>',
    check: '<path d="M20 6L9 17l-5-5"/>',
    wallet: '<path d="M3 7a3 3 0 0 1 3-3h13v16H6a3 3 0 0 1-3-3z"/><path d="M16 12h5v4h-5a2 2 0 0 1 0-4z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    calendar: '<rect x="3" y="4" width="18" height="17" rx="3"/><path d="M8 2v4M16 2v4M3 10h18"/>',
    list: '<path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/>',
    ticket: '<path d="M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3a2 2 0 0 0 0-4z"/><path d="M13 6v12"/>',
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    award: '<circle cx="12" cy="8" r="6"/><path d="M8.5 13L7 22l5-3 5 3-1.5-9"/>',
    layers: '<path d="M12 2L2 7l10 5 10-5z"/><path d="M2 12l10 5 10-5"/><path d="M2 17l10 5 10-5"/>',
    bars: '<path d="M4 20V10M10 20V4M16 20v-7M22 20V8"/>',
    message: '<path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/>',
    alert: '<path d="M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
    bus: '<path d="M6 17H4a2 2 0 0 1-2-2V7a5 5 0 0 1 5-5h10a5 5 0 0 1 5 5v8a2 2 0 0 1-2 2h-2"/><path d="M6 17a2 2 0 1 0 4 0M14 17a2 2 0 1 0 4 0M2 10h20M7 6h10"/>',
    box: '<path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7z"/><path d="M3.3 7L12 12l8.7-5M12 22V12"/>',
    chart: '<path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-7"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1A2 2 0 1 1 4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1A2 2 0 1 1 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3h.1a1.7 1.7 0 0 0 1-1.6V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.6h.1a1.7 1.7 0 0 0 1.9-.3l.1-.1A2 2 0 1 1 19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9v.1a1.7 1.7 0 0 0 1.6 1h.1a2 2 0 1 1 0 4H21a1.7 1.7 0 0 0-1.6 1z"/>',
  };
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${paths[name] || paths.grid}</svg>`;
}

function nav(active, depth) {
  return navGroups.map(([label, items]) => `
    <div class="nav-group">
      <p>${label}</p>
      ${items.map(([title, href, key]) => {
        const target = depth ? href.replace(/^pages\//, "") : href;
        const fixed = depth && !href.startsWith("pages/") ? `../${href}` : target;
        return `<a class="nav-link ${key === active ? "active" : ""}" href="${fixed}">${icon(icons[key])}<span>${title}</span></a>`;
      }).join("")}
    </div>`).join("");
}

function layout({ title, kicker, active, body, depth = false, wide = false }) {
  const cssPath = depth ? "../css/styles.css" : "css/styles.css";
  const jsPath = depth ? "../js/app.js" : "js/app.js";
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | Nova School OS</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${cssPath}">
</head>
<body>
  <div class="aurora aurora-a"></div>
  <div class="aurora aurora-b"></div>
  <aside class="sidebar" id="sidebar">
    <a class="brand" href="${depth ? "../index.html" : "index.html"}" aria-label="Nova School OS dashboard">
      <span class="brand-mark">N</span>
      <span class="brand-copy"><strong>Nova School</strong><small>Operating System</small></span>
    </a>
    <nav>${nav(active, depth)}</nav>
  </aside>
  <div class="shell ${wide ? "shell-wide" : ""}">
    <header class="topbar">
      <button class="icon-button menu-toggle" type="button" data-sidebar-toggle aria-label="Toggle navigation">${icon("list")}</button>
      <div class="search-field">${icon("chart")}<input type="search" placeholder="Search students, invoices, classes..."></div>
      <div class="topbar-actions">
        <button class="icon-button" type="button" aria-label="Notifications">${icon("alert")}<span class="pulse-dot"></span></button>
        <button class="profile-chip" type="button"><span class="avatar">AR</span><span>Admin</span></button>
      </div>
    </header>
    <main class="content">
      <section class="page-hero">
        <div>
          <p class="eyebrow">${kicker}</p>
          <h1>${title}</h1>
        </div>
        <div class="hero-actions">
          <button class="btn ghost" type="button">${icon("calendar")} This Session</button>
          <button class="btn primary" type="button">${icon("spark")} Create</button>
        </div>
      </section>
      ${body}
    </main>
  </div>
  <div class="sidebar-scrim" data-sidebar-toggle></div>
  <script src="${jsPath}"></script>
</body>
</html>`;
}

const statCards = (items) => `<section class="stats-grid">${items.map((it) => `
  <article class="stat-card ${it.tone || ""}">
    <div class="stat-icon">${icon(it.icon || "chart")}</div>
    <p>${it.label}</p>
    <strong>${it.value}</strong>
    <span>${it.meta}</span>
  </article>`).join("")}</section>`;

const table = (headers, rows) => `<div class="table-wrap"><table><thead><tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;

const filters = (items = ["Class", "Section", "Session", "Status"]) => `<section class="toolbar-card">
  <div class="search-field compact">${icon("chart")}<input type="search" placeholder="Search records"></div>
  ${items.map((item) => `<label class="select-field"><span>${item}</span><select><option>All ${item}</option><option>Morning</option><option>Science</option></select></label>`).join("")}
  <button class="btn primary" type="button">${icon("check")} Apply</button>
</section>`;

const badge = (label, type = "success") => `<span class="badge ${type}">${label}</span>`;

const studentRows = [
  ["#ST-2048", "Aarav Rahman", "Class 8", "A", badge("Active"), "94%"],
  ["#ST-2049", "Nadia Islam", "Class 7", "B", badge("Active"), "98%"],
  ["#ST-2050", "Rayan Chowdhury", "Class 9", "A", badge("Inactive", "danger"), "61%"],
  ["#ST-2051", "Mira Sen", "Class 6", "C", badge("Active"), "89%"],
];

const teacherRows = [
  ["#TC-110", "Sarah Ahmed", "Mathematics", "Class 9", badge("Available"), "8 yrs"],
  ["#TC-111", "Imran Hossain", "Physics", "Class 10", badge("In Class", "warning"), "6 yrs"],
  ["#TC-112", "Nusrat Jahan", "English", "Class 8", badge("Available"), "5 yrs"],
];

const dashboard = layout({
  title: "Executive Dashboard",
  kicker: "Live school intelligence",
  active: "dashboard",
  body: `
  ${statCards([
    { label: "Total Students", value: "2,846", meta: "+12.4% from last term", icon: "users", tone: "indigo" },
    { label: "Total Teachers", value: "184", meta: "18 departments covered", icon: "briefcase", tone: "cyan" },
    { label: "Total Income", value: "$128.4k", meta: "Fees, grants, events", icon: "wallet", tone: "green" },
    { label: "Total Expenses", value: "$42.7k", meta: "Optimized by 8.2%", icon: "bars", tone: "amber" },
  ])}
  <section class="dashboard-grid">
    <article class="panel chart-panel">
      <div class="panel-head"><div><p class="eyebrow">Finance</p><h2>Income vs Expense</h2></div>${badge("Healthy")}</div>
      <div class="bar-chart" aria-label="Income and expense chart">
        ${["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((m, i) => `<div class="bar-pair"><span class="bar income h${i + 4}"></span><span class="bar expense h${i + 2}"></span><small>${m}</small></div>`).join("")}
      </div>
      <div class="legend"><span><i class="income-dot"></i>Income</span><span><i class="expense-dot"></i>Expense</span></div>
    </article>
    <article class="panel attendance-panel">
      <div class="panel-head"><div><p class="eyebrow">Today</p><h2>Attendance</h2></div>${badge("92%", "warning")}</div>
      <div class="progress-orbit progress-92"><span>92%</span></div>
      <div class="mini-grid"><div><strong>2,617</strong><span>Present</span></div><div><strong>229</strong><span>Absent</span></div></div>
    </article>
    <article class="panel">
      <div class="panel-head"><div><p class="eyebrow">Activity</p><h2>Recent Activities</h2></div></div>
      <ul class="activity-list">
        <li><span></span><div><strong>New admission approved</strong><small>Class 6, Science track</small></div></li>
        <li><span></span><div><strong>Monthly fee batch closed</strong><small>734 receipts generated</small></div></li>
        <li><span></span><div><strong>Exam routine published</strong><small>Midterm schedule is live</small></div></li>
      </ul>
    </article>
    <article class="panel notice-panel">
      <div class="panel-head"><div><p class="eyebrow">Broadcast</p><h2>Notice Board</h2></div></div>
      <div class="notice-card"><strong>Science fair registration closes Friday</strong><p>Students from classes 6-10 can submit project abstracts from the portal.</p></div>
      <div class="notice-card muted"><strong>Parent meeting</strong><p>Class 8 guardian conference starts at 10:00 AM in the seminar hall.</p></div>
    </article>
  </section>`,
});

const admission = layout({ title: "Admission Entry", kicker: "Multi-step onboarding", active: "admission", depth: true, body: `
  <section class="stepper">${["Student", "Guardian", "Academic", "Documents"].map((s, i) => `<div class="step ${i === 0 ? "active" : ""}"><span>${i + 1}</span><strong>${s}</strong></div>`).join("")}</section>
  <section class="form-grid panel">
    ${["Student Name", "Birth Certificate No", "Date of Birth", "Class Applying For", "Guardian Name", "Guardian Phone", "Previous School", "Address"].map((l) => `<label><span>${l}</span><input type="text" placeholder="${l}"></label>`).join("")}
    <label class="wide"><span>Admission Notes</span><textarea placeholder="Scholarship, transport, medical notes"></textarea></label>
  </section>`});

const studentList = layout({ title: "Student List", kicker: "Search, filter, and switch views", active: "students", depth: true, body: `
  ${filters()}
  <section class="view-switch"><button class="seg active" data-view="table">Table</button><button class="seg" data-view="cards">Cards</button></section>
  <section class="view-pane table-view active">${table(["ID", "Name", "Class", "Section", "Status", "Attendance"], studentRows)}</section>
  <section class="view-pane card-view people-grid">${studentRows.map((r) => `<article class="person-card"><span class="avatar big">${r[1].split(" ").map(x=>x[0]).join("").slice(0,2)}</span><h3>${r[1]}</h3><p>${r[2]} / Section ${r[3]}</p>${r[4]}<div class="metric-line"><span>Attendance</span><strong>${r[5]}</strong></div></article>`).join("")}</section>`});

const inactiveStudents = layout({ title: "Inactive Students", kicker: "Retention and follow-up queue", active: "inactive", depth: true, body: `
  ${filters(["Class", "Reason", "Last Seen"])}
  ${table(["ID", "Name", "Class", "Reason", "Status", "Action"], [
    ["#ST-1884", "Samin Noor", "Class 8", "Fee Due", badge("Inactive", "danger"), "<button class='btn tiny'>Follow up</button>"],
    ["#ST-1921", "Anika Roy", "Class 5", "Transfer Pending", badge("Inactive", "danger"), "<button class='btn tiny'>Review</button>"],
  ])}
  <div class="empty-state"><div>${icon("users")}</div><h3>No hidden records</h3><p>Filtered inactive records will appear here.</p></div>`});

const studentProfile = layout({ title: "Student Profile", kicker: "Unified student timeline", active: "student-profile", depth: true, body: `
  <section class="profile-layout">
    <aside class="profile-card panel"><span class="avatar xl">NR</span><h2>Nadia Rahman</h2><p>Class 7 / Section B</p>${badge("Active")}<div class="profile-stats"><div><strong>98%</strong><span>Attendance</span></div><div><strong>3.92</strong><span>GPA</span></div></div></aside>
    <div class="panel">${table(["Metric", "Value", "Updated"], [["Guardian", "Farhan Rahman", "Today"], ["Blood Group", "O+", "Jan 12"], ["Transport", "Route 04", "Mar 09"], ["Fee Status", badge("Paid"), "Apr 30"]])}</div>
  </section>`});

const studentId = layout({ title: "Student ID Card", kicker: "Print-ready identity card", active: "id-card", depth: true, body: `
  <section class="id-stage">
    <article class="id-card-print"><div class="id-top"><span class="brand-mark">N</span><strong>Nova School</strong></div><span class="avatar xl">AR</span><h2>Aarav Rahman</h2><p>Class 8 / Section A</p><div class="id-code"></div><dl><dt>ID</dt><dd>ST-2048</dd><dt>Session</dt><dd>2026</dd><dt>Phone</dt><dd>+880 1700 000000</dd></dl></article>
    <button class="btn primary print-button" type="button" data-print>${icon("card")} Print Card</button>
  </section>`});

const teacherList = layout({ title: "Teacher List", kicker: "Faculty directory", active: "teachers", depth: true, body: `${filters(["Department", "Subject", "Status"])}${table(["ID", "Name", "Subject", "Assigned Class", "Status", "Experience"], teacherRows)}`});
const teacherProfile = layout({ title: "Teacher Profile", kicker: "Class load and performance", active: "teacher-profile", depth: true, body: `
  <section class="profile-layout"><aside class="profile-card panel"><span class="avatar xl">SA</span><h2>Sarah Ahmed</h2><p>Senior Mathematics Teacher</p>${badge("Available")}<div class="profile-stats"><div><strong>6</strong><span>Classes</span></div><div><strong>8 yrs</strong><span>Experience</span></div></div></aside><div class="panel">${table(["Class", "Subject", "Section", "Schedule"], [["Class 9", "Mathematics", "A", "Sun Tue Thu"], ["Class 10", "Higher Math", "B", "Mon Wed"]])}</div></section>`});
const assignSubject = layout({ title: "Assign Subject", kicker: "Drag-inspired allocation board", active: "assign-subject", depth: true, body: `
  <section class="kanban-grid">${["Mathematics", "Science", "English"].map((s) => `<article class="panel kanban"><h2>${s}</h2><div class="assignment-card"><strong>Sarah Ahmed</strong><span>Class 9 A</span></div><div class="assignment-card muted"><strong>Need Teacher</strong><span>Class 8 B</span></div></article>`).join("")}</section>`});

const attendance = layout({ title: "Attendance", kicker: "Fast daily marking", active: "attendance", depth: true, body: `
  ${filters(["Class", "Section", "Date"])}
  ${statCards([{label:"Present",value:"42",meta:"Marked now",icon:"check",tone:"green"},{label:"Absent",value:"3",meta:"Needs reason",icon:"alert",tone:"amber"},{label:"Late",value:"2",meta:"Gate log",icon:"clock",tone:"cyan"}])}
  ${table(["Roll", "Student", "Status", "Toggle"], [["01", "Aarav Rahman", badge("Present"), "<label class='switch'><input type='checkbox' checked><span></span></label>"], ["02", "Nadia Islam", badge("Present"), "<label class='switch'><input type='checkbox' checked><span></span></label>"], ["03", "Rayan Chowdhury", badge("Absent", "danger"), "<label class='switch'><input type='checkbox'><span></span></label>"]])}`});

const feeCollection = layout({ title: "Fee Collection", kicker: "Payments and receipt preview", active: "fees", depth: true, body: `
  <section class="alert-box">${icon("alert")} <div><strong>Due alert</strong><p>18 students have outstanding invoices due within 7 days.</p></div></section>
  ${statCards([{label:"Collected Today",value:"$8,420",meta:"62 receipts",icon:"wallet",tone:"green"},{label:"Outstanding",value:"$14,210",meta:"Quarterly dues",icon:"alert",tone:"amber"}])}
  <section class="profile-layout"><div class="panel form-grid">${["Student ID", "Fee Type", "Amount", "Payment Method"].map(l=>`<label><span>${l}</span><input placeholder="${l}"></label>`).join("")}</div><article class="receipt-card"><p>Receipt</p><h2>$540.00</h2><span>Tuition + Lab Fee</span><hr><strong>Nadia Islam</strong><small>Receipt #NV-88214</small></article></section>`});
const feeHistory = layout({ title: "Fee History", kicker: "Collection ledger", active: "fee-history", depth: true, body: `${filters(["Class", "Month", "Payment"])}${table(["Receipt", "Student", "Type", "Amount", "Status"], [["NV-88214", "Nadia Islam", "Tuition", "$540", badge("Paid")], ["NV-88215", "Aarav Rahman", "Transport", "$80", badge("Due", "warning")]])}`});

const examSchedule = layout({ title: "Exam Schedule", kicker: "Calendar-first exam planning", active: "exam", depth: true, body: `${table(["Date", "Class", "Subject", "Time", "Room"], [["May 12", "Class 8", "Mathematics", "10:00 AM", "Hall A"], ["May 14", "Class 8", "Science", "10:00 AM", "Hall A"], ["May 16", "Class 9", "English", "11:30 AM", "Hall B"]])}`});
const admitCard = layout({ title: "Admit Card", kicker: "Printable exam access", active: "admit-card", depth: true, body: `<section class="admit-card panel"><div><p class="eyebrow">Midterm 2026</p><h2>Nadia Islam</h2><p>Class 7 / Roll 12 / Section B</p></div><div class="id-code"></div>${table(["Subject", "Date", "Signature"], [["Mathematics", "May 12", ""], ["Science", "May 14", ""], ["English", "May 16", ""]])}</section>`});
const marksEntry = layout({ title: "Marks Entry", kicker: "Structured score input", active: "marks", depth: true, body: `${filters(["Class", "Subject", "Exam"])}${table(["Roll", "Student", "CQ", "MCQ", "Assignment", "Total"], [["01", "Aarav Rahman", "<input class='cell-input' value='44'>", "<input class='cell-input' value='28'>", "<input class='cell-input' value='18'>", "90"], ["02", "Nadia Islam", "<input class='cell-input' value='46'>", "<input class='cell-input' value='29'>", "<input class='cell-input' value='19'>", "94"]])}`});
const result = layout({ title: "Result", kicker: "Printable progress card", active: "result", depth: true, body: `<section class="result-card panel"><div class="panel-head"><div><p class="eyebrow">Annual Result</p><h2>Aarav Rahman</h2></div><div class="gpa-pill">GPA 5.00</div></div>${table(["Subject", "Marks", "Grade", "Point"], [["Math", "92", "A+", "5.00"], ["Science", "89", "A", "4.00"], ["English", "94", "A+", "5.00"]])}</section>`});
const gradeSystem = layout({ title: "Grade System", kicker: "Academic scale settings", active: "grades", depth: true, body: `${table(["Grade", "Min Marks", "Max Marks", "Point"], [["A+", "80", "100", "5.00"], ["A", "70", "79", "4.00"], ["A-", "60", "69", "3.50"], ["B", "50", "59", "3.00"]])}`});
const routine = layout({ title: "Class Routine", kicker: "Weekly timetable grid", active: "routine", depth: true, wide: true, body: `
  <section class="routine-grid">
    ${["Time", "Sun", "Mon", "Tue", "Wed", "Thu"].map(h=>`<div class="routine-head">${h}</div>`).join("")}
    ${["09:00", "Math", "English", "Science", "ICT", "Arts", "10:00", "Science", "Math", "Bangla", "English", "Sports", "11:00", "History", "ICT", "Math", "Science", "Club"].map((c,i)=>`<div class="routine-cell tone-${i%5}">${c}</div>`).join("")}
  </section>`});
const routineList = layout({ title: "Routine List", kicker: "Published schedules", active: "routine-list", depth: true, body: `${table(["Routine", "Class", "Version", "Status"], [["Middle School Week A", "6-8", "v2.1", badge("Published")], ["Senior Science", "9-10", "v1.8", badge("Draft", "warning")]])}`});
const markDistribution = layout({ title: "Mark Distribution", kicker: "Assessment structure", active: "distribution", depth: true, body: `${table(["Subject", "CQ", "MCQ", "Assignment", "Total"], [["Mathematics", "50", "30", "20", "100"], ["Science", "45", "35", "20", "100"], ["English", "60", "20", "20", "100"]])}`});

const enquiry = layout({ title: "Admission Enquiry", kicker: "Front desk pipeline", active: "enquiry", depth: true, body: `<section class="profile-layout"><div class="panel form-grid">${["Guardian Name", "Student Name", "Class", "Phone"].map(l=>`<label><span>${l}</span><input placeholder="${l}"></label>`).join("")}</div><div>${table(["Name", "Class", "Phone", "Status"], [["Tahsin Karim", "Class 4", "+88017...", badge("Pending", "warning")], ["Meera Das", "Class 6", "+88018...", badge("Solved")]])}</div></section>`});
const complain = layout({ title: "Complain", kicker: "Resolution workspace", active: "complain", depth: true, body: `<section class="profile-layout"><div class="panel form-grid">${["Complainant", "Type", "Priority", "Assigned To"].map(l=>`<label><span>${l}</span><input placeholder="${l}"></label>`).join("")}<label class="wide"><span>Details</span><textarea placeholder="Write complaint details"></textarea></label></div><div>${table(["Ticket", "Issue", "Owner", "Status"], [["CMP-18", "Transport delay", "Front Desk", badge("Pending", "warning")], ["CMP-19", "Lab equipment", "Admin", badge("Solved")]])}</div></section>`});

const settings = layout({ title: "Settings", kicker: "Card-based school configuration", active: "settings", depth: true, body: `<section class="settings-grid">${["Class", "Section", "Session", "Subject", "Curriculum", "Religion", "Blood Group"].map((s,i)=>`<article class="settings-card"><div class="stat-icon">${icon(["layers","list","calendar","book","award","spark","user"][i])}</div><h3>${s}</h3><p>Manage ${s.toLowerCase()} records and availability.</p><button class="btn tiny">Configure</button></article>`).join("")}</section>`});
const library = layout({ title: "Library", kicker: "Book inventory and issue status", active: "library", depth: true, body: `${filters(["Category", "Availability"])}${table(["ISBN", "Book", "Author", "Copies", "Status"], [["978-11", "Modern Physics", "H. Keller", "12", badge("Available")], ["978-12", "World Atlas", "NatGeo", "3", badge("Low Stock", "warning")]])}`});
const transport = layout({ title: "Transport", kicker: "Routes, vehicles, and drivers", active: "transport", depth: true, body: `${statCards([{label:"Routes",value:"12",meta:"City coverage",icon:"bus",tone:"cyan"},{label:"Drivers",value:"18",meta:"Verified",icon:"user",tone:"green"}])}${table(["Route", "Driver", "Vehicle", "Stops", "Status"], [["Route 04", "Mizan Ali", "Bus-08", "14", badge("Active")], ["Route 07", "Kabir Uddin", "Van-03", "9", badge("Maintenance", "warning")]])}`});
const inventory = layout({ title: "Inventory", kicker: "Stock and procurement", active: "inventory", depth: true, body: `${filters(["Category", "Stock"])}${table(["Item", "Category", "Stock", "Threshold", "Status"], [["Projector", "Electronics", "8", "3", badge("Healthy")], ["Lab Apron", "Science", "12", "25", badge("Reorder", "danger")]])}`});
const reports = layout({ title: "Reports", kicker: "Analytics cards", active: "reports", depth: true, body: `${statCards([{label:"Retention",value:"96.8%",meta:"Up 2.1%",icon:"chart",tone:"green"},{label:"Fee Recovery",value:"88%",meta:"Current term",icon:"wallet",tone:"indigo"},{label:"Exam Average",value:"78.4",meta:"Across classes",icon:"award",tone:"cyan"},{label:"Complaints Solved",value:"91%",meta:"SLA met",icon:"check",tone:"amber"}])}<section class="dashboard-grid"><article class="panel chart-panel"><div class="panel-head"><h2>Admission Trend</h2></div><div class="line-chart"><span></span><span></span><span></span><span></span></div></article><article class="panel"><h2>Top Signals</h2><ul class="activity-list"><li><span></span><div><strong>Class 8 attendance improving</strong><small>+4.2% over last month</small></div></li><li><span></span><div><strong>Science library usage high</strong><small>42% more checkouts</small></div></li></ul></article></section>`});

const files = {
  "index.html": dashboard,
  "pages/admission-entry.html": admission,
  "pages/student-list.html": studentList,
  "pages/inactive-students.html": inactiveStudents,
  "pages/student-profile.html": studentProfile,
  "pages/student-id-card.html": studentId,
  "pages/teacher-list.html": teacherList,
  "pages/teacher-profile.html": teacherProfile,
  "pages/assign-subject.html": assignSubject,
  "pages/attendance.html": attendance,
  "pages/fee-collection.html": feeCollection,
  "pages/fee-history.html": feeHistory,
  "pages/exam-schedule.html": examSchedule,
  "pages/admit-card.html": admitCard,
  "pages/marks-entry.html": marksEntry,
  "pages/result.html": result,
  "pages/grade-system.html": gradeSystem,
  "pages/class-routine.html": routine,
  "pages/routine-list.html": routineList,
  "pages/mark-distribution.html": markDistribution,
  "pages/admission-enquiry.html": enquiry,
  "pages/complain.html": complain,
  "pages/settings.html": settings,
  "pages/library.html": library,
  "pages/transport.html": transport,
  "pages/inventory.html": inventory,
  "pages/reports.html": reports,
};

for (const [file, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(root, file), content);
}

fs.writeFileSync(path.join(cssDir, "styles.css"), `:root {
  color-scheme: dark;
  --primary: #4F46E5;
  --secondary: #06B6D4;
  --accent: #F59E0B;
  --bg: #070B18;
  --bg-soft: #0E1426;
  --panel: rgba(15, 23, 42, .72);
  --panel-strong: rgba(22, 31, 55, .88);
  --text: #F8FAFC;
  --muted: #93A4BC;
  --line: rgba(148, 163, 184, .18);
  --success: #22C55E;
  --danger: #EF4444;
  --radius: 20px;
  --shadow: 0 24px 80px rgba(0, 0, 0, .36);
}
* { box-sizing: border-box; }
body { margin: 0; min-height: 100vh; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background: radial-gradient(circle at top left, rgba(79,70,229,.24), transparent 32rem), radial-gradient(circle at 80% 0, rgba(6,182,212,.20), transparent 30rem), var(--bg); color: var(--text); overflow-x: hidden; }
a { color: inherit; text-decoration: none; }
button, input, select, textarea { font: inherit; }
svg { width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.aurora { position: fixed; width: 28rem; height: 28rem; border-radius: 999px; filter: blur(90px); opacity: .25; pointer-events: none; animation: floaty 12s ease-in-out infinite alternate; }
.aurora-a { background: var(--primary); left: 18rem; top: 6rem; }
.aurora-b { background: var(--secondary); right: 2rem; bottom: 2rem; animation-delay: -4s; }
@keyframes floaty { from { transform: translate3d(0,0,0) scale(1); } to { transform: translate3d(30px,-28px,0) scale(1.08); } }
.sidebar { position: fixed; inset: 18px auto 18px 18px; width: 284px; padding: 18px; border: 1px solid var(--line); border-radius: 28px; background: linear-gradient(145deg, rgba(15,23,42,.88), rgba(15,23,42,.56)); backdrop-filter: blur(24px); box-shadow: var(--shadow); overflow-y: auto; z-index: 20; transition: width .25s ease, transform .25s ease; }
.brand { display: flex; align-items: center; gap: 12px; padding: 8px 8px 20px; }
.brand-mark { display: grid; place-items: center; width: 44px; height: 44px; border-radius: 16px; background: linear-gradient(135deg, var(--primary), var(--secondary)); font-weight: 800; box-shadow: 0 12px 32px rgba(79,70,229,.45); }
.brand-copy { display: grid; gap: 2px; }
.brand-copy small { color: var(--muted); }
.nav-group { margin-top: 14px; }
.nav-group p { margin: 0 0 8px 10px; color: #71809A; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: .08em; }
.nav-link { position: relative; display: flex; align-items: center; gap: 12px; padding: 11px 12px; border-radius: 16px; color: #B8C2D6; transition: background .2s ease, transform .2s ease, color .2s ease; }
.nav-link:hover { background: rgba(255,255,255,.06); color: white; transform: translateX(3px); }
.nav-link.active { background: linear-gradient(135deg, rgba(79,70,229,.28), rgba(6,182,212,.16)); color: white; box-shadow: inset 0 0 0 1px rgba(255,255,255,.08); }
.shell { min-height: 100vh; padding: 18px 22px 48px 326px; }
.shell-wide { max-width: none; }
.topbar { position: sticky; top: 16px; z-index: 15; display: flex; align-items: center; gap: 14px; padding: 12px; border: 1px solid var(--line); border-radius: 24px; background: rgba(7,11,24,.72); backdrop-filter: blur(20px); box-shadow: 0 18px 60px rgba(0,0,0,.22); }
.menu-toggle { display: none; }
.search-field { flex: 1; display: flex; align-items: center; gap: 10px; min-width: 160px; padding: 0 14px; height: 46px; border: 1px solid var(--line); border-radius: 16px; background: rgba(255,255,255,.055); color: var(--muted); }
.search-field input { width: 100%; border: 0; outline: 0; background: transparent; color: var(--text); }
.search-field.compact { max-width: 320px; }
.topbar-actions { display: flex; align-items: center; gap: 10px; }
.icon-button, .profile-chip, .btn, .seg { border: 1px solid var(--line); color: var(--text); background: rgba(255,255,255,.06); cursor: pointer; transition: transform .18s ease, border-color .18s ease, background .18s ease; }
.icon-button { position: relative; display: grid; place-items: center; width: 46px; height: 46px; border-radius: 15px; }
.icon-button:hover, .btn:hover, .seg:hover, .profile-chip:hover { transform: translateY(-2px); border-color: rgba(6,182,212,.45); background: rgba(255,255,255,.10); }
.pulse-dot { position: absolute; right: 10px; top: 10px; width: 8px; height: 8px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 0 5px rgba(245,158,11,.16); }
.profile-chip { display: flex; align-items: center; gap: 9px; height: 46px; padding: 0 12px; border-radius: 999px; }
.avatar { display: inline-grid; place-items: center; width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, var(--accent), var(--primary)); font-size: 12px; font-weight: 800; color: white; }
.avatar.big { width: 58px; height: 58px; font-size: 18px; }
.avatar.xl { width: 86px; height: 86px; font-size: 26px; }
.content { max-width: 1500px; margin: 0 auto; }
.page-hero { display: flex; align-items: end; justify-content: space-between; gap: 18px; padding: 34px 4px 24px; }
.eyebrow { margin: 0 0 8px; color: var(--secondary); font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: .12em; }
h1, h2, h3, p { margin-top: 0; }
h1 { margin-bottom: 0; font-size: clamp(32px, 5vw, 58px); line-height: .98; letter-spacing: 0; }
h2 { margin-bottom: 0; font-size: 20px; }
h3 { margin-bottom: 8px; }
.hero-actions { display: flex; gap: 10px; flex-wrap: wrap; }
.btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-height: 44px; padding: 0 16px; border-radius: 15px; font-weight: 700; }
.btn.primary { border: 0; background: linear-gradient(135deg, var(--primary), var(--secondary)); box-shadow: 0 14px 34px rgba(79,70,229,.34); }
.btn.ghost { background: rgba(255,255,255,.04); }
.btn.tiny { min-height: 34px; padding: 0 12px; border-radius: 12px; font-size: 13px; }
.stats-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; margin-bottom: 18px; }
.stat-card, .panel, .toolbar-card, .settings-card, .receipt-card, .alert-box, .id-card-print { position: relative; border: 1px solid var(--line); border-radius: var(--radius); background: linear-gradient(145deg, rgba(255,255,255,.10), rgba(255,255,255,.045)); backdrop-filter: blur(22px); box-shadow: 0 20px 60px rgba(0,0,0,.22); }
.stat-card { overflow: hidden; padding: 20px; transition: transform .2s ease, border-color .2s ease; }
.stat-card:hover, .panel:hover, .settings-card:hover, .person-card:hover { transform: translateY(-3px); border-color: rgba(6,182,212,.38); }
.stat-card:after { content: ""; position: absolute; inset: auto -30px -55px auto; width: 130px; height: 130px; border-radius: 50%; background: rgba(79,70,229,.24); }
.stat-card.cyan:after { background: rgba(6,182,212,.24); }
.stat-card.amber:after { background: rgba(245,158,11,.24); }
.stat-card.green:after { background: rgba(34,197,94,.22); }
.stat-icon { display: grid; place-items: center; width: 44px; height: 44px; border-radius: 16px; background: rgba(255,255,255,.08); color: var(--secondary); margin-bottom: 20px; }
.stat-card p { color: var(--muted); margin-bottom: 8px; }
.stat-card strong { display: block; font-size: 30px; margin-bottom: 8px; }
.stat-card span { color: #AAB7CC; font-size: 13px; }
.dashboard-grid { display: grid; grid-template-columns: minmax(0, 1.5fr) minmax(280px, .8fr); gap: 18px; }
.panel { padding: 20px; transition: transform .2s ease, border-color .2s ease; }
.panel-head { display: flex; align-items: start; justify-content: space-between; gap: 12px; margin-bottom: 18px; }
.chart-panel { min-height: 330px; }
.bar-chart { display: flex; align-items: end; justify-content: space-between; gap: 18px; height: 210px; padding: 18px 8px 0; }
.bar-pair { display: grid; grid-template-columns: 1fr 1fr; align-items: end; gap: 6px; height: 100%; flex: 1; }
.bar-pair small { grid-column: 1 / -1; text-align: center; color: var(--muted); margin-top: 8px; }
.bar { display: block; border-radius: 999px 999px 8px 8px; min-height: 44px; animation: rise .7s ease both; }
.income { background: linear-gradient(var(--secondary), var(--primary)); }
.expense { background: linear-gradient(var(--accent), #EF4444); opacity: .82; }
.h2 { height: 34%; } .h3 { height: 42%; } .h4 { height: 54%; } .h5 { height: 64%; } .h6 { height: 72%; } .h7 { height: 82%; } .h8 { height: 90%; } .h9 { height: 96%; }
@keyframes rise { from { transform: scaleY(.25); transform-origin: bottom; opacity: .2; } }
.legend { display: flex; gap: 16px; color: var(--muted); font-size: 13px; }
.legend span { display: flex; align-items: center; gap: 8px; }
.income-dot, .expense-dot { width: 9px; height: 9px; border-radius: 50%; display: inline-block; }
.income-dot { background: var(--secondary); } .expense-dot { background: var(--accent); }
.progress-orbit { --deg: calc(var(--value) * 3.6deg); display: grid; place-items: center; width: 170px; height: 170px; margin: 20px auto; border-radius: 50%; background: conic-gradient(var(--secondary) var(--deg), rgba(255,255,255,.08) 0); box-shadow: inset 0 0 0 18px rgba(7,11,24,.9); }
.progress-92 { --value: 92; }
.progress-orbit span { display: grid; place-items: center; width: 118px; height: 118px; border-radius: 50%; background: rgba(7,11,24,.92); font-size: 30px; font-weight: 800; }
.mini-grid, .profile-stats { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
.mini-grid div, .profile-stats div { padding: 14px; border-radius: 16px; background: rgba(255,255,255,.055); }
.mini-grid strong, .profile-stats strong { display: block; font-size: 22px; }
.mini-grid span, .profile-stats span { color: var(--muted); font-size: 13px; }
.activity-list { list-style: none; padding: 0; margin: 0; display: grid; gap: 14px; }
.activity-list li { display: flex; gap: 12px; padding: 12px; border-radius: 16px; background: rgba(255,255,255,.045); }
.activity-list li > span { width: 10px; height: 10px; border-radius: 50%; margin-top: 5px; background: var(--secondary); box-shadow: 0 0 0 6px rgba(6,182,212,.10); }
.activity-list small, .notice-card p, .person-card p, .settings-card p, .receipt-card span, .receipt-card small { color: var(--muted); }
.notice-card { padding: 16px; border-radius: 16px; background: linear-gradient(135deg, rgba(79,70,229,.18), rgba(6,182,212,.10)); margin-top: 12px; }
.notice-card.muted, .assignment-card.muted { background: rgba(255,255,255,.045); }
.badge { display: inline-flex; align-items: center; width: max-content; min-height: 26px; padding: 0 10px; border-radius: 999px; color: #B9FBCB; background: rgba(34,197,94,.14); border: 1px solid rgba(34,197,94,.22); font-size: 12px; font-weight: 800; }
.badge.warning { color: #FFE1A3; background: rgba(245,158,11,.14); border-color: rgba(245,158,11,.26); }
.badge.danger { color: #FFC6C6; background: rgba(239,68,68,.14); border-color: rgba(239,68,68,.28); }
.toolbar-card { display: flex; align-items: end; gap: 12px; padding: 14px; margin-bottom: 18px; flex-wrap: wrap; }
.select-field, .form-grid label { display: grid; gap: 8px; color: var(--muted); font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: .08em; }
select, input, textarea { min-height: 44px; border: 1px solid var(--line); border-radius: 14px; background: rgba(255,255,255,.06); color: var(--text); padding: 0 12px; outline: none; }
textarea { min-height: 118px; padding-top: 12px; resize: vertical; }
.view-switch { display: flex; gap: 8px; justify-content: flex-end; margin-bottom: 12px; }
.seg { min-height: 38px; padding: 0 14px; border-radius: 999px; font-weight: 800; }
.seg.active { background: linear-gradient(135deg, var(--primary), var(--secondary)); border-color: transparent; }
.view-pane { display: none; }
.view-pane.active { display: block; }
.table-wrap { overflow-x: auto; border: 1px solid var(--line); border-radius: var(--radius); background: rgba(255,255,255,.045); }
table { width: 100%; border-collapse: collapse; min-width: 680px; }
th, td { padding: 15px 16px; text-align: left; border-bottom: 1px solid var(--line); }
th { color: #AAB7CC; font-size: 12px; text-transform: uppercase; letter-spacing: .08em; }
td { color: #E6ECF8; }
tr:hover td { background: rgba(255,255,255,.035); }
.people-grid, .settings-grid, .kanban-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
.person-card, .settings-card { padding: 20px; border: 1px solid var(--line); border-radius: var(--radius); background: rgba(255,255,255,.055); transition: transform .2s ease, border-color .2s ease; }
.metric-line { display: flex; justify-content: space-between; padding-top: 16px; margin-top: 16px; border-top: 1px solid var(--line); }
.stepper { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 18px; }
.step { display: flex; align-items: center; gap: 12px; padding: 16px; border-radius: 18px; border: 1px solid var(--line); background: rgba(255,255,255,.045); }
.step span { display: grid; place-items: center; width: 32px; height: 32px; border-radius: 50%; background: rgba(255,255,255,.08); font-weight: 800; }
.step.active { background: linear-gradient(135deg, rgba(79,70,229,.30), rgba(6,182,212,.14)); }
.form-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
.form-grid .wide { grid-column: 1 / -1; }
.profile-layout { display: grid; grid-template-columns: 340px minmax(0, 1fr); gap: 18px; }
.profile-card { text-align: center; display: grid; justify-items: center; gap: 12px; align-content: start; }
.id-stage { display: grid; place-items: center; gap: 18px; }
.id-card-print { width: 340px; min-height: 520px; padding: 24px; text-align: center; background: linear-gradient(160deg, rgba(79,70,229,.30), rgba(6,182,212,.10) 45%, rgba(255,255,255,.06)); }
.id-top { display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 28px; }
.id-code { height: 62px; margin: 18px 0; border-radius: 12px; background: repeating-linear-gradient(90deg, #fff 0 3px, transparent 3px 7px); opacity: .82; }
dl { display: grid; grid-template-columns: 1fr 1fr; text-align: left; gap: 10px; }
dt { color: var(--muted); } dd { margin: 0; text-align: right; font-weight: 800; }
.switch input { display: none; }
.switch span { display: block; width: 52px; height: 30px; border-radius: 999px; padding: 4px; background: rgba(239,68,68,.28); transition: background .2s ease; }
.switch span:before { content: ""; display: block; width: 22px; height: 22px; border-radius: 50%; background: white; transition: transform .2s ease; }
.switch input:checked + span { background: rgba(34,197,94,.42); }
.switch input:checked + span:before { transform: translateX(22px); }
.alert-box { display: flex; align-items: center; gap: 14px; padding: 16px; margin-bottom: 18px; color: #FFE1A3; background: rgba(245,158,11,.12); }
.receipt-card { padding: 24px; min-height: 240px; background: linear-gradient(145deg, rgba(255,255,255,.12), rgba(79,70,229,.18)); }
.receipt-card h2 { font-size: 42px; margin: 10px 0; }
.receipt-card hr { border: 0; border-top: 1px dashed rgba(255,255,255,.24); margin: 24px 0; }
.admit-card, .result-card { max-width: 900px; margin: 0 auto; }
.gpa-pill { display: grid; place-items: center; min-width: 110px; height: 70px; border-radius: 20px; background: linear-gradient(135deg, var(--accent), var(--primary)); font-weight: 900; }
.cell-input { width: 74px; min-height: 34px; text-align: center; }
.routine-grid { display: grid; grid-template-columns: 110px repeat(5, minmax(120px, 1fr)); gap: 10px; overflow-x: auto; }
.routine-head, .routine-cell { min-height: 72px; padding: 16px; border-radius: 18px; border: 1px solid var(--line); background: rgba(255,255,255,.055); font-weight: 800; }
.routine-head { color: var(--secondary); min-height: 48px; }
.tone-1 { background: rgba(79,70,229,.20); } .tone-2 { background: rgba(6,182,212,.16); } .tone-3 { background: rgba(245,158,11,.16); } .tone-4 { background: rgba(34,197,94,.14); }
.assignment-card { display: grid; gap: 4px; padding: 16px; border-radius: 16px; background: rgba(79,70,229,.18); margin-top: 12px; }
.assignment-card span { color: var(--muted); }
.empty-state { margin-top: 18px; display: grid; place-items: center; gap: 8px; padding: 34px; border: 1px dashed rgba(148,163,184,.28); border-radius: var(--radius); color: var(--muted); }
.empty-state div { color: var(--secondary); }
.line-chart { height: 240px; display: flex; align-items: end; gap: 12px; }
.line-chart span { flex: 1; border-radius: 999px 999px 12px 12px; background: linear-gradient(var(--secondary), var(--primary)); }
.line-chart span:nth-child(1){height:45%}.line-chart span:nth-child(2){height:78%}.line-chart span:nth-child(3){height:58%}.line-chart span:nth-child(4){height:88%}
.sidebar-scrim { display: none; }
@media (max-width: 1180px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } .dashboard-grid, .profile-layout { grid-template-columns: 1fr; } .people-grid, .settings-grid, .kanban-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 860px) {
  .sidebar { transform: translateX(-115%); }
  .sidebar.open { transform: translateX(0); }
  .sidebar-scrim.open { display: block; position: fixed; inset: 0; background: rgba(0,0,0,.45); z-index: 19; }
  .shell { padding: 12px 12px 36px; }
  .menu-toggle { display: grid; }
  .topbar { top: 10px; }
  .profile-chip span:last-child { display: none; }
  .page-hero { align-items: stretch; flex-direction: column; }
  .stats-grid, .people-grid, .settings-grid, .kanban-grid, .stepper, .form-grid { grid-template-columns: 1fr; }
  h1 { font-size: 38px; }
}
@media (max-width: 560px) {
  .topbar { flex-wrap: wrap; }
  .search-field { order: 3; flex-basis: 100%; }
  .hero-actions .btn { flex: 1; }
  .toolbar-card { align-items: stretch; }
  .toolbar-card > * { width: 100%; max-width: none; }
  .id-card-print { width: 100%; }
}
@media print {
  body { background: white; color: black; }
  .sidebar, .topbar, .page-hero, .print-button, .aurora, .sidebar-scrim { display: none !important; }
  .shell { padding: 0; }
  .id-card-print, .panel, .table-wrap { box-shadow: none; background: white; color: black; border-color: #ddd; }
}
`);

fs.writeFileSync(path.join(jsDir, "app.js"), `const sidebar = document.querySelector("#sidebar");
const scrim = document.querySelector(".sidebar-scrim");
document.querySelectorAll("[data-sidebar-toggle]").forEach((button) => {
  button.addEventListener("click", () => {
    sidebar?.classList.toggle("open");
    scrim?.classList.toggle("open");
  });
});

document.querySelectorAll(".seg[data-view]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".seg[data-view]").forEach((item) => item.classList.remove("active"));
    document.querySelectorAll(".view-pane").forEach((pane) => pane.classList.remove("active"));
    button.classList.add("active");
    document.querySelector(\`.\${button.dataset.view}-view\`)?.classList.add("active");
  });
});

document.querySelectorAll("[data-print]").forEach((button) => {
  button.addEventListener("click", () => window.print());
});
`);

console.log(`Generated ${Object.keys(files).length} HTML pages, css/styles.css, and js/app.js`);
