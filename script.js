"use strict";
// BANKIST APP

// Data
const account1 = {
    owner: "Jonas Schmedtmann",
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};

const account2 = {
    owner: "Jessica Davis",
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const account3 = {
    owner: "Steven Thomas Williams",
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: "Sarah Smith",
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};

const account5 = {
    owner: "Alireza Golbad",
    movements: [560, -330, 1870, 690, -800, 3600, -700, 180, 1120, -240],
    interestRate: 1.7,
    pin: 5555,
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance_value");
const labelSumIn = document.querySelector(".summary_value--in");
const labelSumOut = document.querySelector(".summary_value--out");
const labelSumInterest = document.querySelector(".summary_value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login_btn");
const btnTransfer = document.querySelector(".form_btn--transfer");
const btnLoan = document.querySelector(".form_btn--loan");
const btnClose = document.querySelector(".form_btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login_input--user");
const inputLoginPin = document.querySelector(".login_input--pin");
const inputTransferTo = document.querySelector(".form_input--to");
const inputTransferAmount = document.querySelector(".form_input--amount");
const inputLoanAmount = document.querySelector(".form_input--loan-amount");
const inputCloseUsername = document.querySelector(".form_input--user");
const inputClosePin = document.querySelector(".form_input--pin");

const displayMovements = function (movements) {
    containerMovements.innerHTML = "";
    movements.forEach(function (mov, i) {
        const type = mov > 0 ? "deposit" : "withdrawal";
        const html = `
            <div class="movements_row">
                <div class="movements_type movements_type--${type}">${
            i + 1
        } ${type}</div>
                <div class="movements_value">${mov}</div>
            </div>
        `;

        containerMovements.insertAdjacentHTML("afterbegin", html);
    });
};

const calcDisplayBalance = function (acc) {
    acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
    labelBalance.textContent = `${acc.balance} €`;
};

const calcDisplaySummary = function (acc) {
    const income = acc.movements
        .filter((mov) => mov > 0)
        .reduce((acc, mov) => acc + mov, 0);
    labelSumIn.textContent = `${income}€`;

    const outcome = acc.movements
        .filter((mov) => mov < 0)
        .reduce((acc, mov) => acc + Math.abs(mov), 0);
    labelSumOut.textContent = `${outcome}€`;

    const interest = acc.movements
        .filter((mov) => mov > 0)
        .map((deposit) => (deposit * acc.interestRate) / 100)
        .filter((int) => int >= 1)
        .reduce((acc, int) => acc + int, 0);
    labelSumInterest.textContent = `${interest}€`;
};

const createUsername = function (accs) {
    accs.forEach(function (acc) {
        acc.username = acc.owner
            .toLocaleLowerCase()
            .split(" ")
            .map((name) => name[0])
            .join("");
    });
};

createUsername(accounts);

const updateUI = function (acc) {
    // Display movements
    displayMovements(acc.movements);

    // Display balance
    calcDisplayBalance(acc);

    // Disolay summary
    calcDisplaySummary(acc);
};
// console.log(accounts);

// Event handler *******************************************
let currentAccount;

btnLogin.addEventListener("click", function (e) {
    //Prevent from form submitting
    e.preventDefault();

    currentAccount = accounts.find(
        (acc) => acc.username === inputLoginUsername.value
    );
    console.log(currentAccount);
    if (currentAccount?.pin === Number(inputLoginPin.value)) {
        // Display UI and message
        labelWelcome.textContent = `Welcome back, ${
            currentAccount.owner.split(" ")[0]
        }`;
        containerApp.style.opacity = 100;

        // Clear input feilds
        inputLoginUsername.value = inputLoginPin.value = "";
        inputLoginPin.blur();

        updateUI(currentAccount);
    }
});

btnTransfer.addEventListener("click", function (e) {
    e.preventDefault();
    const amount = Number(inputTransferAmount.value);
    const recieverAcc = accounts.find(
        (acc) => acc.username === inputTransferTo.value
    );
    inputTransferAmount.value = inputTransferTo.value = "";
    if (
        amount > 0 &&
        recieverAcc &&
        currentAccount.balance >= amount &&
        recieverAcc.username !== currentAccount.username
    ) {
        // Doing the transfer
        currentAccount.movements.push(-amount);
        recieverAcc.movements.push(amount);

        // Update UI
        updateUI(currentAccount);
    }
});

btnClose.addEventListener("click", function (e) {
    e.preventDefault();
    if (
        currentAccount.username === inputCloseUsername.value &&
        currentAccount.pin === Number(inputClosePin.value)
    ) {
        const index = accounts.findIndex(
            (acc) => acc.username === currentAccount.username
        );
        console.log(index);
        // Delete account
        accounts.splice(index, 1);

        // Hide UI
        containerApp.style.opacity = 0;
    }
    inputCloseUsername.value = inputClosePin.value = "";
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
    ["USD", "United States dollar"],
    ["EUR", "Euro"],
    ["GBP", "Pound sterling"],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// =================================================================
const deposits = movements.filter(function (mov) {
    return mov > 0;
});

// console.log(movements);
// console.log(deposits);

const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
// console.log(depositsFor);

const withdrawals = movements.filter((mov) => mov < 0);
// console.log(withdrawals);

// accumolator --> SNOWBALL
// const balance = movements.reduce(function (acc, cur, i, arr) {
//     console.log(`Iteration ${i} : ${acc}`);
//     return acc + cur;
// }, 0);

const balance = movements.reduce((acc, cur) => acc + cur, 0);
// console.log(balance);

let balance2 = 0;
for (const mov of movements) balance2 += mov;
// console.log(balance2);

// Maximum number
const max = movements.reduce((acc, mov) => {
    if (acc > mov) return acc;
    else return mov;
}, movements[0]);
// console.log(max);

const eurToUsd = 1.1;
const totalDepositsUSD = movements
    .filter((mov) => mov > 0)
    .map((mov) => mov * eurToUsd)
    .reduce((acc, mov) => acc + mov, 0);
// console.log(totalDepositsUSD);

// Find method ############################################
const firstWithdrawal = movements.find((mov) => mov < 0);
// console.log(movements);
// console.log(firstWithdrawal);

// console.log(accounts);
const account = accounts.find((acc) => acc.owner == "Jessica Davis");
// console.log(account);
