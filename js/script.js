// HERO SLIDER
const heroImages = [
    'images/bg1.jpg',
    'images/bg2.jpg',
    'images/bg3.jpg',
    'images/bg4.jpg',
    'images/bg5.jpg'
];
const heroTitles = [
    'Helping People Find Hope & Home',
    'Support | Shelter | Success.',
    'Join Us to Make a Difference',
    'Empowering Dreams, One Step at a Time',
    'Connecting Hearts, Building Futures'
];
const heroDescs = [
    'Together, we build brighter futures for our community. A place they can call Home',
    'Every act of kindness counts. Be a part of change.',
    'Volunteer/Donate, and help us transform lives of our own.',
    'Building confidence, creating impact, and unlocking potential for a brighter future',
    'Uniting people, empowering communities, and building brighter paths forward'
];
let heroIndex = 0;
function setHeroSlide(idx) {
    document.getElementById('hero').style.backgroundImage = `url('${heroImages[idx]}')`;
    document.getElementById('hero-title').textContent = heroTitles[idx];
    document.getElementById('hero-desc').textContent = heroDescs[idx];
    document.querySelectorAll('.slider-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === idx);
    });
}
document.querySelectorAll('.slider-dot').forEach(dot => {
    dot.addEventListener('click', function() {
        heroIndex = parseInt(dot.getAttribute('data-index'));
        setHeroSlide(heroIndex);
    });
});
setHeroSlide(heroIndex);
setInterval(() => {
    heroIndex = (heroIndex + 1) % heroImages.length;
    setHeroSlide(heroIndex);
}, 7000);

// STICKY NAV BAR
const header = document.getElementById('header');
window.addEventListener('scroll', function() {
    if (window.scrollY > 60) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

const hamburger = document.getElementById('hamburger');
const navList = document.getElementById('nav-list');

// Hamburger toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navList.classList.toggle('open');
    document.body.classList.toggle('nav-open');
});

// Close menu on link click (mobile)
navList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if(navList.classList.contains('open')) {
            navList.classList.remove('open');
            hamburger.classList.remove('active');
            document.body.classList.remove('nav-open');
        }
    });
});

// Scroll background change
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if(window.scrollY > 80){
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav ul li a');

// Smooth scroll when clicking nav links
navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// Scroll spy function
window.addEventListener('scroll', () => {
    let scrollPos = window.scrollY + 100; // Add offset for header height

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if(scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight){
            navLinks.forEach(link => {
                link.classList.remove('active');
                if(link.getAttribute('href').substring(1) === section.id){
                    link.classList.add('active');
                }
            });
        }
    });
});


// SMOOTH SCROLL NAVIGATION
Array.from(document.querySelectorAll('nav a')).forEach(link => {
    link.addEventListener('click', function(e) {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ANIMATED COUNTERS
function animateCounter(id, end, duration = 2000) {
    const el = document.getElementById(id);
    let start = 0;
    const increment = end / (duration / 16);
    function update() {
        start += increment;
        if (start < end) {
            el.textContent = Math.floor(start);
            requestAnimationFrame(update);
        } else {
            el.textContent = end;
        }
    }
    update();
}
let countersAnimated = false;
function checkCounters() {
    const about = document.getElementById('about');
    const rect = about.getBoundingClientRect();
    if (!countersAnimated && rect.top < window.innerHeight && rect.bottom > 0) {
        animateCounter('meals', 12000);
        animateCounter('families', 3500);
        animateCounter('volunteers', 800);
        countersAnimated = true;
    }
}
window.addEventListener('scroll', checkCounters);
checkCounters();

// Counter Animation
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".counter");
    const speed = 200; // lower = faster

    const animateCounter = (counter) => {
        const target = +counter.getAttribute("data-target");
        let count = 0;

        const updateCount = () => {
            const increment = target / speed;
            if (count < target) {
                count += increment;
                counter.textContent = Math.ceil(count);
                requestAnimationFrame(updateCount);
            } else {
                counter.textContent = target;
            }
        };
        updateCount();
    };

    // Intersection Observer for animation when visible
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counter.setAttribute("data-target", counter.textContent || 0);
        counter.textContent = "0";
        observer.observe(counter);
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const filters = document.querySelectorAll('.filters button');
    const storyCards = document.querySelectorAll('.story-card');
    const searchInput = document.getElementById('story-search');

    // Filter functionality
    filters.forEach(button => {
        button.addEventListener('click', () => {
            filters.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.dataset.filter;

            storyCards.forEach(card => {
                const category = card.dataset.category;
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // Search functionality
    searchInput.addEventListener('keyup', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        storyCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('.story-info p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });

    // Animated counter on scroll
    const counters = document.querySelectorAll('.counter');
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const targetNumber = parseInt(counter.dataset.target, 10);
                let currentNumber = 0;
                const increment = Math.ceil(targetNumber / 100);

                const interval = setInterval(() => {
                    currentNumber += increment;
                    if (currentNumber >= targetNumber) {
                        counter.textContent = targetNumber;
                        clearInterval(interval);
                    } else {
                        counter.textContent = currentNumber;
                    }
                }, 10);
                observer.unobserve(entry.target);
            }
        });
    }, options);

    counters.forEach(counter => {
        observer.observe(counter);
    });
});


// Filtering
const filterButtons = document.querySelectorAll('.filter-chip');
const storyCards = document.querySelectorAll('.story-card');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        storyCards.forEach(card => {
            if(filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Live Search
const searchInput = document.getElementById('story-search');
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    storyCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const desc = card.querySelector('p').textContent.toLowerCase();
        card.style.display = title.includes(query) || desc.includes(query) ? 'block' : 'none';
    });
});

// Animated Counters
const counters = document.querySelectorAll('.counter');
counters.forEach(counter => {
    const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / 200;
        if(count < target){
            counter.innerText = Math.ceil(count + increment);
            requestAnimationFrame(updateCount);
        } else {
            counter.innerText = target;
        }
    }
    updateCount();
});


// INTERACTIVE MAP
if (document.getElementById('map')) {
    // Windhoek, Namibia coordinates
    const windhoekCoords = [-22.559722, 17.083611];
    const map = L.map('map', {
        center: windhoekCoords,
        zoom: 13,
        zoomControl: true,
        attributionControl: true
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18
    }).addTo(map);

    // Custom marker icon for professionalism
    const customIcon = L.icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // location pin icon
        iconSize: [38, 38],
        iconAnchor: [19, 38],
        popupAnchor: [0, -38]
    });

    L.marker(windhoekCoords, { icon: customIcon })
        .addTo(map)
        .bindPopup('<b>Hope Haven</b><br>Windhoek, Namibia<br><a href="https://www.google.com/maps/place/Windhoek/data=!4m2!3m1!1s0x1c0b1b5cb30c01ed:0xe4b84940cc445d3b?sa=X&ved=1t:242&ictx=111" target="_blank">View on Google Maps</a>')
        .openPopup();

    // Add error handling for map
    map.on('locationerror', function(e) {
        alert('Map error: ' + e.message);
    });
}

// VALIDATED CONTACT FORM
const form = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

form.addEventListener('submit', e => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    // Check all fields
    if(!name || !email || !phone || !message) {
        alert('Please fill in all fields.');
        return;
    }

    // Email validation
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if(!email.match(emailPattern)) { 
        alert('Invalid email'); 
        return; 
    }

    // Phone validation
    const phonePattern = /^[0-9]{7,15}$/;
    if(!phone.match(phonePattern)) { 
        alert('Invalid phone number'); 
        return; 
    }

    // ✅ Google reCAPTCHA validation
    const recaptchaResponse = grecaptcha.getResponse();
    if(!recaptchaResponse) {
        alert('Please verify that you are not a robot.');
        return;
    }

    // Show success message
    formSuccess.classList.add('show');

    // Reset form and reCAPTCHA
    form.reset();
    grecaptcha.reset();

    // Hide success message after 4 seconds
    setTimeout(() => {
        formSuccess.classList.remove('show');
    }, 4000);
});



// ADVANCED BACK-TO-TOP BUTTON
const backToTop = document.getElementById('back-to-top');
if (backToTop) {
    backToTop.innerHTML = `
        <span class="btt-icon" aria-hidden="true">
            <svg width="32" height="32" viewBox="0 0 32 32" style="vertical-align:middle;">
                <circle cx="16" cy="16" r="14" stroke="#fff" stroke-width="3" fill="none" id="scroll-progress"/>
                <g>
                    <path id="arrow" d="M16 10 L16 22" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
                    <polyline points="12,14 16,10 20,14" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
            </svg>
        </span>
        <span class="btt-label"></span>
    `;
    backToTop.setAttribute('aria-label', 'Back to top');
    backToTop.setAttribute('tabindex', '0');
}

function updateBackToTop() {
    const show = window.scrollY > 300;
    backToTop.style.opacity = show ? '1' : '0';
    backToTop.style.pointerEvents = show ? 'auto' : 'none';
    // Progress indicator
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = docHeight > 0 ? window.scrollY / docHeight : 0;
    const circle = document.getElementById('scroll-progress');
    if (circle) {
        const radius = circle.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
        circle.style.strokeDasharray = `${circumference}`;
        circle.style.strokeDashoffset = `${circumference * (1 - scrolled)}`;
    }
    // Animate arrow
    const arrow = document.getElementById('arrow');
    if (arrow) {
        arrow.setAttribute('stroke', show ? '#fff' : '#ccc');
        arrow.setAttribute('transform', show ? 'scale(1)' : 'scale(0.8)');
    }
}
backToTop.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
backToTop.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});
window.addEventListener('scroll', updateBackToTop);
window.addEventListener('resize', updateBackToTop);
updateBackToTop();

// FLIP CARD HOVER (for mobile touch)
function enableFlipOnTouch(selector, innerClass) {
    document.querySelectorAll(selector).forEach(card => {
        card.addEventListener('touchstart', function() {
            card.querySelector(innerClass).style.transform = 'rotateY(180deg)';
        });
        card.addEventListener('touchend', function() {
            card.querySelector(innerClass).style.transform = '';
        });
    });
}
enableFlipOnTouch('.story-card', '.story-card-inner');
enableFlipOnTouch('.team-member', '.team-member-inner');


// Newsletter Form
const newsletterForm = document.getElementById('newsletter-form');
const newsletterSuccess = document.getElementById('newsletter-success');

newsletterForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input').value.trim();
    if(!email) {
        alert('Please enter a valid email');
        return;
    }
    newsletterSuccess.style.display = 'block';
    newsletterForm.reset();
    setTimeout(() => {
        newsletterSuccess.style.display = 'none';
    }, 4000);
});

// Back to Top Button (already included, just ensure it works with new footer)
const backToTopBtn = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    if(window.scrollY > 300) backToTopBtn.style.display = 'block';
    else backToTopBtn.style.display = 'none';
});
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({top:0, behavior:'smooth'});
});



document.addEventListener('DOMContentLoaded', () => {
  const members = [
    { id: '1', name: 'Mr Elias', role: 'Senior Developer', image: 'images/elias.jpg', bio: 'Leads the technical development at Hope Haven, designing and maintaining innovative digital solutions that enhance our community programs and outreach initiatives.' },
    { id: '2', name: 'Ms Hope', role: 'Operations Manager', image: 'images/ms a.jpg', bio: 'Ensures the smooth day-to-day operations of Hope Haven, coordinating resources, staff, and projects to maximize the impact of our services' },
    { id: '3', name: 'Mr John', role: 'Volunter Manager', image: 'images/mr b.jpg', bio: 'Oversees our volunteer programs, recruiting, training, and supporting dedicated individuals who help Hope Haven bring hope and care to the community.' },
    { id: '4', name: 'Ms Moses', role: 'Lead Marketing Strategist', image: 'images/ms.jpg', bio: 'Develops and implements marketing strategies that raise awareness about Hope Haven’s mission, engaging the community and supporters through creative campaigns.'},
    { id: '5', name: 'Ms Doe', role: 'Chief Executive Officer', image: 'images/ms doe.jpg', bio: 'Leads Hope Haven with a vision to empower communities, providing strategic direction and inspiring initiatives that foster growth, support, and positive change.'},
  ];

  const cardsTrack = document.getElementById('cards-track');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const memberNameEl = document.getElementById('member-name');
  const memberRoleEl = document.getElementById('member-role');
  const memberBioEl = document.getElementById('member-bio');
  const dotsIndicator = document.getElementById('dots-indicator');

  let currentIndex = 0;
  const visibleCards = 2;
  let autoPlayInterval;

  const updateCarousel = () => {
    cardsTrack.innerHTML = '';
    dotsIndicator.innerHTML = '';

    members.forEach((member, index) => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.dataset.index = index;
      
      const img = document.createElement('img');
      img.src = member.image;
      img.alt = member.name;

      card.appendChild(img);
      cardsTrack.appendChild(card);
    });

    const updateCards = () => {
      const cards = document.querySelectorAll('.card');
      cards.forEach((card, index) => {
        const diff = (index - currentIndex + members.length) % members.length;
        let positionClass = '';
        if (diff === 0) {
          positionClass = 'center';
        } else if (diff <= visibleCards) {
          positionClass = `right-${diff}`;
        } else if (diff >= members.length - visibleCards) {
          positionClass = `left-${members.length - diff}`;
        } else {
          positionClass = 'hidden';
        }

        card.className = `card ${positionClass}`;
      });

      updateMemberInfo();
      updateDots();
    };

    const updateMemberInfo = () => {
      const activeMember = members[currentIndex];
      memberNameEl.textContent = activeMember.name;
      memberRoleEl.textContent = activeMember.role;
      memberBioEl.textContent = activeMember.bio || '';
    };

    const updateDots = () => {
      dotsIndicator.innerHTML = '';
      members.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('dot');
        if (index === currentIndex) {
          dot.classList.add('active');
        }
        dot.addEventListener('click', () => {
          goToIndex(index);
        });
        dotsIndicator.appendChild(dot);
      });
    };

    const goToIndex = (newIndex) => {
      if (newIndex === currentIndex) return;
      currentIndex = newIndex;
      updateCards();
    };

    const navigate = (direction) => {
      let newIndex = (currentIndex + direction + members.length) % members.length;
      goToIndex(newIndex);
    };

    prevBtn.addEventListener('click', () => navigate(-1));
    nextBtn.addEventListener('click', () => navigate(1));

    cardsTrack.addEventListener('click', (e) => {
      const card = e.target.closest('.card');
      if (card) {
        const index = parseInt(card.dataset.index);
        goToIndex(index);
      }
    });

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        navigate(-1);
      } else if (e.key === 'ArrowRight') {
        navigate(1);
      }
    });

    // Auto-play
     const startAutoPlay = () => {
      clearInterval(autoPlayInterval);
       const autoPlayTime = 3000; // 3 seconds
       if (autoPlayTime > 0) {
      autoPlayInterval = setInterval(() => navigate(1), autoPlayTime);
   }
 };
   startAutoPlay();
   cardsTrack.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
   cardsTrack.addEventListener('mouseleave', () => startAutoPlay());

    updateCards();
  };

  updateCarousel();
});

// Donation
const copyBtn = document.getElementById('copy-bank');
const bankInfo = document.getElementById('bank-info').innerText;
const copySuccess = document.getElementById('copy-success');

copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(bankInfo).then(() => {
        copySuccess.classList.add('show');
        setTimeout(() => {
            copySuccess.classList.remove('show');
        }, 2000);
    });
});