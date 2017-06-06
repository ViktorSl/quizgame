/*
--- Let's build a fun quiz game in the console! ---

1. Build a function constructor called Question to describe a question. A question should include:
a) question itself
b) the answers from which the player can choose the correct one (choose an adequate data structure here, array, object, etc.)
c) correct answer (I would use a number for this)

2. Create a couple of questions using the constructor

3. Store them all inside an array

4. Select one random question and log it on the console, together with the possible answers (each question should have a number) (Hint: write a method for the Question objects for this task).

5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of the correct answer such as you displayed it on Task 4.

6. Check if the answer is correct and print to the console whether the answer is correct ot nor (Hint: write another method for this).

7. Suppose this code would be a plugin for other programmers to use in their code. So make sure that all your code is private and doesn't interfere with the other programmers code (Hint: we learned a special technique to do exactly that).

8. After you display the result, display the next random question, so that the game never ends (Hint: write a function for this and call it right after displaying the result)

9. Be careful: after Task 8, the game literally never ends. So include the option to quit the game if the user writes 'exit' instead of the answer. In this case, DON'T call the function from task 8.

10. Track the user's score to make the game more fun! So each time an answer is correct, add 1 point to the score (Hint: I'm going to use the power of closures for this, but you don't have to, just do this with the tools you feel more comfortable at this point).

11. Display the score in the console. Use yet another method for this.
*/


(function () {

    var start = document.querySelector("#start");
    start.addEventListener("click", nextQuestion);

    function Question(question, answers, correct) {
        this.question = question;
        this.answers = answers;
        this.correct = correct;
    };

    Question.prototype.printQuestion = function () {
        console.log(this.question);

        for (var i = 0; i < this.answers.length; i++) {
            console.log(i + ": " + this.answers[i]);
        }
    };

    Question.prototype.checkAnswer = function (ans, callback) {
        var sc = 0;
        if (this.correct == ans) {
            console.log("Yes!!");
            sc = callback(true);
            console.log("Your score: " + sc);
            console.log("-------------------------------------");
        } else {
            console.log("Try again!");
            sc = callback(false);
            console.log("Your score: " + sc);
            console.log("-------------------------------------");
        }
    };

    function score(){
        var sc = 0;
        return function(corect){
            if(corect){
                sc++;
            }
            return sc;
        }
    };
    var keepScore = score();

    var q1 = new Question("What is my name ?", ["Viktor", "Roman", "Ulia"], 0);
    var q2 = new Question("Is JS the best language ?", ["Yes", "no"], 0);
    var q3 = new Question("How many seconds in 1 minute ?", [20, 35, 60], 2);

    var questions = [q1, q2, q3];

    function nextQuestion() {
        var randomQuestion = Math.floor(Math.random() * questions.length);

        questions[randomQuestion].printQuestion();
        var curentAnswer = prompt("what is your answer ?");
        console.log(curentAnswer);

        if (curentAnswer !== "exit") {
            parseInt(curentAnswer);
            questions[randomQuestion].checkAnswer(curentAnswer , keepScore);
            nextQuestion();
        } else {
            console.log("By by");
            return;
        }

    };

})();