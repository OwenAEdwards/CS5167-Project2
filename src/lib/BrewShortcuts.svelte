<script lang="js">
    import { addOrder, lastBrew } from "$lib/stores";
    import { onDestroy } from "svelte";

    let lastOrder = null;

    // Subscribe to the lastBrew store to update lastOrder reactively
    const unsubscribe = lastBrew.subscribe(order => {
        lastOrder = order; // Update lastOrder with the latest brew
    });

    // Cleanup the subscription when the component is destroyed
    onDestroy(() => {
        unsubscribe();
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
        const favoriteOrder = {
            title: "Drip",
            roast: "Medium",
            strength: "Regular",
            size: "Medium"
        }; // Example of favorite order structure
        console.log("Brewing favorite order:", favoriteOrder);
        addOrder(favoriteOrder); // Add favorite order to orderStore
        // Similar brewing logic can be added here as needed
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
