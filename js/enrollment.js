/**
 * Kunal's Coding School - Enrollment Form Handler
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('enrollment-form');
  if (form) initEnrollmentForm(form);
});

function initEnrollmentForm(form) {
  const nameInput = form.querySelector('#name');
  const emailInput = form.querySelector('#email');
  const phoneInput = form.querySelector('#phone');
  const courseSelect = form.querySelector('#course-select');
  const submitBtn = form.querySelector('button[type="submit"]');
  
  emailInput?.addEventListener('blur', () => {
    if (emailInput.value && !validateEmail(emailInput.value)) {
      showFieldError(emailInput, 'Please enter a valid email');
    } else if (emailInput.value) {
      clearFieldError(emailInput);
    }
  });
  
  phoneInput?.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
  });
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let isValid = true;
    
    if (!nameInput.value.trim()) { showFieldError(nameInput, 'Required'); isValid = false; }
    else clearFieldError(nameInput);
    
    if (!validateEmail(emailInput.value)) { showFieldError(emailInput, 'Invalid email'); isValid = false; }
    else clearFieldError(emailInput);
    
    if (!validatePhone(phoneInput.value)) { showFieldError(phoneInput, 'Invalid phone'); isValid = false; }
    else clearFieldError(phoneInput);
    
    if (!courseSelect.value) { showFieldError(courseSelect, 'Select course'); isValid = false; }
    else clearFieldError(courseSelect);
    
    if (!isValid) { showToast('Fill all fields correctly', 'error'); return; }
    
    setLoading(submitBtn, true);
    
    try {
      const response = await apiRequest('submitEnrollment', {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim(),
        course: courseSelect.value
      });
      
      if (response.success) {
        showSuccessState(form);
        showToast('Enrollment successful!', 'success');
      } else throw new Error(response.error);
    } catch (error) {
      showToast(error.message || 'Failed to submit', 'error');
      setLoading(submitBtn, false);
    }
  });
}

function showSuccessState(form) {
  form.parentElement.innerHTML = `
    <div class="text-center py-12 animate-fade-in-up">
      <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg class="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
      </div>
      <h3 class="text-2xl font-bold text-gray-800 mb-3">Enrollment Successful! 🎉</h3>
      <p class="text-gray-600 mb-6">Check your email for course details. We'll contact you shortly.</p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="courses.html" class="btn-primary">View More Courses</a>
        <a href="index.html" class="btn-secondary" style="border-color: var(--primary); color: var(--primary);">Back to Home</a>
      </div>
    </div>
  `;
}
