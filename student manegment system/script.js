// script.js

// Import Firebase functions
import { saveStudent, updateStudent, deleteStudent, loadStudents } from './firebase.js';

let localStudents = [];

// Check login on page load
window.addEventListener('DOMContentLoaded', () => {
  const loggedInUser = sessionStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    window.location.href = 'login.html';
  } else {
    const user = JSON.parse(loggedInUser);
    document.getElementById('user-greeting').textContent = `Welcome, ${user.username} (${user.role})!`;

    // Disable editing for teachers
    if (user.role === 'teacher') {
      document.getElementById('student-form').style.display = 'none';
      const buttons = document.querySelectorAll('td button');
      buttons.forEach(btn => btn.remove());
    }
  }

  // Initialize features
  setupDarkMode();
  setupForm();
  setupLogout();
  loadAndRenderStudents();
});

function setupDarkMode() {
  const darkToggle = document.getElementById('darkModeToggle');
  if (darkToggle) {
    darkToggle.addEventListener('change', () => {
      document.body.classList.toggle('dark-mode');
    });
  }
}

function setupForm() {
  const form = document.getElementById('student-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const age = document.getElementById('age').value.trim();
      const course = document.getElementById('course').value.trim();

      if (!name || !age || !course) return;

      const student = { name, age, course };
      saveStudent(student);

      form.reset();
    });
  }
}

function loadAndRenderStudents() {
  const tableBody = document.getElementById('table-body');

  loadStudents((students) => {
    if (students) {
      localStudents = Object.keys(students).map(key => ({ id: key, ...students[key] }));
      renderTable();
    }
  });
}

function renderTable() {
  const tableBody = document.getElementById('table-body');
  tableBody.innerHTML = '';

  localStudents.forEach((student) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.age}</td>
      <td>${student.course}</td>
      <td class="attendance-col">
        <select onchange="markAttendance('${student.id}', this.value)">
          <option value="Present" ${student.attendance === 'Present' ? 'selected' : ''}>Present</option>
          <option value="Absent" ${student.attendance === 'Absent' ? 'selected' : ''}>Absent</option>
        </select>
      </td>
      <td>
        <button onclick="editStudent('${student.id}')">Edit</button>
        <button onclick="removeStudent('${student.id}')">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

window.markAttendance = function(id, status) {
  const studentRef = firebase.database().ref('students/' + id);
  studentRef.update({ attendance: status });
};

window.editStudent = function(id) {
  const student = localStudents.find(s => s.id === id);
  const newName = prompt("Enter new name", student.name);
  const newAge = prompt("Enter new age", student.age);
  const newCourse = prompt("Enter new course", student.course);

  if (newName && newAge && newCourse) {
    updateStudent(id, { name: newName, age: newAge, course: newCourse });
  }
};

window.removeStudent = function(id) {
  if (confirm("Are you sure?")) {
    deleteStudent(id);
  }
};

function setupLogout() {
  window.logout = function () {
    if (confirm("Are you sure you want to logout?")) {
      sessionStorage.removeItem('loggedInUser');
      window.location.href = 'login.html';
    }
  };
}