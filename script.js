document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP Plugins
    gsap.registerPlugin(ScrollTrigger);

    const scenes = gsap.utils.toArray('.scene');
    let currentIndex = 0;
    let isAnimating = false;

    // --- Initialization ---
    // Set first scene active
    gsap.set(scenes[0], { autoAlpha: 1 });
    gsap.to(scenes[0].querySelectorAll('.fade-up'), {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
    });

    // --- Scene Transition Logic ---
    function goToScene(index) {
        if (isAnimating || index === currentIndex || index < 0 || index >= scenes.length) return;

        isAnimating = true;
        const prevScene = scenes[currentIndex];
        const nextScene = scenes[index];

        const tl = gsap.timeline({
            onComplete: () => {
                isAnimating = false;
                currentIndex = index;
            }
        });

        // Outgoing Scene
        tl.to(prevScene.querySelectorAll('.fade-up'), {
            y: -50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.in'
        })
            .to(prevScene, { autoAlpha: 0, duration: 0.5 }, "-=0.2")

            // Incoming Scene
            .set(nextScene, { autoAlpha: 1 })
            .fromTo(nextScene.querySelectorAll('.fade-up'),
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out' },
                "-=0.3"
            );
    }

    // --- Scroll Handling ---
    let lastScrollTime = 0;
    const scrollDelay = 1000; // ms

    function handleScroll(direction) {
        const now = Date.now();
        if (now - lastScrollTime < scrollDelay || isAnimating) return;

        if (direction > 0) {
            goToScene(currentIndex + 1);
        } else {
            goToScene(currentIndex - 1);
        }
        lastScrollTime = now;
    }

    window.addEventListener('wheel', (e) => {
        handleScroll(e.deltaY);
    }, { passive: true });

    // Touch Support
    let touchStartY = 0;
    window.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    window.addEventListener('touchend', (e) => {
        const touchEndY = e.changedTouches[0].clientY;
        handleScroll(touchStartY - touchEndY); // Swipe up = scroll down
    }, { passive: true });

    // --- Menu Toggle ---
    const menuBtn = document.getElementById('menu-btn');
    const nav = document.getElementById('fullscreen-nav');
    const menuLinks = document.querySelectorAll('.nav-link');

    menuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        if (nav.classList.contains('active')) {
            gsap.fromTo(menuLinks,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.3 }
            );
        }
    });

    // Close menu and navigate on link click
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            nav.classList.remove('active');

            const index = link.getAttribute('data-index');
            if (index !== null) {
                goToScene(parseInt(index));
            }

            // Special handling for "MY NOTES" link
            if (link.id === 'nav-note-trigger') {
                noteModal.classList.add('active');
            }
        });
    });

    // --- Background Video Support ---
    const bgVideo1 = document.getElementById('bg-video');
    const bgVideo2 = document.getElementById('bg-video-2');
    let activeVideo = bgVideo1;
    let inactiveVideo = bgVideo2;

    // Ensure playback on all browsers
    if (bgVideo1) bgVideo1.play().catch(() => { });

    // Define video sources for each section
    const sectionVideos = {
        'scene-hero': 'videos/WhatsApp Video 2026-02-10 at 22.15.07.mp4',
        'scene-concept': 'videos/WhatsApp Video 2026-02-10 at 22.15.07.mp4',
        'scene-experience': 'videos/WhatsApp Video 2026-02-10 at 22.15.07.mp4',
        'scene-contact': 'videos/WhatsApp Video 2026-02-10 at 22.15.07.mp4'
    };

    function switchVideo(newSource) {
        if (activeVideo.getAttribute('src') === newSource) return; // Prevent redundant switches

        // Set source for the inactive video
        const sourceElement = inactiveVideo.querySelector('source');
        if (sourceElement) {
            sourceElement.src = newSource;
            inactiveVideo.load();
            inactiveVideo.play().then(() => {
                // Crossfade
                gsap.to(inactiveVideo, { opacity: 0.8, duration: 1 });
                gsap.to(activeVideo, { opacity: 0, duration: 1 });

                // Swap active content
                const temp = activeVideo;
                activeVideo = inactiveVideo;
                inactiveVideo = temp;
            }).catch(err => console.error("Video play failed:", err));
        }
    }

    // ScrollTrigger for background changes
    ScrollTrigger.create({
        trigger: "#scene-hero",
        start: "top center",
        onEnter: () => switchVideo(sectionVideos['scene-hero']),
        onEnterBack: () => switchVideo(sectionVideos['scene-hero'])
    });

    ScrollTrigger.create({
        trigger: "#scene-concept",
        start: "top center",
        onEnter: () => switchVideo(sectionVideos['scene-concept']),
        onEnterBack: () => switchVideo(sectionVideos['scene-concept'])
    });

    ScrollTrigger.create({
        trigger: "#scene-experience",
        start: "top center",
        onEnter: () => switchVideo(sectionVideos['scene-experience']),
        onEnterBack: () => switchVideo(sectionVideos['scene-experience'])
    });

    ScrollTrigger.create({
        trigger: "#scene-contact",
        start: "top center",
        onEnter: () => switchVideo(sectionVideos['scene-contact']),
        onEnterBack: () => switchVideo(sectionVideos['scene-contact'])
    });

    // --- Particle Background (Removed) ---
    // (Deprecated in favor of video background)

    // --- Note Feature ---
    const noteBtn = document.getElementById('note-btn');
    const noteModal = document.getElementById('note-modal');
    const closeNote = document.getElementById('close-note');
    const noteArea = document.getElementById('note-area');
    const reportDateInput = document.getElementById('report-date');
    const merchantInput = document.getElementById('merchant-name');
    const marketInput = document.getElementById('market-name');
    const commodityInput = document.getElementById('commodity-name');
    const causeInput = document.getElementById('cause-name');
    const saveNoteBtn = document.getElementById('save-note');
    const whatsappNoteBtn = document.getElementById('whatsapp-note');
    const downloadNoteBtn = document.getElementById('download-note');

    // Load saved data
    const savedData = JSON.parse(localStorage.getItem('user_note_data') || '{}');
    if (savedData.note) noteArea.value = savedData.note;
    if (savedData.date) reportDateInput.value = savedData.date;
    if (savedData.merchant) merchantInput.value = savedData.merchant;
    if (savedData.market) marketInput.value = savedData.market;
    if (savedData.commodity) commodityInput.value = savedData.commodity;
    if (savedData.cause) causeInput.value = savedData.cause;

    // Legacy support (migrate old note if exists)
    const oldNote = localStorage.getItem('user_note');
    if (oldNote && !savedData.note) {
        noteArea.value = oldNote;
        localStorage.removeItem('user_note');
    }

    noteBtn.addEventListener('click', () => {
        noteModal.classList.add('active');
    });

    // Handle all open-note-modal buttons (including hero button)
    document.querySelectorAll('.open-note-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            noteModal.classList.add('active');
        });
    });

    closeNote.addEventListener('click', () => {
        noteModal.classList.remove('active');
    });

    // Close on click outside
    window.addEventListener('click', (e) => {
        if (e.target === noteModal) {
            noteModal.classList.remove('active');
        }
    });

    function getNoteData() {
        return {
            date: reportDateInput.value,
            merchant: merchantInput.value,
            market: marketInput.value,
            commodity: commodityInput.value,
            cause: causeInput.value,
            note: noteArea.value
        };
    }

    saveNoteBtn.addEventListener('click', () => {
        try {
            localStorage.setItem('user_note_data', JSON.stringify(getNoteData()));
            console.log('Note data saved');

            // Brief visual feedback on save
            const originalHTML = saveNoteBtn.innerHTML;
            const savedFeedback = translations[currentLang]['saved'];
            saveNoteBtn.innerHTML = savedFeedback;
            saveNoteBtn.classList.add('saved');

            setTimeout(() => {
                saveNoteBtn.innerHTML = originalHTML;
                saveNoteBtn.classList.remove('saved');
            }, 2000);
        } catch (err) {
            console.error('Save failed:', err);
            alert('Failed to save note. Storage might be full.');
        }
    });

    // Auto-save on typing (debounced)
    let autoSaveTimeout;
    [noteArea, reportDateInput, merchantInput, marketInput, commodityInput, causeInput].forEach(el => {
        el.addEventListener('input', () => {
            clearTimeout(autoSaveTimeout);
            autoSaveTimeout = setTimeout(() => {
                localStorage.setItem('user_note_data', JSON.stringify(getNoteData()));
                console.log('Note data auto-saved');
            }, 1000);
        });
    });

    whatsappNoteBtn.addEventListener('click', () => {
        const data = getNoteData();
        const phone = "085927326555";

        // Format date from input or use current date
        const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        let dateStr;

        if (data.date) {
            const dateObj = new Date(data.date);
            dateStr = `${dateObj.getDate()} ${months[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
        } else {
            const now = new Date();
            dateStr = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
        }

        // Format message matching screenshot exactly
        let message = `*Laporan Perubahan Harga Komoditas PIHPS Pasar Tradisional*\n\n`;
        message += `Tanggal: ${dateStr}\n\n`;
        message += `Beberapa komoditas pada PIHPS Pasar Tradisional yang mengalami perubahan harga antara lain:\n\n`;
        message += `1. ${data.commodity || '...'} – ${data.market || '...'} (${data.merchant || '...'}) – *${data.cause || '...'}*\n\n`;
        message += `${data.note || ''}`;

        const encodedMsg = encodeURIComponent(message);
        const waUrl = `https://wa.me/${phone.replace(/^0/, '62')}?text=${encodedMsg}`;

        window.open(waUrl, '_blank');
    });

    downloadNoteBtn.addEventListener('click', () => {
        try {
            if (typeof window.jspdf === 'undefined') {
                console.error('jsPDF not loaded');
                alert('PDF library is still loading or failed to load. Please try again in 5 seconds.');
                return;
            }

            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            const data = getNoteData();

            if (!data.note.trim() && !data.commodity.trim()) {
                const emptyWarning = currentLang === 'en' ? 'Please type something before downloading.' : 'Silakan ketik sesuatu sebelum mengunduh.';
                alert(emptyWarning);
                return;
            }

            // Date Formatting
            const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
            let dateStr;
            if (data.date) {
                const dateObj = new Date(data.date);
                dateStr = `${dateObj.getDate()} ${months[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
            } else {
                const now = new Date();
                dateStr = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
            }

            // PDF Formatting (Matching professional PIHPS style)
            doc.setFont("Helvetica", "bold");
            doc.setFontSize(14);
            doc.text("Laporan Perubahan Harga Komoditas PIHPS Pasar Tradisional", 10, 20);

            doc.setFont("Helvetica", "normal");
            doc.setFontSize(11);
            doc.text(`Tanggal: ${dateStr}`, 10, 30);

            doc.text("Beberapa komoditas pada PIHPS Pasar Tradisional yang mengalami perubahan harga antara lain:", 10, 45, { maxWidth: 180 });

            doc.setFont("Helvetica", "bold");
            let summaryText = `1. ${data.commodity || "..."} - ${data.market || "..."} (${data.merchant || "..."}) - ${data.cause || "..."}`;
            doc.text(summaryText, 10, 60, { maxWidth: 180 });

            doc.setFont("Helvetica", "normal");
            const splitNote = doc.splitTextToSize(data.note || "", 180);
            doc.text(splitNote, 10, 75);

            doc.save(`Laporan-PIHPS-${Date.now()}.pdf`);
            console.log('PDF download triggered');
        } catch (err) {
            console.error('PDF generation failed:', err);
            alert('Failed to generate PDF. Check console for details.');
        }
    });

    // --- Translation Feature ---
    const langBtn = document.getElementById('lang-btn');
    const translations = {
        'en': {
            'nav-home': 'HOME',
            'nav-concept': 'CONCEPT',
            'nav-exp': 'EXPERIENCE',
            'nav-notes': 'MY NOTES',
            'nav-contact': 'CONTACT',
            'hero-title': 'NOTE TODAY\'S <br> FINDINGS',
            'scroll-down': 'SCROLL DOWN',
            'concept-title': 'INTELLIGENT <br> RECORDING<br> INSTRUMENTS',
            'concept-desc': 'I made this web to facilitate findings and note-taking.',
            'exp-title': 'IMMERSIBLE <br> INTERFACES',
            'exp-desc': 'Crafting paths through the digital nebula, guiding users to their destination.',
            'contact-title': 'START <br> RECORDING',
            'contact-email': '<i class="fas fa-envelope"></i>',
            'modal-title': 'My Notes',
            'note-placeholder': 'Write your additional notes here...',
            'label-date': 'Date',
            'label-merchant': 'Merchant Name',
            'label-market': 'Market Name',
            'label-commodity': 'Commodity',
            'label-cause': 'Cause',
            'placeholder-merchant': 'Enter name...',
            'placeholder-market': 'Enter market name...',
            'placeholder-commodity': 'Enter commodity...',
            'placeholder-cause': 'Enter cause...',
            'btn-save': '<i class="fas fa-save"></i> Save',
            'btn-whatsapp': '<i class="fab fa-whatsapp"></i> WhatsApp',
            'btn-pdf': '<i class="fas fa-file-pdf"></i> PDF',
            'saved': '<i class="fas fa-check"></i> Saved!'
        },
        'id': {
            'nav-home': 'BERANDA',
            'nav-concept': 'KONSEP',
            'nav-exp': 'PENGALAMAN',
            'nav-notes': 'CATATAN SAYA',
            'nav-contact': 'KONTAK',
            'hero-title': 'CATAT TEMUAN <br> HARI INI',
            'scroll-down': 'GULIR KE BAWAH',
            'concept-title': 'INSTRUMEN <br> PENCATATAN <br> CERDAS',
            'concept-desc': 'Saya membuat web ini untuk mempermudah temuan dan pencatatan.',
            'exp-title': 'ANTARMUKA <br> IMERSIF',
            'exp-desc': 'Membuat jalur melalui nebula digital, membimbing pengguna ke tujuan mereka.',
            'contact-title': 'MULAI <br> MENCATAT <br> DI GMAIL',
            'contact-email': '<i class="fas fa-envelope"></i>',
            'modal-title': 'Laporan Catatan',
            'note-placeholder': 'Tulis catatan tambahan Anda di sini...',
            'label-date': 'Tanggal',
            'label-merchant': 'Nama Pedagang',
            'label-market': 'Nama Pasar',
            'label-commodity': 'Nama Komoditas',
            'label-cause': 'Penyebab',
            'placeholder-merchant': 'Nama pedagang...',
            'placeholder-market': 'Nama pasar...',
            'placeholder-commodity': 'Nama komoditas...',
            'placeholder-cause': 'Penyebab...',
            'btn-save': '<i class="fas fa-save"></i> Simpan',
            'btn-whatsapp': '<i class="fab fa-whatsapp"></i> WhatsApp',
            'btn-pdf': '<i class="fas fa-file-pdf"></i> PDF',
            'saved': '<i class="fas fa-check"></i> Tersimpan!'
        }
    };

    let currentLang = localStorage.getItem('user_lang') || 'en';

    function updateLanguage() {
        const elements = document.querySelectorAll('[data-key]');
        elements.forEach(el => {
            const key = el.getAttribute('data-key');
            if (translations[currentLang][key]) {
                el.innerHTML = translations[currentLang][key];
            }
        });

        // Update placeholders
        const placeholders = document.querySelectorAll('[data-placeholder]');
        placeholders.forEach(el => {
            const key = el.getAttribute('data-placeholder');
            if (translations[currentLang][key]) {
                el.placeholder = translations[currentLang][key];
            }
        });

        localStorage.setItem('user_lang', currentLang);
    }

    langBtn.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'id' : 'en';

        // GSAP transition for language switch
        gsap.to('body', {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                updateLanguage();
                gsap.to('body', { opacity: 1, duration: 0.3 });
            }
        });
    });

    // Initial language set
    if (currentLang !== 'en') {
        updateLanguage();
    }

    // --- Interactive Cursor ---
    const cursor = document.getElementById('custom-cursor');
    const follower = document.getElementById('cursor-follower');
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        // Smooth cursor movement
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        // Smooth follower movement
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        follower.style.left = (followerX - (follower.offsetWidth / 2)) + 'px';
        follower.style.top = (followerY - (follower.offsetHeight / 2)) + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Cursor hover effects
    const interactiveElements = document.querySelectorAll('button, a, input, textarea, .nav-link');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-hover');
            gsap.to(cursor, { scale: 1.5, duration: 0.3 });
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hover');
            gsap.to(cursor, { scale: 1, duration: 0.3 });
        });
    });

    // --- Magnetic Buttons ---
    const magneticBtns = document.querySelectorAll('.icon-btn, .menu-toggle, .btn-primary, .btn-secondary, .btn-whatsapp, .contact-cta');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(btn, {
                x: x * 0.4,
                y: y * 0.4,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "elastic.out(1, 0.3)"
            });
        });
    });

    // --- Mouse Parallax for Headings ---
    window.addEventListener('mousemove', (e) => {
        const xPercent = (e.clientX / window.innerWidth) - 0.5;
        const yPercent = (e.clientY / window.innerHeight) - 0.5;

        scenes.forEach(scene => {
            const headings = scene.querySelectorAll('h1, h2');
            headings.forEach(h => {
                gsap.to(h, {
                    x: xPercent * 30,
                    y: yPercent * 30,
                    duration: 1,
                    ease: "power2.out"
                });
            });
        });
    });

    // --- Matrix Background Animation --- (Disabled but kept for structure)
});
