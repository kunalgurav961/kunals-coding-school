/**
 * Kunal's Coding School - Main JavaScript
 * Common functionality used across all pages
 */

// ============== Mobile Menu Toggle ==============
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      // Toggle hamburger icon
      const icon = menuBtn.querySelector('svg');
      if (mobileMenu.classList.contains('active')) {
        icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>`;
      } else {
        icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>`;
      }
    });
    
    // Close menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
      });
    });
  }
}

// ============== Navbar Scroll Effect ==============
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }
}

// ============== Smooth Scroll ==============
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]:not(.whatsapp-float)').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      // Only scroll if there's a valid target (not just "#")
      if (targetId && targetId !== '#') {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
}

// ============== API Fetch Wrapper ==============
async function apiRequest(action, data = {}) {
  try {
    const response = await fetch(CONFIG.API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify({ action, ...data })
    });
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('API Error:', error);
    return { success: false, error: 'Network error. Please try again.' };
  }
}

// GET request for fetching data
async function apiGet(action) {
  try {
    const url = `${CONFIG.API_URL}?action=${action}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('API Error:', error);
    return { success: false, error: 'Network error. Please try again.' };
  }
}

// ============== Toast Notifications ==============
function showToast(message, type = 'info') {
  // Create container if not exists
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  
  // Create toast
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  // Icon based on type
  let icon = '';
  switch(type) {
    case 'success':
      icon = `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>`;
      break;
    case 'error':
      icon = `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>`;
      break;
    default:
      icon = `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;
  }
  
  toast.innerHTML = `${icon}<span>${message}</span>`;
  container.appendChild(toast);
  
  // Remove after 4 seconds
  setTimeout(() => {
    toast.style.animation = 'fadeInRight 0.3s ease reverse';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// ============== Form Validation Helpers ==============
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePhone(phone) {
  const re = /^[0-9]{10}$/;
  return re.test(phone.replace(/\D/g, ''));
}

function showFieldError(field, message) {
  field.classList.add('error');
  field.classList.remove('success');
  
  // Remove existing error message
  const existingError = field.parentElement.querySelector('.error-message');
  if (existingError) existingError.remove();
  
  // Add error message
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = message;
  field.parentElement.appendChild(errorDiv);
}

function clearFieldError(field) {
  field.classList.remove('error');
  field.classList.add('success');
  
  const existingError = field.parentElement.querySelector('.error-message');
  if (existingError) existingError.remove();
}

// ============== Loading State ==============
function setLoading(button, isLoading) {
  if (isLoading) {
    button.disabled = true;
    button.dataset.originalText = button.innerHTML;
    button.innerHTML = `
      <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span>Processing...</span>
    `;
  } else {
    button.disabled = false;
    button.innerHTML = button.dataset.originalText;
  }
}

// ============== Intersection Observer for Animations ==============
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('[data-animate]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const animation = entry.target.dataset.animate;
        entry.target.classList.add(`animate-${animation}`);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
}

// ============== WhatsApp Button ==============
function initWhatsAppButton() {
  const whatsappBtn = document.querySelector('.whatsapp-float');
  if (whatsappBtn && CONFIG.WHATSAPP_NUMBER) {
    const message = encodeURIComponent(CONFIG.WHATSAPP_MESSAGE);
    whatsappBtn.href = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${message}`;
  }
}

// ============== Initialize Everything ==============
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initNavbarScroll();
  initSmoothScroll();
  initScrollAnimations();
  initWhatsAppButton();
});

// ============== Expose functions globally ==============
window.apiRequest = apiRequest;
window.apiGet = apiGet;
window.showToast = showToast;
window.validateEmail = validateEmail;
window.validatePhone = validatePhone;
window.showFieldError = showFieldError;
window.clearFieldError = clearFieldError;
window.setLoading = setLoading;
