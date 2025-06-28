// Application State
const appState = {
    currentWeek: 5,
    currentPhase: 'Stabilisasi',
    dailyProgress: {
        habitStreak: 28,
        productivityScore: 7.5,
        masteryHours: 2.5,
        focusRating: 8
    },
    weeklyScores: [6.5, 7.0, 7.8, 8.2, 8.5],
    pillarProgress: {
        habit: 75,
        productivity: 68,
        mastery: 72,
        focus: 80
    }
};

// Phase descriptions
const phaseDescriptions = {
    'Inisiasi': 'Memulai membangun fondasi habit',
    'Stabilisasi': 'Membangun ritme dan konsistensi',
    'Optimalisasi': 'Meningkatkan efisiensi dan kualitas',
    'Mastery': 'Mencapai tingkat keahlian tinggi'
};

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeProgressCircles();
    initializeCharts();
    initializeRangeInputs();
    initializePillarTabs();
    initializeFormHandlers();
    updatePhaseInfo();
});

// Navigation
function initializeNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.section');

    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetSection = this.dataset.section;
            
            // Update active nav button
            navButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update active section
            sections.forEach(section => section.classList.remove('active'));
            document.getElementById(targetSection).classList.add('active');
        });
    });
}

// Progress Circles
function initializeProgressCircles() {
    const progressCircles = document.querySelectorAll('.progress-fill');
    
    progressCircles.forEach(circle => {
        const progress = circle.dataset.progress;
        const circumference = 2 * Math.PI * 25; // radius = 25
        const offset = circumference - (progress / 100) * circumference;
        
        circle.style.strokeDasharray = circumference;
        circle.style.strokeDashoffset = circumference;
        
        // Animate on load
        setTimeout(() => {
            circle.style.strokeDashoffset = offset;
        }, 500);
    });
}

// Charts
function initializeCharts() {
    // Weekly Progress Chart
    const weeklyCtx = document.getElementById('weeklyChart');
    if (weeklyCtx) {
        new Chart(weeklyCtx, {
            type: 'line',
            data: {
                labels: ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4', 'Minggu 5'],
                datasets: [{
                    label: 'Progress Keseluruhan',
                    data: appState.weeklyScores,
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 10,
                        grid: {
                            color: 'rgba(94, 82, 64, 0.1)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // Pillar Comparison Chart
    const pillarCtx = document.getElementById('pillarChart');
    if (pillarCtx) {
        new Chart(pillarCtx, {
            type: 'radar',
            data: {
                labels: ['Habit', 'Productivity', 'Mastery', 'Focus'],
                datasets: [{
                    label: 'Progress Pilar',
                    data: [
                        appState.pillarProgress.habit,
                        appState.pillarProgress.productivity,
                        appState.pillarProgress.mastery,
                        appState.pillarProgress.focus
                    ],
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.2)',
                    borderWidth: 2,
                    pointBackgroundColor: '#1FB8CD',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        grid: {
                            color: 'rgba(94, 82, 64, 0.1)'
                        },
                        angleLines: {
                            color: 'rgba(94, 82, 64, 0.1)'
                        }
                    }
                }
            }
        });
    }
}

// Range Inputs
function initializeRangeInputs() {
    const rangeInputs = document.querySelectorAll('.range-input');
    
    rangeInputs.forEach(input => {
        const valueDisplay = input.nextElementSibling;
        
        input.addEventListener('input', function() {
            if (valueDisplay && valueDisplay.classList.contains('range-value')) {
                valueDisplay.textContent = this.value;
            }
        });
        
        // Initialize display
        if (valueDisplay && valueDisplay.classList.contains('range-value')) {
            valueDisplay.textContent = input.value;
        }
    });
}

// Pillar Tabs
function initializePillarTabs() {
    const pillarTabs = document.querySelectorAll('.pillar-tab');
    const pillarContents = document.querySelectorAll('.pillar-content');
    
    pillarTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetPillar = this.dataset.pillar;
            
            // Update active tab
            pillarTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Update active content
            pillarContents.forEach(content => content.classList.remove('active'));
            document.getElementById(targetPillar + '-pillar').classList.add('active');
        });
    });
}

// Form Handlers
function initializeFormHandlers() {
    // Daily Check-in Form
    const checkinBtn = document.getElementById('submit-checkin');
    if (checkinBtn) {
        checkinBtn.addEventListener('click', handleDailyCheckin);
    }
    
    // Weekly Review Form
    const reviewBtn = document.querySelector('#weekly-review .btn--primary');
    if (reviewBtn) {
        reviewBtn.addEventListener('click', handleWeeklyReview);
    }
    
    // Focus Rating Stars
    initializeFocusRating();
    
    // Habit Checkboxes
    initializeHabitCheckboxes();
}

function handleDailyCheckin() {
    // Get form values
    const checkinData = {
        habitCount: document.getElementById('habit-count')?.value || 0,
        energyLevel: document.getElementById('energy-level')?.value || 5,
        deepWorkHours: document.getElementById('deep-work-hours')?.value || 0,
        pomodoroCount: document.getElementById('pomodoro-count')?.value || 0,
        practiceHours: document.getElementById('practice-hours')?.value || 0,
        feedbackCount: document.getElementById('feedback-count')?.value || 0,
        priorityClarity: document.getElementById('priority-clarity')?.value || 5,
        deepZoneTime: document.getElementById('deep-zone-time')?.value || 0
    };
    
    // Save data (in real app, this would go to a backend)
    console.log('Daily check-in data:', checkinData);
    
    // Show success message
    showNotification('Check-in harian berhasil disimpan!', 'success');
    
    // Update dashboard with new data
    updateDashboard(checkinData);
}

function handleWeeklyReview() {
    // Get review data
    const reviewData = {
        habitRating: document.querySelector('#weekly-review .rating-group:nth-child(1) input')?.value || 5,
        productivityRating: document.querySelector('#weekly-review .rating-group:nth-child(2) input')?.value || 5,
        masteryRating: document.querySelector('#weekly-review .rating-group:nth-child(3) input')?.value || 5,
        focusRating: document.querySelector('#weekly-review .rating-group:nth-child(4) input')?.value || 5,
        achievements: document.querySelector('#weekly-review textarea:nth-of-type(1)')?.value || '',
        improvements: document.querySelector('#weekly-review textarea:nth-of-type(2)')?.value || '',
        nextWeekTargets: document.querySelector('#weekly-review textarea:nth-of-type(3)')?.value || ''
    };
    
    // Save data
    console.log('Weekly review data:', reviewData);
    
    // Show success message
    showNotification('Review mingguan berhasil disimpan!', 'success');
    
    // Advance to next week
    advanceWeek();
}

function initializeFocusRating() {
    const ratingStars = document.querySelectorAll('.focus-rating .rating');
    
    ratingStars.forEach((star, index) => {
        star.addEventListener('click', function() {
            // Update star display
            ratingStars.forEach((s, i) => {
                if (i <= index) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });
    });
}

function initializeHabitCheckboxes() {
    const checkboxes = document.querySelectorAll('.checkbox-item input[type="checkbox"]');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const checkedCount = document.querySelectorAll('.checkbox-item input[type="checkbox"]:checked').length;
            console.log(`Completed ${checkedCount} minimum viable actions`);
        });
    });
}

// Update Functions
function updatePhaseInfo() {
    const currentPhaseEl = document.getElementById('current-phase');
    const currentWeekEl = document.getElementById('current-week');
    const phaseDescEl = document.getElementById('phase-description');
    
    if (currentPhaseEl) currentPhaseEl.textContent = appState.currentPhase;
    if (currentWeekEl) currentWeekEl.textContent = appState.currentWeek;
    if (phaseDescEl) phaseDescEl.textContent = phaseDescriptions[appState.currentPhase];
}

function updateDashboard(checkinData) {
    // Update habit streak (increment if habits completed today)
    if (checkinData.habitCount > 0) {
        appState.dailyProgress.habitStreak++;
        const streakEl = document.querySelector('.streak-number');
        if (streakEl) streakEl.textContent = appState.dailyProgress.habitStreak;
    }
    
    // Update deep work hours display
    const deepWorkEl = document.querySelector('.productivity-stats .stat-value');
    if (deepWorkEl) deepWorkEl.textContent = checkinData.deepWorkHours + 'h';
    
    // Update practice hours
    const practiceEl = document.querySelector('.mastery-stats .stat-value');
    if (practiceEl) practiceEl.textContent = checkinData.practiceHours + 'h';
    
    // Update focus clarity
    const clarityEl = document.querySelector('.focus-stats .stat-value');
    if (clarityEl) clarityEl.textContent = checkinData.priorityClarity + '/10';
    
    // Update energy bar
    const energyBar = document.querySelector('.metric-fill');
    if (energyBar) {
        energyBar.style.width = (checkinData.energyLevel * 10) + '%';
    }
}

function advanceWeek() {
    appState.currentWeek++;
    
    // Update phase based on week
    if (appState.currentWeek <= 2) {
        appState.currentPhase = 'Inisiasi';
    } else if (appState.currentWeek <= 8) {
        appState.currentPhase = 'Stabilisasi';
    } else if (appState.currentWeek <= 12) {
        appState.currentPhase = 'Optimalisasi';
    } else {
        appState.currentPhase = 'Mastery';
    }
    
    updatePhaseInfo();
    showNotification(`Selamat! Anda memasuki minggu ke-${appState.currentWeek}`, 'success');
}

// Utility Functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background: var(--color-success);
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    if (type === 'error') {
        notification.style.background = 'var(--color-error)';
    } else if (type === 'warning') {
        notification.style.background = 'var(--color-warning)';
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function calculateOverallProgress() {
    const total = appState.pillarProgress.habit + 
                  appState.pillarProgress.productivity + 
                  appState.pillarProgress.mastery + 
                  appState.pillarProgress.focus;
    return Math.round(total / 4);
}

// Data Export/Import (for future use)
function exportData() {
    const exportData = {
        appState,
        timestamp: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `hpmf-data-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

// Motivational Messages
const motivationalMessages = [
    "Konsistensi adalah kunci menuju mastery!",
    "Setiap hari adalah kesempatan untuk berkembang.",
    "Progress kecil setiap hari akan menghasilkan perubahan besar.",
    "Habit yang baik adalah investasi terbaik untuk masa depan.",
    "Focus pada proses, bukan hanya hasil.",
    "Mastery membutuhkan waktu, nikmati perjalanannya.",
    "Produktivitas bukan tentang sibuk, tapi tentang efektif.",
    "Deep work adalah superpower di era distraksi."
];

function showMotivationalMessage() {
    const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
    showNotification(randomMessage, 'info');
}

// Show motivational message on app load
setTimeout(showMotivationalMessage, 2000);

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Alt + 1-5 for quick navigation
    if (e.altKey) {
        switch(e.key) {
            case '1':
                document.querySelector('[data-section="dashboard"]')?.click();
                break;
            case '2':
                document.querySelector('[data-section="daily-checkin"]')?.click();
                break;
            case '3':
                document.querySelector('[data-section="pillars"]')?.click();
                break;
            case '4':
                document.querySelector('[data-section="weekly-review"]')?.click();
                break;
            case '5':
                document.querySelector('[data-section="mitigasi"]')?.click();
                break;
        }
    }
});

// Auto-save functionality (simulated)
setInterval(function() {
    // In a real app, this would save to backend
    console.log('Auto-saving data...', new Date().toLocaleTimeString());
}, 60000); // Every minute

// Update time display
function updateTimeDisplay() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('id-ID');
    const dateString = now.toLocaleDateString('id-ID', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    // Add time display to nav if it doesn't exist
    if (!document.querySelector('.time-display')) {
        const timeDisplay = document.createElement('div');
        timeDisplay.className = 'time-display';
        timeDisplay.style.cssText = `
            font-size: 12px;
            color: var(--color-text-secondary);
            text-align: center;
        `;
        timeDisplay.innerHTML = `<div>${dateString}</div><div>${timeString}</div>`;
        document.querySelector('.nav-brand').appendChild(timeDisplay);
    }
}

// Update time every second
updateTimeDisplay();
setInterval(updateTimeDisplay, 1000);

// Performance monitoring
const performanceObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
            console.log('Page load time:', entry.loadEventEnd - entry.loadEventStart, 'ms');
        }
    }
});

performanceObserver.observe({entryTypes: ['navigation']});