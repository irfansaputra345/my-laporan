document.addEventListener('DOMContentLoaded', () => {
    // --- Global Variable Definitions ---
    const scenes = gsap.utils.toArray('.scene');
    let currentIndex = 0;
    let isAnimating = false;
    let autoSaveTimeout;
    const WA_PHONE = "6287847712990";

    function getIndoDate(dateInput) {
        const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        const d = dateInput ? new Date(dateInput) : new Date();
        return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
    }

    function getIndoFullDate(dateInput) {
        const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
        const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        const d = dateInput ? new Date(dateInput) : new Date();
        return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
    }

    // --- Intro Animation ---
    const preloader = document.getElementById('preloader-overlay');
    const introRobot = document.getElementById('intro-robot');
    const loadingBar = document.querySelector('.loading-bar');
    const assistantRobot = document.getElementById('assistant-robot');
    const robotSidebar = document.getElementById('robot-sidebar');
    const closeSidebarBtn = document.getElementById('close-sidebar');
    const headerRobotBtn = document.getElementById('header-robot-btn');
    const sidebarRobotInput = document.getElementById('sidebar-robot-input');
    const sidebarRobotMsg = document.querySelector('.sidebar-robot-msg');
    let dizzyTimeout;
    let shakeTimeout;

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

    // --- Agenda Note Elements ---
    const agendaModal = document.getElementById('agenda-modal');
    const closeAgenda = document.getElementById('close-agenda');
    const agendaDateInput = document.getElementById('agenda-date');
    const agendaTitleInput = document.getElementById('agenda-title');
    const agendaRowsContainer = document.getElementById('agenda-rows-container');
    const addAgendaRowBtn = document.getElementById('add-agenda-row-btn');
    const saveAgendaNoteBtn = document.getElementById('save-agenda-note');
    const whatsappAgendaBtn = document.getElementById('whatsapp-agenda');
    const whatsappGenNoteBtn = document.getElementById('whatsapp-gen-note');
    const downloadAgendaBtn = document.getElementById('download-agenda');
    const downloadAgendaWordBtn = document.getElementById('download-agenda-word');
    const clearAgendaNoteBtn = document.getElementById('clear-agenda-note');
    const addAgendaCustomRowBtn = document.getElementById('add-agenda-custom-row-btn');
    const navAgendaTrigger = document.getElementById('nav-agenda-trigger');

    // --- Translation Data ---
    const translations = {
        'en': {
            'nav-home': 'HOME',
            'nav-features': 'FEATURES',
            'nav-concept': 'CONCEPT',
            'nav-exp': 'EXPERIENCE',
            'nav-notes': 'MY NOTES',
            'features-title': 'KEY FEATURES',
            'feature-1-desc': 'Intelligent system that helps analyze market prices accurately in real-time.',
            'feature-2-desc': 'Export your findings directly to PDF, Word, or send via WhatsApp.',
            'feature-3-desc': 'Data is securely stored in the cloud, allowing report access from any device.',
            'nav-contact': 'CONTACT',
            'nav-title': 'NAVIGATION',
            'title-quick-actions': 'REPORTS & NOTES',
            'title-system-status': 'SYSTEM STATUS',
            'robot-greet': 'Hello! I am <strong>IRBOT</strong>. How can I help you today?',
            'robot-thanks': 'Thanks for the message! I am <strong>IRBOT</strong>, and I will help you recording everything.',
            'robot-shake': 'Whoa! Stop shaking! <strong>IRBOT</strong> is so dizzy...',
            'robot-idle': 'Are you still there? Do not forget to save your note!',
            'robot-typing': 'Great! <strong>IRBOT</strong> is ready to help you record this finding!',
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
            'btn-clear-all': 'Clear All',
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
            'label-notes': 'NOTES',
            'nav-agenda-notes': 'AGENDA ANNOUNCEMENT',
            'agenda-modal-title': 'Agenda Announcement',
            'title-agenda-list': 'Agenda Details',
            'label-agenda': 'AGENDA',
            'tooltip-agenda': 'Agenda Announcement',
            'label-activity': 'Activity Name',
            'label-location': 'Location',
            'label-time': 'Time',
            'label-material': 'Material',
            'label-speaker': 'Speaker/Ustadz',
            'btn-add-custom': 'Add Custom Item',
            'label-custom-title': 'Custom Title',
            'label-custom-content': 'Content'
        },
        'id': {
            'nav-home': 'BERANDA',
            'nav-features': 'FITUR',
            'nav-concept': 'KONSEP',
            'nav-exp': 'PENGALAMAN',
            'nav-notes': 'LAPORAN PIHPS',
            'features-title': 'FITUR UTAMA',
            'feature-1-desc': 'Sistem cerdas yang membantu menganalisis harga pasar secara real-time dan akurat.',
            'feature-2-desc': 'Ekspor laporan temuan Anda langsung ke format PDF, Word, atau kirim via WhatsApp.',
            'feature-3-desc': 'Data tersimpan aman di sistem awan, memungkinkan akses laporan dari perangkat mana saja.',
            'nav-contact': 'KONTAK',
            'nav-title': 'NAVIGASI',
            'title-quick-actions': 'LAPORAN & CATATAN',
            'title-system-status': 'STATUS SISTEM',
            'robot-greet': 'Halo! Saya <strong>IRBOT</strong>. Ada yang bisa saya bantu hari ini?',
            'robot-thanks': 'Terima kasih pesannya! Saya <strong>IRBOT</strong>, dan saya akan bantu mencatat semuanya.',
            'robot-shake': 'Waduh! Jangan digoyang-goyang! <strong>IRBOT</strong> pusing...',
            'robot-idle': 'Halo? Masih di sana? Jangan lupa simpan catatannya ya!',
            'robot-typing': 'Mantap! <strong>IRBOT</strong> siap membantu mencatat temuan ini!',
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
            'btn-clear-all': 'Hapus Semua',
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
            'label-notes': 'CATATAN',
            'nav-agenda-notes': 'PENGUMUMAN AGENDA',
            'agenda-modal-title': 'Pengumuman Agenda',
            'title-agenda-list': 'Detail Agenda',
            'label-agenda': 'AGENDA',
            'tooltip-agenda': 'Pengumuman Agenda',
            'label-activity': 'Nama Kegiatan',
            'label-location': 'Tempat',
            'label-time': 'Jam',
            'label-material': 'Materi Kegiatan',
            'label-speaker': 'Ustadz/Pengisi',
            'btn-add-custom': 'Tambah Baris Kustom',
            'label-custom-title': 'Judul Kustom',
            'label-custom-content': 'Isi'
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

        // Prevent scene transitions when modal or robot sidebar is active
        if (noteModal.classList.contains('active') || robotSidebar.classList.contains('active')) return;

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

    // --- Removed Old Menu Logic ---

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

    function createAgendaRow(activity = '', location = '', time = '', material = '', speaker = '') {
        const row = document.createElement('div');
        row.className = 'agenda-row';
        row.innerHTML = `
            <div class="input-group">
                <label data-key="label-activity">${translations[currentLang]['label-activity']}</label>
                <textarea class="activity-input auto-expand" placeholder="${translations[currentLang]['label-activity']}" rows="1">${activity}</textarea>
            </div>
            <div class="input-group">
                <label data-key="label-location">${translations[currentLang]['label-location']}</label>
                <input type="text" class="location-input" placeholder="${translations[currentLang]['label-location']}" value="${location}">
            </div>
            <div class="input-group">
                <label data-key="label-time">${translations[currentLang]['label-time']}</label>
                <input type="text" class="time-input" placeholder="${translations[currentLang]['label-time']}" value="${time}">
            </div>
            <div class="agenda-row-secondary">
                <div class="input-group">
                    <label data-key="label-material">${translations[currentLang]['label-material']}</label>
                    <textarea class="material-input auto-expand" placeholder="${translations[currentLang]['label-material']}" rows="1">${material}</textarea>
                </div>
                <div class="input-group">
                    <label data-key="label-speaker">${translations[currentLang]['label-speaker']}</label>
                    <input type="text" class="speaker-input" placeholder="${translations[currentLang]['label-speaker']}" value="${speaker}">
                </div>
            </div>
            <button class="remove-row-btn"><i class="fas fa-trash"></i></button>
        `;

        row.querySelector('.remove-row-btn').addEventListener('click', () => {
            row.remove();
            checkAgendaRemoveButtons();
        });

        // Add auto-expand logic
        row.querySelectorAll('textarea.auto-expand').forEach(textarea => {
            textarea.addEventListener('input', () => autoResize(textarea));
            // Initial resize logic
            setTimeout(() => autoResize(textarea), 0);
        });

        return row;
    }

    function createAgendaCustomRow(title = '', content = '') {
        const row = document.createElement('div');
        row.className = 'agenda-row agenda-custom-row';
        row.innerHTML = `
            <div class="input-group" style="grid-column: span 2;">
                <label data-key="label-custom-title">${translations[currentLang]['label-custom-title']}</label>
                <input type="text" class="custom-title-input" placeholder="${translations[currentLang]['label-custom-title']}" value="${title}">
            </div>
            <div class="input-group" style="grid-column: span 2;">
                <label data-key="label-custom-content">${translations[currentLang]['label-custom-content']}</label>
                <textarea class="custom-content-input auto-expand" placeholder="${translations[currentLang]['label-custom-content']}" rows="1">${content}</textarea>
            </div>
            <button class="remove-row-btn"><i class="fas fa-trash"></i></button>
        `;

        row.querySelector('.remove-row-btn').addEventListener('click', () => {
            row.remove();
        });

        // Initialize auto-expand for the custom content textarea
        const textarea = row.querySelector('textarea');
        if (textarea) {
            textarea.addEventListener('input', () => autoResize(textarea));
            setTimeout(() => autoResize(textarea), 0);
        }

        return row;
    }

    function checkAgendaRemoveButtons() {
        const rows = agendaRowsContainer.querySelectorAll('.agenda-row');
        rows.forEach(row => {
            const btn = row.querySelector('.remove-row-btn');
            btn.style.display = rows.length > 1 ? 'flex' : 'none';
        });
    }

    if (addAgendaRowBtn) {
        addAgendaRowBtn.addEventListener('click', () => {
            agendaRowsContainer.appendChild(createAgendaRow());
            checkAgendaRemoveButtons();
        });
    }

    if (addAgendaCustomRowBtn) {
        addAgendaCustomRowBtn.addEventListener('click', () => {
            agendaRowsContainer.appendChild(createAgendaCustomRow());
        });
    }

    // Initialize Agenda
    if (agendaRowsContainer) {
        agendaRowsContainer.innerHTML = '';
        agendaRowsContainer.appendChild(createAgendaRow());
        checkAgendaRemoveButtons();
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
            document.body.classList.add('modal-active');
        });
    }

    // Handle all open-note-modal buttons (including hero button)
    document.querySelectorAll('.open-note-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            noteModal.classList.add('active');
            document.body.classList.add('modal-active');
            setTimeout(() => { if (marketInput) marketInput.focus(); }, 100);
        });
    });

    // Handle all open-gen-note-modal buttons (new hero button)
    document.querySelectorAll('.open-gen-note-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            genNoteModal.classList.add('active');
            document.body.classList.add('modal-active');
            setTimeout(() => { if (genNoteTitle) genNoteTitle.focus(); }, 100);
        });
    });

    // Handle all open-agenda-modal buttons
    document.querySelectorAll('.open-agenda-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            agendaModal.classList.add('active');
            document.body.classList.add('modal-active');
            setTimeout(() => { if (agendaTitleInput) agendaTitleInput.focus(); }, 100);
        });
    });

    // SOP Modal triggers
    document.querySelectorAll('.open-sop-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            sopModal.classList.add('active');
            document.body.classList.add('modal-active');
            setTimeout(() => { if (sopMarketInput) sopMarketInput.focus(); }, 100);
        });
    });

    if (navSopTrigger) {
        navSopTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            nav.classList.remove('active');
            sopModal.classList.add('active');
            document.body.classList.add('modal-active');
            setTimeout(() => { if (sopMarketInput) sopMarketInput.focus(); }, 100);
        });
    }

    if (closeSop) {
        closeSop.addEventListener('click', () => {
            sopModal.classList.remove('active');
            updateBodyModalClass();
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === sopModal) {
            sopModal.classList.remove('active');
            updateBodyModalClass();
        }
    });

    closeNote.addEventListener('click', () => {
        noteModal.classList.remove('active');
        updateBodyModalClass();
    });

    // Close on click outside
    window.addEventListener('click', (e) => {
        if (e.target === noteModal) {
            noteModal.classList.remove('active');
            updateBodyModalClass();
        }
    });

    if (navAgendaTrigger) {
        navAgendaTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            nav.classList.remove('active');
            agendaModal.classList.add('active');
            document.body.classList.add('modal-active');
            setTimeout(() => { if (agendaTitleInput) agendaTitleInput.focus(); }, 100);
        });
    }

    if (closeAgenda) {
        closeAgenda.addEventListener('click', () => {
            agendaModal.classList.remove('active');
            updateBodyModalClass();
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === agendaModal) {
            agendaModal.classList.remove('active');
            updateBodyModalClass();
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

    function getAgendaData() {
        const items = [];
        agendaRowsContainer.querySelectorAll('.agenda-row').forEach(row => {
            if (row.classList.contains('agenda-custom-row')) {
                items.push({
                    type: 'custom',
                    title: row.querySelector('.custom-title-input').value,
                    content: row.querySelector('.custom-content-input').value
                });
            } else {
                items.push({
                    type: 'standard',
                    activity: row.querySelector('.activity-input').value,
                    location: row.querySelector('.location-input').value,
                    time: row.querySelector('.time-input').value,
                    material: row.querySelector('.material-input').value,
                    speaker: row.querySelector('.speaker-input').value
                });
            }
        });

        return {
            type: 'agenda',
            title: agendaTitleInput.value,
            date: agendaDateInput.value,
            items: items
        };
    }

    if (saveAgendaNoteBtn) {
        saveAgendaNoteBtn.addEventListener('click', () => {
            const currentData = getAgendaData();
            const reports = JSON.parse(localStorage.getItem('user_reports') || '[]');
            reports.unshift(currentData);
            localStorage.setItem('user_reports', JSON.stringify(reports));
            renderReports();

            const originalHTML = saveAgendaNoteBtn.innerHTML;
            saveAgendaNoteBtn.innerHTML = translations[currentLang]['saved'];
            saveAgendaNoteBtn.classList.add('saved');
            setTimeout(() => {
                saveAgendaNoteBtn.innerHTML = originalHTML;
                saveAgendaNoteBtn.classList.remove('saved');
            }, 2000);
        });
    }

    if (whatsappAgendaBtn) {
        whatsappAgendaBtn.addEventListener('click', () => {
            const data = getAgendaData();
            const dateStr = getIndoFullDate(data.date);

            let text = `*Pengumuman Agenda*\n\n`;
            text += `Tanggal: ${dateStr}\n`;
            text += `Judul: ${data.title || '-'}\n\n`;
            text += `*Detail Agenda:*\n\n`;

            data.items.forEach((item, i) => {
                if (item.type === 'custom') {
                    text += `${i + 1}. *${item.title}:* ${item.content}\n`;
                } else {
                    text += `${i + 1}. *${item.activity}*\n`;
                    text += `   Tempat: ${item.location}\n`;
                    text += `   Jam: ${item.time} WiB\n`;
                    if (item.material) text += `   Materi: ${item.material}\n`;
                    if (item.speaker) text += `   Pengisi: ${item.speaker}\n`;
                }
                text += `\n`;
            });

            const encodedMsg = encodeURIComponent(text.trim());
            const waUrl = `https://api.whatsapp.com/send?phone=${WA_PHONE}&text=${encodedMsg}`;
            window.open(waUrl, '_blank');
        });
    }

    if (clearAgendaNoteBtn) {
        clearAgendaNoteBtn.addEventListener('click', () => {
            if (confirm(currentLang === 'en' ? 'Clear all data?' : 'Hapus semua data?')) {
                agendaTitleInput.value = '';
                agendaDateInput.value = '';
                agendaRowsContainer.innerHTML = '';
                agendaRowsContainer.appendChild(createAgendaRow());
                checkAgendaRemoveButtons();
            }
        });
    }

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
                        <div class="report-footer" style="justify-content: flex-end;">
                             <button class="card-wa-btn" onclick="const dateStr = getIndoDate('${note.date || ''}'); const msg = encodeURIComponent('*Catatan Laporan*\\n\\nJudul: ${note.title || '-'}\\nTanggal: ' + dateStr + '\\n\\n${(note.content || note.note || '').replace(/'/g, "\\'").replace(/\n/g, "\\n")}'); window.open('https://api.whatsapp.com/send?phone=${WA_PHONE}&text=' + msg, '_blank')">
                                <i class="fab fa-whatsapp"></i>
                             </button>
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
                             <button class="card-wa-btn" onclick="const dateStr = getIndoDate('${note.date || ''}'); const msg = encodeURIComponent('*Laporan SPH* ' + dateStr + ' :\\n\\n*Komoditas Naik:*\\n' + ('${(note.items ? note.items.filter(i => i.status === 'status-naik').map(i => `- ${i.commodity}`).join('\\n') : '') || '- (Nihil)'}') + '\\n\\n*Komoditas Turun:*\\n' + ('${(note.items ? note.items.filter(i => i.status === 'status-turun').map(i => `- ${i.commodity}`).join('\\n') : '') || '- (Nihil)'}')); window.open('https://api.whatsapp.com/send?phone=${WA_PHONE}&text=' + msg, '_blank')">
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
                             <button class="card-wa-btn" onclick="const dateStr = getIndoDate('${note.date || ''}'); const msg = encodeURIComponent('*SOP Perubahan Harga mingguan* ${note.market || 'Pasar ...'} ' + dateStr + ' :\\n\\n' + ('${note.items ? note.items.map((item, i) => `${i + 1}. ${item.commodity || '...'}: ${translations[currentLang][item.status] || 'tetap'}${item.cause ? ' karena ' + item.cause : ''}`).join('\\n').replace(/'/g, "\\'") : ''}')); window.open('https://api.whatsapp.com/send?phone=${WA_PHONE}&text=' + msg, '_blank')">
                                <i class="fab fa-whatsapp"></i>
                             </button>
                        </div>
                    </div>
                `;
            }

            if (note.type === 'agenda') {
                return `
                    <div class="report-card agenda-report-card">
                        <div class="report-header">
                            <div class="report-title"><i class="fas fa-calendar-check"></i> ${note.title || 'AGENDA'}</div>
                            <div class="report-date">${cardDateStr}</div>
                        </div>
                        <div class="report-items-list">
                            ${note.items ? note.items.map((item, i) => `
                                <div class="report-item">
                                    ${item.type === 'custom' ? `
                                        <strong>👉 ${item.title || '...'}:</strong> ${item.content || '...'}
                                    ` : `
                                        <strong>${item.activity || '...'}</strong>
                                        <div style="font-size: 0.85rem; opacity: 0.7;">
                                            <i class="fas fa-mosque"></i> ${item.location || '...'} | <i class="fas fa-clock"></i> ${item.time || '...'}
                                        </div>
                                    `}
                                </div>
                            `).join('') : '<div class="report-item">No items</div>'}
                        </div>
                        <div class="report-footer" style="justify-content: flex-end;">
                             <button class="card-wa-btn" onclick="const fullDate = getIndoFullDate('${note.date || ''}'); const msg = encodeURIComponent('*Pengumuman Agenda*\\n\\nTanggal: ' + fullDate + '\\nJudul: ${note.title || '-'}\\n\\n*Detail Agenda:*\\n\\n' + ('${note.items ? note.items.map((item, i) => { if (item.type === 'custom') { return `${i + 1}. *${item.title}:* ${item.content}`; } else { return `${i + 1}. *${item.activity}*\\n   Tempat: ${item.location}\\n   Jam: ${item.time} WiB${item.material ? '\\n   Materi: ' + item.material : ''}${item.speaker ? '\\n   Pengisi: ' + item.speaker : ''}`; } }).join('\\n\\n').replace(/'/g, "\\'") : ''}')); window.open('https://api.whatsapp.com/send?phone=${WA_PHONE}&text=' + msg, '_blank')">
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
                    <div class="report-footer" style="justify-content: flex-end;">
                         <button class="card-wa-btn" onclick="const dateStr = getIndoDate('${note.date || ''}'); const msg = encodeURIComponent('*Laporan Perubahan Harga Komoditas PIHPS Pasar Tradisional*\\n\\nTanggal: ' + dateStr + '\\n\\nBeberapa komoditas pada PIHPS Pasar Tradisional yang mengalami perubahan harga antara lain:\\n\\n' + ('${note.items ? note.items.map((item, i) => `${i + 1}. ${item.commodity || '...'} – ${note.market || '...'} (${item.merchant || '...'}) – *${item.cause || '...'}*`).join('\\n\\n').replace(/'/g, "\\'") : ''}') + '\\n\\n${(note.note || '').replace(/'/g, "\\'").replace(/\n/g, "\\n")}'); window.open('https://api.whatsapp.com/send?phone=${WA_PHONE}&text=' + msg, '_blank')">
                            <i class="fab fa-whatsapp"></i>
                         </button>
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
        const dateStr = getIndoDate(data.date);

        // Format message matching screenshot exactly
        let message = `*Laporan Perubahan Harga Komoditas PIHPS Pasar Tradisional*\n\n`;
        message += `Tanggal: ${dateStr}\n\n`;
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

        const encodedMsg = encodeURIComponent(message.trim());
        const waUrl = `https://api.whatsapp.com/send?phone=${WA_PHONE}&text=${encodedMsg}`;

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
            genNoteBtn.addEventListener('click', () => {
                genNoteModal.classList.add('active');
                document.body.classList.add('modal-active');
            });
        }
        closeGenNote.addEventListener('click', () => {
            genNoteModal.classList.remove('active');
            updateBodyModalClass();
        });

        if (navGenNoteTrigger) {
            navGenNoteTrigger.addEventListener('click', (e) => {
                e.preventDefault();
                nav.classList.remove('active');
                genNoteModal.classList.add('active');
                document.body.classList.add('modal-active');
                setTimeout(() => { if (genNoteTitle) genNoteTitle.focus(); }, 100);
            });
        }

        window.addEventListener('click', (e) => {
            if (e.target === genNoteModal) {
                genNoteModal.classList.remove('active');
                updateBodyModalClass();
            }
        });

        if (whatsappGenNoteBtn) {
            whatsappGenNoteBtn.addEventListener('click', () => {
                const data = {
                    title: genNoteTitle.value,
                    date: genNoteDateInput.value,
                    content: genNoteArea.value
                };
                const dateStr = getIndoDate(data.date);

                let message = `*Catatan Laporan*\n\n`;
                message += `Judul: ${data.title || '-'}\n`;
                message += `Tanggal: ${dateStr}\n\n`;
                message += `${data.content || ''}`;

                const encodedMsg = encodeURIComponent(message.trim());
                const waUrl = `https://api.whatsapp.com/send?phone=${WA_PHONE}&text=${encodedMsg}`;
                window.open(waUrl, '_blank');
            });
        }

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
            const dateStr = getIndoDate(data.date);

            let message = `*SOP Perubahan Harga mingguan* ${data.market || 'Pasar ...'} ${dateStr} :\n\n`;
            data.items.forEach((item, i) => {
                const statusText = translations[currentLang][item.status] || 'tetap';
                message += `${i + 1}. ${item.commodity || '...'}: ${statusText}${item.cause ? ' karena ' + item.cause : ''}\n`;
            });

            const encodedMsg = encodeURIComponent(message.trim());
            const waUrl = `https://api.whatsapp.com/send?phone=${WA_PHONE}&text=${encodedMsg}`;
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
            document.body.classList.add('modal-active');
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
                document.body.classList.add('modal-active');

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
            const dateStr = getIndoDate(data.date);

            let message = `*Laporan SPH*\n`;
            message += `Tanggal: ${dateStr}\n\n`;

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

            const encodedMsg = encodeURIComponent(message.trim());
            window.open(`https://api.whatsapp.com/send?phone=${WA_PHONE}&text=${encodedMsg}`, '_blank');
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

    // --- Dizzy Robot Logic ---

    // 0. Dragging Logic
    let isDragging = false;
    let dragDistance = 0;
    let startX, startY;
    let offsetX, offsetY;

    assistantRobot.addEventListener('mousedown', startDrag);
    assistantRobot.addEventListener('touchstart', startDrag, { passive: false });

    function startDrag(e) {
        isDragging = true;
        dragDistance = 0;
        assistantRobot.style.transition = 'none';
        assistantRobot.classList.add('grabbing');
        const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
        startX = clientX;
        startY = clientY;
        const rect = assistantRobot.getBoundingClientRect();
        offsetX = clientX - rect.left;
        offsetY = clientY - rect.top;

        document.addEventListener('mousemove', drag);
        document.addEventListener('touchmove', drag, { passive: false });
        document.addEventListener('mouseup', endDrag);
        document.addEventListener('touchend', endDrag);
    }

    function drag(e) {
        if (!isDragging) return;
        const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;

        dragDistance = Math.hypot(clientX - startX, clientY - startY);

        assistantRobot.style.left = (clientX - offsetX) + 'px';
        assistantRobot.style.top = (clientY - offsetY) + 'px';
        assistantRobot.style.bottom = 'auto';
        assistantRobot.style.right = 'auto';

        if (e.cancelable) e.preventDefault();
        resetIdleTimer();
    }

    function endDrag() {
        isDragging = false;
        assistantRobot.classList.remove('grabbing');
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('touchmove', drag);
        assistantRobot.style.transition = 'opacity 0.5s ease';
    }

    // 0.1 Click Interaction (Multi-Action Transformer)
    let isTransforming = false;
    let clickCount = 0;
    let clickTimer = null;
    const screenCrackOverlay = document.getElementById('screen-crack-overlay');

    function triggerLaugh() {
        if (isTransforming) return;
        assistantRobot.classList.add('laughing');
        const originalMsg = robotMsg.innerHTML;
        robotMsg.innerHTML = translations[currentLang]['robot-laugh'] || "Haha! Lucu sekali! 😄";

        gsap.to(assistantRobot, {
            y: -20, repeat: 5, yoyo: true, duration: 0.1, onComplete: () => {
                assistantRobot.classList.remove('laughing');
                robotMsg.innerHTML = originalMsg;
            }
        });
    }

    function triggerAngry() {
        if (isTransforming) return;
        assistantRobot.classList.add('angry');
        const originalMsg = robotMsg.innerHTML;
        robotMsg.innerHTML = translations[currentLang]['robot-angry'] || "Hei! Jangan klik terus! 😡";

        // Mobile Vibration (Angry Pattern)
        if ('vibrate' in navigator) {
            navigator.vibrate([100, 50, 100, 50, 100, 50, 100]);
        }

        gsap.to(assistantRobot, {
            x: "+=5", repeat: 20, yoyo: true, duration: 0.05, onComplete: () => {
                assistantRobot.classList.remove('angry');
                robotMsg.innerHTML = originalMsg;
            }
        });
    }

    function triggerTransformation() {
        if (isTransforming) return;
        isTransforming = true;

        // Hide dialogue
        const dialogue = assistantRobot.querySelector('.robot-dialogue');
        if (dialogue) dialogue.style.opacity = '0';

        // 1. Prepare parts for shifting
        const head = assistantRobot.querySelector('.robot-head');
        const torso = assistantRobot.querySelector('.robot-torso');
        const arms = assistantRobot.querySelectorAll('.arm');
        const legs = assistantRobot.querySelectorAll('.leg');

        const tl = gsap.timeline({
            onComplete: () => {
                isTransforming = false;
                if (dialogue) dialogue.style.opacity = '1';
                // Revert classes
                assistantRobot.classList.remove('transforming-to-car');
                // Reset parts visual state for next time
                gsap.set([head, torso, arms, legs], { clearProps: "all" });
                // Revert position
                gsap.to(assistantRobot, { scale: 1, x: 0, y: 0, duration: 0.5 });
            }
        });

        // Save original position
        const rect = assistantRobot.getBoundingClientRect();
        const startX = rect.left;
        const startY = rect.top;

        // 2. Part-Shifting Transformation sequence
        tl.to(head, { y: 10, scale: 0.5, opacity: 0, duration: 0.3 })
            .to(arms, { x: (i) => i === 0 ? 10 : -10, scale: 0, duration: 0.3 }, 0)
            .to(legs, { y: -10, scale: 0, duration: 0.3 }, 0)
            .to(torso, { scale: 1.5, rotation: 180, duration: 0.4 }, 0.1)
            .to(assistantRobot, {
                rotation: 720,
                scale: 0.6,
                duration: 0.6,
                ease: "power2.inOut",
                onStart: () => assistantRobot.classList.add('transforming-to-car')
            }, 0.2)
            // 3. Zoom to center
            .to(assistantRobot, {
                left: '50%',
                top: '50%',
                xPercent: -50,
                yPercent: -50,
                duration: 0.5,
                ease: "back.in(1.2)"
            })
            // 4. CRASH! Zoom towards screen
            .to(assistantRobot, {
                scale: 25,
                opacity: 0,
                duration: 0.3,
                ease: "power4.in",
                onStart: () => {
                    // Flash/Shake/Crack
                    setTimeout(() => {
                        if (screenCrackOverlay) screenCrackOverlay.classList.add('active');
                        document.body.classList.add('screen-shake');

                        // Mobile Vibration (Strong Crash Pulse)
                        if ('vibrate' in navigator) {
                            navigator.vibrate(200);
                        }

                        // Reset effects after a delay
                        setTimeout(() => {
                            if (screenCrackOverlay) screenCrackOverlay.classList.remove('active');
                            document.body.classList.remove('screen-shake');
                        }, 2500);
                    }, 100);
                }
            })
            // 5. Reappear and return
            .set(assistantRobot, { opacity: 1, scale: 0 })
            .to(assistantRobot, {
                left: startX + 'px',
                top: startY + 'px',
                xPercent: 0,
                yPercent: 0,
                scale: 1,
                duration: 1,
                ease: "elastic.out(1, 0.4)"
            });
    }

    assistantRobot.addEventListener('click', (e) => {
        if (dragDistance > 5) return; // Ignore if intentional drag
        if (isTransforming) return;
        if (e.target.id === 'robot-input') return;

        clickCount++;

        if (clickTimer) clearTimeout(clickTimer);

        clickTimer = setTimeout(() => {
            if (clickCount === 1) {
                triggerTransformation();
            } else if (clickCount === 2) {
                triggerLaugh();
            } else if (clickCount >= 3) {
                triggerAngry();
            }
            clickCount = 0;
        }, 300); // 300ms window for multi-clicks
    });

    if (closeSidebarBtn) {
        closeSidebarBtn.addEventListener('click', () => {
            robotSidebar.classList.remove('active');
        });
    }

    // Sidebar Quick Actions Logic
    document.querySelectorAll('.sidebar-action-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            robotSidebar.classList.remove('active');
        });
    });

    // Sidebar Navigation Logic
    document.querySelectorAll('.sidebar-nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const index = link.getAttribute('data-index');
            if (index !== null) {
                goToScene(parseInt(index));
            }
            robotSidebar.classList.remove('active');
        });
    });

    if (headerRobotBtn) {
        headerRobotBtn.addEventListener('click', () => {
            robotSidebar.classList.add('active');
            // Visual reaction on the floating robot too
            gsap.to(assistantRobot, { scale: 1.2, duration: 0.2, yoyo: true, repeat: 1 });
        });
    }

    // 0.2 Dialogue Input Handling (Sync floating & sidebar)
    function handleRobotResponse(inputVal, targetMsgElement) {
        // Interaction: Robot jumps after receiving message
        gsap.to(assistantRobot, { y: -15, yoyo: true, repeat: 1, duration: 0.2 });

        // Show "Response" in both places if possible
        const responseText = translations[currentLang]['robot-thanks'];
        if (robotMsg) robotMsg.innerHTML = responseText;
        if (sidebarRobotMsg) sidebarRobotMsg.innerHTML = responseText;

        // Revert back after a few seconds
        setTimeout(() => {
            const idleText = translations[currentLang]['robot-greet'];
            if (robotMsg) robotMsg.innerHTML = idleText;
            if (sidebarRobotMsg) sidebarRobotMsg.innerHTML = idleText;
        }, 4000);
    }

    if (robotInput) {
        robotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && robotInput.value.trim() !== '') {
                handleRobotResponse(robotInput.value, robotMsg);
                robotInput.value = '';
            }
        });
    }

    // --- Sidebar Outside Click Logic ---
    document.addEventListener('click', (e) => {
        const isSidebarActive = robotSidebar.classList.contains('active');
        const clickedInsideSidebar = robotSidebar.contains(e.target);
        const clickedRobot = assistantRobot.contains(e.target);
        const clickedHeaderBtn = headerRobotBtn && headerRobotBtn.contains(e.target);

        if (isSidebarActive && !clickedInsideSidebar && !clickedRobot && !clickedHeaderBtn) {
            robotSidebar.classList.remove('active');
        }
    });



    function triggerDizzy() {
        if (!assistantRobot) return;
        assistantRobot.classList.add('dizzy');

        // Update message if dialogue is active
        if (assistantRobot.classList.contains('active')) {
            robotMsg.innerHTML = translations[currentLang]['robot-shake'];
        }

        clearTimeout(dizzyTimeout);
        dizzyTimeout = setTimeout(() => {
            assistantRobot.classList.remove('dizzy');
            // Revert message
            if (document.querySelector('.modal.active')) {
                robotMsg.innerHTML = translations[currentLang]['robot-idle'];
            } else {
                robotMsg.innerHTML = translations[currentLang]['robot-greet'];
            }
        }, 3000);
    }

    // 1. Shake Detection
    let lastX, lastY, lastZ;
    let moveThreshold = 25;

    window.addEventListener('devicemotion', (event) => {
        const acceleration = event.accelerationIncludingGravity;
        if (!acceleration) return;

        const curX = acceleration.x;
        const curY = acceleration.y;
        const curZ = acceleration.z;

        if (lastX !== undefined) {
            const deltaX = Math.abs(curX - lastX);
            const deltaY = Math.abs(curY - lastY);
            const deltaZ = Math.abs(curZ - lastZ);

            if ((deltaX > moveThreshold && deltaY > moveThreshold) || (deltaX > moveThreshold && deltaZ > moveThreshold) || (deltaY > moveThreshold && deltaZ > moveThreshold)) {
                assistantRobot.classList.add('active');
                triggerDizzy();
                shakeTimeout = setTimeout(() => {
                    // Stay visible
                }, 5000);
            }
        }

        lastX = curX;
        lastY = curY;
        lastZ = curZ;
    });

    // 2. Idle Detection & Wandering
    let idleTimer;
    let globalIdleTimer;
    let wanderingTl;
    let isWandering = false;
    const idleLimit = 5000; // 5 seconds for dizzy in modal
    const globalIdleLimit = 30000; // 30 seconds for wandering

    function resetIdleTimer(e) {
        if (assistantRobot.classList.contains('dizzy')) {
            assistantRobot.classList.remove('dizzy');
        }

        if (isWandering) {
            stopWandering();
        }

        // Proactive Greeting when typing
        if (e && (e.type === 'input' || e.type === 'focus')) {
            if (!assistantRobot.classList.contains('dialogue-active')) {
                assistantRobot.classList.add('dialogue-active');
            }
            robotMsg.innerHTML = translations[currentLang]['robot-typing'];

            // Jump with excitement
            gsap.to(assistantRobot, { y: -10, yoyo: true, repeat: 1, duration: 0.15 });
        }

        clearTimeout(idleTimer);
        clearTimeout(globalIdleTimer);

        if (document.querySelector('.modal.active')) {
            idleTimer = setTimeout(() => {
                triggerDizzy();
            }, idleLimit);
        } else {
            // Only wander if not in modal
            globalIdleTimer = setTimeout(() => {
                startWandering();
            }, globalIdleLimit);
        }
    }

    function startWandering() {
        if (isWandering || isTransforming || document.querySelector('.modal.active')) return;
        isWandering = true;
        assistantRobot.classList.add('walking');

        const wander = () => {
            if (!isWandering) return;

            // Random position with padding
            const padding = 100;
            const targetX = Math.random() * (window.innerWidth - padding * 2) + padding;
            const targetY = Math.random() * (window.innerHeight - padding * 2) + padding;

            // Flip robot based on direction
            const currentX = gsap.getProperty(assistantRobot, "left");
            if (targetX < currentX) {
                gsap.to(assistantRobot, { scaleX: -1, duration: 0.3 });
            } else {
                gsap.to(assistantRobot, { scaleX: 1, duration: 0.3 });
            }

            wanderingTl = gsap.to(assistantRobot, {
                left: targetX,
                top: targetY,
                duration: 5 + Math.random() * 5,
                ease: "none",
                onComplete: () => {
                    // Wait a bit before next wander
                    if (isWandering) {
                        setTimeout(wander, 2000 + Math.random() * 3000);
                    }
                }
            });
        };

        wander();
    }

    function stopWandering() {
        isWandering = false;
        if (wanderingTl) wanderingTl.kill();
        assistantRobot.classList.remove('walking');
        // Return to anchor or stay put? User said "jalan jalan sendiri" (wander around).
        // Let's just stop and snap back to a reasonable scale if flipped.
        gsap.to(assistantRobot, { scaleX: 1, duration: 0.3 });
    }

    // Watch for interactions
    const modalInputs = document.querySelectorAll('.modal input, .modal textarea, .modal select');
    modalInputs.forEach(input => {
        input.addEventListener('input', resetIdleTimer);
        input.addEventListener('focus', resetIdleTimer);
        input.addEventListener('click', resetIdleTimer);
        input.addEventListener('keydown', resetIdleTimer);
    });

    // Global listeners for wandering
    window.addEventListener('mousemove', resetIdleTimer);
    window.addEventListener('mousedown', resetIdleTimer);
    window.addEventListener('keydown', resetIdleTimer);
    window.addEventListener('touchstart', resetIdleTimer);

    // Initial global idle start
    resetIdleTimer();

    function updateBodyModalClass() {
        if (!document.querySelector('.modal.active')) {
            document.body.classList.remove('modal-active');
            if (assistantRobot) assistantRobot.classList.remove('dizzy');
            clearTimeout(idleTimer);
        } else {
            document.body.classList.add('modal-active');
        }
    }

    // Show robot when modal opens
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                const target = mutation.target;
                if (target.classList.contains('modal') && target.classList.contains('active')) {
                    resetIdleTimer();
                    updateBodyModalClass();
                } else if (target.classList.contains('modal') && !document.querySelector('.modal.active')) {
                    updateBodyModalClass();
                }
            }
        });
    });

    document.querySelectorAll('.modal').forEach(modal => {
        observer.observe(modal, { attributes: true });
    });

    // Initial State
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
    });
});
