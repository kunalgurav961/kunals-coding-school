/**
 * Kunal's Coding School - Admin Panel JavaScript
 */

// Session management
const SESSION_KEY = 'kcs_admin_session';

function isLoggedIn() {
  const session = sessionStorage.getItem(SESSION_KEY);
  return session && JSON.parse(session).loggedIn;
}

function getSession() {
  const session = sessionStorage.getItem(SESSION_KEY);
  return session ? JSON.parse(session) : null;
}

function setSession(email) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify({ loggedIn: true, email, timestamp: Date.now() }));
}

function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}

// DOM elements
let loginSection, dashboardSection, currentTab = 'students';

document.addEventListener('DOMContentLoaded', () => {
  loginSection = document.getElementById('login-section');
  dashboardSection = document.getElementById('dashboard-section');
  
  if (isLoggedIn()) {
    showDashboard();
  } else {
    showLogin();
  }
  
  initLoginForm();
  initTabs();
  initLogout();
});

function showLogin() {
  if (loginSection) loginSection.classList.remove('hidden');
  if (dashboardSection) dashboardSection.classList.add('hidden');
}

function showDashboard() {
  if (loginSection) loginSection.classList.add('hidden');
  if (dashboardSection) dashboardSection.classList.remove('hidden');
  loadTabData('students');
}

function initLoginForm() {
  const form = document.getElementById('admin-login-form');
  if (!form) return;
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = form.querySelector('#admin-email').value.trim();
    const password = form.querySelector('#admin-password').value;
    const submitBtn = form.querySelector('button[type="submit"]');
    
    if (!email || !password) {
      showToast('Enter email and password', 'error');
      return;
    }
    
    setLoading(submitBtn, true);
    
    try {
      const response = await apiRequest('adminLogin', { email, password });
      if (response.success) {
        setSession(email);
        showToast('Login successful!', 'success');
        showDashboard();
      } else {
        throw new Error(response.error || 'Invalid credentials');
      }
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setLoading(submitBtn, false);
    }
  });
}

function initTabs() {
  document.querySelectorAll('.admin-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentTab = tab.dataset.tab;
      loadTabData(currentTab);
    });
  });
}

function initLogout() {
  document.getElementById('logout-btn')?.addEventListener('click', () => {
    clearSession();
    showToast('Logged out', 'info');
    showLogin();
  });
}

async function loadTabData(tab) {
  const content = document.getElementById('tab-content');
  content.innerHTML = '<div class="text-center py-12"><div class="skeleton h-8 w-48 mx-auto mb-4"></div><div class="skeleton h-64 w-full"></div></div>';
  
  try {
    let html = '';
    
    if (tab === 'students') {
      const res = await apiGet('getStudents');
      html = renderStudentsTable(res.success ? res.students : []);
    } else if (tab === 'messages') {
      const res = await apiGet('getMessages');
      html = renderMessagesTable(res.success ? res.messages : []);
    } else if (tab === 'courses') {
      const res = await apiGet('getCourses');
      html = renderCoursesManager(res.success ? res.courses : []);
    }
    
    content.innerHTML = html;
    initCourseActions();
  } catch (error) {
    content.innerHTML = '<div class="text-center py-12 text-red-500">Failed to load data</div>';
  }
}

function renderStudentsTable(students) {
  if (!students.length) return '<div class="text-center py-12 text-gray-500">No students enrolled yet</div>';
  
  return `
    <div class="overflow-x-auto">
      <table class="admin-table">
        <thead><tr><th>Date</th><th>Name</th><th>Email</th><th>Phone</th><th>Course</th></tr></thead>
        <tbody>
          ${students.map(s => `<tr><td>${s.timestamp}</td><td>${s.name}</td><td>${s.email}</td><td>${s.phone}</td><td>${s.course}</td></tr>`).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function renderMessagesTable(messages) {
  if (!messages.length) return '<div class="text-center py-12 text-gray-500">No messages yet</div>';
  
  return `
    <div class="overflow-x-auto">
      <table class="admin-table">
        <thead><tr><th>Date</th><th>Name</th><th>Email</th><th>Message</th></tr></thead>
        <tbody>
          ${messages.map(m => `<tr><td>${m.timestamp}</td><td>${m.name}</td><td>${m.email}</td><td class="max-w-xs truncate">${m.message}</td></tr>`).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function renderCoursesManager(courses) {
  return `
    <div class="mb-6">
      <button onclick="showCourseModal()" class="btn-primary">+ Add Course</button>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      ${courses.map(c => `
        <div class="admin-card">
          <img src="${c.imageUrl || 'https://via.placeholder.com/300x150'}" alt="${c.name}" class="w-full h-32 object-cover rounded-lg mb-4">
          <h4 class="font-bold text-lg">${c.name}</h4>
          <p class="text-sm text-gray-600">${c.duration} | ₹${c.fees}</p>
          <p class="text-sm text-gray-500 line-clamp-2 mt-2">${c.syllabus}</p>
          <div class="flex gap-2 mt-4">
            <button onclick="editCourse('${c.id}')" class="text-indigo-600 hover:underline text-sm">Edit</button>
            <button onclick="deleteCourse('${c.id}')" class="text-red-600 hover:underline text-sm">Delete</button>
          </div>
        </div>
      `).join('')}
    </div>
    
    <div id="course-modal" class="modal-overlay">
      <div class="modal-content">
        <h3 class="text-xl font-bold mb-4" id="modal-title">Add Course</h3>
        <form id="course-form">
          <input type="hidden" id="course-id">
          <div class="form-group"><label class="form-label">Course Name</label><input type="text" id="course-name" class="form-input" required></div>
          <div class="form-group"><label class="form-label">Duration</label><input type="text" id="course-duration" class="form-input" placeholder="e.g., 3 Months" required></div>
          <div class="form-group"><label class="form-label">Fees (₹)</label><input type="number" id="course-fees" class="form-input" required></div>
          <div class="form-group"><label class="form-label">Image URL</label><input type="url" id="course-image" class="form-input"></div>
          <div class="form-group"><label class="form-label">Syllabus</label><textarea id="course-syllabus" class="form-input" rows="3" required></textarea></div>
          <div class="flex gap-4 mt-6">
            <button type="submit" class="btn-primary flex-1">Save</button>
            <button type="button" onclick="closeCourseModal()" class="btn-secondary flex-1" style="border-color:#ccc;color:#666">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

function initCourseActions() {
  document.getElementById('course-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('course-id').value;
    const data = {
      name: document.getElementById('course-name').value,
      duration: document.getElementById('course-duration').value,
      fees: document.getElementById('course-fees').value,
      imageUrl: document.getElementById('course-image').value,
      syllabus: document.getElementById('course-syllabus').value
    };
    
    try {
      const action = id ? 'updateCourse' : 'addCourse';
      if (id) data.id = id;
      const res = await apiRequest(action, data);
      if (res.success) {
        showToast(id ? 'Course updated!' : 'Course added!', 'success');
        closeCourseModal();
        loadTabData('courses');
      } else throw new Error(res.error);
    } catch (error) {
      showToast(error.message, 'error');
    }
  });
}

window.showCourseModal = (course = null) => {
  document.getElementById('modal-title').textContent = course ? 'Edit Course' : 'Add Course';
  document.getElementById('course-id').value = course?.id || '';
  document.getElementById('course-name').value = course?.name || '';
  document.getElementById('course-duration').value = course?.duration || '';
  document.getElementById('course-fees').value = course?.fees || '';
  document.getElementById('course-image').value = course?.imageUrl || '';
  document.getElementById('course-syllabus').value = course?.syllabus || '';
  document.getElementById('course-modal').classList.add('active');
};

window.closeCourseModal = () => document.getElementById('course-modal').classList.remove('active');

window.editCourse = async (id) => {
  const res = await apiGet('getCourses');
  const course = res.courses?.find(c => c.id === id);
  if (course) showCourseModal(course);
};

window.deleteCourse = async (id) => {
  if (!confirm('Delete this course?')) return;
  try {
    const res = await apiRequest('deleteCourse', { id });
    if (res.success) {
      showToast('Course deleted!', 'success');
      loadTabData('courses');
    } else throw new Error(res.error);
  } catch (error) {
    showToast(error.message, 'error');
  }
};
