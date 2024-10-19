<script lang="js">
    import { addOrder, favoriteBrew, lastBrew } from "$lib/stores";
    import { onDestroy } from "svelte";

    let lastOrder = null;

    // Subscribe to the lastBrew store to update lastOrder reactively
    const unsubscribe = lastBrew.subscribe(order => {
        lastOrder = order; // Update lastOrder with the latest brew
    });

    // Subscribe to the favoriteBrew store
    let currentFavorite = null;
    const favoriteUnsubscribe = favoriteBrew.subscribe(favorite => {
        currentFavorite = favorite; // Update currentFavorite with the favorite brew
    });

    // Cleanup the subscriptions when the component is destroyed
    onDestroy(() => {
        unsubscribe();
        favoriteUnsubscribe();
    });

    function brewLast() {
        if (lastOrder) {
            console.log("Brewing last order:", lastOrder);
            addOrder(lastOrder); // Add last order to orderStore
            // Here you can also trigger any other logic to start brewing
        } else {
            console.log("No last order found.");
        }
    }

    function brewFavorite() {
        if (currentFavorite) {
            console.log("Brewing favorite order:", currentFavorite);
            addOrder(currentFavorite); // Add favorite order to orderStore
            // Similar brewing logic can be added here as needed
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
