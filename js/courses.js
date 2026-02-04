/**
 * Kunal's Coding School - Courses JavaScript
 * Handles dynamic course loading and display
 */

// ============== Render Course Cards ==============
function renderCourseCard(course) {
  return `
    <div class="course-card" data-animate="fade-in-up">
      <div class="overflow-hidden">
        <img src="${course.imageUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400'}" 
             alt="${course.name}" 
             loading="lazy">
      </div>
      <div class="card-body">
        <span class="course-badge">${course.duration}</span>
        <h3 class="text-xl font-bold text-gray-800 mt-3 mb-2">${course.name}</h3>
        <p class="text-gray-600 text-sm line-clamp-3 mb-4">${course.syllabus}</p>
        <div class="flex items-center justify-between">
          <div class="text-2xl font-bold text-indigo-600">₹${formatPrice(course.fees)}</div>
          <a href="enroll.html?course=${encodeURIComponent(course.name)}" class="btn-success text-sm">
            Enroll Now
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  `;
}

// ============== Format Price ==============
function formatPrice(price) {
  return Number(price).toLocaleString('en-IN');
}

// ============== Load All Courses ==============
async function loadCourses() {
  const container = document.getElementById('courses-container');
  if (!container) return;
  
  // Show loading skeletons
  container.innerHTML = Array(6).fill(0).map(() => `
    <div class="course-card">
      <div class="skeleton h-44 w-full rounded-t-xl"></div>
      <div class="p-6">
        <div class="skeleton h-4 w-20 mb-3"></div>
        <div class="skeleton h-6 w-3/4 mb-2"></div>
        <div class="skeleton h-4 w-full mb-1"></div>
        <div class="skeleton h-4 w-2/3 mb-4"></div>
        <div class="flex justify-between">
          <div class="skeleton h-8 w-20"></div>
          <div class="skeleton h-10 w-28 rounded-full"></div>
        </div>
      </div>
    </div>
  `).join('');
  
  try {
    const response = await apiGet('getCourses');
    
    if (response.success && response.courses) {
      if (response.courses.length > 0) {
        container.innerHTML = response.courses.map(renderCourseCard).join('');
        initScrollAnimations();
      } else {
        container.innerHTML = `
          <div class="col-span-full text-center py-16">
            <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
            </svg>
            <h3 class="text-xl font-semibold text-gray-700 mb-2">No Courses Available</h3>
            <p class="text-gray-500">Check back soon for new courses!</p>
          </div>
        `;
      }
    } else {
      throw new Error(response.error || 'Failed to load courses');
    }
  } catch (error) {
    console.error('Error loading courses:', error);
    container.innerHTML = `
      <div class="col-span-full text-center py-16">
        <svg class="w-16 h-16 mx-auto text-red-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
        </svg>
        <h3 class="text-xl font-semibold text-gray-700 mb-2">Failed to Load Courses</h3>
        <p class="text-gray-500 mb-4">Please check your internet connection</p>
        <button onclick="loadCourses()" class="btn-primary text-sm">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
          Try Again
        </button>
      </div>
    `;
  }
}

// ============== Load Featured Courses (For Homepage) ==============
async function loadFeaturedCourses() {
  const container = document.getElementById('featured-courses');
  if (!container) return;
  
  // Show loading skeletons
  container.innerHTML = Array(3).fill(0).map(() => `
    <div class="course-card">
      <div class="skeleton h-44 w-full rounded-t-xl"></div>
      <div class="p-6">
        <div class="skeleton h-4 w-20 mb-3"></div>
        <div class="skeleton h-6 w-3/4 mb-2"></div>
        <div class="skeleton h-4 w-full mb-1"></div>
        <div class="skeleton h-4 w-2/3 mb-4"></div>
        <div class="flex justify-between">
          <div class="skeleton h-8 w-20"></div>
          <div class="skeleton h-10 w-28 rounded-full"></div>
        </div>
      </div>
    </div>
  `).join('');
  
  try {
    const response = await apiGet('getCourses');
    
    if (response.success && response.courses) {
      // Show only first 3 courses for featured section
      const featuredCourses = response.courses.slice(0, 3);
      
      if (featuredCourses.length > 0) {
        container.innerHTML = featuredCourses.map(renderCourseCard).join('');
        initScrollAnimations();
      } else {
        container.innerHTML = `
          <div class="col-span-full text-center py-12">
            <p class="text-gray-500">Courses coming soon!</p>
          </div>
        `;
      }
    }
  } catch (error) {
    console.error('Error loading featured courses:', error);
    container.innerHTML = `
      <div class="col-span-full text-center py-12">
        <p class="text-gray-500">Unable to load courses. Please try again later.</p>
      </div>
    `;
  }
}

// ============== Populate Course Dropdown ==============
async function populateCourseDropdown() {
  const select = document.getElementById('course-select');
  if (!select) return;
  
  try {
    const response = await apiGet('getCourses');
    
    if (response.success && response.courses) {
      select.innerHTML = '<option value="">Select a Course</option>';
      
      response.courses.forEach(course => {
        const option = document.createElement('option');
        option.value = course.name;
        option.textContent = `${course.name} - ₹${formatPrice(course.fees)}`;
        select.appendChild(option);
      });
      
      // Pre-select course from URL parameter
      const urlParams = new URLSearchParams(window.location.search);
      const preselectedCourse = urlParams.get('course');
      if (preselectedCourse) {
        select.value = preselectedCourse;
      }
    }
  } catch (error) {
    console.error('Error populating course dropdown:', error);
  }
}

// ============== Initialize on Page Load ==============
document.addEventListener('DOMContentLoaded', () => {
  // Load courses based on page
  if (document.getElementById('courses-container')) {
    loadCourses();
  }
  
  if (document.getElementById('featured-courses')) {
    loadFeaturedCourses();
  }
  
  if (document.getElementById('course-select')) {
    populateCourseDropdown();
  }
});

// Expose functions globally
window.loadCourses = loadCourses;
window.loadFeaturedCourses = loadFeaturedCourses;
window.populateCourseDropdown = populateCourseDropdown;
