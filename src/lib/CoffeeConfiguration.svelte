<script>
    export let isOpen = false;
    export let onClose;
    export let title = '';
    export let description = '';

    // Variables for configuration
    let roast = 'Light Roast'; // Default option
    let strength = 'Regular'; // Default option
    let size = '10 oz'; // Default option

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
</script>

{#if isOpen}
    <div class="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
        <div class="bg-white p-6 rounded-lg w-full max-w-lg">
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
