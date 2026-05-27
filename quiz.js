// Quiz data
const personalities = {
    adventurer: {
        name: "Дерзкий Авантюрист",
        coffee: "Двойной Эспрессо",
        tagline: "Ты живёшь ради интенсивности",
        description: "Ты не ищешь лёгких путей. Тебе нужен кофе, который бьёт сразу и точно. Двойной эспрессо — это про силу, скорость и характер.",
        image: "public/espresso.svg"
    },
    social: {
        name: "Душа Компании",
        coffee: "Капучино",
        tagline: "В компании кофе вкуснее",
        description: "Ты умеешь делать обычное особенным. Твой кофе — как ты: тёплый, с характером и с идеальной пенкой.",
        image: "public/cappuccino.svg"
    },
    healthy: {
        name: "ЗОЖник",
        coffee: "Американо на овсяном молоке",
        tagline: "Здоровье в каждом глотке",
        description: "Ты знаешь, что хорошо для тебя. Твой кофе — осознанный выбор, а не привычка.",
        image: "public/americano.svg"
    },
    pragmatic: {
        name: "Практичный Прагматик",
        coffee: "Большой дрип, что свежее",
        tagline: "Просто сделай это",
        description: "Тебе не нужны украшения. Хороший кофе — и всё. Просто, надёжно, эффективно.",
        image: "public/drip.svg"
    }
};

const questions = [
    {
        text: "Как выглядят твои идеальные выходные?",
        icon: "🗓️",
        options: [
            { text: "Поход или приключение на свежем воздухе", icon: "🏔️", personality: "adventurer" },
            { text: "Вечеринка или встреча с друзьями", icon: "🎉", personality: "social" },
            { text: "Йога, медитация и здоровая еда", icon: "🧘", personality: "healthy" },
            { text: "Навести порядок и распланировать неделю", icon: "📋", personality: "pragmatic" }
        ]
    },
    {
        text: "Ты попал в новый город. Что делаешь первым делом?",
        icon: "✈️",
        options: [
            { text: "Ищу самый крутой местный бар", icon: "🍸", personality: "adventurer" },
            { text: "Спрашиваю, где тусуются местные", icon: "👋", personality: "social" },
            { text: "Ищу органическое кафе или фермерский рынок", icon: "🥬", personality: "healthy" },
            { text: "Проверяю карту и составляю маршрут", icon: "🗺️", personality: "pragmatic" }
        ]
    },
    {
        text: "Какой фильм ты выберешь для вечера?",
        icon: "🎬",
        options: [
            { text: "«Безумный Макс» или «Джон Уик»", icon: "💥", personality: "adventurer" },
            { text: "«Друзья» или ситком", icon: "😂", personality: "social" },
            { text: "Документалка о еде или здоровье", icon: "🥗", personality: "healthy" },
            { text: "«Интерстеллар» или триллер", icon: "🚀", personality: "pragmatic" }
        ]
    },
    {
        text: "Что ты обычно говоришь бариста?",
        icon: "☕",
        options: [
            { text: "«Что у вас самое крепкое?»", icon: "💪", personality: "adventurer" },
            { text: "«Как у тебя дела?»", icon: "😊", personality: "social" },
            { text: "«Что без сахара и на растительном молоке?»", icon: "🌱", personality: "healthy" },
            { text: "«Большой чёрный кофе, пожалуйста»", icon: "👍", personality: "pragmatic" }
        ]
    },
    {
        text: "Если бы кофе был суперспособностью, какая у тебя была бы?",
        icon: "⚡",
        options: [
            { text: "Суперсила — просыпаться мгновенно", icon: "⚡", personality: "adventurer" },
            { text: "Телепатия — чувствовать настроение друзей", icon: "💜", personality: "social" },
            { text: "Исцеление — восстанавливать энергию", icon: "✨", personality: "healthy" },
            { text: "Многозадачность — делать сто дел сразу", icon: "🎯", personality: "pragmatic" }
        ]
    }
];

// State
let currentQuestion = 0;
let answers = [];

// Start quiz
function startQuiz() {
    document.getElementById('welcome-screen').classList.remove('active');
    document.getElementById('question-screen').classList.add('active');
    showQuestion();
}

// Show question
function showQuestion() {
    const question = questions[currentQuestion];

    // Update progress
    const progress = ((currentQuestion) / questions.length) * 100;
    document.getElementById('progress-bar').style.width = progress + '%';

    // Update counter
    document.getElementById('question-counter').textContent = `Вопрос ${currentQuestion + 1} из ${questions.length}`;

    // Update question text
    document.getElementById('question-text').textContent = question.text;

    // Build options
    const container = document.getElementById('options-container');
    container.innerHTML = '';

    question.options.forEach((option, index) => {
        const div = document.createElement('div');
        div.className = 'option';
        div.innerHTML = `
            <span class="option-icon">${option.icon}</span>
            <span>${option.text}</span>
        `;
        div.onclick = () => selectOption(index);
        container.appendChild(div);
    });
}

// Select option
function selectOption(index) {
    const question = questions[currentQuestion];
    const personality = question.options[index].personality;
    answers.push(personality);

    // Visual feedback
    const options = document.querySelectorAll('.option');
    options[index].classList.add('selected');

    // Move to next question after delay
    setTimeout(() => {
        currentQuestion++;

        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }, 300);
}

// Calculate result
function calculateResult() {
    const counts = {};
    answers.forEach(answer => {
        counts[answer] = (counts[answer] || 0) + 1;
    });

    let maxCount = 0;
    let result = null;

    Object.entries(counts).forEach(([personality, count]) => {
        if (count > maxCount) {
            maxCount = count;
            result = personality;
        }
    });

    return result;
}

// Show result
function showResult() {
    const resultKey = calculateResult();
    const result = personalities[resultKey];

    document.getElementById('question-screen').classList.remove('active');
    document.getElementById('result-screen').classList.add('active');

    document.getElementById('result-image').innerHTML = `<img src="${result.image}" alt="${result.coffee}">`;
    document.getElementById('result-title').textContent = result.name;
    document.getElementById('result-tagline').textContent = result.tagline;
    document.getElementById('result-description').textContent = result.description;
    document.getElementById('result-coffee').textContent = result.coffee;
}

// Restart quiz
function restartQuiz() {
    currentQuestion = 0;
    answers = [];

    document.getElementById('result-screen').classList.remove('active');
    document.getElementById('welcome-screen').classList.add('active');
}
