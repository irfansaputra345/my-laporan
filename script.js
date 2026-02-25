document.addEventListener('DOMContentLoaded', () => {
    // --- Global Variable Definitions ---
    const scenes = gsap.utils.toArray('.scene');
    let currentIndex = 0;
    let isAnimating = false;
    let autoSaveTimeout;

    // --- Intro Animation ---
    const preloader = document.getElementById('preloader-overlay');
    const introRobot = document.getElementById('intro-robot');
    const loadingBar = document.querySelector('.loading-bar');

    if (preloader && introRobot) {
        // Start running
        introRobot.classList.add('running');

        const introTl = gsap.timeline({
            onComplete: () => {
                gsap.to(preloader, {
                    opacity: 0,
                    duration: 0.8,
                    delay: 0.5,
                    ease: 'power2.inOut',
                    onComplete: () => {
                        preloader.remove();
                        introRobot.classList.remove('running');
                    }
                });
            }
        });

        introTl
            .to(introRobot, {
                x: '300vw',
                duration: 3.5,
                ease: 'none',
            })
            .to(loadingBar, {
                width: '100%',
                duration: 3,
                ease: 'power1.inOut'
            }, 0);
    }

    const bgImages = [
        'images/anime_hd_bg.png',
        'images/anime_bg_2.png',
        'images/anime_bg_3.png',
        'images/anime_bg_4.png'
    ];

    const noteBtn = document.getElementById('note-btn');
    const noteModal = document.getElementById('note-modal');
    const closeNote = document.getElementById('close-note');
    const noteArea = document.getElementById('note-area');
    const reportDateInput = document.getElementById('report-date');
    const marketInput = document.getElementById('market-name');
    const modernBg = document.getElementById('modern-bg');
    const bgOverlay = document.querySelector('.bg-overlay');
    const findingRowsContainer = document.getElementById('finding-rows-container');
    const addFindingBtn = document.getElementById('add-finding-btn');
    const saveNoteBtn = document.getElementById('save-note');
    const whatsappNoteBtn = document.getElementById('whatsapp-note');
    const downloadNoteBtn = document.getElementById('download-note');
    const downloadNoteWordBtn = document.getElementById('download-note-word');
    const clearNoteBtn = document.getElementById('clear-note');
    const langBtn = document.getElementById('lang-btn');
    const logo = document.querySelector('.logo');
    const videoOverlay = document.getElementById('video-overlay');
    const introVideo = document.getElementById('intro-video');
    let videoTimeout;

    if (logo && videoOverlay && introVideo) {
        logo.addEventListener('click', () => {
            videoOverlay.classList.add('active');
            introVideo.currentTime = 0; // Reset to start
            introVideo.muted = true; // Ensure muted as per user request
            introVideo.play().catch(e => console.log("Autoplay prevented:", e));

            clearTimeout(videoTimeout);
            videoTimeout = setTimeout(() => {
                videoOverlay.classList.remove('active');
                introVideo.pause();
                introVideo.currentTime = 0;
            }, 5000); // 5 seconds duration
        });
    }

    const menuToggle = document.getElementById('menu-btn');
    const nav = document.getElementById('fullscreen-nav');
    const menuLinks = document.querySelectorAll('.nav-link');

    // --- General Note Elements ---
    const genNoteBtn = document.getElementById('gen-note-btn');
    const genNoteModal = document.getElementById('gen-note-modal');
    const closeGenNote = document.getElementById('close-gen-note');
    const genNoteTitle = document.getElementById('gen-note-title');
    const genNoteDate = document.getElementById('gen-note-date');
    const genNoteArea = document.getElementById('gen-note-area');
    const saveGenNoteBtn = document.getElementById('save-gen-note');
    const downloadGenNoteBtn = document.getElementById('download-gen-note');
    const downloadGenNoteWordBtn = document.getElementById('download-gen-note-word');
    const clearGenNoteBtn = document.getElementById('clear-gen-note');
    const navGenNoteTrigger = document.getElementById('nav-gen-note-trigger');
    const navSopTrigger = document.getElementById('nav-sop-trigger');

    // --- SOP Note Elements ---
    const sopModal = document.getElementById('sop-modal');
    const closeSop = document.getElementById('close-sop');
    const sopDateInput = document.getElementById('sop-date');
    const sopMarketInput = document.getElementById('sop-market-name');
    const sopRowsContainer = document.getElementById('sop-rows-container');
    const addSopRowBtn = document.getElementById('add-sop-row-btn');
    const saveSopNoteBtn = document.getElementById('save-sop-note');
    const whatsappSopBtn = document.getElementById('whatsapp-sop');
    const downloadSopBtn = document.getElementById('download-sop');
    const downloadSopWordBtn = document.getElementById('download-sop-word');
    const clearSopNoteBtn = document.getElementById('clear-sop-note');

    // --- SPH Note Elements ---
    const sphModal = document.getElementById('sph-modal');
    const closeSph = document.getElementById('close-sph');
    const sphDateInput = document.getElementById('sph-date');
    const sphRowsContainer = document.getElementById('sph-rows-container');
    const addSphRowBtn = document.getElementById('add-sph-row-btn');
    const saveSphNoteBtn = document.getElementById('save-sph-note');
    const whatsappSphBtn = document.getElementById('whatsapp-sph');
    const downloadSphBtn = document.getElementById('download-sph');
    const downloadSphWordBtn = document.getElementById('download-sph-word');
    const clearSphNoteBtn = document.getElementById('clear-sph-note');
    const navSphTrigger = document.getElementById('nav-sph-trigger');

    // --- Translation Data ---
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
            'exp-title': 'RECENT REPORTS',
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
            'placeholder-cause': 'Cause/Description',
            // Tooltips
            'tooltip-pihps': 'PIHPS Report',
            'tooltip-sop': 'SOP Price Change',
            'tooltip-gen': 'General Note',
            'btn-save': '<i class="fas fa-save"></i> Save',
            'btn-whatsapp': '<i class="fab fa-whatsapp"></i> WhatsApp',
            'btn-pdf': '<i class="fas fa-file-pdf"></i> PDF',
            'btn-word': '<i class="fas fa-file-word"></i> Word',
            'title-clear': 'Clear All',
            'btn-add-item': 'Add Item',
            'btn-add-merchant': 'Add Merchant',
            'title-findings': 'Finding Details',
            'nav-gen-notes': 'GENERAL NOTES',
            'nav-sop-notes': 'SOP PRICE CHANGE',
            'sop-modal-title': 'SOP Price Change',
            'title-sop-details': 'Commodity Details',
            'label-sop-status': 'Price Status',
            'opt-fixed': 'Fixed',
            'opt-up': 'Increase',
            'opt-down': 'Decrease',
            'gen-modal-title': 'General Notes',
            'label-gen-title': 'Title',
            'label-gen-content': 'Note Content',
            'saved': '<i class="fas fa-check"></i> Saved!',
            'nav-sph-notes': 'SPH REPORTS',
            'sph-modal-title': 'SPH Report',
            'title-sph-list': 'Price Change List',
            'label-status': 'Status',
            'status-naik': 'Rise',
            'status-turun': 'Fall',
            'label-anecdotal': 'Anecdotal/Cause',
            'placeholder-anecdotal': 'Cause/Reason...',
            // Hero Labels
            'label-pihps': 'PIHPS',
            'label-sop': 'SOP',
            'label-sph': 'SPH',
            'label-notes': 'NOTES'
        },
        'id': {
            'nav-home': 'BERANDA',
            'nav-concept': 'KONSEP',
            'nav-exp': 'PENGALAMAN',
            'nav-notes': 'LAPORAN PIHPS',
            'nav-gen-notes': 'CATATAN UMUM',
            'nav-contact': 'KONTAK',
            'hero-title': 'CATAT TEMUAN <br> HARI INI',
            'scroll-down': 'GULIR KE BAWAH',
            'concept-title': 'INSTRUMEN <br> PENCATATAN <br> CERDAS',
            'concept-desc': 'Saya membuat web ini untuk mempermudah temuan dan pencatatan.',
            'exp-title': 'LAPORAN TERBARU',
            'contact-title': 'MULAI <br> MENCATAT <br> DI GMAIL',
            '72': '<i class="fas fa-envelope"></i>',
            'modal-title': 'Laporan PIHPS',
            'gen-modal-title': 'Catatan Umum',
            'note-placeholder': 'Tulis catatan tambahan Anda di sini...',
            'label-gen-title': 'Judul',
            'label-gen-content': 'Isi Catatan',
            'label-date': 'Tanggal',
            'label-merchant': 'Nama Pedagang',
            'label-market': 'Nama Pasar',
            'label-commodity': 'Nama Komoditas',
            'label-cause': 'Penyebab',
            'placeholder-merchant': 'Nama pedagang...',
            'placeholder-market': 'Nama pasar...',
            'placeholder-commodity': 'Nama komoditas...',
            'placeholder-cause': 'Penyebab/Keterangan',
            // Tooltips
            'tooltip-pihps': 'Laporan PIHPS',
            'tooltip-sop': 'SOP Perubahan Harga',
            'tooltip-gen': 'Catatan Umum',
            'btn-save': '<i class="fas fa-save"></i> Simpan',
            'btn-whatsapp': '<i class="fab fa-whatsapp"></i> WhatsApp',
            'btn-pdf': '<i class="fas fa-file-pdf"></i> PDF',
            'btn-word': '<i class="fas fa-file-word"></i> Word',
            'title-clear': 'Clear All',
            'btn-add-item': 'Tambah Temuan',
            'btn-add-merchant': 'Tambah Pedagang',
            'title-findings': 'Detail Temuan',
            'nav-sop-notes': 'SOP PERUBAHAN HARGA',
            'sop-modal-title': 'SOP Perubahan Harga',
            'title-sop-details': 'Detail Komoditas',
            'label-sop-status': 'Status Harga',
            'opt-fixed': 'tetap',
            'opt-up': 'naik',
            'opt-down': 'turun',
            'saved': '<i class="fas fa-check"></i> Tersimpan!',
            'nav-sph-notes': 'LAPORAN SPH',
            'sph-modal-title': 'Laporan SPH',
            'title-sph-list': 'Daftar Perubahan Harga',
            'label-status': 'Status',
            'status-naik': 'Naik',
            'status-turun': 'Turun',
            'label-anecdotal': 'Keterangan/Penyebab',
            'placeholder-anecdotal': 'Penyebab/Alasan...',
            // Hero Labels
            'label-pihps': 'PIHPS',
            'label-sop': 'SOP',
            'label-sph': 'SPH',
            'label-notes': 'CATATAN'
        }
    };

    let currentLang = localStorage.getItem('user_lang') || 'en';

    function updateLanguage() {
        // Regular translation
        const elements = document.querySelectorAll('[data-key]');
        elements.forEach(el => {
            const key = el.getAttribute('data-key');
            if (translations[currentLang][key]) {
                el.innerHTML = translations[currentLang][key];
            }
        });

        // Tooltip translation (Preserves inner HTML/Icons)
        const tooltipElements = document.querySelectorAll('[data-tooltip-key]');
        tooltipElements.forEach(el => {
            const key = el.getAttribute('data-tooltip-key');
            if (translations[currentLang][key]) {
                el.setAttribute('data-tooltip', translations[currentLang][key]);
            }
        });

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
            duration: 0.2,
            onComplete: () => {
                updateLanguage();
                gsap.to('body', { opacity: 1, duration: 0.2 });
            }
        });
    });

    // --- Initialization ---
    // Register GSAP Plugins
    gsap.registerPlugin(ScrollTrigger);

    // Initial language set
    updateLanguage();

    // --- Scene Setup ---
    gsap.set(scenes[0], { autoAlpha: 1 });
    gsap.to(scenes[0].querySelectorAll('.fade-up'), {
        y: 0,
        opacity: 1,
        duration: 0.65,
        stagger: 0.15,
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
            duration: 0.5,
            stagger: 0.07,
            ease: 'power3.in'
        })
            .to(prevScene, { autoAlpha: 0, duration: 0.35 }, "-=0.2")

            // Incoming Scene
            .set(nextScene, { autoAlpha: 1 })
            .fromTo(nextScene.querySelectorAll('.fade-up'),
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.65, stagger: 0.15, ease: 'power3.out' },
                "-=0.3"
            );

        // Update Background Image
        if (modernBg) {
            modernBg.style.backgroundImage = `url('${bgImages[index % bgImages.length]}')`;
        }
    }

    // --- Scroll Handling ---
    let lastScrollTime = 0;
    const scrollDelay = 1000; // ms

    function handleScroll(direction) {
        const now = Date.now();
        if (now - lastScrollTime < scrollDelay || isAnimating) return;

        // Prevent scene transitions when modal or navigation is active
        if (noteModal.classList.contains('active') || nav.classList.contains('active')) return;

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
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        if (nav.classList.contains('active')) {
            gsap.fromTo(menuLinks,
                { x: 30, opacity: 0 }, // Changed y to x for sidebar slide-in effect
                { x: 0, opacity: 1, duration: 0.35, stagger: 0.07, delay: 0.2 }
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

    // --- Background Modern Display ---

    // Subtle parallax effect on mouse move
    window.addEventListener('mousemove', (e) => {
        if (!modernBg) return;
        const x = (e.clientX / window.innerWidth - 0.5) * 20; // max 10px move
        const y = (e.clientY / window.innerHeight - 0.5) * 20;

        gsap.to(modernBg, {
            x: x,
            y: y,
            duration: 0.65,
            ease: 'power1.out'
        });
    });

    // Define colors for each section to shift the mesh gradient
    const sectionThemes = {
        'scene-hero': { accent: 'rgba(218, 41, 28, 0.15)', gold: 'rgba(251, 225, 34, 0.1)' },
        'scene-concept': { accent: 'rgba(0, 188, 212, 0.15)', gold: 'rgba(255, 255, 255, 0.05)' },
        'scene-experience': { accent: 'rgba(156, 39, 176, 0.15)', gold: 'rgba(218, 41, 28, 0.1)' },
        'scene-contact': { accent: 'rgba(218, 41, 28, 0.15)', gold: 'rgba(251, 225, 34, 0.1)' }
    };

    function updateBackgroundTheme(sceneId) {
        if (!bgOverlay || !sectionThemes[sceneId]) return;
        const theme = sectionThemes[sceneId];

        gsap.to(bgOverlay, {
            background: `radial-gradient(circle at 20% 30%, ${theme.accent} 0%, transparent 50%),
                         radial-gradient(circle at 80% 70%, ${theme.gold} 0%, transparent 50%),
                         radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.8) 100%)`,
            duration: 1,
            ease: 'power2.inOut'
        });
    }

    // ScrollTrigger for background theme changes
    Object.keys(sectionThemes).forEach(sceneId => {
        ScrollTrigger.create({
            trigger: `#${sceneId}`,
            start: "top center",
            onEnter: () => updateBackgroundTheme(sceneId),
            onEnterBack: () => updateBackgroundTheme(sceneId)
        });
    });

    // --- Particle Background (Removed) ---
    // (Deprecated in favor of video background)

    // --- Note Feature ---
    // (Variables defined at top)

    function autoResize(element) {
        element.style.height = 'auto';
        element.style.height = element.scrollHeight + 'px';
    }

    function createFindingRow(merchant = '', commodity = '', cause = '') {
        const row = document.createElement('div');
        row.className = 'finding-row';
        row.innerHTML = `
            <div class="input-group">
                <label data-key="label-merchant">${translations[currentLang]['label-merchant']}</label>
                <input type="text" class="merchant-input" data-placeholder="placeholder-merchant" 
                    placeholder="${translations[currentLang]['placeholder-merchant']}" value="${merchant}">
            </div>
            <div class="input-group">
                <label data-key="label-commodity">${translations[currentLang]['label-commodity']}</label>
                <input type="text" class="commodity-input" data-placeholder="placeholder-commodity" 
                    placeholder="${translations[currentLang]['placeholder-commodity']}" value="${commodity}">
            </div>
            <div class="input-group">
                <label data-key="label-cause">${translations[currentLang]['label-cause']}</label>
                <textarea class="cause-input auto-expand" data-placeholder="placeholder-cause" 
                    placeholder="${translations[currentLang]['placeholder-cause']}" rows="1">${cause}</textarea>
            </div>
            <button class="remove-finding-btn"><i class="fas fa-trash"></i></button>
        `;

        row.querySelector('.remove-finding-btn').addEventListener('click', () => {
            row.remove();
            checkFindingRemoveButtons();
            autoSaveNote();
        });

        row.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', () => {
                autoSaveNote();
                if (input.classList.contains('auto-expand')) {
                    autoResize(input);
                }
            });
        });

        // Initialize resize
        const textarea = row.querySelector('textarea');
        if (textarea) setTimeout(() => autoResize(textarea), 0);

        return row;
    }

    function checkFindingRemoveButtons() {
        const rows = findingRowsContainer.querySelectorAll('.finding-row');
        rows.forEach(row => {
            const btn = row.querySelector('.remove-finding-btn');
            btn.style.display = rows.length > 1 ? 'flex' : 'none';
        });
    }

    addFindingBtn.addEventListener('click', () => {
        findingRowsContainer.appendChild(createFindingRow());
        checkFindingRemoveButtons();
    });

    // Load saved data
    const savedData = JSON.parse(localStorage.getItem('user_note_data') || '{}');
    if (savedData.note) noteArea.value = savedData.note;
    if (savedData.date) reportDateInput.value = savedData.date;
    if (savedData.market) marketInput.value = savedData.market;

    // Load finding rows
    findingRowsContainer.innerHTML = '';
    if (savedData.items && savedData.items.length > 0) {
        savedData.items.forEach(item => {
            findingRowsContainer.appendChild(createFindingRow(item.merchant || '', item.commodity || '', item.cause || ''));
        });
    } else {
        // Compatibility/New: try to migrate old structure if it exists
        const legacyMerchant = savedData.merchants && savedData.merchants.length > 0 ? savedData.merchants[0] : (savedData.merchant || '');
        const legacyCommodity = savedData.commodity || '';
        const legacyCause = savedData.cause || '';
        findingRowsContainer.appendChild(createFindingRow(legacyMerchant, legacyCommodity, legacyCause));
    }
    checkFindingRemoveButtons();

    // Legacy support (migrate old note if exists)
    const oldNote = localStorage.getItem('user_note');
    if (oldNote && !savedData.note) {
        noteArea.value = oldNote;
        localStorage.removeItem('user_note');
    }

    if (noteBtn) {
        noteBtn.addEventListener('click', () => {
            noteModal.classList.add('active');
        });
    }

    // Handle all open-note-modal buttons (including hero button)
    document.querySelectorAll('.open-note-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            noteModal.classList.add('active');
            setTimeout(() => { if (marketInput) marketInput.focus(); }, 100);
        });
    });

    // Handle all open-gen-note-modal buttons (new hero button)
    document.querySelectorAll('.open-gen-note-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            genNoteModal.classList.add('active');
            setTimeout(() => { if (genNoteTitle) genNoteTitle.focus(); }, 100);
        });
    });

    // SOP Modal triggers
    document.querySelectorAll('.open-sop-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            sopModal.classList.add('active');
            setTimeout(() => { if (sopMarketInput) sopMarketInput.focus(); }, 100);
        });
    });

    if (navSopTrigger) {
        navSopTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            nav.classList.remove('active');
            sopModal.classList.add('active');
            setTimeout(() => { if (sopMarketInput) sopMarketInput.focus(); }, 100);
        });
    }

    if (closeSop) {
        closeSop.addEventListener('click', () => {
            sopModal.classList.remove('active');
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === sopModal) {
            sopModal.classList.remove('active');
        }
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
        const items = [];
        findingRowsContainer.querySelectorAll('.finding-row').forEach(row => {
            items.push({
                merchant: row.querySelector('.merchant-input').value,
                commodity: row.querySelector('.commodity-input').value,
                cause: row.querySelector('.cause-input').value
            });
        });

        return {
            date: reportDateInput.value,
            market: marketInput.value,
            items: items,
            note: noteArea.value
        };
    }

    saveNoteBtn.addEventListener('click', () => {
        try {
            const currentData = getNoteData();
            localStorage.setItem('user_note_data', JSON.stringify(currentData));

            // Add to reports history
            const reports = JSON.parse(localStorage.getItem('user_reports') || '[]');
            reports.unshift(currentData); // Add to beginning
            localStorage.setItem('user_reports', JSON.stringify(reports));

            console.log('Note data saved to history');
            renderReports(); // Refresh gallery

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

    // --- Reports Gallery Rendering ---
    const reportsContainer = document.getElementById('reports-container');

    function renderReports() {
        if (!reportsContainer) return;

        const reports = JSON.parse(localStorage.getItem('user_reports') || '[]');
        const genNotes = JSON.parse(localStorage.getItem('user_gen_notes') || '[]');

        // Combine and sort by date or insertion order
        const allNotes = [
            ...reports.map(r => ({ ...r, type: r.type || 'report' })),
            ...genNotes.map(n => ({ ...n, type: 'general' }))
        ];

        if (allNotes.length === 0) {
            reportsContainer.innerHTML = `<p style="grid-column: 1/-1; opacity: 0.5;">${currentLang === 'en' ? 'No reports saved yet.' : 'Belum ada laporan tersimpan.'}</p>`;
            return;
        }

        const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

        reportsContainer.innerHTML = allNotes.map((note, index) => {
            let cardDateStr = '-';
            if (note.date) {
                const d = new Date(note.date);
                cardDateStr = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
            }

            if (note.type === 'general') {
                return `
                    <div class="report-card general-note-card">
                        <div class="report-header">
                            <div class="report-title">${note.title || 'GENERAL NOTE'}</div>
                            <div class="report-date">${cardDateStr}</div>
                        </div>
                        <div class="report-notes" style="flex: 1; border-top: 1px solid rgba(0,0,0,0.05); padding-top: 10px;">
                            ${note.content || note.note || ''}
                        </div>
                    </div>
                `;
            }

            if (note.type === 'sph') {
                return `
                    <div class="report-card sph-report-card">
                        <div class="report-header">
                            <div class="report-title"><i class="fas fa-list-ol"></i> SPH REPORT</div>
                            <div class="report-date">${cardDateStr}</div>
                        </div>
                        <div class="report-items-list">
                            ${note.items ? note.items.map((item, i) => {
                    const statusClass = item.status === 'status-naik' ? 'status-up' : 'status-down';
                    const statusText = translations[currentLang][item.status] || item.status;
                    return `
                                    <div class="report-item">
                                        <strong>${item.commodity || '...'}</strong>: 
                                        <span class="sop-status-pill ${statusClass}">${statusText}</span>
                                        ${item.anecdotal ? `<div style="margin-top: 4px; font-size: 0.85rem; opacity: 0.7;">${item.anecdotal}</div>` : ''}
                                    </div>
                                `;
                }).join('') : '<div class="report-item">No items</div>'}
                        </div>
                        <div class="report-footer" style="justify-content: flex-end;">
                             <button class="card-wa-btn" onclick="window.open('https://api.whatsapp.com/send?phone=6285927326555&text=${encodeURIComponent(`Laporan SPH ${cardDateStr} :\n\nKomoditas Naik:\n` + (note.items.filter(i => i.status === 'status-naik').map(i => `- ${i.commodity}`).join('\n') || '- (Nihil)') + `\n\nKomoditas Turun:\n` + (note.items.filter(i => i.status === 'status-turun').map(i => `- ${i.commodity}`).join('\n') || '- (Nihil)'))}', '_blank')">
                                <i class="fab fa-whatsapp"></i>
                             </button>
                        </div>
                    </div>
                `;
            }

            if (note.type === 'sop') {
                return `
                    <div class="report-card sop-report-card">
                        <div class="report-header">
                            <div class="report-title"><i class="fas fa-chart-column"></i> SOP PRICE CHANGE</div>
                            <div class="report-date">${cardDateStr}</div>
                        </div>
                        <div class="report-items-list">
                            ${note.items ? note.items.map((item, i) => {
                    const statusClass = item.status === 'opt-up' ? 'status-up' : (item.status === 'opt-down' ? 'status-down' : 'status-fixed');
                    const statusText = translations[currentLang][item.status] || 'tetap';
                    return `
                                <div class="report-item">
                                    <strong>${i + 1}. ${item.commodity || '...'}</strong>: 
                                    <span class="sop-status-pill ${statusClass}">${statusText}</span>
                                    ${item.cause ? `<div style="margin-top: 4px; font-size: 0.85rem; opacity: 0.7;">${item.cause}</div>` : ''}
                                </div>
                            `;
                }).join('') : `<div class="report-item">No items</div>`}
                        </div>
                        <div class="report-footer">
                             <div class="report-market"><i class="fas fa-store"></i> ${note.market || '...'}</div>
                             <button class="card-wa-btn" onclick="window.open('https://api.whatsapp.com/send?phone=6285927326555&text=${encodeURIComponent(`SOP Perubahan Harga mingguan ${note.market || 'Pasar ...'} ${cardDateStr} :\n\n` + (note.items ? note.items.map((item, i) => `${i + 1}. ${item.commodity || '...'}: ${translations[currentLang][item.status] || 'tetap'}${item.cause ? ' karena ' + item.cause : ''}`).join('\n') : ''))}', '_blank')">
                                <i class="fab fa-whatsapp"></i>
                             </button>
                        </div>
                    </div>
                `;
            }

            return `
                <div class="report-card">
                    <div class="report-header">
                        <div class="report-title">PIHPS REPORT</div>
                        <div class="report-date">${cardDateStr}</div>
                    </div>
                    <div class="report-items-list">
                        ${note.items ? note.items.map((item, i) => {
                const marketName = note.market || '...';
                return `
                            <div class="report-item">
                                <strong>${i + 1}. ${item.commodity || '...'}</strong> – ${marketName} (${item.merchant || '...'})
                                <div style="margin-top: 4px;"><span class="report-cause">${item.cause || '...'}</span></div>
                            </div>
                        `;
            }).join('') : `
                            <div class="report-item">
                                <strong>...</strong> – ${note.market || '...'}
                                <div style="margin-top: 4px;"><span class="report-cause">...</span></div>
                            </div>
                        `}
                    </div>
                    <div class="report-notes">
                        ${note.note || ''}
                    </div>
                </div>
            `;
        }).join('');
    }

    // Initial render
    renderReports();

    function autoSaveNote() {
        clearTimeout(autoSaveTimeout);
        autoSaveTimeout = setTimeout(() => {
            localStorage.setItem('user_note_data', JSON.stringify(getNoteData()));
            console.log('Note data auto-saved');
        }, 1000);
    }

    [noteArea, reportDateInput, marketInput].forEach(el => {
        el.addEventListener('input', autoSaveNote);
    });

    whatsappNoteBtn.addEventListener('click', () => {
        const data = getNoteData();
        const phone = "087847712990";

        // Format date from input or use current date
        const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        let waDateStr;

        if (data.date) {
            const dateObj = new Date(data.date);
            waDateStr = `${dateObj.getDate()} ${months[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
        } else {
            const now = new Date();
            waDateStr = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
        }

        // Format message matching screenshot exactly
        let message = `*Laporan Perubahan Harga Komoditas PIHPS Pasar Tradisional*\n\n`;
        message += `Tanggal: ${waDateStr}\n\n`;
        message += `Beberapa komoditas pada PIHPS Pasar Tradisional yang mengalami perubahan harga antara lain:\n\n`;

        const marketName = data.market || '...';

        if (data.items && data.items.length > 0) {
            data.items.forEach((item, i) => {
                message += `${i + 1}. ${item.commodity || '...'} – ${marketName} (${item.merchant || '...'}) – *${item.cause || '...'}*\n\n`;
            });
        } else {
            message += `1. ... – ${marketName} (...) – *...*\n\n`;
        }

        message += `${data.note || ''}`;

        const encodedMsg = encodeURIComponent(message);
        const waUrl = `https://api.whatsapp.com/send?phone=${phone.replace(/^0/, '62')}&text=${encodedMsg}`;

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

            if (!data.note.trim() && (!data.items || data.items.length === 0 || !data.items[0].commodity.trim())) {
                const emptyWarning = currentLang === 'en' ? 'Please type something before downloading.' : 'Silakan ketik sesuatu sebelum mengunduh.';
                alert(emptyWarning);
                return;
            }

            // Date Formatting
            const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
            let pdfDateStr;
            if (data.date) {
                const dateObj = new Date(data.date);
                pdfDateStr = `${dateObj.getDate()} ${months[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
            } else {
                const now = new Date();
                pdfDateStr = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
            }

            // PDF Formatting (Matching professional PIHPS style)
            doc.setFont("Helvetica", "bold");
            doc.setFontSize(14);
            doc.text("Laporan Perubahan Harga Komoditas PIHPS Pasar Tradisional", 10, 20);

            doc.setFont("Helvetica", "normal");
            doc.setFontSize(11);
            doc.text(`Tanggal: ${pdfDateStr}`, 10, 30);

            doc.text("Beberapa komoditas pada PIHPS Pasar Tradisional yang mengalami perubahan harga antara lain:", 10, 45, { maxWidth: 180 });

            doc.setFont("Helvetica", "bold");
            let yPos = 60;
            const marketName = data.market || '...';

            if (data.items && data.items.length > 0) {
                data.items.forEach((item, i) => {
                    let summaryText = `${i + 1}. ${item.commodity || "..."} - ${marketName} (${item.merchant || "..."}) - ${item.cause || "..."}`;
                    const splitText = doc.splitTextToSize(summaryText, 180);
                    doc.text(splitText, 10, yPos);
                    yPos += (splitText.length * 7);
                });
            } else {
                let summaryText = `1. ... - ${marketName} (...) - ...`;
                doc.text(summaryText, 10, yPos, { maxWidth: 180 });
                yPos += 15;
            }

            doc.setFont("Helvetica", "normal");
            const splitNote = doc.splitTextToSize(data.note || "", 180);
            doc.text(splitNote, 10, yPos + 5);

            doc.save(`Laporan-PIHPS-${Date.now()}.pdf`);
            console.log('PDF download triggered');
        } catch (err) {
            console.error('PDF generation failed:', err);
            alert('Failed to generate PDF. Check console for details.');
        }
    });

    function downloadAsWord(filename, html) {
        const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'></head><body>";
        const footer = "</body></html>";
        const source = header + html + footer;

        const blob = new Blob(['\ufeff', source], {
            type: 'application/msword'
        });

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    if (downloadNoteWordBtn) {
        downloadNoteWordBtn.addEventListener('click', () => {
            const data = getNoteData();
            let html = `<h1>LAPORAN TEMUAN PIHPS</h1>
                        <p><strong>Tanggal:</strong> ${data.date}</p>
                        <p><strong>Pasar:</strong> ${data.market}</p>
                        <hr>
                        <ul>`;
            data.items.forEach((f, i) => {
                html += `<li><strong>${f.merchant} (${f.commodity})</strong><br>Penyebab: ${f.cause}</li>`;
            });
            html += `</ul>`;
            if (data.note) {
                html += `<p><strong>Catatan:</strong> ${data.note}</p>`;
            }
            downloadAsWord(`Laporan-${Date.now()}.doc`, html);
        });
    }

    clearNoteBtn.addEventListener('click', () => {
        const confirmMsg = currentLang === 'id'
            ? 'Apakah Anda yakin ingin menghapus semua isi catatan ini?'
            : 'Are you sure you want to clear all contents of this note?';

        if (!confirm(confirmMsg)) return;

        // Reset date to today
        reportDateInput.value = new Date().toISOString().split('T')[0];

        // Reset market name
        marketInput.value = '';

        // Clear and reset finding rows (keep one empty)
        findingRowsContainer.innerHTML = '';
        findingRowsContainer.appendChild(createFindingRow());
        checkFindingRemoveButtons();

        // Reset textarea
        noteArea.value = '';

        // Save empty state to localStorage
        autoSaveNote();
    });

    // --- General Note Feature Logic ---
    function getGenNoteData() {
        return {
            title: genNoteTitle.value,
            date: genNoteDate.value,
            content: genNoteArea.value
        };
    }

    function autoSaveGenNote() {
        clearTimeout(autoSaveTimeout);
        autoSaveTimeout = setTimeout(() => {
            localStorage.setItem('user_gen_note_temp', JSON.stringify(getGenNoteData()));
            console.log('General note auto-saved');
        }, 1000);
    }

    if (genNoteTitle) {
        [genNoteTitle, genNoteDate, genNoteArea].forEach(el => {
            el.addEventListener('input', autoSaveGenNote);
        });

        // Load temp general note
        const savedGenTemp = JSON.parse(localStorage.getItem('user_gen_note_temp') || '{}');
        if (savedGenTemp.title) genNoteTitle.value = savedGenTemp.title;
        if (savedGenTemp.date) genNoteDate.value = savedGenTemp.date;
        if (savedGenTemp.content) genNoteArea.value = savedGenTemp.content;

        if (genNoteBtn) {
            genNoteBtn.addEventListener('click', () => genNoteModal.classList.add('active'));
        }
        closeGenNote.addEventListener('click', () => genNoteModal.classList.remove('active'));

        if (navGenNoteTrigger) {
            navGenNoteTrigger.addEventListener('click', (e) => {
                e.preventDefault();
                nav.classList.remove('active');
                genNoteModal.classList.add('active');
                setTimeout(() => { if (genNoteTitle) genNoteTitle.focus(); }, 100);
            });
        }

        window.addEventListener('click', (e) => {
            if (e.target === genNoteModal) genNoteModal.classList.remove('active');
        });

        saveGenNoteBtn.addEventListener('click', () => {
            try {
                const data = getGenNoteData();
                const genNotes = JSON.parse(localStorage.getItem('user_gen_notes') || '[]');
                genNotes.unshift({ ...data, id: Date.now() });
                localStorage.setItem('user_gen_notes', JSON.stringify(genNotes));

                // Feedback
                const originalHTML = saveGenNoteBtn.innerHTML;
                saveGenNoteBtn.innerHTML = translations[currentLang]['saved'];
                setTimeout(() => saveGenNoteBtn.innerHTML = originalHTML, 2000);

                renderReports();
            } catch (err) {
                console.error('Save failed:', err);
            }
        });

        clearGenNoteBtn.addEventListener('click', () => {
            const confirmMsg = currentLang === 'id' ? 'Apakah Anda yakin ingin menghapus?' : 'Are you sure you want to clear?';
            if (confirm(confirmMsg)) {
                genNoteTitle.value = '';
                genNoteDate.value = new Date().toISOString().split('T')[0];
                genNoteArea.value = '';
                localStorage.removeItem('user_gen_note_temp');
            }
        });

        downloadGenNoteBtn.addEventListener('click', () => {
            try {
                const { jsPDF } = window.jspdf;
                const doc = new jsPDF();
                const data = getGenNoteData();

                doc.setFont("Helvetica", "bold");
                doc.setFontSize(16);
                doc.text(data.title || "Note", 10, 20);

                doc.setFont("Helvetica", "normal");
                doc.setFontSize(11);
                doc.text(`Date: ${data.date}`, 10, 30);

                const splitContent = doc.splitTextToSize(data.content || "", 180);
                doc.text(splitContent, 10, 40);

                doc.save(`Note-${Date.now()}.pdf`);
            } catch (err) {
                console.error('PDF failed:', err);
            }
        });

        if (downloadGenNoteWordBtn) {
            downloadGenNoteWordBtn.addEventListener('click', () => {
                const data = getGenNoteData();
                let html = `<h1>${data.title || "Catatan Umum"}</h1>
                            <p><strong>Tanggal:</strong> ${data.date}</p>
                            <hr>
                            <p style="white-space: pre-wrap;">${data.content || ""}</p>`;
                downloadAsWord(`Catatan-${Date.now()}.doc`, html);
            });
        }
    }

    // --- SOP Logic Functions ---
    function createSopRow(commodity = '', status = 'opt-fixed', cause = '') {
        const row = document.createElement('div');
        row.className = 'finding-row';
        row.innerHTML = `
            <div class="input-group">
                <label data-key="label-commodity">${translations[currentLang]['label-commodity']}</label>
                <input type="text" class="sop-commodity-input" data-placeholder="placeholder-commodity" 
                    placeholder="${translations[currentLang]['placeholder-commodity']}" value="${commodity}">
            </div>
            <div class="input-group">
                <label data-key="label-sop-status">${translations[currentLang]['label-sop-status']}</label>
                <select class="sop-status-select">
                    <option value="opt-fixed" ${status === 'opt-fixed' ? 'selected' : ''}>${translations[currentLang]['opt-fixed']}</option>
                    <option value="opt-up" ${status === 'opt-up' ? 'selected' : ''}>${translations[currentLang]['opt-up']}</option>
                    <option value="opt-down" ${status === 'opt-down' ? 'selected' : ''}>${translations[currentLang]['opt-down']}</option>
                </select>
            </div>
            <div class="input-group">
                <label data-key="label-cause">${translations[currentLang]['label-cause']}</label>
                <textarea class="sop-cause-input auto-expand" data-placeholder="placeholder-cause" 
                    placeholder="${translations[currentLang]['placeholder-cause']}" rows="1">${cause}</textarea>
            </div>
            <button class="remove-sop-row-btn remove-finding-btn"><i class="fas fa-trash"></i></button>
        `;

        row.querySelector('.remove-sop-row-btn').addEventListener('click', () => {
            row.remove();
            checkSopRemoveButtons();
            autoSaveSop();
        });

        row.querySelectorAll('input, select, textarea').forEach(el => {
            el.addEventListener('input', () => {
                autoSaveSop();
                if (el.classList.contains('auto-expand')) {
                    autoResize(el);
                }
            });
        });

        const textarea = row.querySelector('textarea');
        if (textarea) setTimeout(() => autoResize(textarea), 0);

        return row;
    }

    function checkSopRemoveButtons() {
        if (!sopRowsContainer) return;
        const rows = sopRowsContainer.querySelectorAll('.finding-row');
        rows.forEach(row => {
            const btn = row.querySelector('.remove-sop-row-btn');
            btn.style.display = rows.length > 1 ? 'flex' : 'none';
        });
    }

    function getSopData() {
        const items = [];
        if (sopRowsContainer) {
            sopRowsContainer.querySelectorAll('.finding-row').forEach(row => {
                items.push({
                    commodity: row.querySelector('.sop-commodity-input').value,
                    status: row.querySelector('.sop-status-select').value,
                    cause: row.querySelector('.sop-cause-input').value
                });
            });
        }

        return {
            date: sopDateInput.value,
            market: sopMarketInput.value,
            items: items,
            type: 'sop'
        };
    }

    function autoSaveSop() {
        clearTimeout(autoSaveTimeout);
        autoSaveTimeout = setTimeout(() => {
            localStorage.setItem('user_sop_data_temp', JSON.stringify(getSopData()));
            console.log('SOP data auto-saved');
        }, 1000);
    }

    const defaultSopCommodities = [
        "Beras", "Daging Ayam", "Daging Sapi", "Telur",
        "Bawang Merah", "Bawang Putih", "Cabe Merah",
        "Cabe Rawit", "Minyak Goreng", "Gula Pasir"
    ];

    // Initialize SOP
    if (sopRowsContainer) {
        const savedSopTemp = JSON.parse(localStorage.getItem('user_sop_data_temp') || '{}');
        sopDateInput.value = savedSopTemp.date || "2026-02-10";
        sopMarketInput.value = savedSopTemp.market || 'Pasar Kranggan';

        sopRowsContainer.innerHTML = '';
        if (savedSopTemp.items && savedSopTemp.items.length > 0) {
            savedSopTemp.items.forEach(item => {
                sopRowsContainer.appendChild(createSopRow(item.commodity, item.status, item.cause));
            });
        } else {
            // Use default commodities if empty
            defaultSopCommodities.forEach(comm => {
                sopRowsContainer.appendChild(createSopRow(comm, 'opt-fixed', ''));
            });
        }
        checkSopRemoveButtons();

        [sopDateInput, sopMarketInput].forEach(el => el.addEventListener('input', autoSaveSop));
        addSopRowBtn.addEventListener('click', () => {
            sopRowsContainer.appendChild(createSopRow());
            checkSopRemoveButtons();
        });
    }

    if (saveSopNoteBtn) {
        saveSopNoteBtn.addEventListener('click', () => {
            try {
                const data = getSopData();
                const reports = JSON.parse(localStorage.getItem('user_reports') || '[]');
                reports.unshift(data);
                localStorage.setItem('user_reports', JSON.stringify(reports));

                const originalHTML = saveSopNoteBtn.innerHTML;
                saveSopNoteBtn.innerHTML = translations[currentLang]['saved'];
                setTimeout(() => saveSopNoteBtn.innerHTML = originalHTML, 2000);
                renderReports();
            } catch (err) { console.error(err); }
        });
    }

    if (whatsappSopBtn) {
        whatsappSopBtn.addEventListener('click', () => {
            const data = getSopData();
            const phone = "087847712990";
            const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

            let dateStr;
            if (data.date) {
                const d = new Date(data.date);
                dateStr = `${d.getDate()} ${months[d.getMonth()]}`;
            } else {
                const now = new Date();
                dateStr = `${now.getDate()} ${months[now.getMonth()]}`;
            }

            let message = `SOP Perubahan Harga mingguan ${data.market || 'Pasar ...'} ${dateStr} :\n\n`;
            data.items.forEach((item, i) => {
                const statusText = translations[currentLang][item.status] || 'tetap';
                message += `${i + 1}. ${item.commodity || '...'}: ${statusText}${item.cause ? ' karena ' + item.cause : ''}\n`;
            });

            const encodedMsg = encodeURIComponent(message);
            const waUrl = `https://api.whatsapp.com/send?phone=${phone.replace(/^0/, '62')}&text=${encodedMsg}`;
            window.open(waUrl, '_blank');
        });
    }

    if (clearSopNoteBtn) {
        clearSopNoteBtn.addEventListener('click', () => {
            const confirmMsg = currentLang === 'id' ? 'Hapus semua?' : 'Clear all?';
            if (confirm(confirmMsg)) {
                sopDateInput.value = new Date().toISOString().split('T')[0];
                sopMarketInput.value = '';
                sopRowsContainer.innerHTML = '';
                // Reset to defaults on clear
                defaultSopCommodities.forEach(comm => {
                    sopRowsContainer.appendChild(createSopRow(comm, 'opt-fixed', ''));
                });
                checkSopRemoveButtons();
                localStorage.removeItem('user_sop_data_temp');
            }
        });
    }

    if (downloadSopBtn) {
        downloadSopBtn.addEventListener('click', () => {
            try {
                const { jsPDF } = window.jspdf;
                const doc = new jsPDF();
                const data = getSopData();
                const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

                doc.setFont("Helvetica", "bold");
                doc.setFontSize(16);
                doc.text("SOP PERUBAHAN HARGA", 10, 20);

                doc.setFont("Helvetica", "normal");
                doc.setFontSize(11);
                doc.text(`Tanggal: ${data.date}`, 10, 30);
                doc.text(`Pasar: ${data.market}`, 10, 40);

                let y = 55;
                data.items.forEach((item, i) => {
                    const statusText = translations[currentLang][item.status] || 'tetap';
                    doc.text(`${i + 1}. ${item.commodity || '...'}: ${statusText}`, 10, y);
                    if (item.cause) {
                        doc.setFontSize(10);
                        doc.text(`   Penyebab: ${item.cause}`, 10, y + 5);
                        doc.setFontSize(11);
                        y += 15;
                    } else {
                        y += 10;
                    }
                });

                doc.save(`SOP-${Date.now()}.pdf`);
            } catch (err) { console.error('PDF failed:', err); }
        });
    }

    if (downloadSopWordBtn) {
        downloadSopWordBtn.addEventListener('click', () => {
            const data = getSopData();
            let html = `<h1>SOP PERUBAHAN HARGA</h1>
                        <p><strong>Tanggal:</strong> ${data.date}</p>
                        <p><strong>Pasar:</strong> ${data.market}</p>
                        <hr>
                        <table border="1" cellspacing="0" cellpadding="5">
                            <thead>
                                <tr style="background: #f0f0f0;">
                                    <th>No</th>
                                    <th>Komoditas</th>
                                    <th>Status Harga</th>
                                    <th>Penyebab/Keterangan</th>
                                </tr>
                            </thead>
                            <tbody>`;
            data.items.forEach((item, i) => {
                const statusText = translations[currentLang][item.status] || 'tetap';
                html += `<tr>
                            <td>${i + 1}</td>
                            <td>${item.commodity || '...'}</td>
                            <td>${statusText}</td>
                            <td>${item.cause || ''}</td>
                         </tr>`;
            });
            html += `</tbody></table>`;
            downloadAsWord(`SOP-${Date.now()}.doc`, html);
        });
    }

    // --- SPH Logic ---
    function createSphRow(commodity = '', status = 'status-naik', anecdotal = '') {
        const row = document.createElement('div');
        row.className = 'sph-row';
        // Note: status values match keys in translations: 'status-naik', 'status-turun'
        row.innerHTML = `
            <div class="input-group">
                <label data-key="label-commodity">${translations[currentLang]['label-commodity']}</label>
                <input type="text" class="commodity-input" data-placeholder="placeholder-commodity" 
                    placeholder="${translations[currentLang]['placeholder-commodity']}" value="${commodity}">
            </div>
            <div class="input-group">
                <label data-key="label-status">${translations[currentLang]['label-status']}</label>
                <select class="status-select">
                    <option value="status-naik" ${status === 'status-naik' ? 'selected' : ''}>${translations[currentLang]['status-naik']}</option>
                    <option value="status-turun" ${status === 'status-turun' ? 'selected' : ''}>${translations[currentLang]['status-turun']}</option>
                </select>
            </div>
            <div class="input-group">
                <label data-key="label-anecdotal">${translations[currentLang]['label-anecdotal']}</label>
                <textarea class="anecdotal-input auto-expand" data-placeholder="placeholder-anecdotal" 
                    placeholder="${translations[currentLang]['placeholder-anecdotal']}" rows="1">${anecdotal}</textarea>
            </div>
            <button class="remove-row-btn"><i class="fas fa-trash"></i></button>
        `;

        row.querySelector('.remove-row-btn').addEventListener('click', () => {
            row.remove();
            checkSphRemoveButtons();
        });

        row.querySelectorAll('input, select, textarea').forEach(el => {
            el.addEventListener('input', () => {
                // SPH doesn't have auto-save yet, but we enable resize
                if (el.classList.contains('auto-expand')) {
                    autoResize(el);
                }
            });
        });

        const textarea = row.querySelector('textarea');
        if (textarea) setTimeout(() => autoResize(textarea), 0);

        return row;
    }

    function checkSphRemoveButtons() {
        const rows = sphRowsContainer.querySelectorAll('.sph-row');
        rows.forEach(row => {
            const btn = row.querySelector('.remove-row-btn');
            btn.style.display = rows.length > 1 ? 'flex' : 'none';
        });
    }

    if (addSphRowBtn) {
        addSphRowBtn.addEventListener('click', () => {
            sphRowsContainer.appendChild(createSphRow());
            checkSphRemoveButtons();
        });
    }

    // Initial SPH Row
    if (sphRowsContainer) {
        sphRowsContainer.appendChild(createSphRow());
        checkSphRemoveButtons();
    }

    // Open SPH Modal
    if (navSphTrigger) {
        navSphTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            nav.classList.remove('active');
            sphModal.classList.add('active');
            // Set default date to today
            if (sphDateInput && !sphDateInput.value) {
                sphDateInput.value = new Date().toISOString().split('T')[0];
            }
        });
    }

    // Handle all open-sph-modal buttons (including hero button)
    document.querySelectorAll('.open-sph-modal').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const modal = document.getElementById('sph-modal');
            if (modal) {
                modal.classList.add('active');

                // Set default date to today
                const dateInput = document.getElementById('sph-date');
                if (dateInput && !dateInput.value) {
                    dateInput.value = new Date().toISOString().split('T')[0];
                }

                // Ensure at least one row exists
                const container = document.getElementById('sph-rows-container');
                if (container && container.children.length === 0) {
                    container.appendChild(createSphRow());
                    checkSphRemoveButtons();
                }
            }
        });
    });

    if (closeSph) {
        closeSph.addEventListener('click', () => {
            sphModal.classList.remove('active');
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === sphModal) {
            sphModal.classList.remove('active');
        }
    });

    if (clearSphNoteBtn) {
        clearSphNoteBtn.addEventListener('click', () => {
            const confirmMsg = currentLang === 'id'
                ? 'Apakah Anda yakin ingin menghapus semua isi?'
                : 'Are you sure you want to clear all contents?';
            if (!confirm(confirmMsg)) return;

            if (sphDateInput) sphDateInput.value = new Date().toISOString().split('T')[0];
            sphRowsContainer.innerHTML = '';
            sphRowsContainer.appendChild(createSphRow());
            checkSphRemoveButtons();
        });
    }

    function getSphData() {
        const items = [];
        sphRowsContainer.querySelectorAll('.sph-row').forEach(row => {
            items.push({
                commodity: row.querySelector('.commodity-input').value,
                status: row.querySelector('.status-select').value,
                anecdotal: row.querySelector('.anecdotal-input').value
            });
        });

        return {
            type: 'sph',
            date: sphDateInput.value,
            items: items
        };
    }

    if (saveSphNoteBtn) {
        saveSphNoteBtn.addEventListener('click', () => {
            try {
                const currentData = getSphData();
                // We'll save SPH reports in the same 'user_reports' array but with type='sph'
                const reports = JSON.parse(localStorage.getItem('user_reports') || '[]');
                reports.unshift(currentData);
                localStorage.setItem('user_reports', JSON.stringify(reports));

                console.log('SPH data saved');
                renderReports();

                const originalHTML = saveSphNoteBtn.innerHTML;
                saveSphNoteBtn.innerHTML = translations[currentLang]['saved'];
                saveSphNoteBtn.classList.add('saved');
                setTimeout(() => {
                    saveSphNoteBtn.innerHTML = originalHTML;
                    saveSphNoteBtn.classList.remove('saved');
                }, 2000);
            } catch (err) {
                console.error(err);
                alert('Failed to save SPH report.');
            }
        });
    }

    if (whatsappSphBtn) {
        whatsappSphBtn.addEventListener('click', () => {
            const data = getSphData();
            const phone = "087847712990";
            const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

            let waDateStr;
            if (data.date) {
                const dateObj = new Date(data.date);
                waDateStr = `${dateObj.getDate()} ${months[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
            } else {
                waDateStr = '-';
            }

            let message = `*Laporan SPH*\n`;
            message += `Tanggal: ${waDateStr}\n\n`;

            // Group by Naik/Turun
            const naik = data.items.filter(i => i.status === 'status-naik').map(i => ({ name: i.commodity, note: i.anecdotal }));
            const turun = data.items.filter(i => i.status === 'status-turun').map(i => ({ name: i.commodity, note: i.anecdotal }));

            message += `*Komoditas Naik:*\n`;
            if (naik.length > 0) {
                naik.forEach(c => message += `- ${c.name}${c.note ? ' (' + c.note + ')' : ''}\n`);
            } else {
                message += `- (Nihil)\n`;
            }

            message += `\n*Komoditas Turun:*\n`;
            if (turun.length > 0) {
                turun.forEach(c => message += `- ${c.name}${c.note ? ' (' + c.note + ')' : ''}\n`);
            } else {
                message += `- (Nihil)\n`;
            }

            window.open(`https://api.whatsapp.com/send?phone=${phone.replace(/^0/, '62')}&text=${encodeURIComponent(message)}`, '_blank');
        });
    }

    if (downloadSphBtn) {
        downloadSphBtn.addEventListener('click', () => {
            if (typeof window.jspdf === 'undefined') return;
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            const data = getSphData();

            const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
            let dateStr = '-';
            if (data.date) {
                const d = new Date(data.date);
                dateStr = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
            }

            doc.setFont("Helvetica", "bold");
            doc.setFontSize(14);
            doc.text("LAPORAN SPH", 10, 20);

            doc.setFontSize(11);
            doc.setFont("Helvetica", "normal");
            doc.text(`Tanggal: ${dateStr}`, 10, 30);

            let yPos = 45;

            // Naik
            doc.setFont("Helvetica", "bold");
            doc.text("Komoditas Naik:", 10, yPos);
            yPos += 7;
            doc.setFont("Helvetica", "normal");

            const naik = data.items.filter(i => i.status === 'status-naik');
            if (naik.length > 0) {
                naik.forEach(item => {
                    doc.text(`- ${item.commodity}${item.anecdotal ? ' (' + item.anecdotal + ')' : ''}`, 15, yPos);
                    yPos += 6;
                });
            } else {
                doc.text("- (Nihil)", 15, yPos);
                yPos += 6;
            }

            yPos += 5;

            // Turun
            doc.setFont("Helvetica", "bold");
            doc.text("Komoditas Turun:", 10, yPos);
            yPos += 7;
            doc.setFont("Helvetica", "normal");

            const turun = data.items.filter(i => i.status === 'status-turun');
            if (turun.length > 0) {
                turun.forEach(item => {
                    doc.text(`- ${item.commodity}${item.anecdotal ? ' (' + item.anecdotal + ')' : ''}`, 15, yPos);
                    yPos += 6;
                });
            } else {
                doc.text("- (Nihil)", 15, yPos);
                yPos += 6;
            }

            doc.save(`Laporan-SPH-${Date.now()}.pdf`);
        });
    }

    if (downloadSphWordBtn) {
        downloadSphWordBtn.addEventListener('click', () => {
            const data = getSphData();
            const naik = data.items.filter(i => i.status === 'status-naik');
            const turun = data.items.filter(i => i.status === 'status-turun');

            let html = `<h1>LAPORAN SPH</h1>
                        <p><strong>Tanggal:</strong> ${data.date}</p>
                        <hr>`;

            html += `<h3>Komoditas Naik</h3><ul>`;
            if (naik.length > 0) {
                naik.forEach(i => html += `<li>${i.commodity} ${i.anecdotal ? '(' + i.anecdotal + ')' : ''}</li>`);
            } else {
                html += `<li>(Nihil)</li>`;
            }
            html += `</ul>`;

            html += `<h3>Komoditas Turun</h3><ul>`;
            if (turun.length > 0) {
                turun.forEach(i => html += `<li>${i.commodity} ${i.anecdotal ? '(' + i.anecdotal + ')' : ''}</li>`);
            } else {
                html += `<li>(Nihil)</li>`;
            }
            html += `</ul>`;

            const blob = new Blob(['\ufeff', `
                <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
                <head><meta charset='utf-8'><title>Laporan SPH</title></head><body>${html}</body></html>
            `], { type: 'application/msword' });

            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `Laporan-SPH-${Date.now()}.doc`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }

    // --- Language Initial State ---
    updateLanguage();

    // --- Magnetic Buttons ---

    // Magnetic Buttons
    const magneticBtns = document.querySelectorAll('.icon-btn, .menu-toggle, .btn-primary, .btn-secondary, .btn-whatsapp, .contact-cta');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(btn, { x: x * 0.4, y: y * 0.4, duration: 0.3, ease: "power2.out" });
        });
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
        });
    });

    // Parallax
    window.addEventListener('mousemove', (e) => {
        const xPercent = (e.clientX / window.innerWidth) - 0.5;
        const yPercent = (e.clientY / window.innerHeight) - 0.5;
        scenes.forEach(scene => {
            const headings = scene.querySelectorAll('h1, h2');
            headings.forEach(h => {
                gsap.to(h, { x: xPercent * 30, y: yPercent * 30, duration: 1, ease: "power2.out" });
            });
        });
    });
});
