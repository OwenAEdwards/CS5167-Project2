import { writable } from 'svelte/store';

// Store to hold all orders
export const orderStore = writable([]);

// Function to add an order to the store
export const addOrder = (orderDetails) => {
    orderStore.update(orders => {
        // Update lastBrew store with the new order
        lastBrew.set(orderDetails); // Set the last brew to the new order
        return [...orders, orderDetails]; // Add the new order to the list
    });
};

// Dummy data for testing
export const dummyData = writable([
    { currentBrew: 'Drip', temp: '93', pressure: '1', waterAmt: '10', beans: '15', timer: '45', caffAmt: '95' },
    { currentBrew: 'Espresso', temp: '93', pressure: '9', waterAmt: '1.5', beans: '20', timer: '30', caffAmt: '64' },
    { currentBrew: 'Latte', temp: '67', pressure: '1', waterAmt: '1.5', beans: '10', timer: '40', caffAmt: '60' },
    { currentBrew: 'Cafe Mocha', temp: '67', pressure: '1', waterAmt: '1.5', beans: '15', timer: '55', caffAmt: '80' },
    { currentBrew: 'Cappuccino', temp: '63', pressure: '1', waterAmt: '1.5', beans: '10', timer: '50', caffAmt: '90' },
    { currentBrew: 'Cold Brew', temp: '20', pressure: '1', waterAmt: '1.5', beans: '15', timer: '45', caffAmt: '95' },
]);

// Stores for last brew and favorite brew
export const lastBrew = writable(null);
export const favoriteBrew = writable(null);
export const isBrewing = writable(false);

// Store to manage resources
export const resourcesStore = writable({
    waterAmount: 100, // Initial water amount
    beansRemaining: 100, // Initial beans remaining
});

// User-specific data store
export const userStore = writable({});

// Function to set current user
export const setCurrentUser = (userId) => {
    userStore.update(users => {
        // Initialize user if not already in store
        if (!users[userId]) {
            users[userId] = {
                lastBrew: null,
                favoriteBrew: null
            };
        }
        return users;
    });
};

// Function to update a user's last brew
export const updateLastBrew = (userId, lastBrewDetails) => {
    userStore.update(users => {
        if (users[userId]) {
            users[userId].lastBrew = lastBrewDetails; // Update last brew
        }
        return users;
    });
};

// Function to update a user's favorite brew
export const updateFavoriteBrew = (userId, favoriteBrewDetails) => {
    userStore.update(users => {
        if (users[userId]) {
            users[userId].favoriteBrew = favoriteBrewDetails; // Update favorite brew
        }
        return users;
    });
};

// Function to retrieve a user's data (returns a default object if the user doesn't exist)
export const getUserData = (userId) => {
    let userData = {};
    userStore.subscribe(users => {
        userData = users[userId] || {
            lastBrew: null,
            favoriteBrew: null
        };
    })();
    return userData;
};

// Functions to retrieve specific data from user
export const getLastBrew = (userId) => {
    return getUserData(userId).lastBrew;
};

export const getFavoriteBrew = (userId) => {
    return getUserData(userId).favoriteBrew;
};