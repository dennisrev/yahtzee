const roll = document.getElementById('roll');
const diceElements = document.getElementsByClassName('diceElement');
const points = document.getElementsByClassName('points');
const xOfAKind = document.getElementsByClassName('xOfAKind');
const street = document.getElementsByClassName('street');
const fullHouse = document.getElementById('fullHouse');
const chance = document.getElementById('chance');

const rolls = 5; // gooien met 5 dobbelstenen in het spel Yahtzee
let count = {}; // key: aantal ogen, value: aantal keer dat het aantal ogen is gegooid

function newRoll () {
    
    count = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0,}; // reset de values van count
    
    rollDices(); // rollen van de dobbelstenen, het plaatsen van het resultaat in de dobbelstenentabel en de worp opslaan in count

    calculateScores(); // (opnieuw) invullen van de scoretabel
    // dit kan nog worden uitgebreid door bijvoorbeeld met een niet lege scoretabel te beginnen

}

function rollDices() {

    const rolledNumbers = [];

    for (let i = 0; i < rolls ; i++) {

        rolledNumbers[i] = 1 + Math.floor(Math.random() * 6);
        diceElements[i].innerHTML = rolledNumbers[i];
        count[rolledNumbers[i]]++;

    }

}

function calculateScores() {

    let amounts = Object.values(count); // hulparray met de als waarden de values van count

    //Bereken de score voor de nummercombinaties 1 t/m 6
    for (let i = 1; i <= 6; i++) {
        points[i-1].innerHTML = amounts[i-1] * i;
    }

    //Bereken de score voor kans
    chance.innerHTML = amounts.reduce(getSum);

    //Check of er x gelijke zijn gegooid
    const isXOfAKind = x => amounts.some(amount => amount >= x);

    //Bereken de score voor drie, vier en vijf gelijke
    xOfAKind[0].innerHTML = isXOfAKind(3) ? amounts.reduce(getSum) : 0;
    xOfAKind[1].innerHTML = isXOfAKind(4) ? amounts.reduce(getSum) : 0;
    xOfAKind[2].innerHTML = isXOfAKind(5) ? 50 : 0;

    //Check of er een Full House is gegooid en bereken de score
    const isFullHouse = amounts.includes(3) && amounts.includes(2);

    fullHouse.innerHTML = isFullHouse ? 25 : 0;

    //Check of een bepaald getal in de worp voorkomt
    const has = (number) => count[number] > 0;

    //Check of er een straat is gegooid
    const isSmallStreet = has(1) && has(2) && has(3) && has(4) || 
                        has(2) && has(3) && has(4) && has(5) ||
                        has(3) && has(4) && has(5) && has(6);

    const isBigStreet = has(2) && has(3) && has(4) && has(5) && ( has(1) || has(6) );

    const isSmallStreet = has(3) && has(4) && 
                        ( ( has(1) && has(2) ) || ( has(2) && has(5) ) || ( has(5) && has(6) ) );

    //Bereken de scores voor de straten
    street[0].innerHTML = isSmallStreet ? 30 : 0;
    street[1].innerHTML = isBigStreet ? 40 : 0;

}

//Berekenen totaal aantal ogen vanuit het count object
function getSum(sum, value, index) { 
    return sum + value * (index + 1);
}

roll.addEventListener('click', newRoll);