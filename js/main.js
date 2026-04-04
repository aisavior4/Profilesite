// ===================================
// Language Data
// ===================================
const translations = {
    ko: {
        nav: {
            home: 'Home',
            about: 'About',
            expertise: 'Expertise',
            gallery: 'Gallery',
            publications: 'Publications',
            contact: 'Contact',
            admin: 'Admin'
        },
        hero: {
            title: '임형준',
            subtitle: 'Audio Engineer & Music Producer',
            description: '음악학 박사 | Dolby ATMOS & Pro Tools 마스터 트레이너<br>27년간 1,000여 곡 이상 레코딩, 믹싱, 마스터링 전문가',
            btnLearnMore: '더 알아보기',
            btnContact: '연락하기'
        },
        about: {
            title: 'About Me',
            subtitle: '27년간 한국 음향 산업을 이끌어온 전문가'
        },
        expertise: {
            title: 'Expertise',
            subtitle: '전문 분야 및 기술',
            skillsTitle: '주요 기술 스택'
        },
        gallery: {
            title: 'Gallery',
            subtitle: '스튜디오 & 작업 현장'
        },
        publications: {
            title: 'Publications & Media',
            subtitle: '논문, 저서, 기사 및 미디어'
        },
        contact: {
            title: 'Contact',
            subtitle: '언제든 연락주세요'
        }
    },
    en: {
        nav: {
            home: 'Home',
            about: 'About',
            expertise: 'Expertise',
            gallery: 'Gallery',
            publications: 'Publications',
            contact: 'Contact',
            admin: 'Admin'
        },
        hero: {
            title: 'Hyung-Jun Lim',
            subtitle: 'Audio Engineer & Music Producer',
            description: 'Ph.D. in Musicology | Dolby ATMOS & Pro Tools Master Trainer<br>27 years of experience with 1,000+ recording, mixing, mastering projects',
            btnLearnMore: 'Learn More',
            btnContact: 'Contact Me'
        },
        about: {
            title: 'About Me',
            subtitle: 'Leading Korea\'s audio industry for 27 years'
        },
        expertise: {
            title: 'Expertise',
            subtitle: 'Professional Skills & Technologies',
            skillsTitle: 'Technical Skills'
        },
        gallery: {
            title: 'Gallery',
            subtitle: 'Studio & Work Environment'
        },
        publications: {
            title: 'Publications & Media',
            subtitle: 'Papers, Books, Articles & Media'
        },
        contact: {
            title: 'Contact',
            subtitle: 'Feel free to reach out'
        }
    }
};

let currentLang = 'ko';

function toggleLanguage() {
    currentLang = currentLang === 'ko' ? 'en' : 'ko';
    document.documentElement.setAttribute('data-lang', currentLang);
    document.getElementById('langText').textContent = currentLang === 'ko' ? 'EN' : 'KO';
    updateLanguage();
}

function updateLanguage() {
    const t = translations[currentLang];
    
    // Update navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const navKeys = ['home', 'about', 'expertise', 'gallery', 'publications', 'contact'];
    navLinks.forEach((link, index) => {
        if (index < navKeys.length) {
            link.textContent = t.nav[navKeys[index]];
        }
    });
    
    // Update hero section
    document.querySelector('.hero-title').textContent = t.hero.title;
    document.querySelector('.hero-subtitle').textContent = t.hero.subtitle;
    document.querySelector('.hero-description').innerHTML = t.hero.description;
    
    // Update buttons
    const buttons = document.querySelectorAll('.hero-buttons .btn');
    if (buttons[0]) buttons[0].textContent = t.hero.btnLearnMore;
    if (buttons[1]) buttons[1].textContent = t.hero.btnContact;
    
    // Update section titles
    document.querySelectorAll('.section-title')[0].textContent = t.about.title;
    document.querySelectorAll('.section-subtitle')[0].textContent = t.about.subtitle;
    
    document.querySelectorAll('.section-title')[1].textContent = t.expertise.title;
    document.querySelectorAll('.section-subtitle')[1].textContent = t.expertise.subtitle;
    
    document.querySelectorAll('.section-title')[2].textContent = t.gallery.title;
    document.querySelectorAll('.section-subtitle')[2].textContent = t.gallery.subtitle;
    
    document.querySelectorAll('.section-title')[3].textContent = t.publications.title;
    document.querySelectorAll('.section-subtitle')[3].textContent = t.publications.subtitle;
    
    document.querySelectorAll('.section-title')[4].textContent = t.contact.title;
    document.querySelectorAll('.section-subtitle')[4].textContent = t.contact.subtitle;
}

// ===================================
// Initialize
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Hide loading screen
    setTimeout(() => {
        document.getElementById('loading-screen').classList.add('hidden');
    }, 1500);

    // Load hero background
    loadHeroBackground();

    // Load profile data
    loadProfileData();
    
    // Load gallery data
    loadGalleryData();
    
    // Load publications data
    loadPublicationsData();

    // Initialize navigation
    initNavigation();

    // Initialize scroll effects
    initScrollEffects();

    // Initialize lightbox
    initLightbox();

    // Initialize contact form
    initContactForm();
});

// ===================================
// Hero Background
// ===================================
function loadHeroBackground() {
    const savedBackground = localStorage.getItem('heroBackground');
    if (savedBackground) {
        const heroSection = document.getElementById('home');
        heroSection.style.backgroundImage = `url('${savedBackground}')`;
        heroSection.style.backgroundSize = 'cover';
        heroSection.style.backgroundPosition = 'center';
    }
}

// ===================================
// Profile Data
// ===================================
async function loadProfileData() {
    try {
        const response = await fetch('tables/profile?limit=1');
        const data = await response.json();
        
        if (data.data && data.data.length > 0) {
            const profile = data.data[0];
            
            // Update Hero Section
            if (profile.hero_bg_image) {
                const heroBg = document.getElementById('heroBackgroundImage');
                if (heroBg) {
                    heroBg.src = profile.hero_bg_image;
                    heroBg.onerror = () => {
                        console.error('Failed to load hero background image');
                        heroBg.style.display = 'none';
                    };
                    heroBg.onload = () => {
                        heroBg.style.display = 'block';
                    };
                }
            }
            if (profile.hero_title) {
                const heroTitle = document.querySelector('.hero-title');
                if (heroTitle) heroTitle.textContent = profile.hero_title;
            }
            if (profile.hero_subtitle) {
                const heroSubtitle = document.querySelector('.hero-subtitle');
                if (heroSubtitle) heroSubtitle.textContent = profile.hero_subtitle;
            }

            // Update About Section
            if (profile.about_image) {
                const aboutImg = document.getElementById('profileImage');
                const placeholder = document.getElementById('profilePlaceholder');
                if (aboutImg && profile.about_image) {
                    aboutImg.src = profile.about_image;
                    aboutImg.onerror = () => {
                        console.error('Failed to load about image');
                        aboutImg.style.display = 'none';
                        if (placeholder) placeholder.style.display = 'block';
                    };
                    aboutImg.onload = () => {
                        aboutImg.style.display = 'block';
                        if (placeholder) placeholder.style.display = 'none';
                    };
                }
            }
            if (profile.about_name) {
                const aboutName = document.getElementById('profileName');
                if (aboutName) aboutName.textContent = profile.about_name;
            }
            if (profile.about_bio) {
                const aboutBio = document.getElementById('profileBio');
                if (aboutBio) aboutBio.innerHTML = profile.about_bio;
            }

            console.log('Profile data loaded successfully');
        }
    } catch (error) {
        console.error('Error loading profile data:', error);
    }
}

// ===================================
// Gallery Data
// ===================================
let galleryData = [];
let currentLightboxIndex = 0;

async function loadGalleryData() {
    try {
        const response = await fetch('tables/gallery?limit=100&sort=order');
        const data = await response.json();
        
        if (data.data && data.data.length > 0) {
            galleryData = data.data;
            loadGalleryCategoryCounts();
        }
    } catch (error) {
        console.error('Error loading gallery data:', error);
    }
}

function loadGalleryCategoryCounts() {
    const categories = ['studio', 'work', 'education', 'life'];
    
    categories.forEach(category => {
        const categoryItems = galleryData.filter(item => item.category === category);
        const countElement = document.getElementById(`${category}Count`);
        if (countElement) {
            countElement.textContent = categoryItems.length;
        }
        
        // Load featured image
        const featuredItem = categoryItems.find(item => item.is_featured) || categoryItems[0];
        if (featuredItem) {
            const imageContainer = document.getElementById(`${category}FeaturedImage`);
            if (imageContainer) {
                const img = document.createElement('img');
                img.src = featuredItem.image_url;
                img.alt = featuredItem.title;
                img.onerror = function() {
                    // Keep placeholder if image fails
                };
                imageContainer.innerHTML = '';
                imageContainer.appendChild(img);
            }
        }
    });
}

// ===================================
// Publications Data
// ===================================
let publicationsData = [];

async function loadPublicationsData() {
    try {
        const response = await fetch('tables/publications?limit=100&sort=order');
        const data = await response.json();
        
        if (data.data && data.data.length > 0) {
            publicationsData = data.data;
            loadPublicationsCategoryCounts();
        }
    } catch (error) {
        console.error('Error loading publications data:', error);
    }
}

function loadPublicationsCategoryCounts() {
    const categories = {thesis: 'thesis', article: 'article', other: 'other'};
    
    Object.keys(categories).forEach(category => {
        const categoryItems = publicationsData.filter(item => item.category === category);
        const countElement = document.getElementById(`${category}Count`);
        if (countElement) {
            countElement.textContent = categoryItems.length;
        }
        
        // Load featured image
        const featuredItem = categoryItems.find(item => item.is_featured && item.image_url) || categoryItems.find(item => item.image_url);
        if (featuredItem && featuredItem.image_url) {
            const imageContainer = document.getElementById(`${category}FeaturedImage`);
            if (imageContainer) {
                const img = document.createElement('img');
                img.src = featuredItem.image_url;
                img.alt = featuredItem.title;
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'cover';
                img.onerror = function() {
                    // Keep placeholder if image fails
                };
                imageContainer.innerHTML = '';
                imageContainer.appendChild(img);
            }
        }
    });
}

function renderGallery(filter) {
    const galleryGrid = document.getElementById('galleryGrid');
    galleryGrid.innerHTML = '';

    const filteredData = filter === 'all' 
        ? galleryData 
        : galleryData.filter(item => item.category === filter);

    filteredData.forEach((item, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.setAttribute('data-aos', 'fade-up');
        galleryItem.setAttribute('data-aos-delay', (index % 4) * 100);
        
        galleryItem.innerHTML = `
            <img src="${item.image_url}" alt="${item.title}">
            <div class="gallery-overlay">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        `;
        
        galleryItem.addEventListener('click', () => {
            openLightbox(galleryData.indexOf(item));
        });
        
        galleryGrid.appendChild(galleryItem);
    });

    // Refresh AOS
    AOS.refresh();
}

function showSampleGallery() {
    // Fallback sample gallery
    const sampleGallery = [
        { title: '프로페셔널 스튜디오', description: '최첨단 레코딩 장비를 갖춘 스튜디오', image_url: 'images/studio-1.jpg', category: '스튜디오' },
        { title: '스튜디오 환경', description: '프로듀싱을 위한 완벽한 공간', image_url: 'images/studio-2.jpg', category: '스튜디오' },
        { title: '콘솔 작업', description: '믹싱 콘솔에서의 작업 모습', image_url: 'images/profile-1.jpg', category: '작업현장' },
        { title: '정밀 믹싱', description: '세밀한 사운드 조정 작업', image_url: 'images/profile-2.jpg', category: '작업현장' },
        { title: '프로페셔널 포트레이트', description: '오디오 엔지니어로서의 모습', image_url: 'images/profile-main.jpg', category: '프로필' },
        { title: '장비 세팅', description: '레코딩 장비 설정 작업', image_url: 'images/work-1.jpg', category: '작업현장' },
        { title: '스튜디오 작업', description: '대형 콘솔에서의 믹싱 작업', image_url: 'images/work-2.jpg', category: '작업현장' },
        { title: '프로덕션 현장', description: '프로듀싱 및 레코딩 작업', image_url: 'images/work-3.jpg', category: '작업현장' },
        { title: '마스터링 작업', description: '최종 마스터링 프로세스', image_url: 'images/work-6.jpg', category: '작업현장' },
        { title: '믹싱 세션', description: '전문적인 믹싱 세션 진행', image_url: 'images/work-7.jpg', category: '작업현장' },
        { title: '세미나 강연', description: '음향 기술 세미나 진행', image_url: 'images/education-1.jpg', category: '교육' }
    ];
    
    galleryData = sampleGallery;
    renderGallery('all');
}

// Gallery filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Filter gallery
        const filter = this.getAttribute('data-filter');
        renderGallery(filter);
    });
});

// ===================================
// Navigation
// ===================================
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Smooth scroll and active link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    // 🔧 모바일/데스크톱 네비게이션 바 높이 + 여유 공간
                    const navbarHeight = window.innerWidth <= 768 ? 80 : 80;
                    const offsetTop = targetSection.offsetTop - navbarHeight;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });

        // Navbar background on scroll
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ===================================
// Scroll Effects
// ===================================
function initScrollEffects() {
    const scrollTopBtn = document.getElementById('scrollTop');

    window.addEventListener('scroll', () => {
        // Show/hide scroll to top button
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    // Scroll to top
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===================================
// Lightbox
// ===================================
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
    lightboxNext.addEventListener('click', () => navigateLightbox(1));

    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') navigateLightbox(-1);
            if (e.key === 'ArrowRight') navigateLightbox(1);
        }
    });
}

function openLightbox(index) {
    currentLightboxIndex = index;
    updateLightbox();
    document.getElementById('lightbox').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = '';
}

function navigateLightbox(direction) {
    currentLightboxIndex += direction;
    
    if (currentLightboxIndex < 0) {
        currentLightboxIndex = galleryData.length - 1;
    } else if (currentLightboxIndex >= galleryData.length) {
        currentLightboxIndex = 0;
    }
    
    updateLightbox();
}

function updateLightbox() {
    const item = galleryData[currentLightboxIndex];
    document.getElementById('lightboxImage').src = item.image_url;
    document.getElementById('lightboxTitle').textContent = item.title;
    document.getElementById('lightboxDescription').textContent = item.description;
}

// ===================================
// Contact Form
// ===================================
function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Create mailto link
        const mailtoLink = `mailto:savior4@naver.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
            `이름: ${formData.name}\n이메일: ${formData.email}\n\n메시지:\n${formData.message}`
        )}`;

        // Open email client
        window.location.href = mailtoLink;

        // Show success message
        alert('메일 클라이언트가 열립니다. 메시지를 확인하고 전송해주세요.');

        // Reset form
        contactForm.reset();
    });
}

// ===================================
// Utility Functions
// ===================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Animate skill bars when in viewport
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
        }
    });
}, observerOptions);

// Observe skills section
const skillsSection = document.querySelector('.technical-skills');
if (skillsSection) {
    skillObserver.observe(skillsSection);
}