
'use strict';
const STORE = {
  quizStarted: false,
  questionNumber: 0,
  score: 0,
  view:"home",
  
  questions: [
    {
      question: 'What is Kirk Gibson remembered for?',
      answers: [
        'pitched no hitter',
        'won the 500 miles of Indianapolis',
        'walk off homerun in world series',
        "Won first place in 400 meters"
      ],
      correctAnswer: "walk off homerun in world series"
    },
    {
      question: 'How many points does a touchdown hold?',
      answers: [
        '7 points',
        '6 points',
        '1 point',
        '3 points'
      ],
      correctAnswer: '6 points'
    },
    {
      question: 'What sport event is held once a year on memorial day?',
      answers: [
        'Baseball memorial game edition',
        'Indianapolis 500',
        'Bow target shooting',
        'Baseball All star game'
      ],
      correctAnswer: 'Indianapolis 500'
    },
    {
      question: 'What NFL team was originally called the New York Titans?',
      imgSrc : "img/blackpanther.png",
      answers: [
        'Oilers',
        'Steelers',
        'Saints',
        'Jets'
      ],
      correctAnswer: 'Jets'
    },
     {
      question: 'What do the rings in the olympics logo represent?',
      answers: [
        'The main sports',
        'The number of decades played',
        'The continents of the world',
        'Doesnt have a particular meaning'
      ],
      correctAnswer: 'The continents of the world'
    },
    {
      question: 'The team Utah Jazz was originally from...?',
      answers: [
        'Utah',
        'New Orleans',
        'Milwaukee',
        'Los Angeles'
      ],
      correctAnswer: 'New Orleans'
    },
    {
      question: 'What city did the Redskins played before they moved to Washington?',
      answers: [
        'Houston',
        'Oklahoma',
        'Arizona',
        'Boston'
      ],
      correctAnswer: 'Boston'
    },
    {
      question: 'Which player was known as "refrigerator?',
      answers: [
        'Fridge Scott',
        'Adam Chaser',
        'William Perry',
        'Brett Favre'
      ],
      correctAnswer: 'William Perry'
    },
    {
      question: 'Who was the first MLB player to pitch over 100 mph?',
      answers: [
        'Roger Clemens',
        'Nolan Ryan',
        'Tom Seaver',
        'Dwight Gooden'
      ],
      correctAnswer: 'Nolan Ryan'
    },
    {
      question: 'What NFL player returned a fumble 66 yards to the wrong end zone?',
      answers: [
        'Deion Sanders',
        'Deltha Oneal',
        'Leon Lett',
        'Jim Marshall'
      ],
      correctAnswer: 'Jim Marshall'
    }
         
  ],
questionNumber: 0,
  currentScore: 0,
  quizStart: false
};

function questionTracker() {
  STORE.questionNumber++;
}

function scoreTracker() {
  STORE.currentScore++;
}
function homePage() {
  
  const homePageHTML = 
  `<header role="banner" aria-live="polite">
  <h1 class="title-homepage">Sports knowledge trivia</h1>
  <h2 class="secondary-text">Dare to test your sports IQ and click below</h2>
  </header>
  <main id="home-page" aria-live="polite">
  <form id="start-page">
  <fieldset id ="starter-button">
  <input type="button" id="start-quiz" aria-label="Start Quiz Button" value="Take the challenge!"></input>
  </fieldset>
  </form> 
  </main>`

  $('body').html(homePageHTML);
}

function resultPage(){
  
  const resultPageHTML = 
  `<header role="banner" aria-live="polite">
  <h1 class="title-results">Final Results</h1>
  <h2 class="final-score">Your final score was ${STORE.currentScore} out of 10!</h2>`
  
  const restartButton = 
  `
  <main id="results-page" aria-live="polite">
  <form id="end-page">
  <fieldset id="restart-button">
  <input type="button" id="restart-quiz" aria-label="Restart Quiz Button" value="Click to Try Again!"></input>
  </fieldset>
  </form>
  </main>`

  if (STORE.currentScore >= 5) {
    $('body').html(resultPageHTML + `<h3 class="above-3"><img class="finalpics" src="https://media3.giphy.com/media/l4JySuIpxwHHSj6Eg/200w.webp?cid=ecf05e47qlst642hywbffxlw124a1sshevjfss0c8okxqnge&rid=200w.webp&ct=g"/>You got some sports skills congrats</h3></header>` + restartButton);
  }
  else if (STORE.currentScore < 5) {
    $('body').html(resultPageHTML + `<h3 class="below-3"><img class="losepics" src="https://media3.giphy.com/media/b1WAqQDwCohzTDUeJz/200w.webp?cid=ecf05e47ilqx5erczkoz5hjb6o466vuxpi2s72e65wxg07y8&rid=200w.webp&ct=g"/>really? :( </h3></header>` + restartButton);
  }
}

function questionGenerator() {
  $("body").addClass("question").removeClass("home")
  
  const questionText = 
  `<main class = "main-quiz" aria-live="polite">
  <form id="quiz-form">
  <fieldset id="quiz-questions-answers">
  <p>Time left: <span class="time">10s</span><p/>
  <legend id="question-text">${STORE.questions[STORE.questionNumber].question}</legend>`
  

  const answerText = STORE.questions[STORE.questionNumber].answers.map(answer => {
    return `
    <ul>
    <li>
    <input type="radio" name="answer-selections" aria-label="Select Answer" value="${answer}"><label for=${answer}>${answer}</label>
    </input>
    </li>
    </ul>`
  }); 

  const quizButtons = 
  `<input type="button" id="next-question" aria-label="Next Question Button" value="Next Question"></input>
  <input type="button" id="submit-button" aria-label="Submit Answer Button" value="Submit Answer"></input>
  <input type="button" id="show-results" aria-label="Show Results Button" value="How did I do?!"></input>`

  const infoTrackers = 
  `
  <p id="question-tracker">Question ${STORE.questionNumber + 1} out of 10</p>
  <p id="score-tracker">Your score so far is: ${STORE.currentScore} out of ${STORE.questionNumber}</p>
  </fieldset>
  </form>
  </main>`

$('body').html(questionText + answerText.join('') + quizButtons + infoTrackers)
$("#next-question").hide(); 
$("#show-results").hide();
}

function buttonSwitch() {
  
  $("#unanswered").remove();
  $("#submit-button").hide();
  
  if (STORE.questionNumber < 10) {
      $("#next-question").show();
    }
  else if (STORE.questionNumber === 10) {
    $("#show-results").show();
  }
}

function answerChecker() {
  
  $("#unanswered").remove();
  const answerChoice = $("input[name='answer-selections']:checked").val();
  if (answerChoice === undefined) {
    $("#next-question").before(`<p id="unanswered">No answer selected.</p>`);
  }
  else if (answerChoice === STORE.questions[STORE.questionNumber].correctAnswer) {
    questionTracker();
    scoreTracker(); 
    buttonSwitch();
    $("#next-question").before(`<p id="correct"> <img src="https://media4.giphy.com/media/3o7btViiCGp5R4UcSs/giphy.webp?cid=ecf05e475jqfhdq297qhhtnlsv78urldeh0vd7ucshxabn55&rid=giphy.webp&ct=g"/>Cool! Your score increased to ${STORE.currentScore} out of ${STORE.questionNumber}.</p>`)
  }
  else if (answerChoice !== STORE.questions[STORE.questionNumber].correctAnswer) {
    questionTracker(); 
    buttonSwitch(); 
    $("#next-question").before(`<p id="incorrect"> <img src="https://media0.giphy.com/media/26BoDDpOKRCnbBela/200w.webp?cid=ecf05e47v2vd69tkpscxze5mp6bgcr4enjg3ega9batjw5cy&rid=200w.webp&ct=g"/>Bummer! you should've picked: ${STORE.questions[STORE.questionNumber - 1].correctAnswer}. 
    Your score stayed at ${STORE.currentScore} out of ${STORE.questionNumber}.</p>`)
  }
};

function buttonInitialize() {

$(document).on("click", "#start-quiz", function(event) {
    STORE.quizStart = true; 
    quizRender(); 
  }); 

$(document).on("click","#submit-button", function(event) {
  answerChecker();
  });

$(document).on("click","#next-question", function(event) {
  quizRender();
  });

$(document).on("click","#show-results", function(event) {
  quizRender();
  });

$(document).on("click","#restart-quiz", function(event) {
  STORE.quizStart = false;
  STORE.questionNumber = 0;
  STORE.currentScore = 0;
  homePage();
  });

quizRender();
}


function quizRender() {
  
  if (STORE.quizStart === false) {
    homePage();
  }
  else if (STORE.questionNumber >= 0 && STORE.questionNumber < 10) {
    questionGenerator();
  }
  else if (STORE.questionNumber >= 10) {
    resultPage(); 
    scoreTracker();
  }
}



$(buttonInitialize);
