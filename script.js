"use strict";
const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
]);
  
currencies.forEach(function (value, key, map) {
    console.log(`${key}: ${value}`);
})