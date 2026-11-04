/**
 * Butterfly Never Fly Along - Main Application Logic
 * High performance, zero unnecessary dependencies, lightweight Canvas animations
 */

document.addEventListener('DOMContentLoaded', () => {
    initStoryData();
    initAmbientParticles();
    initMusicPlayer();
    initGallery();
    initWeddingSection();
    initLetterEnvelope();
    initFilmPlayer();
    initBackToTop();
    initFramerMotion();
    initAnniversaryInteractions();
    initMobileDock();
    initTouchSparks();
});

/* ==========================================================================
   1. Data Population
   ========================================================================== */
function initStoryData() {
    const data = window.STORY_DATA;
    if (!data) return;

    // Timeline population
    const timelineContainer = document.getElementById('timeline-container');
    if (timelineContainer && data.timeline) {
        timelineContainer.innerHTML = data.timeline.map((item, idx) => `
            <div class="timeline-item" data-aos>
                <div class="timeline-node" aria-hidden="true"></div>
                <div class="timeline-card">
                    <div class="timeline-photo">
                        <img src="${item.image}" alt="${item.alt}" loading="lazy" onerror="this.onerror=null; this.src='public/images/anniversary/1.webp';">
                    </div>
                    <span class="timeline-tag">${item.tag}</span>
                    <div class="timeline-date">${item.date}</div>
                    <h3 class="timeline-heading">${item.title}</h3>
                    <p class="timeline-desc">${item.description}</p>
                </div>
            </div>
        `).join('');
    }

    // Letter population
    const letterSalutation = document.getElementById('letter-salutation');
    const letterBody = document.getElementById('letter-body');
    const letterSignature = document.getElementById('letter-signature');
    const letterSender = document.getElementById('letter-sender');

    if (data.letter) {
        if (letterSalutation) letterSalutation.textContent = data.letter.salutation;
        if (letterBody) {
            letterBody.innerHTML = data.letter.paragraphs.map(p => `<p>${p}</p>`).join('');
        }
        if (letterSignature) letterSignature.textContent = data.letter.signature;
        if (letterSender) letterSender.textContent = data.letter.sender;
    }
}

/* ==========================================================================
   2. Canvas Ambient Floating Butterfly & Rose Petals (Ultra-Lightweight)
   ========================================================================== */
function initAmbientParticles() {
    const canvas = document.getElementById('ambient-canvas');
    if (!canvas) return;

    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }, { passive: true });

    const particles = [];
    const count = window.innerWidth < 768 ? 16 : 28;

    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 8 + 6,
            speedY: Math.random() * 0.7 + 0.3,
            speedX: (Math.random() - 0.5) * 0.8,
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.02,
            type: i % 4 === 0 ? 'butterfly' : 'petal',
            opacity: Math.random() * 0.4 + 0.2,
            swing: Math.random() * 2
        });
    }

    let frame = 0;
    function animate() {
        ctx.clearRect(0, 0, width, height);
        frame++;

        for (let p of particles) {
            p.y += p.speedY;
            p.x += p.speedX + Math.sin(frame * 0.02 + p.swing) * 0.5;
            p.rotation += p.rotSpeed;

            if (p.y > height + 20) {
                p.y = -20;
                p.x = Math.random() * width;
            }

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation);
            ctx.globalAlpha = p.opacity;

            if (p.type === 'butterfly') {
                // Delicate miniature gold butterfly
                const wingFlap = Math.sin(frame * 0.15) * 0.4 + 0.6;
                ctx.fillStyle = '#d4af37';
                ctx.beginPath();
                // Left wing
                ctx.ellipse(-5 * wingFlap, 0, 7 * wingFlap, 4, -0.2, 0, Math.PI * 2);
                // Right wing
                ctx.ellipse(5 * wingFlap, 0, 7 * wingFlap, 4, 0.2, 0, Math.PI * 2);
                ctx.fill();
            } else {
                // Soft pink rose petal
                ctx.fillStyle = '#f0c3cc';
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.quadraticCurveTo(p.size / 2, -p.size / 2, p.size, 0);
                ctx.quadraticCurveTo(p.size / 2, p.size / 2, 0, 0);
                ctx.fill();
            }

            ctx.restore();
        }

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
}

/* ==========================================================================
   3. Music Player (No autoplay, user consent toggle)
   ========================================================================== */
function initMusicPlayer() {
    const audio = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-toggle-btn');
    const musicWave = document.getElementById('music-wave');
    const musicText = document.getElementById('music-text');
    if (!audio || !musicBtn) return;

    let isPlaying = false;

    // Set audio source from config
    const data = window.STORY_DATA;
    if (data && data.media && data.media.audioSource) {
        audio.src = data.media.audioSource;
    }

    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            isPlaying = false;
            musicWave.classList.add('paused');
            musicText.textContent = "Play Music";
            musicBtn.setAttribute('aria-label', 'Play romantic background music');
        } else {
            audio.play().then(() => {
                isPlaying = true;
                musicWave.classList.remove('paused');
                musicText.textContent = "Music Playing";
                musicBtn.setAttribute('aria-label', 'Pause romantic background music');
            }).catch(err => {
                console.warn('Playback prevented or file loading:', err);
            });
        }
    });
}

/* ==========================================================================
   4. Gallery & Lightbox
   ========================================================================== */
let currentGalleryFilter = 'all';
let currentLightboxIndex = 0;
let activeGalleryList = [];

function initGallery() {
    const data = window.STORY_DATA;
    if (!data || !data.galleryItems) return;

    const filterContainer = document.getElementById('gallery-filters');
    const galleryGrid = document.getElementById('gallery-grid');

    // Build filter buttons
    if (filterContainer && data.galleryCategories) {
        filterContainer.innerHTML = data.galleryCategories.map((cat, idx) => `
            <button class="filter-btn ${idx === 0 ? 'active' : ''}" data-cat="${cat.id}">
                ${cat.label}
            </button>
        `).join('');

        filterContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('.filter-btn');
            if (!btn) return;
            filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentGalleryFilter = btn.dataset.cat;
            renderGalleryItems();
        });
    }

    renderGalleryItems();
    initLightboxEvents();
}

function renderGalleryItems() {
    const data = window.STORY_DATA;
    const galleryGrid = document.getElementById('gallery-grid');
    if (!galleryGrid || !data) return;

    activeGalleryList = (currentGalleryFilter === 'all')
        ? data.galleryItems
        : data.galleryItems.filter(item => item.category === currentGalleryFilter);

    galleryGrid.innerHTML = activeGalleryList.map((item, index) => `
        <div class="gallery-item ${item.aspect || ''}" data-index="${index}" tabindex="0" role="button" aria-label="Open image: ${item.title}">
            <img src="${item.image}" alt="${item.title}" loading="lazy" onerror="this.onerror=null; this.src='public/images/anniversary/1.webp';">
            <div class="gallery-overlay">
                <div class="gallery-overlay-title">${item.title}</div>
                <div class="gallery-overlay-caption">${item.caption}</div>
            </div>
        </div>
    `).join('');

    galleryGrid.querySelectorAll('.gallery-item').forEach(el => {
        el.addEventListener('click', () => {
            openLightbox(parseInt(el.dataset.index, 10));
        });
        el.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(parseInt(el.dataset.index, 10));
            }
        });
    });

    if (window.Motion && window.Motion.animate) {
        window.Motion.animate('.gallery-item', 
            { opacity: [0, 1], transform: ['scale(0.92) translateY(16px)', 'scale(1) translateY(0px)'] },
            { delay: window.Motion.stagger(0.04), duration: 0.45, easing: 'ease-out' }
        );
    }
}

function initLightboxEvents() {
    const modal = document.getElementById('lightbox-modal');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');

    if (!modal) return;

    closeBtn?.addEventListener('click', closeLightbox);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeLightbox();
    });

    prevBtn?.addEventListener('click', () => {
        currentLightboxIndex = (currentLightboxIndex - 1 + activeGalleryList.length) % activeGalleryList.length;
        updateLightboxContent();
    });

    nextBtn?.addEventListener('click', () => {
        currentLightboxIndex = (currentLightboxIndex + 1) % activeGalleryList.length;
        updateLightboxContent();
    });

    window.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') prevBtn?.click();
        if (e.key === 'ArrowRight') nextBtn?.click();
    });
}

function openLightbox(index) {
    const modal = document.getElementById('lightbox-modal');
    if (!modal || !activeGalleryList[index]) return;

    currentLightboxIndex = index;
    updateLightboxContent();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const modal = document.getElementById('lightbox-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function updateLightboxContent() {
    const item = activeGalleryList[currentLightboxIndex];
    if (!item) return;

    const img = document.getElementById('lightbox-img');
    const title = document.getElementById('lightbox-title');
    const caption = document.getElementById('lightbox-caption');

    if (img) img.src = item.image;
    if (title) title.textContent = item.title;
    if (caption) caption.textContent = item.caption;
}

/* ==========================================================================
   5. Wedding Section
   ========================================================================== */
function initWeddingSection() {
    const data = window.STORY_DATA;
    if (!data || !data.weddingShowcase) return;

    const subContainer = document.getElementById('wedding-sub-frames');
    if (subContainer) {
        // Render 2nd and 3rd showcase items
        const subItems = data.weddingShowcase.slice(1);
        subContainer.innerHTML = subItems.map(item => `
            <div class="wedding-sub-card">
                <div class="wedding-sub-thumb">
                    <img src="${item.image}" alt="${item.title}" loading="lazy">
                </div>
                <div class="wedding-sub-info">
                    <h4 class="wedding-sub-title">${item.title}</h4>
                    <p class="wedding-sub-desc">${item.caption}</p>
                </div>
            </div>
        `).join('');
    }
}

/* ==========================================================================
   6. Interactive Love Letter
   ========================================================================== */
function initLetterEnvelope() {
    const envelopeBtn = document.getElementById('envelope-trigger');
    const letterPaper = document.getElementById('letter-paper');
    const envelopeBox = document.getElementById('envelope-box');

    if (!envelopeBtn || !letterPaper) return;

    envelopeBtn.addEventListener('click', () => {
        const revealLetter = () => {
            letterPaper.classList.add('open');
            envelopeBox.style.display = 'none';
            if (window.Motion && typeof window.Motion.animate === 'function') {
                window.Motion.animate(letterPaper, 
                    { opacity: [0, 1], transform: ['translateY(30px) scale(0.96)', 'translateY(0) scale(1)'] },
                    { duration: 0.7, easing: 'ease-out' }
                );
            }
            letterPaper.scrollIntoView({ behavior: 'smooth', block: 'start' });
        };

        if (window.Motion && typeof window.Motion.animate === 'function') {
            try {
                const anim = window.Motion.animate(
                    envelopeBtn, 
                    { scale: [1, 1.35, 0], rotate: [0, -15, 25], opacity: [1, 1, 0] }, 
                    { duration: 0.45 }
                );
                if (anim && typeof anim.then === 'function') {
                    anim.then(revealLetter).catch(revealLetter);
                } else if (anim && anim.finished && typeof anim.finished.then === 'function') {
                    anim.finished.then(revealLetter).catch(revealLetter);
                } else {
                    setTimeout(revealLetter, 450);
                }
            } catch (err) {
                revealLetter();
            }
        } else {
            revealLetter();
        }
    });
}

/* ==========================================================================
   7. Anniversary Video Player
   ========================================================================== */
function initFilmPlayer() {
    const overlay = document.getElementById('video-overlay');
    const video = document.getElementById('anniversary-video');
    const bgAudio = document.getElementById('bg-music');
    const musicWave = document.getElementById('music-wave');
    const musicText = document.getElementById('music-text');

    if (!video) return;

    if (overlay) {
        overlay.addEventListener('click', () => {
            overlay.style.display = 'none';
            video.play().catch(err => console.warn('Video play triggered:', err));
        });
    }

    video.addEventListener('play', () => {
        if (overlay) overlay.style.display = 'none';
        // Seamlessly pause background instrumental music so video sound is clear
        if (bgAudio && !bgAudio.paused) {
            bgAudio.pause();
            if (musicWave) musicWave.classList.add('paused');
            if (musicText) musicText.textContent = "Play Music";
        }
    });
}

/* ==========================================================================
   8. Back to Top Button
   ========================================================================== */
function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    }, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ==========================================================================
   9. Framer Motion Scroll & InView Orchestration (UI/UX Max)
   ========================================================================== */
function initFramerMotion() {
    if (!window.Motion) return;
    const { animate, inView, scroll, stagger } = window.Motion;

    // 1. Top Reading Scroll Progress Bar
    const progressEl = document.getElementById('scroll-progress');
    if (progressEl && scroll) {
        scroll((info) => {
            progressEl.style.transform = `scaleX(${info})`;
        });
    }

    // 2. Hero Animations
    animate('.hero-salutation', { opacity: [0, 1], transform: ['translateY(20px)', 'translateY(0)'] }, { duration: 0.8, easing: 'ease-out' });
    animate('.hero-title', { opacity: [0, 1], transform: ['translateY(25px)', 'translateY(0)'] }, { duration: 1.0, delay: 0.15, easing: 'ease-out' });
    animate('.hero-subtitle', { opacity: [0, 1], transform: ['translateY(20px)', 'translateY(0)'] }, { duration: 0.9, delay: 0.3, easing: 'ease-out' });
    animate('.hero-badge', { opacity: [0, 1], transform: ['scale(0.9)', 'scale(1)'] }, { duration: 0.8, delay: 0.45, easing: 'ease-out' });
    animate('#start-story-btn', { opacity: [0, 1], transform: ['translateY(15px)', 'translateY(0)'] }, { duration: 0.7, delay: 0.6, easing: 'ease-out' });

    // 3. Anniversary Spotlight InView Reveal & Counter Animation
    const anniCard = document.getElementById('anniversary-hero-card');
    if (anniCard && inView) {
        inView(anniCard, () => {
            animate(anniCard, 
                { opacity: [0, 1], transform: ['translateY(40px) scale(0.96)', 'translateY(0px) scale(1)'] },
                { duration: 0.85, easing: 'ease-out' }
            );

            // Animate Numbers Counting Up
            document.querySelectorAll('.stat-number[data-count]').forEach(el => {
                const target = parseInt(el.dataset.count, 10);
                if (isNaN(target)) return;
                const duration = 1600;
                const start = performance.now();
                function update(now) {
                    const elapsed = now - start;
                    const progress = Math.min(elapsed / duration, 1);
                    const ease = 1 - Math.pow(1 - progress, 4);
                    const current = Math.floor(ease * target);
                    el.textContent = current.toLocaleString();
                    if (progress < 1) requestAnimationFrame(update);
                    else el.textContent = target.toLocaleString();
                }
                requestAnimationFrame(update);
            });
        });
    }

    // 4. Timeline Cards Staggered Spring InView
    if (inView) {
        document.querySelectorAll('.timeline-item').forEach((item) => {
            inView(item, () => {
                const card = item.querySelector('.timeline-card');
                const node = item.querySelector('.timeline-node');
                if (card) {
                    animate(card,
                        { opacity: [0, 1], transform: ['translateY(35px) scale(0.97)', 'translateY(0px) scale(1)'] },
                        { duration: 0.7, delay: 0.1, easing: 'ease-out' }
                    );
                }
                if (node) {
                    animate(node,
                        { transform: ['scale(0) translate(-50%, -50%)', 'scale(1) translate(-50%, -50%)'], opacity: [0, 1] },
                        { duration: 0.5, easing: 'ease-out' }
                    );
                }
            });
        });
    }

    // 5. Wedding & Promise Pillars InView
    if (inView) {
        inView('.wedding-quote-card', (el) => {
            animate(el, { opacity: [0, 1], transform: ['translateY(30px)', 'translateY(0)'] }, { duration: 0.75, easing: 'ease-out' });
        });

        inView('.promise-section', (el) => {
            animate(el, { opacity: [0, 1], transform: ['translateY(35px)', 'translateY(0)'] }, { duration: 0.8, easing: 'ease-out' });
            animate('.promise-pill', 
                { opacity: [0, 1], transform: ['translateY(20px)', 'translateY(0)'] },
                { delay: stagger(0.12), duration: 0.5, easing: 'ease-out' }
            );
        });
    }
}

/* ==========================================================================
   10. Interactive 1-Month Anniversary Milestone Features
   ========================================================================== */
function initAnniversaryInteractions() {
    const burstBtn = document.getElementById('love-burst-btn');
    const countEl = document.getElementById('love-count');
    if (!burstBtn) return;

    let totalLoves = parseInt(localStorage.getItem('premiii_love_count') || '12', 10);
    if (countEl) countEl.textContent = totalLoves;

    burstBtn.addEventListener('click', () => {
        totalLoves++;
        if (countEl) {
            countEl.textContent = totalLoves;
            if (window.Motion) {
                window.Motion.animate(countEl, { transform: ['scale(1)', 'scale(1.4)', 'scale(1)'] }, { duration: 0.35 });
            }
        }
        try { localStorage.setItem('premiii_love_count', totalLoves); } catch (err) {}

        // Button spring bounce
        if (window.Motion) {
            window.Motion.animate(burstBtn, { transform: ['scale(0.93)', 'scale(1.05)', 'scale(1)'] }, { duration: 0.3 });
        }

        // Spawn Romantic Particle Explosion
        const rect = burstBtn.getBoundingClientRect();
        const originX = rect.left + rect.width / 2;
        const originY = rect.top + rect.height / 2;
        const emojis = ['💖', '🦋', '✨', '🌹', '💍', '🌸', '💕', '🥰'];

        for (let i = 0; i < 14; i++) {
            const span = document.createElement('span');
            span.className = 'tap-particle';
            span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            span.style.left = `${originX}px`;
            span.style.top = `${originY}px`;
            document.body.appendChild(span);

            const destX = (Math.random() - 0.5) * 260;
            const destY = -120 - Math.random() * 220;
            const rotate = (Math.random() - 0.5) * 120;
            const scale = Math.random() * 0.8 + 0.8;

            const durationSec = 1.2 + Math.random() * 0.6;
            const durationMs = Math.round(durationSec * 1000);
            let cleaned = false;
            const removeSpan = () => {
                if (cleaned) return;
                cleaned = true;
                if (span && span.parentNode) span.remove();
            };

            if (window.Motion && typeof window.Motion.animate === 'function') {
                try {
                    const anim = window.Motion.animate(span, {
                        x: [0, destX],
                        y: [0, destY],
                        rotate: [0, rotate],
                        scale: [0.3, scale, 0.4],
                        opacity: [1, 1, 0]
                    }, {
                        duration: durationSec,
                        easing: 'ease-out'
                    });
                    if (anim && typeof anim.then === 'function') {
                        anim.then(removeSpan).catch(() => {});
                    } else if (anim && anim.finished && typeof anim.finished.then === 'function') {
                        anim.finished.then(removeSpan).catch(() => {});
                    }
                } catch (err) {}
            }
            // Guaranteed fallback cleanup timer so DOM elements are always safely removed
            setTimeout(removeSpan, durationMs + 80);
        }
    });
}

/* ==========================================================================
   11. Floating Mobile Navigation Dock with Active Scrollspy
   ========================================================================== */
function initMobileDock() {
    const dock = document.getElementById('mobile-dock');
    if (!dock) return;

    const dockItems = dock.querySelectorAll('.dock-item');
    const sections = ['hero', 'anniversary-spotlight', 'journey', 'gallery', 'film', 'letter'];

    // Smooth click handler with spring
    dockItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const secId = item.dataset.section;
            const target = document.getElementById(secId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                dockItems.forEach(d => d.classList.remove('active'));
                item.classList.add('active');
                if (window.Motion) {
                    window.Motion.animate(item, { transform: ['scale(0.88)', 'scale(1.1)', 'scale(1)'] }, { duration: 0.35 });
                }
            }
        });
    });

    // Scrollspy using IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                dockItems.forEach(d => {
                    if (d.dataset.section === id) {
                        d.classList.add('active');
                    } else {
                        d.classList.remove('active');
                    }
                });
            }
        });
    }, { threshold: 0.25 });

    sections.forEach(id => {
        const sec = document.getElementById(id);
        if (sec) observer.observe(sec);
    });
}

/* ==========================================================================
   12. Interactive Touch Sparks (Romantic Micro-Interactions Anywhere)
   ========================================================================== */
function initTouchSparks() {
    let lastTime = 0;
    const sparkEmojis = ['✨', '🦋', '🌸', '💕', '💛'];

    function handlePointer(e) {
        // Avoid interfering with button or link clicks
        if (e.target.closest('button, a, input, select, video, .lightbox-modal')) return;

        const now = Date.now();
        if (now - lastTime < 160) return; // Smooth throttle
        lastTime = now;

        const x = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
        const y = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
        if (!x || !y) return;

        const spark = document.createElement('span');
        spark.className = 'tap-particle';
        spark.textContent = sparkEmojis[Math.floor(Math.random() * sparkEmojis.length)];
        spark.style.left = `${x}px`;
        spark.style.top = `${y}px`;
        spark.style.fontSize = '1.25rem';
        document.body.appendChild(spark);

        const durationMs = 850;
        let cleaned = false;
        const removeSpark = () => {
            if (cleaned) return;
            cleaned = true;
            if (spark && spark.parentNode) spark.remove();
        };

        if (window.Motion && typeof window.Motion.animate === 'function') {
            try {
                const anim = window.Motion.animate(spark, {
                    y: [0, -45 - Math.random() * 35],
                    x: [(Math.random() - 0.5) * 35],
                    opacity: [1, 0],
                    scale: [0.6, 1.25, 0.3]
                }, {
                    duration: 0.85,
                    easing: 'ease-out'
                });
                if (anim && typeof anim.then === 'function') {
                    anim.then(removeSpark).catch(() => {});
                } else if (anim && anim.finished && typeof anim.finished.then === 'function') {
                    anim.finished.then(removeSpark).catch(() => {});
                }
            } catch (err) {}
        }
        // Guaranteed fallback cleanup timer
        setTimeout(removeSpark, durationMs + 80);
    }

    window.addEventListener('click', handlePointer, { passive: true });
    window.addEventListener('touchstart', handlePointer, { passive: true });
}
