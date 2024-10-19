<script>
    import { addOrder, favoriteBrew, isBrewing, resourcesStore } from "$lib/stores";
    import { onMount } from 'svelte';
    import { get } from 'svelte/store'; // Import the 'get' function

    import filled_heart from "../assets/images/filled_heart.png"; // Adjust the path as necessary
    import outlined_heart from "../assets/images/outlined_heart.png"; // Adjust the path as necessary

    export let isOpen = false;
    export let onClose;
    export let title = "";
    export let description = "";

    // Variables for configuration
    let roast = "Light Roast"; // Default option
    let strength = "Regular"; // Default option
    let size = "10 oz"; // Default option

    let isFavorited = false; // Tracks whether the heart is filled or not

    // Function to set the selected option
    function setRoastType(type) {
        roast = type;
    }

    function setStrengthType(type) {
        strength = type;
    }

    function setSizeType(type) {
        size = type;
    }

    // Modify the handleOrder function
    function handleOrder() {
        // Check the brewing status
        const brewingStatus = get(isBrewing);

        if (brewingStatus) {
            alert("Please wait until the current coffee is finished brewing before placing a new order.");
            return;
        }

        // Check if we can brew coffee
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
        addOrder(orderDetails); // Add the order to the store
        isBrewing.set(true); // Update isBrewing to true when a new order is placed
        onClose(); // Close modal after ordering
    }

    // Toggle the heart icon between filled and outlined
    function toggleFavorite() {
        isFavorited = !isFavorited;
        if (isFavorited)
        {
            // Set this brew as the favorite
            favoriteBrew.set({ title, roast, strength, size });
        }
        else
        {
            // Remove the favorite if already favorited
            favoriteBrew.set(null);
        }
    }

    // Check if the current brew is the favorite when component mounts
    onMount(() => {
        const unsubscribe = favoriteBrew.subscribe(favorite => {
            isFavorited = favorite && favorite.title === title; // Mark as favorited if it matches the current title
        });

        // Reset isFavorited when modal is opened
        if (isOpen) {
            isFavorited = false; // Reset the favorite state
        }

        return () => unsubscribe(); // Cleanup subscription on component destruction
    });

    // Function to handle keydown event for Escape key
    function handleKeydown(event) {
        if (event.key === "Escape") {
            onClose(); // Close modal
        }
    }

    // Add event listener for keydown when modal is open
    $: if (isOpen) {
        window.addEventListener("keydown", handleKeydown);
        isFavorited = false; // Reset isFavorited when opening the modal
    }

    // Cleanup the event listener when modal is closed or component is destroyed
    $: if (!isOpen) {
        window.removeEventListener("keydown", handleKeydown);
    }
</script>

{#if isOpen}
    <div class="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
        <div class="bg-white p-6 rounded-lg w-full max-w-lg relative">
            <!-- Heart Icon with Toggle -->
            <button 
                type="button" 
                class="absolute top-2 right-2 cursor-pointer"
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
                <p class="block mb-1 font-bold">Roast Type</p>
                <div class="flex space-x-2">
                    <button
                        class={`px-4 py-2 border rounded ${roast === "Decaf" ? "bg-green-500 text-white" : "bg-white text-gray-700"}`}
                        on:click={() => setRoastType("Decaf")}
                    >Decaf</button>
                    <button
                        class={`px-4 py-2 border rounded ${roast === "Light Roast" ? "bg-green-500 text-white" : "bg-white text-gray-700"}`}
                        on:click={() => setRoastType("Light Roast")}
                    >Light Roast</button>
                    <button
                        class={`px-4 py-2 border rounded ${roast === "Dark Roast" ? "bg-green-500 text-white" : "bg-white text-gray-700"}`}
                        on:click={() => setRoastType("Dark Roast")}
                    >Dark Roast</button>
                </div>
            </div>

            <!-- Strength Configuration (Button Group) -->
            <div class="mb-4">
                <p class="block mb-1 font-bold">Strength</p>
                <div class="flex space-x-2">
                    <button
                        class={`px-4 py-2 border rounded ${strength === "Mild" ? "bg-green-500 text-white" : "bg-white text-gray-700"}`}
                        on:click={() => setStrengthType("Mild")}
                    >Mild</button>
                    <button
                        class={`px-4 py-2 border rounded ${strength === "Regular" ? "bg-green-500 text-white" : "bg-white text-gray-700"}`}
                        on:click={() => setStrengthType("Regular")}
                    >Regular</button>
                    <button
                        class={`px-4 py-2 border rounded ${strength === "Strong" ? "bg-green-500 text-white" : "bg-white text-gray-700"}`}
                        on:click={() => setStrengthType("Strong")}
                    >Strong</button>
                </div>
            </div>

            <!-- Size Configuration (Button Group) -->
            <div class="mb-4">
                <p class="block mb-1 font-bold">Size</p>
                <div class="flex space-x-2">
                    <button
                        class={`px-4 py-2 border rounded ${size === "8 oz" ? "bg-green-500 text-white" : "bg-white text-gray-700"}`}
                        on:click={() => setSizeType("8 oz")}
                    >8 oz</button>
                    <button
                        class={`px-4 py-2 border rounded ${size === "10 oz" ? "bg-green-500 text-white" : "bg-white text-gray-700"}`}
                        on:click={() => setSizeType("10 oz")}
                    >10 oz</button>
                    <button
                        class={`px-4 py-2 border rounded ${size === "12 oz" ? "bg-green-500 text-white" : "bg-white text-gray-700"}`}
                        on:click={() => setSizeType("12 oz")}
                    >12 oz</button>
                </div>
            </div>

            <!-- Modal buttons: Cancel and Order -->
            <div class="flex justify-between">
                <button
                    on:click={onClose}
                    class="bg-gray-500 text-white px-4 py-2 rounded"
                >Cancel</button>
                <button
                    on:click={handleOrder}
                    class="bg-green-500 text-white px-4 py-2 rounded"
                >Order</button>
            </div>
        </div>
    </div>
{/if}
