const getDices = document.getElementById('getDices');
const diceElements = document.getElementsByClassName('diceElement');
const points = document.getElementsByClassName('points');
const sameDices = document.getElementsByClassName('sameDices');
const street = document.getElementsByClassName('street');
const fullHouse = document.getElementById('fullHouse');
const chance = document.getElementById('chance');
const yahtzee = document.getElementById('yahtzee');

function rollDices() {

    const rolls = 5;
    const rolledNumbers = [];
    const amounts = [];

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
        //rolledNumbers[i] = 6;
        //if (i < 2) {
        //    rolledNumbers[i] = 2;
        //} else {
        //    rolledNumbers[i] = 3;
        //}
        diceElements[i].innerHTML = rolledNumbers[i];

        count[rolledNumbers[i]]++;

    }

    //Bereken het groote en kleinste aantal dezelfde dobbelstenen 
    for (let key in count) {
        amounts[key - 1] = count[key];
    }
    const maxSameDices = Math.max(...amounts);
    const minSameDices = Math.min(...amounts.filter(value => value >= 1));

    //Bereken de punten voor de nummercombinaties 1 t/m 6
    for (let i = 1; i <= 6; i++) {
        points[i-1].innerHTML = count[i] * i;
    }

    //Bereken de punten voor 3 of 4 gelijke dobbelstenen
    for (let i = 0; i<2; i++) {
        if ( maxSameDices >= 3 + i) {
            sameDices[i].innerHTML = rolledNumbers.reduce(getSum);
        } else {
            sameDices[i].innerHTML = 0;
        }
    }

    //Bereken de lengthe van de langste straat die is gegooid
    let maxStreetLength = 1;
    let streetLength = 1;
    for (let i = 1; i<6; i++ ) {
        if ( amounts[i] >= 1 && amounts[i-1] >= 1) {
            streetLength++;
        } else {
            maxStreetLength = streetLength;
            streetlength = 1;
        }
        if ( streetLength > maxStreetLength ) {
            maxStreetLength = streetLength;
        }
    }

    //Check of er een kleine of grote straat is gegooid
    for (let i = 0; i<2; i++) {
        if ( maxStreetLength >= 4 + i) {
            street[i].innerHTML = 30 + 10 * i;
        } else {
            street[i].innerHTML = 0;
        }
    }

    //Check of er een Full House is gegooid
    if ( maxSameDices == 3 && minSameDices == 2 ) {
        fullHouse.innerHTML = 25;
    } else {
        fullHouse.innerHTML = 0;
    }

    //Bereken de punten voor kans
    chance.innerHTML = rolledNumbers.reduce(getSum);

    //Check of er Yahtzee is gegooid
    if ( maxSameDices == 5 ) {
        yahtzee.innerHTML = 50;
    } else {
        yahtzee.innerHTML = 0;
    }
    
    function getSum(total, value) { 
        return total + value;
    }
}

getDices.addEventListener('click', rollDices);