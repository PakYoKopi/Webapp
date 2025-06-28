document.addEventListener('DOMContentLoaded', function() {
    
    // =================================================================================
    // DATA & STATE APLIKASI
    // =================================================================================

    const curriculum = {
        '1-4': { year: 1, phase: "Foundation", mission: "Membangun konsistensi absolut", focus: "Rekayasa Lingkungan, Prinsip KECIL, Sistem Baca & Jurnal.", books: [ { id: 'atomic', title: "Atomic Habits", cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1655988385l/40121378.jpg" }, { id: 'power', title: "The Power of Habit", cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1545854312l/12609433.jpg" }, { id: 'deep', title: "Deep Work", cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1447937395l/22deepwork.jpg" }, { id: 'read', title: "How to Read a Book", cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1348222245l/567608.jpg" }, { id: 'essentialism', title: "Essentialism", cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1389823386l/18077875.jpg" } ] },
        '5': { year: 1, phase: "Foundation", mission: "Rekap & Refleksi I", focus: "Menganalisis data 4 bulan pertama, temukan bottleneck.", books: [ { id: 'thinking', title: "Thinking, Fast and Slow", cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1317793965l/11468377.jpg" } ] },
        '6-9': { year: 1, phase: "Mastery Building", mission: "Beralih dari kuantitas ke kualitas", focus: "Deliberate Practice, Skill Tracking, Flow Optimization.", books: [ { id: 'peak', title: "Peak", cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1447375939l/26335949.jpg" }, { id: 'mastery', title: "Mastery", cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1333604932l/13589182.jpg" }, { id: 'talent', title: "The Talent Code", cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1347694315l/5762956.jpg" }, { id: 'flow', title: "Flow", cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1333578749l/66354.jpg" }, { id: 'grit', title: "Grit", cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1457888796l/27213329.jpg" }, { id: 'learning', title: "The Art of Learning", cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1348222344l/833445.jpg" } ] },
        '10': { year: 1, phase: "Mastery Building", mission: "Rekap & Refleksi II", focus: "Mengevaluasi efektivitas Deliberate Practice.", books: [ { id: 'mindset', title: "Mindset", cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1462991112l/40745.jpg" } ] },
        '11': { year: 1, phase: "Mastery Building", mission: "Stacking Sistem", focus: "Menghubungkan sistem yang sudah dibangun.", books: [ { id: 'atomic_ulang', title: "(Ulangi) Atomic Habits", cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1655988385l/40121378.jpg" } ] },
        '12': { year: 1, phase: "Mastery Building", mission: "Integrasi & Refleksi Besar", focus: "Refleksi holistik tahun pertama.", books: [ { id: 'systems', title: "Thinking in Systems", cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1348398910l/3828902.jpg" } ] },
        '13-23': { year: 2, phase: "Optimisasi & Internalisasi", mission: "Integrasi Penuh", focus: "Menjalankan sistem hingga menjadi identitas.", books: [ { id: 'antifragile', title: "Antifragile", cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1349022132l/13530973.jpg" }, { id: 'human_nature', title: "The Laws of Human Nature", cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1523498877l/39330937.jpg" }, { id: 'naval', title: "The Almanack of Naval Ravikant", cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1603554522l/54898389.jpg" }, { id: 'four_thousand', title: "Four Thousand Weeks", cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1618526132l/54784815.jpg" }, { id: 'infinity', title: "The Beginning of Infinity", cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1344268688l/10483171.jpg" } ] },
        '24': { year: 2, phase: "Optimisasi & Internalisasi", mission: "Refleksi Total & Refinement", focus: "Evaluasi total 2 tahun, menyederhanakan sistem.", books: [ { id: 'principles', title: "Principles", cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1503524902l/34536488.jpg" } ] },
        '25-30': { year: 3, phase: "Publikasi & Eksternalisasi", mission: "Storytelling & Branding", focus: "Mentransformasi log menjadi narasi yang bisa dibagikan.", books: [ { id: 'storybrand', title: "Building a StoryBrand", cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1490924952l/34341999.jpg" }, { id: 'stick', title: "Made to Stick", cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1435694243l/69242.jpg" }, { id: 'storyworthy', title: "Storyworthy", cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1511209321l/34660383.jpg" }, { id: 'influence', title: "Influence", cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1348268884l/28815.jpg" }, { id: 'positioning', title: "Positioning", cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1348324430l/33744.jpg" }, { id: 'show_work', title: "Show Your Work!", cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1382410883l/18290401.jpg" } ] }
    };

    const quotes = [
        "We are what we repeatedly do. Excellence, then, is not an act, but a habit. - Aristotle",
        "The secret of getting ahead is getting started. - Mark Twain",
        "Your brain does not process information and it is not a computer. You are a whole body system. - Lisa Feldman Barrett",
        "The best time to plant a tree was 20 years ago. The second best time is now. - Chinese Proverb",
        "Amateurs sit and wait for inspiration, the rest of us just get up and go to work. - Stephen King"
    ];

    let appState = {};

    function initializeState() {
        const defaultState = {
            currentMonth: 1,
            habitStreak: 0,
            bookProgress: {},
            currentBookId: 'atomic',
            weeklyScores: [0, 0, 0, 0],
            pillarProgress: { habit: 0, productivity: 0, mastery: 0, focus: 0 }
        };

        Object.values(curriculum).forEach(phase => {
            phase.books.forEach(book => {
                defaultState.bookProgress[book.id] = 0;
            });
        });
        defaultState.bookProgress['atomic'] = 0;
        appState = defaultState;
    }


    // =================================================================================
    // FUNGSI-FUNGSI UTAMA
    // =================================================================================

    function updateAllUI() {
        updateMissionCard();
        updateDashboardStats();
        generateRoadmapTable();
        generateGanttChart();
        initializeDashboardCharts();
        displayDailyQuote();
    }

    function displayDailyQuote() {
        const quoteEl = document.getElementById('daily-quote');
        if(quoteEl) {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            quoteEl.textContent = `"${quotes[randomIndex]}"`;
        }
    }

    function getCurrentPhaseKey() {
        for (const period in curriculum) {
            const range = period.split('-').map(Number);
            const start = range[0];
            const end = range.length > 1 ? range[1] : start;
            if (appState.currentMonth >= start && appState.currentMonth <= end) {
                return period;
            }
        }
        return Object.keys(curriculum)[0];
    }

    function updateMissionCard() {
        const phaseKey = getCurrentPhaseKey();
        const currentPhaseData = curriculum[phaseKey];
        if (!currentPhaseData) return;

        const currentBook = currentPhaseData.books.find(b => b.id === appState.currentBookId);
        if (!currentBook) {
            appState.currentBookId = currentPhaseData.books[0].id;
            updateMissionCard();
            return;
        };

        document.getElementById('mission-title').textContent = `Misi Fase Ini: ${currentPhaseData.mission}`;
        document.getElementById('mission-focus-skill').textContent = currentPhaseData.focus;
        document.getElementById('mission-book-title').textContent = currentBook.title;
        document.getElementById('mission-book-cover').src = currentBook.cover;
        
        const progress = appState.bookProgress[currentBook.id] || 0;
        document.getElementById('book-progress-bar-fill').style.width = `${progress}%`;
        document.getElementById('book-progress-value').textContent = `${progress}%`;
    }

    function updateDashboardStats() {
        const phaseKey = getCurrentPhaseKey();
        const phaseEl = document.getElementById('dashboard-phase');
        const streakEl = document.getElementById('dashboard-streak');
        const currentPhase = curriculum[phaseKey]?.phase || 'Tidak Diketahui';
        if(phaseEl) phaseEl.textContent = currentPhase;
        if(streakEl) streakEl.textContent = `${appState.habitStreak} hari`;
    }

    function generateRoadmapTable() {
        const tableBody = document.getElementById('roadmap-table-body');
        if (!tableBody) return;
        let html = '';
        let currentYear = 0;
        for (const period in curriculum) {
            const data = curriculum[period];
            if (data.year !== currentYear) {
                currentYear = data.year;
                html += `<tr class="phase-header"><td colspan="3">TAHUN ${currentYear}</td></tr>`;
            }
            html += `<tr><td>Bulan ${period}</td><td><b>Tujuan:</b> ${data.mission}<br><b>Fokus:</b> ${data.focus}</td><td class="book-list">${data.books.map(b => `<i>${b.title}</i>`).join(', ')}</td></tr>`;
        }
        tableBody.innerHTML = html;
    }

    function generateGanttChart() {
        const ganttCtx = document.getElementById('ganttChart');
        if (!ganttCtx) return;
        const labels = Object.keys(curriculum).map(p => curriculum[p].mission);
        const data = Object.keys(curriculum).map(p => p.split('-').map(Number)).map(r => [r[0]-1, r.length > 1 ? r[1] : r[0]]);
        
        if (window.ganttChart instanceof Chart) window.ganttChart.destroy();
        window.ganttChart = new Chart(ganttCtx, { type: 'bar', data: { labels: labels, datasets: [{ label: 'Durasi Fase (Bulan)', data: data, backgroundColor: '#4dabf7', barPercentage: 0.7, borderRadius: 4, }] }, options: { responsive: true, maintainAspectRatio: false, indexAxis: 'y', scales: { x: { ticks: { color: 'rgba(255, 255, 255, 0.7)' }, grid: { color: 'rgba(255, 255, 255, 0.1)' }, position: 'top', min: 0, max: 36 }, y: { ticks: { color: 'rgba(255, 255, 255, 0.7)' }, grid: { display: false } } }, plugins: { legend: { display: false } } } });
    }

    function initializeNavigation() {
        const navButtons = document.querySelectorAll('.nav-btn');
        const sections = document.querySelectorAll('.section');
        navButtons.forEach(button => {
            button.addEventListener('click', function() {
                const targetSectionId = this.dataset.section;
                navButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                sections.forEach(section => section.classList.remove('active'));
                const targetSection = document.getElementById(targetSectionId);
                if(targetSection) targetSection.classList.add('active');
            });
        });
    }
    
    function initializeRangeInputs() {
        document.querySelectorAll('.range-input').forEach(input => {
            const valueDisplay = input.closest('.range-container').querySelector('.range-value');
            if (valueDisplay) {
                valueDisplay.textContent = input.value;
                input.addEventListener('input', () => { valueDisplay.textContent = input.value; });
            }
        });
    }

    function initializeCheckinForm() {
        const checkinBtn = document.getElementById('submit-checkin');
        if (checkinBtn) {
            checkinBtn.addEventListener('click', () => {
                appState.habitStreak++;
                
                const bookProgressInput = document.getElementById('book-progress-input');
                const addedProgress = parseInt(bookProgressInput.value) || 0;
                
                const currentBookId = appState.currentBookId;
                let newProgress = (appState.bookProgress[currentBookId] || 0) + addedProgress;
                if (newProgress > 100) newProgress = 100;
                appState.bookProgress[currentBookId] = newProgress;

                alert(`Check-in berhasil! Streak bertambah. Progres buku "${currentBookId}" sekarang ${newProgress}%.`);

                if (newProgress === 100) {
                    const phaseKey = getCurrentPhaseKey();
                    const currentPhaseBooks = curriculum[phaseKey].books;
                    const currentBookArrayIndex = currentPhaseBooks.findIndex(b => b.id === currentBookId);

                    if (currentBookArrayIndex + 1 < currentPhaseBooks.length) {
                        const nextBook = currentPhaseBooks[currentBookArrayIndex + 1];
                        appState.currentBookId = nextBook.id;
                        alert(`Selamat! Buku telah selesai. Lanjut ke buku berikutnya: "${nextBook.title}"!`);
                    } else {
                        alert(`Luar biasa! Semua buku untuk fase ini telah selesai dibaca.`);
                    }
                }
                
                updateAllUI();
                bookProgressInput.value = 5;
            });
        }
    }

    function initializeResetButton() {
        const resetBtn = document.getElementById('reset-progress-btn');
        if(resetBtn) {
            resetBtn.addEventListener('click', () => {
                if(confirm('Anda yakin ingin mereset semua progres?')) {
                    initializeState();
                    updateAllUI();
                    alert('Progres telah direset.');
                }
            });
        }
    }
    
    function initializeMitigationCards() {
        const details = {
            kecil: "Prinsip: Minimum Viable Action.\n\nPraktik: Jika targetmu adalah 'olahraga 30 menit' dan terasa berat, perkecil jadi 'pakai sepatu olahraga'. Lakukan aksi terkecil yang tidak bisa ditolak oleh otakmu.",
            jelas: "Prinsip: Ritual, bukan Niat.\n\nPraktik: Jangan hanya bilang 'mau baca buku'. Buat jadi 'Setelah sikat gigi malam, saya akan membaca buku di sofa selama 10 menit'. Beri waktu dan tempat yang spesifik.",
            rutin: "Prinsip: Andalkan Ritme, bukan Motivasi.\n\nPraktik: Motivasi itu tamu yang datang dan pergi. Bangun jadwal yang konsisten. 'Setiap jam 8 pagi adalah waktu untuk deep work', terlepas dari perasaanmu saat itu.",
            nyambung: "Prinsip: Investasi Emosional.\n\nPraktik: Hubungkan kebiasaanmu dengan identitas. Bukan 'saya sedang diet', tapi 'saya adalah orang yang sehat'. Rayakan kemenangan kecil untuk memperkuat koneksi ini."
        };
        document.querySelectorAll('.kjrn-card').forEach(card => {
            card.addEventListener('click', () => {
                const key = card.dataset.mitigasi;
                alert(details[key]);
            });
        });
    }

    function initializeDashboardCharts() {
        const chartDefaultOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } };
        const darkThemeScales = { x: { ticks: { color: 'rgba(255, 255, 255, 0.7)' }, grid: { color: 'rgba(255, 255, 255, 0.1)' } }, y: { ticks: { color: 'rgba(255, 255, 255, 0.7)' }, grid: { color: 'rgba(255, 255, 255, 0.1)' } } };
        
        const weeklyCtx = document.getElementById('weeklyChart');
        if (weeklyCtx) {
            if (window.weeklyChart instanceof Chart) window.weeklyChart.destroy();
            window.weeklyChart = new Chart(weeklyCtx, { type: 'line', data: { labels: ['M1', 'M2', 'M3', 'M4'], datasets: [{ label: 'Progress', data: appState.weeklyScores, borderColor: '#4dabf7', backgroundColor: 'rgba(77, 171, 247, 0.2)', borderWidth: 2, fill: true, tension: 0.4 }] }, options: {...chartDefaultOptions, scales: darkThemeScales} });
        }
        
        const pillarCtx = document.getElementById('pillarChart');
        if (pillarCtx) {
            if (window.pillarChart instanceof Chart) window.pillarChart.destroy();
            window.pillarChart = new Chart(pillarCtx, { type: 'radar', data: { labels: ['Habit', 'Productivity', 'Mastery', 'Focus'], datasets: [{ label: 'Pilar', data: Object.values(appState.pillarProgress), borderColor: '#4dabf7', backgroundColor: 'rgba(77, 171, 247, 0.2)' }] }, options: { ...chartDefaultOptions, scales: { r: { angleLines: { color: 'rgba(255, 255, 255, 0.1)' }, grid: { color: 'rgba(255, 255, 255, 0.1)' }, pointLabels: { font: { size: 14 }, color: 'rgba(255, 255, 255, 0.7)' }, ticks: { backdropColor: 'rgba(0,0,0,0.5)', color: 'white' }}}} });
        }
    }
    
    // INISIALISASI APLIKASI
    initializeState();
    initializeNavigation();
    initializeRangeInputs();
    initializeCheckinForm();
    initializeResetButton();
    initializeMitigationCards();
    updateAllUI();
});
