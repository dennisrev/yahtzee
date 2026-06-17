const getDices = document.getElementById('getDices');
const diceelements = document.getElementsByClassName('diceElement');
const points = document.getElementsByClassName('points');

function rollDices() {

    const rolls = 5;
    const rolledNumbers = [];

    let count = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
    }

    for (let i = 0; i < rolls ; i++) {

        rolledNumbers[i] = 1 + Math.floor(Math.random() * 6);
        diceelements[i].innerHTML = rolledNumbers[i];

        count[rolledNumbers[i]]++;

    }

    for (let i = 1; i <= 6; i++) {
        points[i-1].innerHTML = count[i] * i;
    }
}

getDices.addEventListener('click', rollDices);