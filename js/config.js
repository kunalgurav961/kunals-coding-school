/**
 * Kunal's Coding School - Configuration
 * Update these values with your Google Apps Script deployment URL
 */

const CONFIG = {
  // Google Apps Script Web App URL (Deploy as Web App and paste URL here)
  API_URL: 'https://script.google.com/macros/s/AKfycbx_X-1zfV5-Puiu26733MCLWO4-Rzl90BaUvTyKilTyPNnWjH6o0tlMTLIjFsE3X2UxUg/exec',
  
  // Admin email for notifications
  ADMIN_EMAIL: 'kunalgurav961@gmail.com',
  
  // WhatsApp number for floating button (with country code, no + symbol)
  WHATSAPP_NUMBER: '919028908958', // India number with country code
  
  // WhatsApp message template
  WHATSAPP_MESSAGE: 'Hi! I am interested in learning more about Kunal\'s Coding School courses.',
  
  // Website Information
  SITE_NAME: "Kunal's Coding School",
  SITE_TAGLINE: "Learn to Code, Build Your Future",
  
  // Social Links
  SOCIAL_LINKS: {
    facebook: '#',
    twitter: '#',
    instagram: '#',
    linkedin: '#',
    youtube: '#'
  }
};

// Make CONFIG globally accessible
window.CONFIG = CONFIG;
