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

    let categories: string | any[]; // Array of topics
    let chosenCategory: string | any[]; // Selected category
    let word: string | any[]; // Selected word
    let guess; // Guess
    let guesses: { innerHTML: any }[] = []; // Stored guesses
    let lives: number; // Lives
    let counter: number; // Count correct guesses
    let space: number; // Number of spaces in word '-'

    // Get elements
    const showLives: HTMLElement = document.getElementById("mylives") as HTMLElement;
    const showClue: HTMLElement = document.getElementById("clue") as HTMLElement;
    const myButtons: HTMLElement = document.getElementById("buttons") as HTMLElement;
    const categoryName: HTMLElement = document.getElementById("categoryName") as HTMLElement;
    const myStickman: HTMLElement = document.getElementById("stickman") as HTMLElement;
    const wordHolder: HTMLElement = document.getElementById("hold") as HTMLElement;
    const correct: HTMLElement = document.createElement("ul") as HTMLElement;
    

    // create alphabet ul
    const buttons = () => {
        let letters = document.createElement("ul");
        for (var i = 0; i < alphabet.length; i++) {
            letters.id = "alphabet";
            const list = document.createElement("li");
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
            categoryName.innerHTML = "The Chosen Category Is Premier League Football Teams";
        } else if (chosenCategory === categories[1]) {
            categoryName.innerHTML = "The Chosen Category Is Films";
        } else if (chosenCategory === categories[2]) {
            categoryName.innerHTML = "The Chosen Category Is Cities";
        }
    };

    // Create guesses ul
    const result = function () {
        for (var i = 0; i < word.length; i++) {
            correct.setAttribute("id", "my-word");
            guess = document.createElement("li");
            guess.setAttribute("class", "guess");
            if (word[i] === "-") {
                guess.innerHTML = "-";
                space = 1;
            } else {
                guess.innerHTML = "_";
            }
            guesses.push(guess);
            wordHolder.appendChild(correct);
            correct.appendChild(guess);
        }
    };

    // Show lives
    const comments = function () {
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
    const canvas = function () {
        const context = myStickman.getContext("2d");
        context.beginPath();
        context.strokeStyle = "#fff";
        context.lineWidth = 2;
    };

    const head = function () {
        const context = myStickman.getContext("2d");
        context.beginPath();
        context.arc(60, 25, 10, 0, Math.PI * 2, true);
        context.stroke();
    };

    const draw = function ($pathFromx: any, $pathFromy: any, $pathTox: any, $pathToy: any) {
        context.moveTo($pathFromx, $pathFromy);
        context.lineTo($pathTox, $pathToy);
        context.stroke();
    };

    const frame1 = function () {
        draw(0, 150, 150, 150);
    };

    const frame2 = function () {
        draw(10, 0, 10, 600);
    };

    const frame3 = function () {
        draw(0, 5, 70, 5);
    };

    const frame4 = function () {
        draw(60, 5, 60, 15);
    };

    const torso = function () {
        draw(60, 36, 60, 70);
    };

    const rightArm = function () {
        draw(60, 46, 100, 50);
    };

    const leftArm = function () {
        draw(60, 46, 20, 50);
    };

    const rightLeg = function () {
        draw(60, 70, 100, 100);
    };

    const leftLeg = function () {
        draw(60, 70, 20, 100);
    };

    let drawArray = [
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
    const check = function () {
        list.onclick = function () {
            var geuss = this.innerHTML;
            this.setAttribute("class", "active");
            this.onclick = null;
            for (var i = 0; i < word.length; i++) {
                if (word[i] === geuss) {
                    guesses[i].innerHTML = geuss;
                    counter += 1;
                }
            }
            var j = word.indexOf(geuss);
            if (j === -1) {
                lives -= 1;
                comments();
                animate();
            } else {
                comments();
            }
        };
    };

    // Play
    const play = function () {
        categories = [
            ["everton", "liverpool", "swansea", "chelsea", "hull", "manchester-city", "newcastle-united"],
            ["alien", "dirty-harry", "gladiator", "finding-nemo", "jaws"],
            ["manchester", "milan", "madrid", "amsterdam", "prague"]
        ];

        chosenCategory = categories[Math.floor(Math.random() * categories.length)];
        word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
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
        canvas();
    };

    play();

    // Hint
    hint.onclick = function () {
        const hints = [
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

        var categoryIndex = categories.indexOf(chosenCategory);
        var hintIndex = chosenCategory.indexOf(word);
        showClue.innerHTML = "Clue: - " + hints[categoryIndex][hintIndex];
    };


    // Reset
    document.getElementById("reset").onclick = function () {
        correct.parentNode.removeChild(correct);
        letters.parentNode.removeChild(letters);
        showClue.innerHTML = "";
        context.clearRect(0, 0, 400, 400);
        play();
    };
};
