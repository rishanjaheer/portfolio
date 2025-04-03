// Typing Animation
const typingText = document.querySelector('.typing-text');
const words = ['Web Developer', 'Designer', 'Problem Solver'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typingText.textContent = "I'm a " + currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = "I'm a " + currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(type, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? 100 : 200);
    }
}

// Start typing animation
type();

// Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
            }
        }
    });
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Form Submission
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', data);
    
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Thank you for your message! I will get back to you soon.';
    successMessage.style.color = '#10b981';
    successMessage.style.padding = '1rem';
    successMessage.style.marginTop = '1rem';
    successMessage.style.borderRadius = '5px';
    successMessage.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
    successMessage.style.border = '1px solid rgba(16, 185, 129, 0.2)';
    
    contactForm.appendChild(successMessage);
    contactForm.reset();
    
    setTimeout(() => {
        successMessage.style.opacity = '0';
        successMessage.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            successMessage.remove();
        }, 500);
    }, 3000);
});

// Project Data
const projects = [
    {
        title: 'Project 1',
        description: 'A brief description of the project and its key features.',
        image: 'https://via.placeholder.com/300x200',
        tags: ['HTML', 'CSS', 'JavaScript'],
        github: '#',
        live: '#'
    },
    {
        title: 'Project 2',
        description: 'Another amazing project showcasing different skills.',
        image: 'https://via.placeholder.com/300x200',
        tags: ['React', 'Node.js', 'MongoDB'],
        github: '#',
        live: '#'
    },
    // Add more projects as needed
];

// Dynamically Load Projects
function loadProjects() {
    const projectGrid = document.querySelector('.project-grid');
    projectGrid.innerHTML = ''; // Clear existing content

    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.github}" target="_blank"><i class="fab fa-github"></i></a>
                    <a href="${project.live}" target="_blank"><i class="fas fa-external-link-alt"></i></a>
                </div>
            </div>
        `;
        projectGrid.appendChild(projectCard);
    });
}

// Load projects when the page loads
loadProjects();

// Intersection Observer for Fade-in Animation
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-out');
    observer.observe(section);
});

// Enhanced animation for skill bars
const skillBars = document.querySelectorAll('.skill-progress');
const skillItems = document.querySelectorAll('.skill-item');

// Apply initial styles to skill items
skillItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out, box-shadow 0.3s ease';
    
    // Set initial width of progress bars to 0
    const bar = item.querySelector('.skill-progress');
    if (bar) {
        bar.style.width = '0%';
        bar.style.transition = 'width 1s ease-out, box-shadow 0.5s ease';
    }
});

const animateSkillBars = () => {
    skillItems.forEach((item, index) => {
        const itemPosition = item.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (itemPosition < screenPosition) {
            // Animate the skill item
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
                item.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
                
                // After item animation, animate the progress bar
                const bar = item.querySelector('.skill-progress');
                const percentage = item.querySelector('.skill-info span:last-child').textContent;
                
                setTimeout(() => {
                    if (bar) {
                        bar.style.width = percentage;
                        bar.style.boxShadow = `0 0 10px rgba(99, 102, 241, 0.5)`;
                        
                        // Remove the glow after animation
                        setTimeout(() => {
                            bar.style.boxShadow = 'none';
                        }, 1000);
                    }
                }, 300);
            }, index * 100); // Stagger the animations
        }
    });
};

window.addEventListener('scroll', animateSkillBars);
// Run once on page load to animate visible skill bars
animateSkillBars();

// Enhanced animation for project cards
const projectCards = document.querySelectorAll('.project-card');

// Apply initial styles to project cards
projectCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out, box-shadow 0.3s ease';
});

const animateProjectCards = () => {
    projectCards.forEach((card, index) => {
        const cardPosition = card.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (cardPosition < screenPosition) {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
            }, index * 150); // Stagger the animations
        }
    });
};

window.addEventListener('scroll', animateProjectCards);
// Run once on page load to animate visible project cards
animateProjectCards();

// Enhanced hover effects for project cards
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 8px 30px rgba(99, 102, 241, 0.3)';
        
        // Add a subtle glow to the image
        const image = card.querySelector('.project-image');
        if (image) {
            image.style.boxShadow = '0 0 15px rgba(99, 102, 241, 0.3)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        
        // Remove the glow from the image
        const image = card.querySelector('.project-image');
        if (image) {
            image.style.boxShadow = 'none';
        }
    });
});

// Typing effect for hero section
const heroTitle = document.querySelector('.hero h1');
const text = heroTitle.textContent;
heroTitle.textContent = '';

let i = 0;
const typeWriter = () => {
    if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
};

// Start typing effect when page loads
window.addEventListener('load', typeWriter);

// Intersection Observer for fade-in animations
const fadeElements = document.querySelectorAll('.about-content, .contact-content');

const fadeInOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, fadeInOptions);

fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    fadeInObserver.observe(element);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    }
});

// Cursor glow effect
const cursor = document.createElement('div');
cursor.className = 'cursor-glow';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
});

// Add cursor glow styles
const style = document.createElement('style');
style.textContent = `
    .cursor-glow {
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: rgba(99, 102, 241, 0.3);
        pointer-events: none;
        transform: translate(-50%, -50%);
        z-index: 9999;
        transition: width 0.3s, height 0.3s;
    }
    
    a:hover ~ .cursor-glow,
    button:hover ~ .cursor-glow {
        width: 40px;
        height: 40px;
        background: rgba(99, 102, 241, 0.5);
    }
`;
document.head.appendChild(style);

// Initialize particles
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.classList.add('particles');
    hero.appendChild(canvas);
    
    // Set canvas dimensions
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Get canvas context
    const ctx = canvas.getContext('2d');
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.color = `rgba(99, 102, 241, ${Math.random() * 0.5 + 0.1})`;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Create particles
    const particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }
    
    // Connect particles with lines
    function connect() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.strokeStyle = `rgba(99, 102, 241, ${0.2 - distance / 500})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        
        connect();
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Initialize custom cursor
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    const cursorDot = document.createElement('div');
    cursorDot.classList.add('cursor-dot');
    document.body.appendChild(cursorDot);
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Add a slight delay to the dot for a trailing effect
        setTimeout(() => {
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
        }, 100);
    });
    
    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-item, .contact-item');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursor.classList.add('cursor-hover');
            cursorDot.classList.add('cursor-dot-hover');
        });
        
        element.addEventListener('mouseleave', function() {
            cursor.classList.remove('cursor-hover');
            cursorDot.classList.remove('cursor-dot-hover');
        });
    });
}

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create particles
    createParticles();
    
    // Initialize animations
    initAnimations();
    
    // Initialize skill bars
    initSkillBars();
    
    // Initialize project cards
    initProjectCards();
    
    // Add smooth scrolling for navigation links
    initSmoothScrolling();
    
    // Initialize parallax effect
    initParallax();
    
    // Initialize custom cursor
    initCustomCursor();
});

// Initialize parallax effect
function initParallax() {
    const heroContent = document.querySelector('.hero-content');
    const hero = document.querySelector('.hero');
    
    if (heroContent && hero) {
        window.addEventListener('mousemove', function(e) {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            
            heroContent.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
        
        // Reset transform when mouse leaves
        hero.addEventListener('mouseleave', function() {
            heroContent.style.transform = 'rotateY(0) rotateX(0)';
        });
    }
}

// Initialize animations
function initAnimations() {
    // Get all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
    
    // Create an Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Add the 'active' class when the element is in view
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // For skill items, trigger the progress bar animation
                if (entry.target.classList.contains('skill-item')) {
                    const progressBar = entry.target.querySelector('.skill-progress');
                    const percentage = progressBar.getAttribute('data-percentage');
                    progressBar.style.width = percentage + '%';
                }
            }
        });
    }, {
        threshold: 0.1, // Trigger when at least 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Adjust when the animation triggers
    });
    
    // Observe each animated element
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize skill bars
function initSkillBars() {
    // Implementation of initSkillBars function
}

// Initialize project cards
function initProjectCards() {
    // Implementation of initProjectCards function
}

// Initialize smooth scrolling
function initSmoothScrolling() {
    // Implementation of initSmoothScrolling function
} 
