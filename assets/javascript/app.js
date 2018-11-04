var rightAnswers = 0;
var wrongAnswers = 0;
var unAnswered = 0;

var arrayIndex = 0;

var TimeoutId;



var triviaArray = [
    {
        question: "Which is NOT one of Gandalf's names?",
        answers: ["Olorin", "Mithrandir", "Melkor", "Stormcrow"],
        correctAnswer: "Melkor",
        image: "assets/images/gandalf.gif",
    },

    {
        question: "What was the name of Frodo Baggins' sword?",
        answers: ["Sting", "Anduril", "Glamdring", "Ironfoot"],
        correctAnswer: "Sting",
        image: "assets/images/frodo.gif",
    },
    
    {
        question: "Before the One Ring, Sauron created Three Rings for the Elven race. Which one of these was NOT a Ring?",
        answers: ["Narya", "Nenya", "Vilya", "Maiar"],
        correctAnswer: "Maiar",
        image: "assets/images/sauronforge.gif",
    },

    {
        question:"Sauron gave Seven Rings to a particular race in Middle-Earth. Who were they?",
        answers: ["Men", "Dwarf-kings", "Hobbits", "Trolls"],
        correctAnswer: "Dwarf-kings",
        image: "assets/images/frodo.gif",
    },

    {
        question: "Aragorn's heritage lies in which country in Middle-earth?",
        answers: ["Rohan", "Rivendell", "Bree", "Gondor"],
        correctAnswer: "Gondor",
        image: "assets/images/dwarf.gif",
    },

    {
        question: "Before he became corrupted, what was Gollum's real name?",
        answers: ["Smeagol", "Deagol", "Peregrin", "Bilbo"],
        correctAnswer: "Smeagol",
        image: "assets/images/smeagol.gif",
    },

    {
        question: "The One Ring is inscripted with what Middle-earth WRITTEN language?",
        answers: ["Westernesse", "Dwarvish", "Elvish", "Goblin alphabet"],
        correctAnswer: "Elvish",
        image: "assets/images/elvishscript.gif",
    },

    {
        question: "During the War of the Ring, who decapitated the Witch-king of Angmar?",
        answers: ["Meriadoc Brandybuck", "Boromir", "Legolas", "Eowyn"],
        correctAnswer: "Eowyn",
        image: "assets/images/eowyn.gif",
    },

];


// === Re-attempting to re-write the functions here 11/3/18 ===============================

var counter = 21;
var intervalId;

function reset() {
    counter = 21;
}



function displayQuestion() {
   clearInterval(intervalId);
   intervalId = setInterval(getQuestion, 1000);
};



function getQuestion() {

    // Counter decrement and console log.
   counter--;
//    console.log(counter);

    // This shows what happens if the user does not select anything and time runs out:
    $("#quiz-area").html("<h3>Time remaining: " + counter + "</h3>" + "<br>");
        if(counter === 0) {
        stop();
        reset();
        alert("Sorry you've run out of time!")
        arrayIndex++;

    // This will create new DIV to display the correct answer gif!
       var imageUrl = triviaArray[arrayIndex].image;
       var answerImage = $("<img>");
       answerImage.attr("src", imageUrl);
       $("#quiz-area").html("<h2> The correct answer is: <br>" + triviaArray[arrayIndex].correctAnswer + "</h2>");
       $("#quiz-area").append(answerImage);

    // Increments the answers user did not answer:
       unAnswered++;

       clearTimeout(TimeoutId);
       TimeoutId = setTimeout(displayQuestion,3000);
       
    };

        // This should be displaying our questions and answers dynamically. *****
        var currentQuestion = triviaArray[arrayIndex].question;
        var currentDiv = $("<div>");
    
        for(var i = 0; i < triviaArray[arrayIndex].answers.length; i++){
            currentDiv.append("<button class='possibleanswers'>" + triviaArray[arrayIndex].answers[i] + "</button>");
        };  
     
         $("#quiz-area").append("<h2>"+ currentQuestion + "</h2>");
         $("#quiz-area").append( currentDiv);


        // On-click event when the answer buttons are clicked.
        $(".possibleanswers").on("click", function() {
            clearTimeout(TimeoutId);
            TimeoutId = setTimeout(displayQuestion,5000);

            // Check answer for wins/loss function now.
            var possibleAnswer = $(this).text();
            if(possibleAnswer === triviaArray[arrayIndex].correctAnswer) {
                arrayIndex++;
                alert("That is correct!");
                rightAnswers++;


            } else {
                arrayIndex++;
                alert("Sorry that is NOT correct!");
                $("#quiz-area").empty();
                $("#quiz-area").html("<h2> The correct answer is: <br>" + triviaArray[arrayIndex].correctAnswer + "</h2>");
                $("#quiz-area").append(answerImage);
                wrongAnswers++;

                
            }
        });
};

function stop() {
   clearInterval(intervalId);
   intervalId = setInterval(displayQuestion,1000);
};


/* --- IMPORTANT!!! PLEASE READ ---
- I DIDN'T HAVE TIME TO CODE THE DIV THAT WOULD SHOW ALL THE RESULTS.
- ALSO, THE QUESTION/ANSWER WOULD NOT GO AWAY EVEN WHEN THE CORRECT ANSWER AND GIF WERE BEING DISPLAYED.
- I NEED MORE TIME TO DEBUG THAT, AND FIGURE OUT WHY MY "INCORRECT ANSWER" EVENT SHOWS THE WRONG,
SEEMINGLY RANDOM, CORRECT ANSWER. ----- */

// =========== Call gameplay functions here. =====================

$("#start").on("click", function() {
    displayQuestion();
});
