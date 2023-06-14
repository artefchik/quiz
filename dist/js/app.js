(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
    };
    let bodyUnlock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = "0px";
                }
                body.style.paddingRight = "0px";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            }
            body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function menuInit() {
        if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
            if (bodyLockStatus && e.target.closest(".icon-menu")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
            }
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    let questions = [ {
        numb: 1,
        question: "Какое растение существует на самом деле?",
        answer: "B.Лох индийский",
        options: [ "A.Лох чилийский", "B.Лох индийский", "C.Лох греческий", "D.Лох русский" ]
    }, {
        numb: 2,
        question: "Какой город объявлен официальной родиной русского Деда Мороза?",
        answer: "C.Великий Устюг",
        options: [ "A.Малая Вишера", "B.Вышний Волочек", "C.Великий Устюг", "D.Нижний Новгород" ]
    }, {
        numb: 3,
        question: "Что проводит боксер, наносящий удар противнику снизу?",
        answer: "A.Апперкот",
        options: [ "A.Апперкот", "B.Свинг", "C.Хук", "D.Джэб" ]
    }, {
        numb: 4,
        question: "Как называется ближайшая к Земле звезда?",
        answer: "B.Солнце",
        options: [ "A.Проксиома Центавра", "B.Солнце", "C.Полярная", "D.Сириус" ]
    }, {
        numb: 5,
        question: "Кого нет среди смешариков?",
        answer: "C.Коня",
        options: [ "A.Барана", "B.Свиньи", "C.Коня", "D.Лося" ]
    } ];
    const startGameBtn = document.querySelector(".content__button");
    const popup = document.querySelector(".popup");
    const exitBtn = document.querySelector(".popup__button_exit");
    const page = document.querySelector(".page");
    const continueBtn = document.querySelector(".popup__button_continue");
    const quizSection = document.querySelector(".quiz");
    const quizContent = document.querySelector(".quiz__content");
    const resultSection = document.querySelector(".result");
    const againBtn = document.querySelector(".result__button_again");
    const homeBtn = document.querySelector(".result__button_home");
    startGameBtn.addEventListener("click", (() => {
        popup.classList.add("active");
        page.classList.add("active");
    }));
    exitBtn.addEventListener("click", (() => {
        popup.classList.remove("active");
        page.classList.remove("active");
    }));
    continueBtn.addEventListener("click", (() => {
        quizSection.classList.add("active");
        popup.classList.remove("active");
        page.classList.remove("active");
        quizContent.classList.add("active");
        showQuestions(0);
        questionCounter(1);
    }));
    againBtn.addEventListener("click", (() => {
        quizContent.classList.add("active");
        resultSection.classList.remove("active");
        questionCount = 0;
        questionNumber = 1;
        userScore = 0;
        showQuestions(questionCount);
        questionCounter(questionNumber);
        nextButton.classList.remove("active");
        scoreCounter();
    }));
    homeBtn.addEventListener("click", (() => {
        quizSection.classList.remove("active");
        resultSection.classList.remove("active");
        questionCount = 0;
        questionNumber = 1;
        userScore = 0;
        showQuestions(questionCount);
        questionCounter(questionNumber);
        nextButton.classList.remove("active");
        scoreCounter();
    }));
    const nextButton = document.querySelector(".footer-quiz__button");
    nextButton.onclick = () => {
        if (questionCount < questions.length - 1) {
            questionCount++;
            showQuestions(questionCount);
            questionNumber++;
            questionCounter(questionNumber);
            nextButton.classList.remove("active");
        } else {
            console.log("all");
            showResult();
        }
    };
    const answerList = document.querySelector(".list-questions");
    let questionCount = 0;
    let questionNumber = 1;
    let userScore = 0;
    function showQuestions(index) {
        const questionTitle = document.querySelector(".quiz__question");
        questionTitle.textContent = `${questions[index].numb}. ${questions[index].question}`;
        let optionTag = `<div class="list-questions__answer"><span>${questions[index].options[0]}</span></div>\n                     <div class="list-questions__answer"><span>${questions[index].options[1]}</span></div>\n                     <div class="list-questions__answer"><span>${questions[index].options[2]}</span></div>\n                     <div class="list-questions__answer"><span>${questions[index].options[3]}</span></div>`;
        answerList.innerHTML = optionTag;
        const answer = document.querySelectorAll(".list-questions__answer");
        for (let i = 0; i < answer.length; i++) answer[i].addEventListener("click", (() => {
            let userAnswer = answer[i].textContent;
            let correctAnser = questions[questionCount].answer;
            let allAnswer = answerList.children.length;
            if (userAnswer == correctAnser) {
                answer[i].classList.add("corrected");
                for (let i = 0; i < allAnswer; i++) answerList.children[i].classList.add("disabled");
                userScore++;
                scoreCounter();
            } else {
                answer[i].classList.add("wrong");
                for (let i = 0; i < allAnswer; i++) {
                    if (answerList.children[i].textContent == correctAnser) answerList.children[i].setAttribute("class", "list-questions__answer corrected");
                    answerList.children[i].classList.add("disabled");
                }
            }
            nextButton.classList.add("active");
        }));
    }
    function questionCounter(index) {
        const questionTotal = document.querySelector(".footer-quiz__total");
        questionTotal.textContent = `${index} of ${questions.length} Questions`;
    }
    function scoreCounter() {
        const scoreText = document.querySelector(".header-quiz__score");
        scoreText.textContent = `Score ${userScore} / ${questions.length}`;
    }
    function showResult() {
        quizContent.classList.remove("active");
        resultSection.classList.add("active");
        const resultText = document.querySelector(".result__text");
        resultText.textContent = `Your score ${userScore} / ${questions.length}`;
        const resultCircular = document.querySelector(".result__percent");
        const resultValue = document.querySelector(".result__value");
        let startProgressValue = -1;
        let endProgressValue = userScore / questions.length * 100;
        let speed = 10;
        let progres = setInterval((() => {
            startProgressValue++;
            resultValue.textContent = `${startProgressValue}%`;
            resultCircular.style.background = `conic-gradient(#9933CC ${startProgressValue * 3.6}deg, rgba(255,255,255,0.1) 0deg)`;
            if (startProgressValue == endProgressValue) clearInterval(progres);
        }), speed);
    }
    window["FLS"] = true;
    isWebp();
    menuInit();
})();