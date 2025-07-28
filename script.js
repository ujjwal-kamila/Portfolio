// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuIcon = mobileMenuBtn.querySelector('i');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    mobileMenuIcon.className = mobileMenu.classList.contains('hidden')
        ? 'fas fa-bars text-2xl'
        : 'fas fa-times text-2xl';
});

// Smooth scroll and nav active highlight
const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        mobileMenu.classList.add('hidden');
        mobileMenuIcon.className = 'fas fa-bars text-2xl';
    });
});

function updateActiveNav() {
    const sections = ['home', 'about', 'skills', 'projects', 'contact'];
    const scrollPosition = window.scrollY + 100;
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        const navLink = document.querySelector(`a[href="#${sectionId}"]`);
        if (section && navLink) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                document.querySelectorAll(`a[href="#${sectionId}"]`).forEach(link => {
                    link.classList.add('active');
                });
            }
        }
    });
}
window.addEventListener('scroll', updateActiveNav);

// Skill bar animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width');
                skillBar.style.setProperty('--width', width + '%');
                skillBar.classList.add('animate');
                setTimeout(() => {
                    skillBar.style.width = width + '%';
                }, 100);
            }
        });
    }, { threshold: 0.5 });
    skillBars.forEach(bar => observer.observe(bar));
}
animateSkillBars();

// Download CV
document.getElementById('download-cv').addEventListener('click', () => {
    const cvContent = `UJJWAL KAMILA
Software Developer

CONTACT
Email: ujjwalkamila86@gmail.com
Phone: +91 81011 93171
LinkedIn: https://linkedin.com/in/ujjwal-kamila-8a12a4262/
GitHub: https://github.com/ujjwal-kamila

TECHNICAL SKILLS
• Python, Java, C/C++
• HTML, CSS, JavaScript
• Django, MySQL, Git, Docker, AWS

PROJECTS
• E-Commerce Platform
• Task Management System
• Data Analytics Dashboard

EDUCATION
B.Tech in Computer Science
    `;
    const blob = new Blob([cvContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Ujjwal_Kamila_CV.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

// Contact form using EmailJS
document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');

    submitBtn.disabled = true;
    btnText.textContent = 'Sending...';
    successMessage.classList.add('hidden');
    errorMessage.classList.add('hidden');
    submitBtn.classList.add('opacity-75');

    const formData = new FormData(e.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        number: formData.get('mobile'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        time: new Date().toLocaleString()
    };

    try {
        await emailjs.send('service_8jg1v1l', 'template_hvrwrew', {
            from_name: data.name,
            from_email: data.email,
            phone_number: data.number,
            subject: data.subject,
            message: data.message,
            time: data.time,
            to_email: 'ujjwalkamila86@gmail.com'
        });

        successMessage.classList.remove('hidden');
        e.target.reset();
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } catch (error) {
        console.error('EmailJS error:', error);
        errorMessage.classList.remove('hidden');
        errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } finally {
        submitBtn.disabled = false;
        btnText.textContent = 'Send Message';
        submitBtn.classList.remove('opacity-75');
        setTimeout(() => {
            successMessage.classList.add('hidden');
            errorMessage.classList.add('hidden');
        }, 5000);
    }
});

// Scroll to top
document.getElementById('scroll-to-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Animate elements on page load
document.addEventListener('DOMContentLoaded', () => {
    updateActiveNav();
    const animatedElements = document.querySelectorAll('.animate-slideUp, .animate-slideDown, .animate-slideLeft, .animate-slideRight, .animate-zoomIn');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    animatedElements.forEach(el => observer.observe(el));
});

// Parallax hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.absolute.inset-0.opacity-20 > div');
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});