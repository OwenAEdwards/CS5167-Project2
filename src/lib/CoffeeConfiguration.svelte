<script>
    export let isOpen = false;
    export let onClose;
    export let title = '';
    export let description = '';

    // Variables for configuration
    let roast = 'Light Roast'; // Default option
    let strength = 'Regular'; // Default option
    let size = '10 oz'; // Default option

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

    // Function to handle "Order" button click
    function handleOrder() {
        const orderDetails = {
            roast,
            strength,
            size
        };
        console.log('Order details:', orderDetails);
        onClose(); // Close modal after ordering
    }

    // Toggle the heart icon between filled and outlined
    function toggleFavorite() {
        isFavorited = !isFavorited;
    }

    // Function to handle keydown event for Escape key
    function handleKeydown(event) {
        if (event.key === 'Escape') {
            onClose(); // Close modal
        }
    }

    // Add event listener for keydown when modal is open
    $: if (isOpen) {
        window.addEventListener('keydown', handleKeydown);
    }

    // Cleanup the event listener when modal is closed or component is destroyed
    $: if (!isOpen) {
        window.removeEventListener('keydown', handleKeydown);
    }
</script>

{#if isOpen}
    <div class="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
        <div class="bg-white p-6 rounded-lg w-full max-w-lg relative">
            <!-- Heart Icon with Toggle -->
            <div class="absolute top-2 right-2 cursor-pointer" on:click={toggleFavorite}>
                {#if isFavorited}
                    <!-- Filled Heart Icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="w-6 h-6">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                {:else}
                    <!-- Outlined Heart Icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.172 5.172a4 4 0 000 5.656l8.485 8.485a1 1 0 001.414 0l8.485-8.485a4 4 0 00-5.656-5.656L12 9.586 8.828 6.414a4 4 0 00-5.656 0z"/>
                    </svg>
                {/if}
            </div>

            <h2 class="text-xl font-bold mb-4">{title}</h2>
            <p class="mb-6">{description}</p>

            <!-- Roast Type Configuration (Button Group) -->
            <div class="mb-4">
                <label class="block mb-1 font-bold">Roast Type</label>
                <div class="flex space-x-2">
                    <button 
                        class={`px-4 py-2 border rounded ${roast === 'Decaf' ? 'bg-green-500 text-white' : 'bg-white text-gray-700'}`}
                        on:click={() => setRoastType('Decaf')}>Decaf</button>
                    <button 
                        class={`px-4 py-2 border rounded ${roast === 'Light Roast' ? 'bg-green-500 text-white' : 'bg-white text-gray-700'}`}
                        on:click={() => setRoastType('Light Roast')}>Light Roast</button>
                    <button 
                        class={`px-4 py-2 border rounded ${roast === 'Dark Roast' ? 'bg-green-500 text-white' : 'bg-white text-gray-700'}`}
                        on:click={() => setRoastType('Dark Roast')}>Dark Roast</button>
                </div>
            </div>

            <!-- Strength Configuration (Button Group) -->
            <div class="mb-4">
                <label class="block mb-1 font-bold">Strength</label>
                <div class="flex space-x-2">
                    <button 
                        class={`px-4 py-2 border rounded ${strength === 'Mild' ? 'bg-green-500 text-white' : 'bg-white text-gray-700'}`}
                        on:click={() => setStrengthType('Mild')}>Mild</button>
                    <button 
                        class={`px-4 py-2 border rounded ${strength === 'Regular' ? 'bg-green-500 text-white' : 'bg-white text-gray-700'}`}
                        on:click={() => setStrengthType('Regular')}>Regular</button>
                    <button 
                        class={`px-4 py-2 border rounded ${strength === 'Strong' ? 'bg-green-500 text-white' : 'bg-white text-gray-700'}`}
                        on:click={() => setStrengthType('Strong')}>Strong</button>
                </div>
            </div>

            <!-- Size Configuration (Button Group) -->
            <div class="mb-4">
                <label class="block mb-1 font-bold">Size</label>
                <div class="flex space-x-2">
                    <button 
                        class={`px-4 py-2 border rounded ${size === '8 oz' ? 'bg-green-500 text-white' : 'bg-white text-gray-700'}`}
                        on:click={() => setSizeType('8 oz')}>8 oz</button>
                    <button 
                        class={`px-4 py-2 border rounded ${size === '10 oz' ? 'bg-green-500 text-white' : 'bg-white text-gray-700'}`}
                        on:click={() => setSizeType('10 oz')}>10 oz</button>
                    <button 
                        class={`px-4 py-2 border rounded ${size === '12 oz' ? 'bg-green-500 text-white' : 'bg-white text-gray-700'}`}
                        on:click={() => setSizeType('12 oz')}>12 oz</button>
                </div>
            </div>

            <!-- Modal buttons: Cancel and Order -->
            <div class="flex justify-between">
                <button on:click={onClose} class="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
                <button on:click={handleOrder} class="bg-green-500 text-white px-4 py-2 rounded">Order</button>
            </div>
        </div>
    </div>
{/if}
