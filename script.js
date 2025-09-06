// Global Variables
let currentSection = 'dashboard';
let members = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@email.com',
        phone: '+1 (555) 123-4567',
        plan: 'premium',
        status: 'active',
        joinDate: '2024-01-15'
    },
    {
        id: 2,
        name: 'Sarah Smith',
        email: 'sarah.smith@email.com',
        phone: '+1 (555) 234-5678',
        plan: 'basic',
        status: 'active',
        joinDate: '2024-02-20'
    },
    {
        id: 3,
        name: 'Mike Johnson',
        email: 'mike.johnson@email.com',
        phone: '+1 (555) 345-6789',
        plan: 'vip',
        status: 'inactive',
        joinDate: '2023-12-10'
    },
    {
        id: 4,
        name: 'Emily Davis',
        email: 'emily.davis@email.com',
        phone: '+1 (555) 456-7890',
        plan: 'premium',
        status: 'active',
        joinDate: '2024-03-05'
    },
    {
        id: 5,
        name: 'David Wilson',
        email: 'david.wilson@email.com',
        phone: '+1 (555) 567-8901',
        plan: 'basic',
        status: 'expired',
        joinDate: '2023-11-22'
    }
];

let classes = [
    {
        id: 1,
        name: 'Morning Yoga',
        instructor: 'Lisa Chen',
        date: '2024-01-15',
        time: '07:00',
        capacity: 20,
        enrolled: 15,
        day: 'monday'
    },
    {
        id: 2,
        name: 'HIIT Training',
        instructor: 'Mark Thompson',
        date: '2024-01-15',
        time: '18:00',
        capacity: 15,
        enrolled: 12,
        day: 'monday'
    },
    {
        id: 3,
        name: 'Pilates',
        instructor: 'Anna Rodriguez',
        date: '2024-01-16',
        time: '09:30',
        capacity: 18,
        enrolled: 16,
        day: 'tuesday'
    },
    {
        id: 4,
        name: 'CrossFit',
        instructor: 'Jake Miller',
        date: '2024-01-16',
        time: '17:30',
        capacity: 12,
        enrolled: 10,
        day: 'tuesday'
    },
    {
        id: 5,
        name: 'Zumba',
        instructor: 'Maria Garcia',
        date: '2024-01-17',
        time: '19:00',
        capacity: 25,
        enrolled: 22,
        day: 'wednesday'
    }
];

let currentWeekOffset = 0;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize App
function initializeApp() {
    setupNavigation();
    setupMobileMenu();
    populateMembers();
    populateSchedule();
    setupSearchAndFilter();
    setupForms();
    updateDashboardStats();
    
    // Show dashboard by default
    showSection('dashboard');
}

// Navigation Setup
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('href').substring(1);
            showSection(sectionId);
            
            // Close mobile menu if open
            const navMenu = document.getElementById('nav-menu');
            const hamburger = document.getElementById('hamburger');
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Mobile Menu Setup
function setupMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// Show Section
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        currentSection = sectionId;
    }
    
    // Update navigation active state
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
        }
    });
}

// Update Dashboard Stats
function updateDashboardStats() {
    const totalMembers = members.filter(member => member.status === 'active').length;
    const todaysClasses = classes.length;
    const monthlyRevenue = calculateMonthlyRevenue();
    const growthRate = '+18%'; // This would be calculated based on historical data
    
    document.getElementById('total-members').textContent = totalMembers;
    document.getElementById('todays-classes').textContent = todaysClasses;
    document.getElementById('monthly-revenue').textContent = '$' + monthlyRevenue.toLocaleString();
    document.getElementById('growth-rate').textContent = growthRate;
}

// Calculate Monthly Revenue
function calculateMonthlyRevenue() {
    let revenue = 0;
    members.forEach(member => {
        if (member.status === 'active') {
            switch (member.plan) {
                case 'basic':
                    revenue += 29;
                    break;
                case 'premium':
                    revenue += 59;
                    break;
                case 'vip':
                    revenue += 99;
                    break;
            }
        }
    });
    return revenue;
}

// Populate Members Table
function populateMembers(filteredMembers = null) {
    const tbody = document.getElementById('members-tbody');
    const membersToShow = filteredMembers || members;
    
    tbody.innerHTML = '';
    
    membersToShow.forEach(member => {
        const row = document.createElement('tr');
        
        const planText = {
            'basic': 'Basic - $29/month',
            'premium': 'Premium - $59/month',
            'vip': 'VIP - $99/month'
        };
        
        row.innerHTML = `
            <td>${member.name}</td>
            <td>${member.email}</td>
            <td>${planText[member.plan]}</td>
            <td><span class="status-badge status-${member.status}">${member.status}</span></td>
            <td>${formatDate(member.joinDate)}</td>
            <td>
                <button class="btn btn-outline" onclick="editMember(${member.id})" style="padding: 6px 12px; margin-right: 5px;">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-danger" onclick="deleteMember(${member.id})" style="padding: 6px 12px;">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

// Format Date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Search and Filter Setup
function setupSearchAndFilter() {
    const searchInput = document.getElementById('member-search');
    const filterSelect = document.getElementById('member-filter');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filterMembers();
        });
    }
    
    if (filterSelect) {
        filterSelect.addEventListener('change', function() {
            filterMembers();
        });
    }
}

// Filter Members
function filterMembers() {
    const searchTerm = document.getElementById('member-search').value.toLowerCase();
    const statusFilter = document.getElementById('member-filter').value;
    
    let filteredMembers = members;
    
    // Apply search filter
    if (searchTerm) {
        filteredMembers = filteredMembers.filter(member =>
            member.name.toLowerCase().includes(searchTerm) ||
            member.email.toLowerCase().includes(searchTerm)
        );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
        filteredMembers = filteredMembers.filter(member =>
            member.status === statusFilter
        );
    }
    
    populateMembers(filteredMembers);
}

// Populate Schedule
function populateSchedule() {
    const scheduleGrid = document.getElementById('schedule-grid');
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const dayKeys = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    
    scheduleGrid.innerHTML = '';
    
    days.forEach((day, index) => {
        const dayElement = document.createElement('div');
        dayElement.className = 'schedule-day';
        
        const dayClasses = classes.filter(cls => cls.day === dayKeys[index]);
        
        let classesHTML = '';
        dayClasses.forEach(cls => {
            classesHTML += `
                <div class="class-item">
                    <div class="class-time">${formatTime(cls.time)}</div>
                    <div class="class-name">${cls.name}</div>
                    <div class="class-instructor">${cls.instructor}</div>
                    <div class="class-capacity">${cls.enrolled}/${cls.capacity}</div>
                </div>
            `;
        });
        
        dayElement.innerHTML = `
            <h3>${day}</h3>
            ${classesHTML}
        `;
        
        scheduleGrid.appendChild(dayElement);
    });
}

// Format Time
function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
}

// Schedule Navigation
function previousWeek() {
    currentWeekOffset--;
    updateWeekDisplay();
}

function nextWeek() {
    currentWeekOffset++;
    updateWeekDisplay();
}

function updateWeekDisplay() {
    const currentWeekElement = document.getElementById('current-week');
    if (currentWeekOffset === 0) {
        currentWeekElement.textContent = 'This Week';
    } else if (currentWeekOffset === 1) {
        currentWeekElement.textContent = 'Next Week';
    } else if (currentWeekOffset === -1) {
        currentWeekElement.textContent = 'Last Week';
    } else {
        currentWeekElement.textContent = `${Math.abs(currentWeekOffset)} weeks ${currentWeekOffset > 0 ? 'ahead' : 'ago'}`;
    }
}

// Modal Functions
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Reset form if it exists
        const form = modal.querySelector('form');
        if (form) {
            form.reset();
        }
    }
}

// Show Add Member Modal
function showAddMemberModal() {
    showModal('add-member-modal');
}

// Show Add Class Modal
function showAddClassModal() {
    showModal('add-class-modal');
}

// Show Add Plan Modal
function showAddPlanModal() {
    alert('Add Plan functionality would be implemented here. This would open a modal similar to the member and class modals.');
}

// Setup Forms
function setupForms() {
    // Add Member Form
    const addMemberForm = document.getElementById('add-member-form');
    if (addMemberForm) {
        addMemberForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleAddMember();
        });
    }
    
    // Add Class Form
    const addClassForm = document.getElementById('add-class-form');
    if (addClassForm) {
        addClassForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleAddClass();
        });
    }
    
    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Handle Add Member
function handleAddMember() {
    const name = document.getElementById('member-name').value;
    const email = document.getElementById('member-email').value;
    const phone = document.getElementById('member-phone').value;
    const plan = document.getElementById('member-plan').value;
    
    if (!name || !email || !phone || !plan) {
        alert('Please fill in all fields');
        return;
    }
    
    const newMember = {
        id: members.length + 1,
        name: name,
        email: email,
        phone: phone,
        plan: plan,
        status: 'active',
        joinDate: new Date().toISOString().split('T')[0]
    };
    
    members.push(newMember);
    populateMembers();
    updateDashboardStats();
    closeModal('add-member-modal');
    
    // Add to activity feed
    addActivity(`New member <strong>${name}</strong> added`, 'fas fa-user-plus');
    
    showNotification('Member added successfully!', 'success');
}

// Handle Add Class
function handleAddClass() {
    const name = document.getElementById('class-name').value;
    const instructor = document.getElementById('class-instructor').value;
    const date = document.getElementById('class-date').value;
    const time = document.getElementById('class-time').value;
    const capacity = document.getElementById('class-capacity').value;
    
    if (!name || !instructor || !date || !time || !capacity) {
        alert('Please fill in all fields');
        return;
    }
    
    // Determine day of week
    const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    
    const newClass = {
        id: classes.length + 1,
        name: name,
        instructor: instructor,
        date: date,
        time: time,
        capacity: parseInt(capacity),
        enrolled: 0,
        day: dayOfWeek
    };
    
    classes.push(newClass);
    populateSchedule();
    updateDashboardStats();
    closeModal('add-class-modal');
    
    // Add to activity feed
    addActivity(`New class <strong>${name}</strong> scheduled`, 'fas fa-calendar-plus');
    
    showNotification('Class scheduled successfully!', 'success');
}

// Edit Member
function editMember(memberId) {
    const member = members.find(m => m.id === memberId);
    if (member) {
        // Pre-fill form with member data
        document.getElementById('member-name').value = member.name;
        document.getElementById('member-email').value = member.email;
        document.getElementById('member-phone').value = member.phone;
        document.getElementById('member-plan').value = member.plan;
        
        // Change form submission to update instead of add
        const form = document.getElementById('add-member-form');
        form.onsubmit = function(e) {
            e.preventDefault();
            updateMember(memberId);
        };
        
        // Change modal title
        document.querySelector('#add-member-modal .modal-header h2').textContent = 'Edit Member';
        document.querySelector('#add-member-form button[type="submit"]').textContent = 'Update Member';
        
        showModal('add-member-modal');
    }
}

// Update Member
function updateMember(memberId) {
    const memberIndex = members.findIndex(m => m.id === memberId);
    if (memberIndex !== -1) {
        members[memberIndex].name = document.getElementById('member-name').value;
        members[memberIndex].email = document.getElementById('member-email').value;
        members[memberIndex].phone = document.getElementById('member-phone').value;
        members[memberIndex].plan = document.getElementById('member-plan').value;
        
        populateMembers();
        updateDashboardStats();
        closeModal('add-member-modal');
        
        // Reset form back to add mode
        resetMemberForm();
        
        showNotification('Member updated successfully!', 'success');
    }
}

// Delete Member
function deleteMember(memberId) {
    if (confirm('Are you sure you want to delete this member?')) {
        const memberIndex = members.findIndex(m => m.id === memberId);
        if (memberIndex !== -1) {
            const memberName = members[memberIndex].name;
            members.splice(memberIndex, 1);
            populateMembers();
            updateDashboardStats();
            
            // Add to activity feed
            addActivity(`Member <strong>${memberName}</strong> removed`, 'fas fa-user-minus');
            
            showNotification('Member deleted successfully!', 'success');
        }
    }
}

// Reset Member Form
function resetMemberForm() {
    const form = document.getElementById('add-member-form');
    form.onsubmit = function(e) {
        e.preventDefault();
        handleAddMember();
    };
    
    document.querySelector('#add-member-modal .modal-header h2').textContent = 'Add New Member';
    document.querySelector('#add-member-form button[type="submit"]').textContent = 'Add Member';
}

// Add Activity
function addActivity(message, iconClass) {
    const activityList = document.getElementById('activity-list');
    const activityItem = document.createElement('div');
    activityItem.className = 'activity-item';
    
    activityItem.innerHTML = `
        <div class="activity-icon">
            <i class="${iconClass}"></i>
        </div>
        <div class="activity-content">
            <p>${message}</p>
            <span class="activity-time">Just now</span>
        </div>
    `;
    
    // Add to top of list
    activityList.insertBefore(activityItem, activityList.firstChild);
    
    // Keep only last 10 activities
    while (activityList.children.length > 10) {
        activityList.removeChild(activityList.lastChild);
    }
}

// Show Notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#d4edda' : '#cce7ff'};
        color: ${type === 'success' ? '#155724' : '#004085'};
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 3000;
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 300px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Generate Report
function generateReport() {
    const reportData = {
        totalMembers: members.length,
        activeMembers: members.filter(m => m.status === 'active').length,
        inactiveMembers: members.filter(m => m.status === 'inactive').length,
        expiredMembers: members.filter(m => m.status === 'expired').length,
        totalClasses: classes.length,
        monthlyRevenue: calculateMonthlyRevenue(),
        planDistribution: {
            basic: members.filter(m => m.plan === 'basic').length,
            premium: members.filter(m => m.plan === 'premium').length,
            vip: members.filter(m => m.plan === 'vip').length
        }
    };
    
    // In a real application, this would generate a PDF or export data
    alert(`Monthly Report Generated!\n\nTotal Members: ${reportData.totalMembers}\nActive Members: ${reportData.activeMembers}\nTotal Classes: ${reportData.totalClasses}\nMonthly Revenue: $${reportData.monthlyRevenue}\n\nThis would normally generate a detailed PDF report.`);
    
    addActivity('Monthly report generated', 'fas fa-file-alt');
}

// Keyboard Shortcuts
document.addEventListener('keydown', function(e) {
    // ESC to close modals
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (modal.style.display === 'block') {
                closeModal(modal.id);
            }
        });
    }
    
    // Ctrl/Cmd + N to add new member
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        if (currentSection === 'members') {
            showAddMemberModal();
        } else if (currentSection === 'classes') {
            showAddClassModal();
        }
    }
});

// Add CSS for notifications animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification-close {
        background: none;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        color: inherit;
        opacity: 0.7;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
`;
document.head.appendChild(style);

// Touch Events for Mobile Swipe Navigation
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
        const sections = ['dashboard', 'members', 'classes', 'plans', 'reports'];
        const currentIndex = sections.indexOf(currentSection);
        
        if (swipeDistance > 0 && currentIndex > 0) {
            // Swipe right - go to previous section
            showSection(sections[currentIndex - 1]);
        } else if (swipeDistance < 0 && currentIndex < sections.length - 1) {
            // Swipe left - go to next section
            showSection(sections[currentIndex + 1]);
        }
    }
}

// Service Worker Registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}