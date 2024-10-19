import { writable } from 'svelte/store';

export const orderStore = writable([]);

// Function to add an order to the store
export const addOrder = (orderDetails) => {
    orderStore.update(orders => {
        // Update lastBrew store with the new order
        lastBrew.set(orderDetails);  // Set the last brew to the new order
        return [...orders, orderDetails];
    });
};

export const dummyData = writable([
    {currentBrew: 'Drip', temp: '93', pressure: '1', waterAmt: '10', beans: '15', timer: '45', caffAmt: '95'},
    {currentBrew: 'Espresso', temp: '93', pressure: '9', waterAmt: '1.5', beans: '20', timer: '30', caffAmt: '64'},
    {currentBrew: 'Latte', temp: '67', pressure: '1', waterAmt: '1.5', beans: '10', timer: '40', caffAmt: '60'},
    {currentBrew: 'Cafe Mocha', temp: '67', pressure: '1', waterAmt: '1.5', beans: '15', timer: '55', caffAmt: '80'},
    {currentBrew: 'Cappuccino', temp: '63', pressure: '1', waterAmt: '1.5', beans: '10', timer: '50', caffAmt: '90'},
    {currentBrew: 'Cold Brew', temp: '20', pressure: '1', waterAmt: '1.5', beans: '15', timer: '45', caffAmt: '95'},
]);

export const favoriteBrew = writable(null);
export const lastBrew = writable(null);
export const isBrewing = writable(false);