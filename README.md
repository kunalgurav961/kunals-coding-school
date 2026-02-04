# Kunal's Coding School - Website

A professional, mobile-first coding institute website built with HTML, Tailwind CSS, and vanilla JavaScript. Works perfectly on GitHub Pages with Google Sheets as the database and Google Apps Script as the backend.

## 🚀 Quick Start

### 1. Google Sheets Setup

1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet
2. Note the **Spreadsheet ID** from the URL:
   ```
   https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit
   ```
3. The spreadsheet will have 4 sheets created automatically by the setup script

### 2. Google Apps Script Setup

1. In your Google Spreadsheet, go to **Extensions → Apps Script**
2. Delete any existing code and paste the contents of `google-apps-script/Code.gs`
3. Replace `YOUR_GOOGLE_SPREADSHEET_ID_HERE` with your actual Spreadsheet ID
4. Save the project (Ctrl+S)
5. Run the `setupSpreadsheet` function once:
   - Click the dropdown next to "Debug" → Select `setupSpreadsheet`
   - Click "Run" button
   - Authorize the app when prompted
6. Deploy as Web App:
   - Click **Deploy → New deployment**
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click **Deploy**
7. Copy the **Web app URL**

### 3. Update Configuration

1. Open `js/config.js`
2. Replace `YOUR_GOOGLE_APPS_SCRIPT_DEPLOYMENT_URL_HERE` with your Web app URL
3. Update `WHATSAPP_NUMBER` with your actual WhatsApp number

### 4. GitHub Pages Deployment

1. Create a new GitHub repository
2. Upload all files from the `KunalsCodingSchool` folder
3. Go to **Settings → Pages**
4. Source: **Deploy from a branch**
5. Branch: **main** (or master), folder: **/ (root)**
6. Click **Save**
7. Your site will be live at `https://[username].github.io/[repo-name]/`

## 📁 Project Structure

```
KunalsCodingSchool/
├── index.html          # Home page
├── courses.html        # All courses listing
├── enroll.html         # Student enrollment form
├── about.html          # About us page
├── contact.html        # Contact form
├── admin.html          # Admin panel
├── css/
│   └── styles.css      # Custom styles
├── js/
│   ├── config.js       # Configuration
│   ├── main.js         # Common functionality
│   ├── courses.js      # Course loading
│   ├── enrollment.js   # Enrollment form
│   ├── contact.js      # Contact form
│   └── admin.js        # Admin panel logic
├── images/             # Static images
├── google-apps-script/
│   └── Code.gs         # Backend code
└── README.md           # This file
```

## 📊 Google Sheets Structure

After running `setupSpreadsheet`, your sheets will have:

### Students Sheet

| Timestamp | Name | Email | Phone | Course Name |
| --------- | ---- | ----- | ----- | ----------- |

### Contacts Sheet

| Timestamp | Name | Email | Message |
| --------- | ---- | ----- | ------- |

### Courses Sheet

| Course ID | Course Name | Duration | Fees | Short Syllabus | Image URL |
| --------- | ----------- | -------- | ---- | -------------- | --------- |

### Admin Sheet

| Email                 | Password |
| --------------------- | -------- |
| admin@kunalcoding.com | admin123 |

**⚠️ Change the default admin credentials immediately!**

## 🎨 Features

- ✅ Mobile-first responsive design
- ✅ Professional tech-themed UI
- ✅ Dynamic course loading from Google Sheets
- ✅ Student enrollment with email notifications
- ✅ Contact form with email confirmations
- ✅ Admin panel with login authentication
- ✅ CRUD operations for courses
- ✅ WhatsApp floating button
- ✅ Smooth animations
- ✅ SEO optimized

## 📧 Email System

The backend automatically sends:

1. **To Students:**
   - Enrollment confirmation with course details
   - Contact form acknowledgment

2. **To Admin (kunalgurav961@gmail.com):**
   - New enrollment notifications
   - New contact message alerts

## 🔒 Admin Panel

Access: `your-site.com/admin.html`

Default Credentials:

- Email: `admin@kunalcoding.com`
- Password: `admin123`

Features:

- View enrolled students
- View contact messages
- Add/Edit/Delete courses

## ⚠️ Important Notes

1. **Email Quota**: Google Apps Script has a limit of 100 emails/day for free accounts
2. **CORS**: The script uses `doGet` and `doPost` which handle CORS automatically
3. **Security**: Change default admin credentials in the Admin sheet
4. **Images**: Course images should be hosted URLs (use Imgur, Cloudinary, etc.)

## 🛠️ Customization

### Change Colors

Edit CSS variables in `css/styles.css`:

```css
:root {
  --primary: #6366f1;
  --secondary: #10b981;
  --accent: #f59e0b;
}
```

### Add New Course

1. Login to admin panel
2. Go to "Courses" tab
3. Click "Add Course"
4. Fill in details and save

Or directly add in Google Sheets Courses tab.

## 📱 Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## 📞 Support

For any issues or questions, contact:

- Email: kunalgurav961@gmail.com
- WhatsApp: +91 98765 43210

---

Built with ❤️ by Kunal's Coding School
