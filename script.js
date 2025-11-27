const quizData = [
{
    question: "Refers to literary works reflecting the country’s multicultural society, history and experience.",
    answer: "SINGAPOREAN LITERATURE"
},
{
    question: "Shaped by the country’s multicultural heritage, history and geography (population, areas/location, cultural/belief).",
    answer: "MALAYSIAN LITERATURE"
},
{
    question: "Literature written in English, Malay, Chinese and Tamil reflecting the country’s four official languages.",
    answer: "LANGUAGE – BASED"
},
{
    question: "Poetry, Fiction (short stories, novel), Drama (plays) and Non-fiction (essay, memoir).",
    answer: "GENRE – BASED"
},
{
    question: "Documents, history, event.",
    answer: "MEMOIR"
},
{
    question: "Works exploring identity, culture, history, social issues and urbanization.",
    answer: "THEME – BASED"
},
{
    question: "Motherhood (Sacrifices).",
    answer: "THEME OF THE FRYING PAN (KUALI HITAM) –ZURINAH HASSAN"
},
{
    question: "Non-stick pan from frying pan – life transformation of the persona.",
    answer: "SYMBOLISM THE FRYING PAN (KUALI HITAM) –ZURINAH HASSAN"
},
{
    question: "Plot convention – Story within a story or hypo diegesis.",
    answer: "NARRATION"
},
{
    question: "Arrange marriage, Karmic reincarnation.",
    answer: "THEME OF GRANDFATHER’S STORY"
},
{
    question: "First person POV.",
    answer: "POINT OF VIEW"
},
{
    question: "Man VS. Woman.",
    answer: "CONFLICT"
},
{
    question: "Plantation, Farm, Nunnery.",
    answer: "SETTING OF GRANDFATHER’S STORY"
},
{
    question: "Simile.",
    answer: "FIGURATIVE LANGUAGE OF GRANDFATHER’S STORY"
},
{
    question: "Narrative and descriptive writing.",
    answer: "STYLE"
},
{
    question: "Grandfather, Grandmother, Grandaunt, Narrator/Grandchild, Farmer, Wife, Nun.",
    answer: "CHARACTERS IN GRANDFATHER’S STORY"
},
{
    question: "Atrocious, hostile, murderous, single-minded.",
    answer: "CHARACTERIZATION OF GRANDMOTHER"
},
{
    question: "Grief-stricken, inconsolable, withdrawn.",
    answer: "CHARACTERIZATION OF GRANDFATHER"
},
{
    question: "Barren, soft – spoken, genteel-looking.",
    answer: "CHARACTERIZATION OF GRANDAUNT"
}
];


let quizOrder = [];
let currentAnswers = [];
let currentQuestion = 0;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createQuiz() {
    // If quizOrder is not set, initialize and shuffle
    if (!quizOrder.length) {
        quizOrder = Array.from({length: quizData.length}, (_, i) => i);
        shuffleArray(quizOrder);
    }
    if (!currentAnswers.length || currentAnswers.length !== quizData.length) {
        currentAnswers = new Array(quizData.length).fill("");
    }
    const quizContainer = document.getElementById('quiz');
    quizContainer.innerHTML = '';

    quizOrder.forEach((qIdx, index) => {
        const question = quizData[qIdx];
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question-container';
        if (index === 0) questionDiv.classList.add('active');

        questionDiv.innerHTML = `
            <div class="question">${index + 1}. ${question.question}</div>
            <div class="identification-input" style="display:flex;gap:8px;align-items:center;">
                <input type="text" id="input-${index}" data-q="${index}" autocomplete="off" placeholder="Type your answer..." value="${currentAnswers[index] || ''}" oninput="handleInput(${index})" />
                <button type="button" class="send-btn" id="send-${index}" onclick="sendAnswer(${index})" aria-label="Send answer" style="background:none;border:none;cursor:pointer;padding:0 6px;display:flex;align-items:center;">
                  <svg xmlns='http://www.w3.org/2000/svg' width='22' height='22' fill='none' viewBox='0 0 24 24'><path fill='var(--accent)' d='M2.01 21 23 12 2.01 3 2 10l15 2-15 2z'/></svg>
                </button>
            </div>
            <div class="feedback" id="feedback-${index}" aria-live="polite"></div>
        `;
        quizContainer.appendChild(questionDiv);
    });
    // Restore any previous answers (when resetting or revisiting)
    quizOrder.forEach((qIdx, index) => {
        if (currentAnswers[index] && currentAnswers[index] !== "") {
            const input = document.getElementById(`input-${index}`);
            if (input) input.value = currentAnswers[index];
        }
    });
    // Hide score page if visible
    const scorePage = document.getElementById('scorePage');
    if (scorePage) scorePage.style.display = 'none';
    updateNavigation();
}

// For identification: handle input and update answer
function handleInput(questionIndex) {
    const input = document.getElementById(`input-${questionIndex}`);
    currentAnswers[questionIndex] = input.value;
    // Remove feedback and enable input until send is pressed
    const feedbackEl = document.getElementById(`feedback-${questionIndex}`);
    feedbackEl.textContent = '';
    input.classList.remove('correct', 'wrong');
    updateNavigation();
}

function sendAnswer(questionIndex) {
    const input = document.getElementById(`input-${questionIndex}`);
    const feedbackEl = document.getElementById(`feedback-${questionIndex}`);
    const qIdx = quizOrder[questionIndex];
    const userAnswer = input.value.trim().toLowerCase();
    const correctAnswer = quizData[qIdx].answer.trim().toLowerCase();
        // Accept alternate answer for AUTOMATIC FIRE-EXTINGUISHING SYSTEM 
        let isCorrect = false;
        if (correctAnswer === 'automatic fire-extinguishing system') {
            if (userAnswer === 'automatic fire extinguishing system') {
                isCorrect = true;
            }
        }
        // Accept alternate answers for DRY-PIPE SYSTEM 
        if (correctAnswer === 'dry-pipe system') {
            if (userAnswer === 'dry pipe system') {
                isCorrect = true;
            }
        }
        // Accept alternate answers for WET-PIPE SYSTEM 
        if (correctAnswer === 'wet-pipe system') {
            if (userAnswer === 'wet pipe system') {
                isCorrect = true;
            }
        }
        // Accept alternate answers for FIRE-RESISTANCE RATING
        if (correctAnswer === 'fire-resistance rating') {
            if (userAnswer === 'fire resistance rating') {
                isCorrect = true;
            }
        }
        // Accept alternate answers for FIRE-DETECTION SYSTEM 
        if (correctAnswer === 'fire-detection system') {
            if (userAnswer === 'fire detection system') {
                isCorrect = true;
            }
        }
        // Accept alternate answers for FUEL-CONTRIBUTION RATING 
        if (correctAnswer === 'fuel-contribution rating') {
            if (userAnswer === 'fuel contribution rating') {
                isCorrect = true;
            }
        }
            // Accept alternate answers for SPRAY-ON FIREPROOFING
            if (correctAnswer === 'spray-on fireproofing') {
                if (userAnswer === 'spray on fireproofing' || userAnswer === 'spray on fire proofing') {
                    isCorrect = true;
                }
            }
            // Accept alternate answers for SPRAY-ON FIREPROOFING
            if (correctAnswer === 'spray-on fireproofing') {
                if (userAnswer === 'spray on fireproofing' || userAnswer === 'spray on fire proofing') {
                    isCorrect = true;
                }
            }
            // Accept alternate answers for FIREPROOFING 
            if (correctAnswer === 'fireproofing') {
                if (userAnswer === 'fire proofing') {
                    isCorrect = true;
                }
            }
    if (userAnswer !== "") {
        input.disabled = true;
            if (userAnswer === correctAnswer || userAnswer.replace(/\s+/g, " ") === correctAnswer.replace(/\s+/g, " ") || isCorrect) {
                feedbackEl.textContent = 'Correct!';
                feedbackEl.style.color = '#2e7d32';
                input.classList.add('correct');
            } else {
                feedbackEl.textContent = `Incorrect. Correct answer: ${quizData[qIdx].answer}`;
                feedbackEl.style.color = '#c62828';
                input.classList.add('wrong');
            }
        setTimeout(() => {
            if (questionIndex < quizData.length - 1) {
                const questions = document.querySelectorAll('.question-container');
                questions[questionIndex].classList.remove('active');
                currentQuestion = questionIndex + 1;
                questions[currentQuestion].classList.add('active');
                updateNavigation();
                // Focus the next input if not already answered
                const nextInput = document.getElementById(`input-${currentQuestion}`);
                if (nextInput && !nextInput.disabled) nextInput.focus();
            }
        }, 500);
    } else {
        feedbackEl.textContent = '';
    }
    updateNavigation();
}

function checkAnswers() {
    let score = 0;
    const questions = document.querySelectorAll('.question-container');

    questions.forEach((question, index) => {
        const input = question.querySelector('input[type="text"]');
        const userAnswer = (input ? input.value.trim().toLowerCase() : "");
        const qIdx = quizOrder[index];
        const correctAnswer = quizData[qIdx].answer.trim().toLowerCase();
            // Accept alternate answer for LIQUID-FILLED COLUMN
            let isCorrect = false;
            if (correctAnswer === 'liquid-filled column') {
                if (userAnswer === 'liquid filled column') {
                    isCorrect = true;
                }
            }
            // Accept alternate answers for SMOKE-DEVELOPED RATING
            if (correctAnswer === 'smoke-developed rating') {
                if (userAnswer === 'smoke developed rating') {
                    isCorrect = true;
                }
            }
            // Accept alternate answers for FIRE-RATED
            if (correctAnswer === 'fire-rated') {
                if (userAnswer === 'fire rated') {
                    isCorrect = true;
                }
            }
            // Accept alternate answers for FIRE-RESISTANCE RATING
            if (correctAnswer === 'fire-resistance rating') {
                if (userAnswer === 'fire resistance rating') {
                    isCorrect = true;
                }
            }
            // Accept alternate answers for FLAME-SPREAD RATING
            if (correctAnswer === 'flame-spread rating') {
                if (userAnswer === 'flame spread rating') {
                    isCorrect = true;
                }
            }
            // Accept alternate answers for SPRAY-ON FIREPROOFING 
            if (correctAnswer === 'spray-on fireproofing') {
                if (userAnswer === 'spray on fireproofing') {
                    isCorrect = true;
                }
            }
            // Accept alternate answers for FIREPROOFING 
            if (correctAnswer === 'fireproofing') {
                if (userAnswer === 'fire proofing') {
                    isCorrect = true;
                }
            }
        input.disabled = true;
        const feedbackEl = document.getElementById(`feedback-${index}`);
            if (userAnswer === correctAnswer || userAnswer.replace(/\s+/g, " ") === correctAnswer.replace(/\s+/g, " ") || isCorrect) {
                score++;
                feedbackEl.textContent = 'Correct!';
                feedbackEl.style.color = '#2e7d32';
            } else {
                feedbackEl.textContent = `Incorrect. Correct answer: ${quizData[qIdx].answer}`;
                feedbackEl.style.color = '#c62828';
            }
    });

    // Hide all questions
    questions.forEach(q => q.style.display = 'none');

    // Show score page
    let scorePage = document.getElementById('scorePage');
    if (!scorePage) {
        scorePage = document.createElement('div');
        scorePage.id = 'scorePage';
        scorePage.className = 'score-page';
        document.getElementById('quiz').appendChild(scorePage);
    }
    scorePage.style.display = 'flex';

    const percentage = (score / quizData.length) * 100;
    scorePage.style.backgroundColor = percentage >= 70 ? '#c8e6c9' : '#ffcdd2';
    let extraMsg = '';
    if (percentage === 100) {
        extraMsg = 'iloveyoumoree baby koo galing galing talaga';
    } else if (percentage > 80) {
        extraMsg = 'kunti nalang ma perfect mo po yan baby ko';
    } else if (percentage >= 75) {
        extraMsg = 'galing naman ng baby kooo';
    } else if (percentage >= 50) {
        extraMsg = 'kaya mo yan baby';
    }
    scorePage.innerHTML = `<div style="font-weight:700;font-size:1.2rem;margin-bottom:8px;">Your score: ${score}/${quizData.length} (${percentage.toFixed(2)}%)</div>`
        + (extraMsg ? `<div class="encouragement">${extraMsg}</div>` : '')
        + `<button class="retry-btn" onclick="resetQuiz()" style="margin-top:18px;display:inline-block;">Try Again</button>`;

    // Hide navigation
    document.querySelector('.submit-btn').style.display = 'none';
    document.getElementById('nextBtn').style.display = 'none';
    document.getElementById('prevBtn').style.display = 'none';
}

function nextQuestion() {
    if (currentQuestion < quizData.length - 1) {
        const questions = document.querySelectorAll('.question-container');
        questions[currentQuestion].classList.remove('active');
        currentQuestion++;
        questions[currentQuestion].classList.add('active');
        updateNavigation();
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        const questions = document.querySelectorAll('.question-container');
        questions[currentQuestion].classList.remove('active');
        currentQuestion--;
        questions[currentQuestion].classList.add('active');
        updateNavigation();
    }
}


function updateNavigation() {
    const prevBtn = document.getElementById('prevBtn');
    const submitBtn = document.querySelector('.submit-btn');
    const counter = document.getElementById('questionCounter');
    const progress = document.getElementById('progress');

    prevBtn.disabled = currentQuestion === 0;

    // Only show submit button on last question and if answered
    const answered = currentAnswers[currentQuestion] && currentAnswers[currentQuestion].trim() !== "";
    if (currentQuestion === quizData.length - 1) {
        submitBtn.style.display = 'block';
        submitBtn.disabled = !answered;
    } else {
        submitBtn.style.display = 'none';
    }

    counter.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
    progress.style.width = `${((currentQuestion + 1) / quizData.length) * 100}%`;
    // Hide next button if present
    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn) nextBtn.style.display = 'none';
    prevBtn.style.display = 'block';
}

function resetQuiz() {
    // Shuffle question order for new try
    quizOrder = Array.from({length: quizData.length}, (_, i) => i);
    shuffleArray(quizOrder);
    currentAnswers = new Array(quizData.length).fill("");
    currentQuestion = 0;
    const quizContainer = document.getElementById('quiz');
    quizContainer.innerHTML = '';
    createQuiz();

    // Hide score page if present
    const scorePage = document.getElementById('scorePage');
    if (scorePage) scorePage.style.display = 'none';

    document.querySelector('.submit-btn').style.display = 'none';
    // Hide all retry buttons except the one on score page
    document.querySelectorAll('.retry-btn').forEach(btn => btn.style.display = 'none');
    document.getElementById('nextBtn').style.display = 'block';
    document.getElementById('prevBtn').style.display = 'block';
    updateNavigation();
}

// Initialize the quiz when the page loads
window.onload = function() {
    quizOrder = Array.from({length: quizData.length}, (_, i) => i);
    shuffleArray(quizOrder);
    currentAnswers = new Array(quizData.length).fill("");
    createQuiz();
};
