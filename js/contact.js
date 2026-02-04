/**
 * Kunal's Coding School - Contact Form Handler
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (form) initContactForm(form);
});

function initContactForm(form) {
  const nameInput = form.querySelector('#contact-name');
  const emailInput = form.querySelector('#contact-email');
  const messageInput = form.querySelector('#contact-message');
  const submitBtn = form.querySelector('button[type="submit"]');
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let isValid = true;
    
    if (!nameInput.value.trim()) { showFieldError(nameInput, 'Required'); isValid = false; }
    else clearFieldError(nameInput);
    
    if (!validateEmail(emailInput.value)) { showFieldError(emailInput, 'Invalid email'); isValid = false; }
    else clearFieldError(emailInput);
    
    if (!messageInput.value.trim()) { showFieldError(messageInput, 'Required'); isValid = false; }
    else clearFieldError(messageInput);
    
    if (!isValid) { showToast('Fill all fields correctly', 'error'); return; }
    
    setLoading(submitBtn, true);
    
    try {
      const response = await apiRequest('submitContact', {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        message: messageInput.value.trim()
      });
      
      if (response.success) {
        showContactSuccess(form);
        showToast('Message sent successfully!', 'success');
      } else throw new Error(response.error);
    } catch (error) {
      showToast(error.message || 'Failed to send', 'error');
      setLoading(submitBtn, false);
    }
  });
}

function showContactSuccess(form) {
  form.parentElement.innerHTML = `
    <div class="text-center py-12 animate-fade-in-up">
      <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg class="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
      </div>
      <h3 class="text-2xl font-bold text-gray-800 mb-3">Message Sent! ✉️</h3>
      <p class="text-gray-600 mb-6">Thank you for reaching out. We'll get back to you soon.</p>
      <a href="index.html" class="btn-primary">Back to Home</a>
    </div>
  `;
}
