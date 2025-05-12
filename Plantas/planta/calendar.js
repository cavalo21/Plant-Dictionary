// Elementos do DOM
const calendarDays = document.getElementById('calendarDays');
const currentMonthElement = document.getElementById('currentMonth');
const prevMonthButton = document.getElementById('prevMonth');
const nextMonthButton = document.getElementById('nextMonth');
const moonPhaseDisplay = document.getElementById('moonPhaseDisplay');
const moonTips = document.getElementById('moonTips');

// Estado do calendário
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

// Nomes dos meses em português
const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

// Fases da lua e suas dicas
const moonPhases = {
    'Lua Nova': {
        image: 'images/moon/new-moon.png',
        tips: 'Ideal para plantar raízes e tubérculos. Bom período para podar plantas doentes.'
    },
    'Lua Crescente': {
        image: 'images/moon/waxing-crescent.png',
        tips: 'Período favorável para plantar folhas e flores. Bom para fertilização.'
    },
    'Quarto Crescente': {
        image: 'images/moon/first-quarter.png',
        tips: 'Ótimo para plantar frutos e sementes. Ideal para colheita de frutos.'
    },
    'Lua Cheia': {
        image: 'images/moon/full-moon.png',
        tips: 'Ideal para colheita e armazenamento. Bom para podar plantas saudáveis.'
    },
    'Quarto Minguante': {
        image: 'images/moon/last-quarter.png',
        tips: 'Bom para podar e controlar crescimento. Ideal para colher raízes.'
    },
    'Lua Minguante': {
        image: 'images/moon/waning-crescent.png',
        tips: 'Período de descanso para o jardim. Bom para planejamento.'
    }
};

// Função para calcular a fase lunar aproximada
function calculateMoonPhase(date) {
    // Data da última lua nova conhecida (pode ser ajustada)
    const lastNewMoon = new Date('2024-01-11');
    const lunarMonth = 29.530588853; // Duração média do mês lunar em dias
    
    // Calcular dias desde a última lua nova
    const daysSinceNewMoon = (date - lastNewMoon) / (1000 * 60 * 60 * 24);
    
    // Calcular a fase atual (0 a 1)
    const phase = (daysSinceNewMoon % lunarMonth) / lunarMonth;
    
    // Determinar a fase lunar
    if (phase < 0.03 || phase >= 0.97) return 'Lua Nova';
    if (phase < 0.22) return 'Lua Crescente';
    if (phase < 0.28) return 'Quarto Crescente';
    if (phase < 0.47) return 'Lua Crescente';
    if (phase < 0.53) return 'Lua Cheia';
    if (phase < 0.72) return 'Lua Minguante';
    if (phase < 0.78) return 'Quarto Minguante';
    return 'Lua Minguante';
}

// Função para atualizar o display da fase lunar
function updateMoonPhaseDisplay() {
    const phase = calculateMoonPhase(new Date());
    const phaseInfo = moonPhases[phase];
    
    moonPhaseDisplay.innerHTML = `
        <img src="${phaseInfo.image}" alt="${phase}">
        <p>${phase}</p>
    `;
    
    moonTips.textContent = phaseInfo.tips;
}

// Função para gerar o calendário
function generateCalendar() {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const startingDay = firstDay.getDay();
    const totalDays = lastDay.getDate();
    
    // Atualizar o título do mês
    currentMonthElement.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    
    // Limpar o calendário
    calendarDays.innerHTML = '';
    
    // Adicionar dias vazios para o início do mês
    for (let i = 0; i < startingDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'day other-month';
        calendarDays.appendChild(emptyDay);
    }
    
    // Adicionar os dias do mês
    for (let day = 1; day <= totalDays; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'day';
        
        // Marcar o dia atual
        if (day === currentDate.getDate() && 
            currentMonth === currentDate.getMonth() && 
            currentYear === currentDate.getFullYear()) {
            dayElement.classList.add('today');
        }
        
        // Adicionar o número do dia
        const dayNumber = document.createElement('div');
        dayNumber.className = 'day-number';
        dayNumber.textContent = day;
        dayElement.appendChild(dayNumber);
        
        // Adicionar a fase lunar
        const date = new Date(currentYear, currentMonth, day);
        const phase = calculateMoonPhase(date);
        const phaseInfo = moonPhases[phase];
        
        const moonPhase = document.createElement('div');
        moonPhase.className = 'moon-phase';
        moonPhase.innerHTML = `<img src="${phaseInfo.image}" alt="${phase}">`;
        dayElement.appendChild(moonPhase);
        
        calendarDays.appendChild(dayElement);
    }
}

// Event Listeners
prevMonthButton.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar();
});

nextMonthButton.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar();
});

// Inicializar o calendário
document.addEventListener('DOMContentLoaded', () => {
    generateCalendar();
    updateMoonPhaseDisplay();
}); 