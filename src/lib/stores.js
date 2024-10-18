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
    {currentBrew: 'Drip', temp: '93', pressure: '1', waterAmt: '10', beans: '15', timer: '45', caffAmt: '95'},
    {currentBrew: 'Espresso', temp: '93', pressure: '9', waterAmt: '1.5', beans: '20', timer: '30', caffAmt: '64'},
    {currentBrew: 'Latte', temp: '67', pressure: '1', waterAmt: '1.5', beans: '10', timer: '40', caffAmt: '60'},
    {currentBrew: 'Cafe Mocha', temp: '67', pressure: '1', waterAmt: '1.5', beans: '15', timer: '55', caffAmt: '80'},
    {currentBrew: 'Cappuccino', temp: '63', pressure: '1', waterAmt: '1.5', beans: '10', timer: '50', caffAmt: '90'},
    {currentBrew: 'Cold Brew', temp: '20', pressure: '1', waterAmt: '1.5', beans: '15', timer: '45', caffAmt: '95'},
]);

export const favorite = writable({currentBrew: 'Drip', temp: '93', pressure: '1', waterAmt: '10', beans: '15', timer: '45', caffAmt: '95'});
export const lastBrew = writable({currentBrew: 'Drip', temp: '93', pressure: '1', waterAmt: '10', beans: '15', timer: '45', caffAmt: '95'});
