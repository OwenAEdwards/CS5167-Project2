<script lang="js">
    import { addOrder, isBrewing, resourcesStore, getLastBrew, getFavoriteBrew, lastBrew, favoriteBrew } from "$lib/stores";
    import { onDestroy } from "svelte";
    import { get } from "svelte/store";

    export let userId; // User ID passed from parent component

    // Set lastOrder and currentFavorite to null
    let lastOrder = null;
    let currentFavorite = null;

    // Subscribe to the lastBrewStore and favoriteBrewStore
    const lastBrewUnsubscribe = lastBrew.subscribe(brew => {
        if (brew && brew.userId === userId) {
            lastOrder = brew.brew;
            console.log("lastOrder (updated):", lastOrder);
        }
    });

    const favoriteBrewUnsubscribe = favoriteBrew.subscribe(brew => {
        if (brew && brew.userId === userId) {
            currentFavorite = brew.brew;
            console.log("currentFavorite (updated):", currentFavorite);
        }
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
        lastBrewUnsubscribe();
        favoriteBrewUnsubscribe();
        resourcesUnsubscribe();
    });

    function isResourceSufficient() {
        if (waterAmount <= 0 || beansRemaining <= 0) {
            alert("Insufficient resources to brew coffee. Please refill water or beans.");
            return false;
        }
        return true;
    }

    function brew(order) {
        if (get(isBrewing)) {
            alert("A coffee is already brewing! Please wait until it's finished.");
            return;
        }

        if (!order) {
            console.log("No order found for user:", userId);
            return;
        }

        if (!isResourceSufficient()) {
            return;
        }

        // Start brewing
        isBrewing.set(true);
        console.log(`Brewing order for user: ${userId}`, order);
        addOrder(order);

        // No simulation of brewing time here
    }

    function brewLast() {
        // Fetch the last order just before brewing
        lastOrder = getLastBrew(userId) || lastOrder; // Refresh lastOrder
        console.log("Last order before brewing:", lastOrder);
        
        if (lastOrder) {
            brew(lastOrder);
        } else {
            console.log("No last order available.");
        }
    }

    function brewFavorite() {
        // Fetch the favorite order just before brewing
        currentFavorite = getFavoriteBrew(userId) || currentFavorite; // Refresh currentFavorite
        console.log("Current favorite before brewing:", currentFavorite);
        
        if (currentFavorite) {
            brew(currentFavorite);
        } else {
            console.log("No favorite order available.");
        }
    }
</script>

<style>
    button {
        margin: 5px;
        padding: 10px;
        font-size: 16px;
        border: 1px solid #dbcfc2;
    }
</style>

<div class="pl-3">
    <button
        on:click={brewLast}
        class="m-1 p-1 text-base border-1 font-medium border-[#bd672e] rounded-sm transition duration-300 
               bg-[#f9e3cf] text-[#955023] hover:bg-primary hover:text-primary-foreground"
    >
        Brew Last
    </button>
    <button
        on:click={brewFavorite}
        class="m-1 p-1 text-base font-medium border-1 border-[#c89e82] rounded-md transition duration-300 
               bg-[#f9e3cf] text-[#955023] hover:bg-primary hover:text-primary-foreground"
    >
        Brew Favorite
    </button>
</div>



