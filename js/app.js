'use strict';

// DOM Elements

//------ Elements of the left side
const bill_input = document.getElementById('bill-input');
const div_buttons = document.querySelector('.buttons');
const num_people_input = document.getElementById('num-people-input');
const invalid_advice = document.querySelector('.invalid');
const custom_percentage_btn = document.getElementById('custom-percentage');
//------ Elements of the rigth side
const tip_per_person = document.getElementById('tip');
const total_per_person = document.getElementById('tip-per-person');
const reset_btn = document.getElementById('reset');

//DOM events
bill_input.addEventListener('input', calcTipAmount);
num_people_input.addEventListener('input', calcTipAmount);
div_buttons.addEventListener('click', calcTip);
custom_percentage_btn.addEventListener('input', calcCustomTip);
reset_btn.addEventListener('click', clearCalculator);

// Utilities for functions
function calcTipAmount() {
    // Replaces the ',' for decimal point
    if (bill_input.value.includes(',')) {
        bill_input.value.replace(',', '.');
    }

    if (num_people_input.value <= 0 || num_people_input.value == '') {
        num_people_input.classList.add('error');
        invalid_advice.classList.add('opacity-100');
    } else {
        num_people_input.classList.remove('error');
        invalid_advice.classList.remove('opacity-100');
    }

    let bill = parseFloat(bill_input.value);
    let numOfPeople = parseInt(num_people_input.value);
    let tipAmount = (bill / numOfPeople).toFixed(2);

    if (tipAmount === 'NaN') {
        tip_per_person.textContent = 0.00;
        total_per_person.textContent = 0.00;
    } else {
        tip_per_person.textContent = tipAmount;
        total_per_person.textContent = tipAmount;
    }

    return tipAmount;
}

function calcTip(event) {
    if (event.target.classList.contains('btn')) {
        // console.log('Works');
        let tipAmount = parseFloat(calcTipAmount());

        if (isNaN(tipAmount)) {
            total_per_person.textContent = 0;
        } else {
            let tipPercentage = parseFloat(event.target.value) / 100;
            let totalPerPerson = tipAmount + (tipAmount * tipPercentage);
            total_per_person.textContent = totalPerPerson.toFixed(2);
        }
    }
}

function calcCustomTip() {
    let tipAmount = parseFloat(calcTipAmount());

    let tipPercentage = parseFloat(custom_percentage_btn.value) / 100;
    if(isNaN(tipPercentage)) {
        total_per_person.textContent = 0.00;
    } else {
        let totalPerPerson = tipAmount + (tipAmount * tipPercentage);
        total_per_person.textContent = totalPerPerson.toFixed(2);
    }
    
}

function clearCalculator() {
    bill_input.value = 0;
    custom_percentage_btn.value = '';
    num_people_input.value = 1;
    tip_per_person.textContent = '0.00';
    total_per_person.textContent = '0.00';
}