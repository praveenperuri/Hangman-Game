var hangman = {

    isGameOn: false,
    winCount: 0,
    guessCount: 0,
    currentWord: "",
    gameLog: "",
    correctGuess: 0,

    words: ["leopard", "cheetah", "tiger", "lion", "panther", "jaguar", "cat", "bobcat"],
    usedWords: [],
    lettersUsed: [],

    initialize: function() {
        this.winCount = 0;
        this.guessCount = 15;
        this.wordSelector();
        document.getElementById("winp").innerHTML = this.winCount;
        document.getElementById("guessp").innerHTML = this.guessCount;
        this.updateGameLog("GAME ON");


    },

    wordSelector: function() {
        if (this.words.length > 0) {
            this.currentWord = this.words[Math.floor(Math.random() * this.words.length)];
            var indexOfWord = this.words.indexOf(this.currentWord);
            if (indexOfWord > -1) {
                this.words.splice(indexOfWord, 1);
                this.usedWords.push(this.currentWord);
            }

            var hiddenWord = document.getElementById("hiddenWord");
            hiddenWord.value = this.currentWord;
            var word = document.getElementById("word");
            for (i = 0; i < this.currentWord.length; i++) {
                //var listitem = "<li id=\""+i+"\">" + " _ " + "</li>"; 

                var letter = document.createElement("li");
                letter.id = this.currentWord.charAt(i) + i;
                letter.innerHTML = " _ ";
                word.appendChild(letter);
            }
        } else {
            //game over
        }

    },

    checkEntry: function(input) {
        var entry = input.toLowerCase();
        var isHit = false;
        var isSameletter = false;
        var alreadyGuessed = false;

        if (this.strCheck(entry)) {

            for (i = 0; i < this.currentWord.length; i++) {
                if (input === this.currentWord.charAt(i)) {
                    var id = this.currentWord.charAt(i) + i;
                    var listitem = document.getElementById(id);
                    if (listitem.innerHTML != input && listitem.innerHTML === " _ ") {
                        listitem.innerHTML = this.currentWord.charAt(i);
                        isHit = true;
                    } else if (listitem.innerHTML === input) {
                        alert("You got this letter already..");
                        isSameletter = true;
                    }
                    break;
                }
            }

            if (!isSameletter) {

                if (isHit) {
                    this.updateGameLog("You are doing well. Keep going !!");
                    if (this.correctGuess === this.currentWord.length) {
                        this.winCount++;
                        this.updateWinCount(this.winCount);
                        this.updateGuessCount(0);
                        var continueGame = prompt("Your Score is: [" + this.winCount + "] Press OK to contiue, Cancel to Stop. ");
                        if (continueGame) {
                            this.wordSelector();
                        }
                    } else {
                        this.correctGuess++;
                    }
                } else {

                    for (i = 0; i < this.lettersUsed.length; i++) {
                        if (entry === this.lettersUsed[i]) {
                            alert("You made this guess already..");
                            alreadyGuessed = true;
                            break;
                        }
                    }

                    if (!alreadyGuessed) {
                        this.guessCount = this.guessCount - 1;
                        this.updateGuessCount(this.guessCount);
                        this.lettersUsed.push(entry);
                        var entryp = document.getElementById("entries");
                        entryp.innerHTML = "Letters Used: ";
                        this.lettersUsed.forEach(function printArray(item) {
                            entryp.innerHTML = entryp.innerHTML + " [" + item + "] ";
                        });

                        this.updateGameLog("Try Again !! ");
                    }
                }
            }

        } else {
            alert("Please key in ONLY Alphabets !!");
        }

    },

    restart: function() {
        return this.initialize();
    },

    updateGameLog: function(str) {
        this.gameLog = str;
        document.getElementById("log").innerHTML = this.gameLog;
    },

    strCheck: function alphanumeric(inputtxt) {
        var lettersOnly = /^[a-zA-Z]+$/;
        // if (inputtxt.value.match(lettersOnly)) {
        if (!/[^a-zA-Z]/.test(inputtxt)) {
            return true;

        } else {
            return false;
        }
    },

    updateWinCount: function(int) {
        this.winCount = int;
        document.getElementById("winp").innerHTML = this.winCount;

    },

    updateGuessCount: function(int) {
        this.guessCount = int;
        document.getElementById("guessp").innerHTML = this.guessCount;

    }


};

document.onkeyup = function(event) {

    if (hangman.isGameOn) {
        var key = event.key;
        hangman.checkEntry(key);
    } else {
        hangman.isGameOn = true;
        hangman.initialize();
        // var btnRestart = document.getElementById("btnRestart");
        // btnRestart.addEventListener("click", hangman.restart());

    }
};

hangman.isGameOn = false;
hangman.updateGameLog("Press any key to start the game.");
var btnRestart = document.getElementById("btnRestart");
btnRestart.addEventListener("click", function() { hangman.restart() });
