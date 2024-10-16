import { writable } from 'svelte/store';

export const orderStore = writable([]);

// Function to add an order to the store
export const addOrder = (orderDetails) => {
    orderStore.update(orders => {
        return [...orders, orderDetails];
    });
};

// Function to get the last order from the store
export const getLastOrder = () => {
    let lastOrder;
    orderStore.subscribe(orders => {
        lastOrder = orders[orders.length - 1]; // Get the last order
    })();
    return lastOrder;
};

export const dummyData = writable([
    {currentBrew: 'Drip', temp: '200', pressure: '9', waterAmt: '1.5', beans: '20', timer: '30', caffAmt: '1.5'},
    {currentBrew: 'Espresso', temp: '200', pressure: '9', waterAmt: '1.5', beans: '20', timer: '30', caffAmt: '1.5'},
    {currentBrew: 'Latte', temp: '200', pressure: '9', waterAmt: '1.5', beans: '20', timer: '30', caffAmt: '1.5'},
    {currentBrew: 'Cafe Mocha', temp: '200', pressure: '9', waterAmt: '1.5', beans: '20', timer: '30', caffAmt: '1.5'},
    {currentBrew: 'Cappuccino', temp: '200', pressure: '9', waterAmt: '1.5', beans: '20', timer: '30', caffAmt: '1.5'},
    {currentBrew: 'Cad Brew', temp: '200', pressure: '9', waterAmt: '1.5', beans: '20', timer: '30', caffAmt: '1.5'},
]);

export const favorite = writable({currentBrew: 'Drip', temp: '200', pressure: '9', waterAmt: '1.5', beans: '20', timer: '60', caffAmt: '60'});
export const lastBrew = writable({currentBrew: 'Drip', temp: '200', pressure: '9', waterAmt: '1.5', beans: '20', timer: '60', caffAmt: '60'});
