"use strict";
window.onload = function () {
    var alphabet = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
    ];
    var categories; // Array of topics
    var chosenCategory; // Selected category
    var word; // Selected word
    var guess; // Guess
    var guesses = []; // Stored guesses
    var lives; // Lives
    var counter; // Count correct guesses
    var space; // Number of spaces in word '-'
    // Get elements
    var showLives = document.getElementById("mylives");
    var showClue = document.getElementById("clue");
    var myButtons = document.getElementById("buttons");
    var categoryName = document.getElementById("categoryName");
    var myStickman = document.getElementById("stickman");
    var wordHolder = document.getElementById("hold");
    var correct = document.createElement("ul");
    var canvas = document.getElementById("canvas");
    // create alphabet ul
    var buttons = function () {
        var letters = document.createElement("ul");
        for (var i = 0; i < alphabet.length; i++) {
            letters.id = "alphabet";
            var list = document.createElement("li");
            list.id = "letter";
            list.innerHTML = alphabet[i];
            check();
            letters.appendChild(list);
            myButtons.appendChild(letters);
        }
    };
    // Select category
    var selectCat = function () {
        if (chosenCategory === categories[0]) {
            categoryName.innerHTML =
                "The Chosen Category Is Premier League Football Teams";
        }
        else if (chosenCategory === categories[1]) {
            categoryName.innerHTML = "The Chosen Category Is Films";
        }
        else if (chosenCategory === categories[2]) {
            categoryName.innerHTML = "The Chosen Category Is Cities";
        }
    };
    // Create guesses ul
    var result = function () {
        for (var i = 0; i < word.length; i++) {
            correct.setAttribute("id", "my-word");
            guess = document.createElement("li");
            guess.setAttribute("class", "guess");
            if (word[i] === "-") {
                guess.innerHTML = "-";
                space = 1;
            }
            else {
                guess.innerHTML = "_";
            }
            guesses.push(guess);
            wordHolder.appendChild(correct);
            correct.appendChild(guess);
        }
    };
    // Show lives
    var comments = function () {
        showLives.innerHTML = "You have " + lives + " lives";
        if (lives < 1) {
            showLives.innerHTML = "Game Over";
        }
        for (var i = 0; i < guesses.length; i++) {
            if (counter + space === guesses.length) {
                showLives.innerHTML = "You Win!";
            }
        }
    };
    // Animate man
    var animate = function () {
        // var drawMe: string | number = lives;
        drawArray[lives]();
    };
    // Hangman
    var canvasFunc = function () {
        var context = canvas.getContext("2d");
        context.beginPath();
        context.strokeStyle = "#fff";
        context.lineWidth = 2;
    };
    var head = function () {
        var canvas = document.createElement("canvas");
        var myStickman = canvas.getContext("2d");
        var context = myStickman;
        context.beginPath();
        context.arc(60, 25, 10, 0, Math.PI * 2, true);
        context.stroke();
    };
    var draw = function ($pathFromx, $pathFromy, $pathTox, $pathToy) {
        var canvas = document.createElement("canvas");
        var context = canvas.getContext("2d");
        context.moveTo($pathFromx, $pathFromy);
        context.lineTo($pathTox, $pathToy);
        context.stroke();
    };
    var frame1 = function () {
        draw(0, 150, 150, 150);
    };
    var frame2 = function () {
        draw(10, 0, 10, 600);
    };
    var frame3 = function () {
        draw(0, 5, 70, 5);
    };
    var frame4 = function () {
        draw(60, 5, 60, 15);
    };
    var torso = function () {
        draw(60, 36, 60, 70);
    };
    var rightArm = function () {
        draw(60, 46, 100, 50);
    };
    var leftArm = function () {
        draw(60, 46, 20, 50);
    };
    var rightLeg = function () {
        draw(60, 70, 100, 100);
    };
    var leftLeg = function () {
        draw(60, 70, 20, 100);
    };
    var drawArray = [
        rightLeg,
        leftLeg,
        rightArm,
        leftArm,
        torso,
        head,
        frame4,
        frame3,
        frame2,
        frame1,
    ];
    // OnClick Function
    var check = function () {
        var list = document.querySelector(".list");
        list.onclick = function () {
            var guess = this.innerHTML;
            this.setAttribute("class", "active");
            this.onclick = null;
            for (var i = 0; i < word.length; i++) {
                if (word[i] === guess) {
                    guesses[i].innerHTML = guess;
                    counter += 1;
                }
            }
            var j = word.indexOf(guess);
            if (j === -1) {
                lives -= 1;
                comments();
                animate();
            }
            else {
                comments();
            }
        };
    };
    // Play
    var play = function () {
        categories = [
            [
                "everton",
                "liverpool",
                "swansea",
                "chelsea",
                "hull",
                "manchester-city",
                "newcastle-united",
            ],
            ["alien", "dirty-harry", "gladiator", "finding-nemo", "jaws"],
            ["manchester", "milan", "madrid", "amsterdam", "prague"],
        ];
        chosenCategory = categories[Math.floor(Math.random() * categories.length)];
        word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
        // @ts-ignore
        word = word.replace(/\s/g, "-");
        console.log(word);
        buttons();
        guesses = [];
        lives = 10;
        counter = 0;
        space = 0;
        result();
        comments();
        selectCat();
        canvasFunc();
    };
    play();
    // Hint
    // @ts-ignore
    hint.onclick = function () {
        var hints = [
            [
                "Based in Mersyside",
                "Based in Mersyside",
                "First Welsh team to reach the Premier Leauge",
                "Owned by A russian Billionaire",
                "Once managed by Phil Brown",
                "2013 FA Cup runners up",
                "Gazza's first club",
            ],
            [
                "Science-Fiction horror film",
                "1971 American action film",
                "Historical drama",
                "Anamated Fish",
                "Giant great white shark",
            ],
            [
                "Northern city in the UK",
                "Home of AC and Inter",
                "Spanish capital",
                "Netherlands capital",
                "Czech Republic capital",
            ],
        ];
        // @ts-ignore
        var categoryIndex = categories.indexOf(chosenCategory);
        // @ts-ignore
        var hintIndex = chosenCategory.indexOf(word);
        showClue.innerHTML = "Clue: - " + hints[categoryIndex][hintIndex];
    };
    // Reset
    // @ts-ignore
    document.getElementById("reset").onclick = function () {
        // @ts-ignore
        correct.parentNode.removeChild(correct);
        // @ts-ignore
        letters.parentNode.removeChild(letters);
        showClue.innerHTML = "";
        // @ts-ignore
        context.clearRect(0, 0, 400, 400);
        play();
    };
};
