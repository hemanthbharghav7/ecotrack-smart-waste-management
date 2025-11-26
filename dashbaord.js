document.addEventListener('DOMContentLoaded', () => {
    // 1. Selectors
    const navItems = document.querySelectorAll('.menu-item[data-page]');
    const pages = document.querySelectorAll('.page-section');
    const themeBtn = document.getElementById('theme-toggle');
    const notificationBtn = document.getElementById('notification-btn');
    const notificationDropdown = document.getElementById('notification-dropdown');
    const body = document.body;
//image upload
   const uploadBox = document.getElementById('upload-box');
const wasteImgInput = document.getElementById('waste-img');

uploadBox.addEventListener('click', () => {
    wasteImgInput.click();  // opens file picker
});

wasteImgInput.addEventListener('change', () => {
    if(wasteImgInput.files.length > 0) {
        uploadBox.querySelector('p').innerHTML = 
            `<strong>${wasteImgInput.files[0].name}</strong> selected`;
    }
});

    // ... The rest of the existing JavaScript continues below this ...

    // 2. Navigation Logic (SPA Feel)
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            // Add active class to clicked item
            item.classList.add('active');

            // Hide all pages
            const targetId = item.getAttribute('data-page') + '-page';
            pages.forEach(page => {
                page.classList.remove('active');
                if(page.id === targetId) {
                    // Add active class with a slight delay for animation if needed
                    setTimeout(() => page.classList.add('active'), 50);
                }
            });
        });
    });

    // 3. Notification Toggle
    notificationBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        notificationDropdown.classList.toggle('hidden');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!notificationBtn.contains(e.target) && !notificationDropdown.contains(e.target)) {
            notificationDropdown.classList.add('hidden');
        }
    });

    // 4. Theme Switcher
    // Check local storage for theme preference
    if(localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }

    themeBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if(body.classList.contains('dark-mode')) {
            themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        } else {
            themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        }
    });

    // 5. Live Clock
    function updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { hour12: false });
        const dateString = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        
        document.getElementById('time').textContent = timeString;
        document.getElementById('date').textContent = dateString;
    }
    setInterval(updateClock, 1000);
    updateClock(); // Initial call

    // 6. Form Input Focus Effects (Optional Logic Enhancement)
    const inputs = document.querySelectorAll('.input-wrapper input, .input-wrapper select, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.style.borderColor = 'var(--primary)';
        });
        input.addEventListener('blur', () => {
            input.parentElement.style.borderColor = 'var(--border-light)';
        });
    });
});