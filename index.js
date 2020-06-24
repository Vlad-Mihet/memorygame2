var difficulties = document.getElementsByClassName('difficultyBlock');
var root = document.getElementById('main');
var colorBlocksCount;
var easy = false;
var medium = false;
var hard = false;
var insane = false;
var guessedCardColor = '#00C49A';
var openedCards = [];
var cardIndexes = [];
var gameBlocks = document.getElementsByClassName('game-block');
var gameCells = document.getElementsByClassName('game-block-content');
var rightPairs;
var analytics = {
    clicks: 0,
    rightClicks: 0,
    wrongClicks: 0,
};

// Play Again Button 

var buttonWrapper = document.createElement('div');
var playAgainButton = document.createElement('button');
playAgainButton.textContent = 'Play Again';
playAgainButton.setAttribute('id', 'play-again-button');
buttonWrapper.setAttribute('id', 'buttonWrapper');
buttonWrapper.appendChild(playAgainButton);

playAgainButton.addEventListener('click', function playAgain() {
    easy = false;
    medium = false;
    hard = false;
    insane = false;
    rightPairs = 0;
    analytics = {
        clicks: 0,
        rightClicks: 0,
        wrongClicks: 0,
    };
    easyDifficultyBlocksValues = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
    mediumDifficultyBlocksValues = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12];
    hardDifficultyBlocksValues = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15];
    insaneDifficultyBlocksValues = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16, 16, 17, 17, 18, 18];
    gameTable.remove();
    document.getElementById('analytics-header').remove();
    document.getElementById('analytics').remove();
    document.getElementById('difficultyChooser').style.display = 'block';
    buttonWrapper.style.display = 'none';
})

/* - Difficulties - */

// Easy Difficulty 

let easyDifficultyBlocksValues = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
document.getElementById('easy').addEventListener('click', () => {
    colorBlocksCount = 16;
    document.getElementById('difficultyChooser').style.display = 'none';
    generateColorBlocks(easyDifficultyBlocksValues);
    rightPairs = 0;
    showCardsAtStart(2000);
    setTimeout(() => {
        gameProcess();
    }, 2000);
});

// Medium Difficulty 
let mediumDifficultyBlocksValues = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12];
document.getElementById('medium').addEventListener('click', () => {
    colorBlocksCount = 24;
    document.getElementById('difficultyChooser').style.display = 'none';
    generateColorBlocks(mediumDifficultyBlocksValues);
    rightPairs = 0;
    showCardsAtStart(3000);
    setTimeout(() => {
        gameProcess();
    }, 3000);
});

// Hard Difficulty
let hardDifficultyBlocksValues = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15];
document.getElementById('hard').addEventListener('click', () => {
    colorBlocksCount = 32;
    document.getElementById('difficultyChooser').style.display = 'none';
    generateColorBlocks(hardDifficultyBlocksValues);
    rightPairs = 0;
    showCardsAtStart(4000);
    setTimeout(() => {
        gameProcess();
    }, 4000);
});

// Insane Difficulty 
let insaneDifficultyBlocksValues = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16, 16, 17, 17, 18, 18];
document.getElementById('insane').addEventListener('click', () => {
    colorBlocksCount = 40;
    document.getElementById('difficultyChooser').style.display = 'none';
    generateColorBlocks(insaneDifficultyBlocksValues);
    rightPairs = 0;
    showCardsAtStart(5000);
    setTimeout(() => {
        gameProcess();
    }, 5000);
});

// Show all cards at the beginning of the game

function showCardsAtStart(cardsShowTime) {
    setTimeout(() => {
        setTimeout(() => {
            for (let i = 0; i < gameBlocks.length; i++) {
                gameCells[i].style.display = 'none';
            }
        }, cardsShowTime);
        for (let i = 0; i < gameBlocks.length; i++) {
            gameCells[i].style.display = 'table-cell';
        }
    }, 1000)
}


function gameProcess() {
    analytics.clicks = 0;
    analytics.rightClicks = 0;
    analytics.wrongClicks = 0;
    for (let i = 0; i < gameBlocks.length; i++) {
        gameBlocks[i].addEventListener('click', function showCard() {
            analytics.clicks++;
            gameBlocks[i].children[0].style.display = 'table-cell';
            let cardValue = parseInt(gameBlocks[i].children[0].innerText);
            openedCards.push(cardValue);
            cardIndexes.push(i);
            if (openedCards.length == 2) {
                setTimeout(() => {
                    checkIfMatch(openedCards);
                }, 150);
            }
        });
    }
}

function showAnalytics() {

    // Calculate the amount of useless clicks and right to wrong ratio
    let uselessClicks = analytics.clicks - analytics.rightClicks - analytics.wrongClicks;
    let rightToWrongRatio = analytics.rightClicks / (analytics.clicks - uselessClicks) * 100;
    rightToWrongRatio = (Math.round(rightToWrongRatio * 100) / 100).toFixed(2);

    let analyticsDiv = document.createElement('div');
    analyticsDiv.classList.add('analytics-div');
    analyticsDiv.classList.add('container');

    let rightClicksInfoP = document.createElement('p');
    rightClicksInfoP.innerText = 'Clicks that have followed a guessed pair: ';
    let rightClicksInfoSpan = document.createElement('span');
    rightClicksInfoSpan.innerText = analytics.rightClicks;

    let wrongClicksInfoP = document.createElement('p');
    wrongClicksInfoP.innerText = 'Clicks that haven\'t followed a guessed pair: ';
    let wrongClicksInfoSpan = document.createElement('span');
    wrongClicksInfoSpan.innerText = analytics.wrongClicks;

    let clicksRatioP = document.createElement('p');
    clicksRatioP.innerText = 'Right / Wrong Clicks Percentage: ';
    let clicksRatioSpan = document.createElement('span');
    clicksRatioSpan.innerText = rightToWrongRatio;

    let clicksP = document.createElement('p');
    clicksP.innerText = 'Total Clicks: ';
    let clicksSpan = document.createElement('span');
    clicksSpan.innerText = analytics.clicks;

    let uselessClicksP = document.createElement('p');
    uselessClicksP.innerText = 'Clicks with no outcome: ';
    let uselessClicksSpan = document.createElement('span');
    uselessClicksSpan.innerText = uselessClicks;

    let rightClicksInfoDiv = document.createElement('div');
    rightClicksInfoDiv.appendChild(rightClicksInfoP);
    rightClicksInfoDiv.appendChild(rightClicksInfoSpan);
    analyticsDiv.appendChild(rightClicksInfoDiv);

    let wrongClicksInfoDiv = document.createElement('div');
    wrongClicksInfoDiv.appendChild(wrongClicksInfoP);
    wrongClicksInfoDiv.appendChild(wrongClicksInfoSpan);
    analyticsDiv.appendChild(wrongClicksInfoDiv);

    let clicksRatioDiv = document.createElement('div');
    clicksRatioDiv.appendChild(clicksRatioP);
    clicksRatioDiv.appendChild(clicksRatioSpan);
    analyticsDiv.appendChild(clicksRatioDiv);

    let clicksDiv = document.createElement('div');
    clicksDiv.appendChild(clicksP);
    clicksDiv.appendChild(clicksSpan);
    analyticsDiv.appendChild(clicksDiv);

    let uselessClicksDiv = document.createElement('div');
    uselessClicksDiv.appendChild(uselessClicksP);
    uselessClicksDiv.appendChild(uselessClicksSpan);
    analyticsDiv.appendChild(uselessClicksDiv);

    let analyticsHeader = document.createElement('h1');
    analyticsHeader.innerText = 'Analytics';
    analyticsHeader.setAttribute('id', 'analytics-header');
    analyticsHeader.classList.add('text-center');

    analyticsDiv.setAttribute('id', 'analytics');
    document.getElementById('main').appendChild(analyticsHeader);
    document.getElementById('main').appendChild(analyticsDiv);
    document.getElementById('main').appendChild(buttonWrapper);
    buttonWrapper.style.display = 'block';
}

function win() {
    clearInterval(timer);
    alert('You\'ve won!');
    setTimeout(() => {
        gameTable.style.display = 'none';
        showAnalytics();
    }, 1500)
};

function lose() {
    clearInterval(timer);
    alert('You\'ve lost!')
    setTimeout(() => {
        gameTable.style.display = 'none';
        showAnalytics();
    }, 1500)
}

function checkIfMatch(array) {
    if (array[0] != array[1] && !gameBlocks[cardIndexes[0]].classList.contains('guessed') && !gameBlocks[cardIndexes[1]].classList.contains('guessed')) {
        // If the cards don't match:
        gameCells[cardIndexes[0]].style.display = 'none';
        gameCells[cardIndexes[1]].style.display = 'none';
        analytics.wrongClicks++;

    } else if (gameBlocks[cardIndexes[0]].classList.contains('guessed') && (!gameBlocks[cardIndexes[1]].classList.contains('guessed'))) {
        //  If any of the cards has already been guessed:
        gameCells[cardIndexes[1]].style.display = 'none';

    } else if (gameBlocks[cardIndexes[1]].classList.contains('guessed') && (!gameBlocks[cardIndexes[0]].classList.contains('guessed'))) {
        //  If any of the cards has already been guessed:
        gameCells[cardIndexes[0]].style.display = 'none';

    } else if (gameBlocks[cardIndexes[1]].classList.contains('guessed') && (gameBlocks[cardIndexes[0]].classList.contains('guessed'))) {
        // If both cards have been guessed:
        alert('Why would you even try that?');

    } else if (cardIndexes[0] == cardIndexes[1]) {
        // If the same card has been clicked twice

        if (gameBlocks[cardIndexes[0]].classList.contains('guessed')) {
            alert('You\'ve clicked it twice!');
        }

    } else {
        // If the cards match:
        gameBlocks[cardIndexes[0]].style.backgroundColor = guessedCardColor;
        gameBlocks[cardIndexes[1]].style.backgroundColor = guessedCardColor;
        gameBlocks[cardIndexes[0]].classList.add('guessed');
        gameBlocks[cardIndexes[1]].classList.add('guessed');
        rightPairs++;
        analytics.rightClicks++;
        if (rightPairs == 8) {
            setTimeout(() => {
                win();
                clearInterval(timer);
            }, 500);
        }
    }
    array.pop();
    array.pop();
    cardIndexes.pop();
    cardIndexes.pop();
};

function generateColorBlocks(randomNumbersArray) {

    let newRowSplit;

    // Create the Game Table 
    let gameTable = document.createElement('div');
    gameTable.setAttribute('id', 'gameTable');
    gameTable.classList.add('container');
    root.appendChild(gameTable);

    // Assign the length of the array to a variable in order to not create after-hand errors
    let arrayLength = randomNumbersArray.length;
    if (arrayLength == 16) {
        easy = true;
        newRowSplit = 4;
    } else if (arrayLength == 24) {
        medium = true;
        newRowSplit = 6;
    } else if (arrayLength == 30) {
        hard = true;
        newRowSplit = 5;
    } else {
        insane = true;
        newRowSplit = 6;
    }

    let numOfRows = arrayLength / newRowSplit;
    for (let j = 0; j < numOfRows; j++) {

        // Declare duration variable for as the timer's left time

        var duration;

        // Create a row div element 

        let row = document.createElement('div');
        row.classList.add('row');
        gameTable.appendChild(row);

        for (let i = 0; i < newRowSplit; i++) {

            // Create the color block

            let colorBlock = document.createElement('div');
            let colorBlockContent = document.createElement('span');
            colorBlockContent.classList.add('game-block-content');
            colorBlock.classList.add('game-block');
            colorBlock.appendChild(colorBlockContent);

            // Customise color blocks according to the difficulty 

            if (easy) {
                colorBlock.classList.add('easy');
                duration = 30;
                delay = 3000;
            } else if (medium) {
                colorBlock.classList.add('medium');
                duration = 45;
                delay = 4000;
            } else if (hard) {
                colorBlock.classList.add('hard');
                duration = 60;
                delay = 5000;
            } else if (insane) {
                colorBlock.classList.add('insane');
                duration = 75;
                delay = 6000;
            }

            // Set a random value for each color block

            let randint = getRandomInt(randomNumbersArray.length);
            colorBlock.children[0].innerText = randomNumbersArray[randint];
            randomNumbersArray.splice(randomNumbersArray.indexOf(randomNumbersArray[randint]), 1);
            row.appendChild(colorBlock);
        }
    }
    setTimeout(() => {
        createTimer(duration);
    }, delay);
}

function getRandomInt(numOfBlocks) {
    let randomNumber = Math.floor(Math.random() * numOfBlocks);
    return randomNumber;
}

// Creating a specific timer according to each difficulty
// The stopwatch will use the setInterval() function

function createTimer(duration) {
    let timerDiv = document.createElement('div');
    timerDiv.setAttribute('id', 'timerDiv');
    let timerP = document.createElement('p');
    timerP.innerText = 'Time left: ';
    let timerSpan = document.createElement('span');
    timerP.style.display = 'inline';
    timerDiv.appendChild(timerP);
    timerDiv.appendChild(timerSpan);
    gameTable.appendChild(timerDiv);
    alert('Check the timer!');
    timer = setInterval(() => {
        timerSpan.innerText = duration;
        if (duration) {
            duration--;
        } else {
            alert('Time\'s up!');
            clearInterval(timer);
            lose();
        }
    }, 1000);
}