"use strict";
// BANKIST APP

// Data ...
const account1 = {
    owner: "Jonas Schmedtmann",
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
    movementsDates: [
        "2019-11-18T21:31:17.178Z",
        "2019-12-23T07:42:02.383Z",
        "2020-01-28T09:15:04.904Z",
        "2020-04-01T10:17:24.185Z",
        "2020-05-08T14:11:59.604Z",
        "2020-05-27T17:01:17.194Z",
        "2020-07-11T23:36:17.929Z",
        "2020-07-12T10:51:36.790Z",
    ],
    currency: "EUR",
    locale: "pt-PT", // de-DE
};

const account2 = {
    owner: "Jessica Davis",
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
    movementsDates: [
        "2019-11-01T13:15:33.035Z",
        "2019-11-30T09:48:16.867Z",
        "2019-12-25T06:04:23.907Z",
        "2020-01-25T14:18:46.235Z",
        "2020-02-05T16:33:06.386Z",
        "2020-04-10T14:43:26.374Z",
        "2020-06-25T18:49:59.371Z",
        "2020-07-26T12:01:20.894Z",
    ],
    currency: "USD",
    locale: "en-US",
};

const account3 = {
    owner: "Steven Thomas Williams",
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
    movementsDates: [
        "2019-11-18T21:31:17.178Z",
        "2019-12-23T07:42:02.383Z",
        "2020-01-28T09:15:04.904Z",
        "2020-04-01T10:17:24.185Z",
        "2020-05-08T14:11:59.604Z",
        "2020-05-27T17:01:17.194Z",
        "2020-07-11T23:36:17.929Z",
        "2020-07-12T10:51:36.790Z",
    ],
    currency: "EUR",
    locale: "pt-PT", // de-DE
};

const account4 = {
    owner: "Sarah Smith",
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
    movementsDates: [
        "2019-11-01T13:15:33.035Z",
        "2019-11-30T09:48:16.867Z",
        "2019-12-25T06:04:23.907Z",
        "2020-01-25T14:18:46.235Z",
        "2020-02-05T16:33:06.386Z",
        "2020-04-10T14:43:26.374Z",
        "2020-06-25T18:49:59.371Z",
        "2020-07-26T12:01:20.894Z",
    ],
    currency: "USD",
    locale: "en-US",
};

const account5 = {
    owner: "Alireza Golbad",
    movements: [560, -330, 1870, 690, -800, 3600, -700, 180, 1120, -240],
    interestRate: 1.7,
    pin: 5555,
    movementsDates: [
        "2020-11-18T21:31:17.178Z",
        "2020-12-23T07:42:02.383Z",
        "2021-01-28T09:15:04.904Z",
        "2021-04-01T10:17:24.185Z",
        "2021-05-08T14:11:59.604Z",
        "2021-05-27T17:01:17.194Z",
        "2021-07-11T23:36:17.929Z",
        "2021-07-28T10:51:36.790Z",
        "2021-07-30T21:29:13.969Z",
        "2021-08-01T11:33:44.890Z",
    ],
    currency: "USD",
    locale: "fa-IR", // de-DE
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

// Functions

const formatMovementDate = function (date, locale) {
    const calcDaysPassed = (date1, date2) =>
        Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
    const daysPassed = calcDaysPassed(new Date(), date);
    // console.log(daysPassed);
    if (daysPassed === 0) return "Today";
    if (daysPassed === 1) return "Yesterday";
    if (daysPassed <= 7) return `${daysPassed} days ago`;

    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = date.getFullYear();
    // return `${day}/${month}/${year}`;
    return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = function (value, locale, currency) {
    return Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency,
    }).format(value);
};

const displayMovements = function (acc, sort = false) {
    containerMovements.innerHTML = "";
    const movs = sort
        ? acc.movements.slice().sort((a, b) => a - b)
        : acc.movements;

    movs.forEach(function (mov, i) {
        const type = mov > 0 ? "deposit" : "withdrawal";

        const date = new Date(acc.movementsDates[i]);
        const displayDate = formatMovementDate(date, acc.locale);

        const formatedMov = formatCur(mov, acc.locale, acc.currency);

        const html = `
            <div class="movements_row">
                <div class="movements_type movements_type--${type}">${
            i + 1
        } ${type}</div>
                <div class="movements_date">${displayDate}</div>
                <div class="movements_value">${formatedMov}</div>
            </div>
        `;

        containerMovements.insertAdjacentHTML("afterbegin", html);
    });
};

const calcDisplayBalance = function (acc) {
    acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
    labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
    const income = acc.movements
        .filter((mov) => mov > 0)
        .reduce((acc, mov) => acc + mov, 0);
    labelSumIn.textContent = formatCur(income, acc.locale, acc.currency);

    const out = acc.movements
        .filter((mov) => mov < 0)
        .reduce((acc, mov) => acc + Math.abs(mov), 0);
    labelSumOut.textContent = formatCur(out, acc.locale, acc.currency);

    const interest = acc.movements
        .filter((mov) => mov > 0)
        .map((deposit) => (deposit * acc.interestRate) / 100)
        .filter((int) => int >= 1)
        .reduce((acc, int) => acc + int, 0);
    labelSumInterest.textContent = formatCur(
        interest,
        acc.locale,
        acc.currency
    );
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
    displayMovements(acc);

    // Display balance
    calcDisplayBalance(acc);

    // Disolay summary
    calcDisplaySummary(acc);
};
// console.log(accounts);

const startLogOutTimer = function () {
    const tick = function () {
        const min = String(Math.trunc(time / 60)).padStart(2, 0);
        const sec = String(time % 60).padStart(2, 0);
        // in each call print the remaining time to UI
        labelTimer.textContent = `${min}:${sec}`;

        // when 0 second, stop timer and log out user
        if (time === 0) {
            clearInterval(timer);
            labelWelcome.textContent = `Log in to get started`;
            containerApp.style.opacity = 0;
        }
        // decrease 1 second
        time--;
    };
    // set time to 5 minutes
    let time = 300;
    // call the timer every second
    tick();
    const timer = setInterval(tick, 1000);
    return timer;
};

// Event handler *******************************************
let currentAccount, timer;

// Fake always logged in
// currentAccount = account5;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

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

        // Create current date and time
        const now = new Date();
        const options = {
            hour: "numeric",
            minute: "numeric",
            day: "numeric",
            month: "long",
            year: "numeric",
            weekday: "long",
        };
        // const locale = navigator.language;
        // console.log(locale);
        labelDate.textContent = new Intl.DateTimeFormat(
            currentAccount.locale,
            options
        ).format(now);
        // const day = `${now.getDate()}`.padStart(2, 0);
        // const month = `${now.getMonth() + 1}`.padStart(2, 0);
        // const year = now.getFullYear();
        // const hour = `${now.getHours()}`.padStart(2, 0);
        // const min = `${now.getMinutes()}`.padStart(2, 0);
        // labelDate.textContent = `${day}/${month}/${year}, ${hour}: ${min}`;
        // day/month/year

        // Clear input feilds
        inputLoginUsername.value = inputLoginPin.value = "";
        inputLoginPin.blur();
        if (timer) clearInterval(timer);
        timer = startLogOutTimer();

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

        // Add transfer date
        currentAccount.movementsDates.push(new Date().toISOString());
        recieverAcc.movementsDates.push(new Date().toISOString());

        // Update UI
        updateUI(currentAccount);

        // Reset timer
        clearInterval(timer);
        timer = startLogOutTimer();
    }
});

btnLoan.addEventListener("click", function (e) {
    e.preventDefault();
    const amount = Number(inputLoanAmount.value);
    if (
        amount > 0 &&
        currentAccount.movements.some((mov) => mov >= amount * 0.1)
    ) {
        setTimeout(function () {
            // Add movement
            currentAccount.movements.push(amount);

            // Add loan date
            currentAccount.movementsDates.push(new Date().toISOString());

            // Update UI
            updateUI(currentAccount);

            // Reset timer
            clearInterval(timer);
            timer = startLogOutTimer();
        }, 3333);
    }
    inputLoanAmount.value = "";
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

let sorted = false;
btnSort.addEventListener("click", function (e) {
    e.preventDefault();
    displayMovements(currentAccount.movements, !sorted);
    sorted = !sorted;
});
