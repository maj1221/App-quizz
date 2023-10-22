const quizdisplay = document.getElementById("display");
let timeLeft =document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countofQuestion = document.querySelector(".number-of-question");
let wrapper = document.getElementById("wrapper");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.getElementById("score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.getElementById("start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0; 
let count =   11;
let countdown;

//Question and Options array
//add question , options and correct options inbelow format
  const quizArray =[
    {
        id:"0",
        question:"What dose HTML for?",
        options:["Hyper Text Markup Language","High Technology Modern Language","Hyperlink and Texe Markup Language","yyhhhkll","uhbvtyyyy" ],
        correct:"Hyper Text Markup Language"
    },
    {
        id:"1",
        question:"Which HTML tag is used to creat a hyperlink?",
        options:["li","a","p","hr"],
        correct:"a"
    },
    {
        
        id:"2",
        question:"Which tag is used to define the structure of an HTML table?",
        options:["table","tr","td","th"],
        correct:"table"
    },
    {
        id:"3",
        question:"Which element is used to define the largest heading?",
        options:["head","h6","heading","h1"],
        correct:"h1"
    },
    {
        id:"4",
        question:"What is the correct HTML elemet for creting an unordered list?",
        options:["ol","list","ul","li"],
        correct:"ul"
    }
];

// restart game
restart.addEventListener("click",() =>{
initial(); //call initial funcrion
wrapper.classList.remove("hide");
scoreContainer.classList.add("hide");
});

 //Next Button
 nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        //incerment questionCount
    questionCount+= 1;
    //if last question
    if(questionCount==quizArray.length) {
        //hide question container and display score
        wrapper.classList.add("hide");
        scoreContainer.classList.remove("hide");
        // User Score
    userScore.innerHTML="your Score is" + scoreCount + "out of" + questionCount ;
    }
       else {
        //display questionCount
        countofQuestion.innerHTML = questionCount + 1 + "of" + quizArray.length + " Quesiton";
        //Display Quiz
        quizDisplay(questionCount);
        //count=11(so that it starts with 10)
        count=11;
        //clear interval for next question
        clearInterval(countdown);
        //display timer (start countdown)
        timerDisplay();
    }
 })
);

//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if(count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};
//Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container_mid");
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
}

//Quiz Creation

function quizCreator() {
   //randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
   //generate quiz
    for(let i of quizArray) {
        //randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        //quiz card creation
        let div = document.createElement("div");
        div.classList.add("container_mid","hide");
        //question number
        countofQuestion.innerHTML = 1 + "of" + quizArray.length + "Question";
        //question
        let question_div = document.createElement("p");
        question_div.classList.add("question");
        question_div.innerHTML = i.question;
        div.appendChild(question_div);
       //options
        div.innerHTML +=`
        <button class="option-div" onclick="checker(this)>${i.options[0]}</button>
        <button class="option-div" onclick="checker(this)>${i.options[1]}</button>
        <button class="option-div" onclick="checker(this)>${i.options[2]}</button>
        <button class="option-div" onclick="checker(this)>${i.options[3]}</button>
        `;
        quizContainer.appendChild(div);
    }
}
    // check Option Correct or Not

    function checker(userOption) {
        let userSolution = userOption.innerText;
        let question = document.getElementsByClassName("container_mid")[questionCount];
        let option = question.querySelectorAll(".option-div");
        if(userSolution===quizArray[questionCount].correct) {
            userOption.classList.add("correct");
            scoreCount++;
        } else{
            userOption.classList.add("inCorrect");
            option.forEach((element) => {
                if(element.innerText == quizArray[questionCount].correct) {
                    element.classList.add("correct");
                } 
            });
        }
        clearInterval(countdown);
        option.forEach((element) => {
            element.disabled = true;
        });
    }

    //Initial Function Code

    function initial() {
        quizContainer.innerHTML = "";
        questionCount = 0;
        scoreCount = 0;
        clearInterval(countdown);
        count=11;
        timerDisplay();
         quizCreator();
        quizDisplay(questionCount);
    }
    // Start Button Code
    startButton.addEventListener ("click", () => {
        startScreen.classList.add("hide");
          wrapper.classList.remove("hide");
      
        initial();
    });

    window.onload=() => {
          startScreen.classList.remove("hide");
          wrapper.classList.add("hide");
    };