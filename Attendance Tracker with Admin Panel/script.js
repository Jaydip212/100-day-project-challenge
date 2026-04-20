// script.js

// Initialize attendance data from localStorage or empty object
const attendanceData = JSON.parse(localStorage.getItem('attendance')) || {};

// Default Users (Admin, Teacher, Student)
const users = [
  { username: "admin", password: "admin123", role: "admin" },
  { username: "teacher", password: "teacher123", role: "teacher" },
  { username: "student", password: "student123", role: "student" }
];

// Login Function
function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const error = document.getElementById("error");

  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    error.textContent = "Invalid credentials!";
    return;
  }

  sessionStorage.setItem("loggedInUser", JSON.stringify(user));
  window.location.href = user.role === "admin" ? "admin.html" : "student.html";
}

// Logout Function
function logout() {
  sessionStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}

// Add New Student
function addStudent() {
  const name = document.getElementById("new-student").value.trim();

  if (!name) return;

  if (!attendanceData[name]) {
    attendanceData[name] = {};
  }

  localStorage.setItem("attendance", JSON.stringify(attendanceData));
  renderStudentList();
}

// Render Student List in Admin Panel
function renderStudentList(data = attendanceData) {
  const list = document.getElementById("student-list");
  list.innerHTML = "";

  Object.keys(data).forEach(name => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${name}
      <button onclick="viewAttendance('${name}')">View</button>
    `;
    list.appendChild(li);
  });
}

// Mark Present
function markPresent() {
  const date = document.getElementById("attendance-date").value;
  const name = prompt("Enter student name:");

  if (!name || !date) return;

  if (!attendanceData[name]) attendanceData[name] = {};
  attendanceData[name][date] = "Present";

  localStorage.setItem("attendance", JSON.stringify(attendanceData));
  alert("Present marked for " + name);
}

// Mark Absent
function markAbsent() {
  const date = document.getElementById("attendance-date").value;
  const name = prompt("Enter student name:");

  if (!name || !date) return;

  if (!attendanceData[name]) attendanceData[name] = {};
  attendanceData[name][date] = "Absent";

  localStorage.setItem("attendance", JSON.stringify(attendanceData));
  alert("Absent marked for " + name);
}

// View Attendance Table in Student Page
function viewAttendance(name) {
  const table = document.getElementById("attendance-table").querySelector("tbody");
  table.innerHTML = "";

  const data = attendanceData[name];
  if (data) {
    Object.entries(data).forEach(([date, status]) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${date}</td><td>${status}</td>`;
      table.appendChild(row);
    });
  }

  document.getElementById("student-name").textContent = `Welcome, ${name}`;
}

// Show Attendance Summary with Percentage
function showAttendanceSummary(name) {
  const summaryDiv = document.getElementById("attendance-summary");
  const data = attendanceData[name];

  if (!data) {
    summaryDiv.innerHTML = "<p>No attendance records found.</p>";
    return;
  }

  const totalDays = Object.keys(data).length;
  const presentDays = Object.values(data).filter(status => status === "Present").length;
  const absentDays = totalDays - presentDays;
  const percentage = totalDays ? ((presentDays / totalDays) * 100).toFixed(2) : 0;

  summaryDiv.innerHTML = `
    <div class="summary-card">
      <h3>📊 Attendance Summary</h3>
      <p>Total Days: ${totalDays}</p>
      <p>Present: ${presentDays}</p>
      <p>Absent: ${absentDays}</p>
      <p>Percentage: ${percentage}%</p>
    </div>
  `;
}

// Search Student in Admin Panel
function searchStudent() {
  const query = document.getElementById("search-student").value.toLowerCase();
  const filtered = {};

  Object.keys(attendanceData).forEach(name => {
    if (name.toLowerCase().includes(query)) {
      filtered[name] = attendanceData[name];
    }
  });

  renderStudentList(filtered);
}

// Export Attendance to CSV
function exportToCSV() {
  let csv = "Name,Date,Status\n";

  Object.entries(attendanceData).forEach(([name, records]) => {
    Object.entries(records).forEach(([date, status]) => {
      csv += `${name},${date},${status}\n`;
    });
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "attendance.csv";
  a.click();
  URL.revokeObjectURL(url);
}

// Render Chart using Chart.js
function renderChart() {
  const ctx = document.getElementById("attendanceChart").getContext("2d");

  const labels = Object.keys(attendanceData);
  const presentCounts = labels.map(name => {
    const records = attendanceData[name];
    return Object.values(records).filter(s => s === "Present").length;
  });

  new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "Present Days",
        data: presentCounts,
        backgroundColor: "#2c3e50"
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}

// On Window Load
window.onload = () => {
  const path = window.location.pathname;
  const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));

  if (!loggedInUser) {
    window.location.href = "index.html";
    return;
  }

  if (path.includes("admin")) {
    renderStudentList();
    renderChart();
  } else if (path.includes("student")) {
    viewAttendance(loggedInUser.username);
    showAttendanceSummary(loggedInUser.username); // Show summary on student page
  }
};