<script>
    import { onMount } from 'svelte';
    import { addOrder, favoriteBrew, isBrewing, resourcesStore, lastBrew, setCurrentUser, getLastBrew, getFavoriteBrew, updateFavoriteBrew, updateLastBrew } from "$lib/stores"; // Importing necessary stores
    import { get } from 'svelte/store';

    import filled_heart from "../assets/images/filled_heart.png"; 
    import outlined_heart from "../assets/images/outlined_heart.png"; 

    export let isOpen = false;
    export let onClose;
    export let title = "";
    export let description = "";
    export let userId; // Added userId to identify the current user

    // Variables for configuration
    let roast = "Light Roast"; 
    let strength = "Regular"; 
    let size = "10 oz"; 
    let isFavorited = false; 

    // Function to set the selected option
    function setRoastType(type) {
        roast = type;
        updateFavoritedState(); // Check favorited state when roast type changes
    }

    function setStrengthType(type) {
        strength = type;
        updateFavoritedState(); // Check favorited state when roast type changes
    }

    function setSizeType(type) {
        size = type;
        updateFavoritedState(); // Check favorited state when roast type changes
    }

    function handleOrder() {
        const brewingStatus = get(isBrewing);

        if (brewingStatus) {
            alert("Please wait until the current coffee is finished brewing before placing a new order.");
            return;
        }

        const resources = get(resourcesStore);

        if (resources.waterAmount <= 0 || resources.beansRemaining <= 0) {
            alert("Insufficient resources to brew coffee. Please refill water or beans.");
            return;
        }

        const orderDetails = {
            title,
            roast,
            strength,
            size,
        };

        console.log("Order details:", orderDetails);
        addOrder(orderDetails);
        isBrewing.set(true); // Update brewing status
        onClose(); // Close modal after ordering

        // Save the order as the last brew for the current user
        lastBrew.set(orderDetails); // Store the last brew correctly
        updateUserLastBrew(userId, orderDetails); // Update the user's last brew in userStore
    }

    function toggleFavorite() {
        const currentBrew = { title, roast, strength, size };
        const userFavorite = getFavoriteBrew(userId);

        // Toggle logic
        if (userFavorite && userFavorite.title === title && userFavorite.roast === roast && userFavorite.strength === strength && userFavorite.size === size) {
            // Current brew is already favored; unfavorite it
            isFavorited = false;
            favoriteBrew.set(null);
            updateUserFavoriteBrew(userId, null);
        } else {
            // Current brew is not favored; favorite it
            isFavorited = true;
            favoriteBrew.set(currentBrew);
            updateUserFavoriteBrew(userId, currentBrew);
        }
    }

    function updateFavoritedState() {
        const userFavorite = getFavoriteBrew(userId);
        isFavorited = userFavorite && userFavorite.title === title && userFavorite.roast === roast && userFavorite.strength === strength && userFavorite.size === size;
    }

    onMount(() => {
        // Set the current user
        setCurrentUser(userId);

        // Retrieve last brew for the user
        const userLastBrew = getLastBrew(userId);

        // Set the roast, strength, and size from the user's last brew if it exists
        if (userLastBrew) {
            roast = userLastBrew.roast;
            strength = userLastBrew.strength;
            size = userLastBrew.size;
        }
    });

    function handleKeydown(event) {
        if (event.key === "Escape") {
            onClose(); // Close modal
        }
    }

    $: if (isOpen) {
        updateFavoritedState(); // Check if current brew is favorited
        window.addEventListener("keydown", handleKeydown);
    }

    $: if (!isOpen) {
        window.removeEventListener("keydown", handleKeydown);
    }

    // Helper functions to update user data
    function updateUserLastBrew(userId, lastBrewDetails) {
        lastBrew.set(lastBrewDetails); // Update the last brew in the store
        // Call the updateLastBrew function from stores.js
        updateLastBrew(userId, lastBrewDetails);
    }

    function updateUserFavoriteBrew(userId, favoriteBrewDetails) {
        favoriteBrew.set(favoriteBrewDetails); // Update favorite brew in the store
        // Call the updateFavoriteBrew function from stores.js
        updateFavoriteBrew(userId, favoriteBrewDetails);
    }
</script>

{#if isOpen}
<div class="fixed inset-0 bg-secondary bg-opacity-75 flex justify-center items-center z-50 ">
    <div class="bg-card p-7 rounded-lg w-full max-w-xl relative">
        <!-- Heart Icon with Toggle -->
        <button 
            type="button" 
            class="absolute top-5 right-4 cursor-pointer"
            on:click={toggleFavorite}
            aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
        >
            <img
                src={isFavorited ? filled_heart : outlined_heart}
                alt={isFavorited ? 'Filled Heart Icon' : 'Outlined Heart Icon'}
                class={`transition-transform duration-300 ${isFavorited ? "w-8 h-8" : "w-6 h-6"}`}
            />
        </button>

            <h2 class="text-xl font-bold mb-4">{title}</h2>
            <p class="mb-6">{description}</p>

        <!-- Roast Type Configuration (Button Group) -->
        <div class="mb-4">
            <p class="block mb-1 font-bold text-foreground">Roast Type</p>
            <div class="flex space-x-2">
                <button
                    class={`px-4 py-2 border rounded ${roast === "Decaf" ? "bg-accent text-accent-foreground" : "bg-card text-card-foreground border-border"}`}
                    on:click={() => setRoastType("Decaf")}
                >Decaf</button>
                <button
                    class={`px-4 py-2 border rounded ${roast === "Light Roast" ? "bg-accent text-accent-foreground" : "bg-card text-card-foreground border-border"}`}
                    on:click={() => setRoastType("Light Roast")}
                >Light Roast</button>
                <button
                    class={`px-4 py-2 border rounded ${roast === "Dark Roast" ? "bg-accent text-accent-foreground" : "bg-card text-card-foreground border-border"}`}
                    on:click={() => setRoastType("Dark Roast")}
                >Dark Roast</button>
            </div>
        </div>

        <!-- Strength Configuration (Button Group) -->
        <div class="mb-4">
            <p class="block mb-1 font-bold text-foreground">Strength</p>
            <div class="flex space-x-2">
                <button
                    class={`px-4 py-2 border rounded ${strength === "Mild" ? "bg-accent text-accent-foreground" : "bg-card text-card-foreground border-border"}`}
                    on:click={() => setStrengthType("Mild")}
                >Mild</button>
                <button
                    class={`px-4 py-2 border rounded ${strength === "Regular" ? "bg-accent text-accent-foreground" : "bg-card text-card-foreground border-border"}`}
                    on:click={() => setStrengthType("Regular")}
                >Regular</button>
                <button
                    class={`px-4 py-2 border rounded ${strength === "Strong" ? "bg-accent text-accent-foreground" : "bg-card text-card-foreground border-border"}`}
                    on:click={() => setStrengthType("Strong")}
                >Strong</button>
            </div>
        </div>

        <!-- Size Configuration (Button Group) -->
        <div class="mb-4">
            <p class="block mb-1 font-bold text-foreground">Size</p>
            <div class="flex space-x-2">
                <button
                    class={`px-4 py-2 border rounded ${size === "8 oz" ? "bg-accent text-accent-foreground" : "bg-card text-card-foreground border-border"}`}
                    on:click={() => setSizeType("8 oz")}
                >8 oz</button>
                <button
                    class={`px-4 py-2 border rounded ${size === "10 oz" ? "bg-accent text-accent-foreground" : "bg-card text-card-foreground border-border"}`}
                    on:click={() => setSizeType("10 oz")}
                >10 oz</button>
                <button
                    class={`px-4 py-2 border rounded ${size === "12 oz" ? "bg-accent text-accent-foreground" : "bg-card text-card-foreground border-border"}`}
                    on:click={() => setSizeType("12 oz")}
                >12 oz</button>
            </div>
        </div>

        <!-- Modal buttons: Cancel and Order -->
        <div class="flex justify-between mt-6">
            <button
                on:click={onClose}
                class="bg-rose-500 text-white px-4 py-2 rounded"
            >Cancel</button>
            <button
                on:click={handleOrder}
                class="bg-accent text-accent-foreground px-4 py-2 rounded"
            >Order</button>
        </div>
    </div>
</div>

{/if}
