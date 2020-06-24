var gameTable = document.createElement('div');
var difficulties = document.getElementsByClassName('difficultyBlock');
var root = document.getElementById('main');
var colorBlocksCount;

// Difficulties

// Easy Difficulty 

document.getElementById('easy').addEventListener('click', function() {
    colorBlocksCount = 16;

});

function generateColorBlocks(numOfBlocks) {
    let colorBlock = document.createElement('div');
    let colorBlockContent = document.createElement('span');
    gameTable.setAttribute('id', 'gameTable');
    colorBlockContent.classList.add('game-block-content');
    colorBlock.classList.add('game-block');
    colorBlock.appendChild(colorBlockContent);
}

function getRandomInt(numOfBlocks) {
    let randomNumber = Math.floor(Math.random() * numOfBlocks);
    return randomNumber;
}