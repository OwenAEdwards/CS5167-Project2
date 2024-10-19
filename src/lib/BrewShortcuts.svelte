<script lang="js">
    import { addOrder, favoriteBrew, lastBrew, isBrewing, resourcesStore } from "$lib/stores";
    import { onDestroy } from "svelte";
    import { get } from "svelte/store"; // Import get from svelte/store to read the store value

    let lastOrder = null;

    // Subscribe to the lastBrew store to update lastOrder reactively
    const lastBrewunsubscribe = lastBrew.subscribe(order => {
        lastOrder = order; // Update lastOrder with the latest brew
    });

    // Subscribe to the favoriteBrew store
    let currentFavorite = null;
    const favoriteUnsubscribe = favoriteBrew.subscribe(favorite => {
        currentFavorite = favorite; // Update currentFavorite with the favorite brew
    });

    // Subscribe to resourcesStore for waterAmount and beansRemaining
    let waterAmount = 0;
    let beansRemaining = 0;
    const resourcesUnsubscribe = resourcesStore.subscribe(resources => {
        waterAmount = resources.waterAmount;
        beansRemaining = resources.beansRemaining;
    });

    // Cleanup the subscriptions when the component is destroyed
    onDestroy(() => {
        lastBrewunsubscribe();
        favoriteUnsubscribe();
        resourcesUnsubscribe();
    });

    function brewLast() {
        // Check if a coffee is already brewing
        if (get(isBrewing)) {
            alert("A coffee is already brewing! Please wait until it's finished."); // Alert if brewing
            return; // Prevent further execution
        }

        if (lastOrder) {
            // Check if there's enough water and beans for the brew
            if (waterAmount <= 0 || beansRemaining <= 0) {
                alert("Insufficient resources to brew coffee. Please refill water or beans.");
                return;
            }
            
            isBrewing.set(true); // Set brewing state to true
            console.log("Brewing last order:", lastOrder);
            addOrder(lastOrder); // Add last order to orderStore
            
            // Simulate brewing process, and reset isBrewing after completion
            setTimeout(() => {
                isBrewing.set(false); // Reset brewing state after process
                console.log("Brewing finished.");
            }, 3000); // Simulate a 3-second brewing time
        } else {
            console.log("No last order found.");
        }
    }

    function brewFavorite() {
        // Check if a coffee is already brewing
        if (get(isBrewing)) {
            alert("A coffee is already brewing! Please wait until it's finished."); // Alert if brewing
            return; // Prevent further execution
        }

        if (currentFavorite) {
            // Check if there's enough water and beans for the brew
            if (waterAmount <= 0 || beansRemaining <= 0) {
                alert("Insufficient resources to brew coffee. Please refill water or beans.");
                return;
            }
            
            isBrewing.set(true); // Set brewing state to true
            console.log("Brewing favorite order:", currentFavorite);
            addOrder(currentFavorite); // Add favorite order to orderStore
            
            // Simulate brewing process, and reset isBrewing after completion
            setTimeout(() => {
                isBrewing.set(false); // Reset brewing state after process
                console.log("Brewing finished.");
            }, 3000); // Simulate a 3-second brewing time
        } else {
            console.log("No favorite order found.");
        }
    }
</script>

<style>
    button {
        margin: 5px;
        padding: 10px;
        font-size: 16px;
    }
</style>

<div>
    <button on:click={brewLast}>Brew Last</button>
    <button on:click={brewFavorite}>Brew Favorite</button>
</div>
