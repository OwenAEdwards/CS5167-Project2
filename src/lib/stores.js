import { writable } from 'svelte/store';

/*
export const temp = writable();
export const pressure = writable();
export const waterAmt = writable();
export const beans = writable();
export const currentBrew = writable();
export const timer = writable();
export const caffAmt = writable();
*/

export const dummyData = writable([
    {currentBrew: 'Drip', temp: '200', pressure: '9', waterAmt: '1.5', beans: '20', timer: '30', caffAmt: '1.5'},
    {currentBrew: 'Espresso', temp: '200', pressure: '9', waterAmt: '1.5', beans: '20', timer: '30', caffAmt: '1.5'},
    {currentBrew: 'Latte', temp: '200', pressure: '9', waterAmt: '1.5', beans: '20', timer: '30', caffAmt: '1.5'},
    {currentBrew: 'Cafe Mocha', temp: '200', pressure: '9', waterAmt: '1.5', beans: '20', timer: '30', caffAmt: '1.5'},
    {currentBrew: 'Cappucino', temp: '200', pressure: '9', waterAmt: '1.5', beans: '20', timer: '30', caffAmt: '1.5'},
    {currentBrew: 'Cad Brew', temp: '200', pressure: '9', waterAmt: '1.5', beans: '20', timer: '30', caffAmt: '1.5'},
]);

export const favorite = writable({currentBrew: 'Drip', temp: '200', pressure: '9', waterAmt: '1.5', beans: '20', timer: '60', caffAmt: '60'});

export const lastBrew = writable({currentBrew: 'Drip', temp: '200', pressure: '9', waterAmt: '1.5', beans: '20', timer: '60', caffAmt: '60'});