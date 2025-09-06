# FitZone Gym Management System

A modern, responsive gym management website built with HTML, CSS, and JavaScript. This application provides a complete solution for managing gym members, scheduling classes, tracking membership plans, and generating reports.

## Features

### 🏠 Dashboard
- Real-time statistics display
- Quick action buttons
- Recent activity feed
- Revenue tracking
- Member growth metrics

### 👥 Member Management
- Add, edit, and delete members
- Search and filter functionality
- Member status tracking (Active, Inactive, Expired)
- Membership plan assignment
- Contact information management

### 📅 Class Scheduling
- Weekly schedule view
- Add new classes with instructor assignment
- Capacity management
- Time slot organization
- Class navigation (previous/next week)

### 💳 Membership Plans
- Three-tier plan structure (Basic, Premium, VIP)
- Feature comparison
- Pricing display
- Plan management capabilities

### 📊 Reports & Analytics
- Revenue reporting
- Membership growth tracking
- Class attendance analytics
- Data visualization placeholders

## Mobile Compatibility

The website is fully responsive and mobile-optimized with:
- Mobile-first design approach
- Touch-friendly navigation
- Responsive grid layouts
- Mobile hamburger menu
- Swipe navigation support
- Optimized touch targets

## Technical Features

### Progressive Web App (PWA)
- Service Worker implementation
- Offline capability
- App manifest for installation
- Mobile app-like experience

### User Experience
- Smooth animations and transitions
- Modal dialogs for forms
- Real-time notifications
- Keyboard shortcuts support
- Loading states and feedback

### Responsive Design
- Breakpoints for mobile, tablet, and desktop
- Flexible grid systems
- Scalable typography
- Adaptive navigation
- Touch-optimized controls

## File Structure

```
/workspace/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and responsive design
├── script.js           # JavaScript functionality
├── sw.js              # Service Worker for PWA
├── manifest.json      # Web App Manifest
└── README.md          # Project documentation
```

## Getting Started

1. **Open the website**: Simply open `index.html` in a modern web browser
2. **Local Server** (recommended): Use a local server for full functionality
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```
3. **Access**: Navigate to `http://localhost:8000` in your browser

## Browser Support

- Chrome/Edge 70+
- Firefox 65+
- Safari 12+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Key Technologies

- **HTML5**: Semantic markup and modern web standards
- **CSS3**: Flexbox, Grid, Custom Properties, Animations
- **JavaScript ES6+**: Modern JavaScript features
- **Font Awesome**: Icon library
- **Google Fonts**: Poppins font family

## Features in Detail

### Dashboard Statistics
- Active member count
- Daily class count  
- Monthly revenue calculation
- Growth rate display

### Member Management
- Full CRUD operations
- Real-time search
- Status filtering
- Form validation
- Data persistence (localStorage ready)

### Class Scheduling
- Weekly view
- Time-based organization
- Instructor assignment
- Capacity tracking
- Enrollment management

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## Customization

### Colors
The color scheme can be modified by updating CSS custom properties:
```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --success-color: #28a745;
  --danger-color: #dc3545;
}
```

### Branding
- Update logo and brand name in navigation
- Modify color gradients in CSS
- Replace icons as needed
- Update manifest.json for PWA branding

## Future Enhancements

- Backend integration (REST API)
- Database connectivity
- Payment processing
- Email notifications
- Advanced reporting with charts
- Multi-location support
- Staff management
- Equipment tracking

## License

This project is open source and available under the MIT License.

## Support

For questions or support, please refer to the code comments or create an issue in the project repository.