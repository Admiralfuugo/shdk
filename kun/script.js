const themeToggle = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Foydalanuvchi brauzerining boshlang'ich sozlamasini tekshirish
if (prefersDarkScheme.matches) {
    document.body.setAttribute('data-theme', 'dark');
    themeToggle.textContent = 'Kun rejimi';
} else {
    document.body.setAttribute('data-theme', 'light');
    themeToggle.textContent = 'Tun rejimi';
}

// Tugma bosilganda tema o'zgartirish
themeToggle.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    
    if (currentTheme === 'light') {
        document.body.setAttribute('data-theme', 'dark');
        themeToggle.textContent = 'Kun rejimi';
        // LocalStorage ga saqlash (optional)
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.setAttribute('data-theme', 'light');
        themeToggle.textContent = 'Tun rejimi';
        localStorage.setItem('theme', 'light');
    }
});

// Sahifa yuklanganda foydalanuvchi tanlagan temani yuklash
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.body.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'dark') {
        themeToggle.textContent = 'Kun rejimi';
    } else {
        themeToggle.textContent = 'Tun rejimi';
    }
}



prefersDarkScheme.addEventListener('change', e => {
    if (e.matches) {
        document.body.setAttribute('data-theme', 'dark');
        themeToggle.textContent = 'Kun rejimi';
    } else {
        document.body.setAttribute('data-theme', 'light');
        themeToggle.textContent = 'Tun rejimi';
    }
});