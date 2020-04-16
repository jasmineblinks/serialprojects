
// function generateQuiz(questions, quizContainer, resultsContainer, submitButton){
//     var myQuestions = [
//         {
//             question: "What is 10/2?",
//             answers: {
//                 a: '3',
//                 b: '5',
//                 c: '115'
//             },
//             correctAnswer: 'b'
//         },
//         {
//             question: "What is 30/3?",
//             answers: {
//                 a: '3',
//                 b: '5',
//                 c: '10'
//             },
//             correctAnswer: 'c'
//         }
//     ];

// 	function showQuestions(questions, quizContainer){
//         // we'll need a place to store the output and the answer choices
//         var output = [];
//         var answers;
    
//         // for each question...
//         for(var i=0; i<questions.length; i++){
            
//             // first reset the list of answers
//             answers = [];
    
//             // for each available answer to this question...
//             for(letter in questions[i].answers){
    
//                 // ...add an html radio button
//                 answers.push(
//                     '<label>'
//                         + '<input type="radio" name="question'+i+'" value="'+letter+'">'
//                         + letter + ': '
//                         + questions[i].answers[letter]
//                     + '</label>'
//                 );
//             }
    
//             // add this question and its answers to the output
//             output.push(
//                 '<div class="question">' + questions[i].question + '</div>'
//                 + '<div class="answers">' + answers.join('') + '</div>'
//             );
//         }
    
//         // finally combine our output list into one string of html and put it on the page
//         quizContainer.innerHTML = output.join('');
//     }

// 	function showResults(questions, quizContainer, resultsContainer){
	
//         // gather answer containers from our quiz
//         var answerContainers = quizContainer.querySelectorAll('.answers');
        
//         // keep track of user's answers
//         var userAnswer = '';
//         var numCorrect = 0;
        
//         // for each question...
//         for(var i=0; i<questions.length; i++){
    
//             // find selected answer
//             userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
            
//             // if answer is correct
//             if(userAnswer===questions[i].correctAnswer){
//                 // add to the number of correct answers
//                 numCorrect++;
                
//                 // color the answers green
//                 answerContainers[i].style.color = 'lightgreen';
//             }
//             // if answer is wrong or blank
//             else{
//                 // color the answers red
//                 answerContainers[i].style.color = 'red';
//             }
//         }
    
//         // show number of correct answers out of total
//         resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
//     }

// 	// show the questions
// 	showQuestions(questions, quizContainer);

// 	// when user clicks submit, show results
// 	submitButton.onclick = function(){
// 		showResults(questions, quizContainer, resultsContainer);
//     }
// }
// var quizContainer = document.getElementById('quiz');
// var resultsContainer = document.getElementById('results');
// var submitButton = document.getElementById('submit');
// generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);
function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}
 
Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}
 
Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }
 
    this.questionIndex++;
}
 
Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}
 
 
function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}
 
Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}
 
 
function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;
 
        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }
 
        showProgress();
    }
};
 
function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};
 
 
function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};
 
function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};
 
// create questions here
var questions = [
    new Question("Who is Teencoders Port Harcourt Manager?", ["Ms. Chinyere", "Ms. Ere","Mrs. Ibe", "Ms. ESther"], "Ms. Chinyere"),
    new Question("The softwares for next term are all except?", ["Comic live", "Javascript","Constuct2", "HTML"], "HTML"),
    new Question("Hyper Text Markup Language Stand For?", ["JavaScript", "XHTML","CSS", "HTML"], "HTML"),
    new Question("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
    new Question("Which is not a JavaScript Framework?", ["Python Script", "JQuery","Django", "NodeJS"], "Django"),
    new Question("Which is used for Connect To Database?", ["PHP", "HTML", "JS", "All"], "PHP"),
    new Question("Cascading Style Sheet Stands For", ["CSS", "Graphic Design", "SEO & Development", "All"], "CSS")
];
 
// create quiz
var quiz = new Quiz(questions);
 
// display quiz
populate();