<script lang="js">
    import * as Card from "$lib/components/ui/card";
    import BrewShortcuts from "./BrewShortcuts.svelte";
    import CoffeeConfiguration from "./CoffeeConfiguration.svelte";

    // Receive the userId prop
    export let userId;  // Use 'export' to receive the prop from the parent component

    let isModalOpen = false;
    let modalTitle = '';
    let modalDescription = '';

    // Function to open the modal
    function openModal(title, description) {
        modalTitle = title;
        modalDescription = description;
        isModalOpen = true;
    }

    // Function to close the modal
    function closeModal() {
        isModalOpen = false;
    }
</script>

<main>
    <div class="p-4">
        <!-- Grid layout for coffee options -->
        <div class="grid-container">
            <!-- Drip -->
            <button
                class="cursor-pointer" 
                on:click={() => openModal('Drip', 'Classic brewed coffee. Rich and flavorful drip coffee. Perfect for your morning routine.')}
            >
                <Card.Root class="card">
                    <Card.Header>
                        <Card.Title>Drip</Card.Title>
                        <Card.Description>Classic brewed coffee</Card.Description>
                    </Card.Header>
                    <Card.Content>
                        <p class="card-footer">Perfect for your morning routine</p>
                    </Card.Content>
                </Card.Root>
            </button>

            <!-- Espresso -->
            <button
                class="cursor-pointer"
                on:click={() => openModal('Espresso', 'Strong and bold coffee shot. Concentrated coffee served in a small cup. Ideal for a quick energy boost.')}
            >
                <Card.Root class="card">
                    <Card.Header>
                        <Card.Title>Espresso</Card.Title>
                        <Card.Description>Strong and bold coffee shot</Card.Description>
                    </Card.Header>
                    <Card.Content>
                        <p class="card-footer">Ideal for a quick energy boost</p>
                    </Card.Content>
                </Card.Root>
            </button>

            <!-- Latte -->
            <button
                class="cursor-pointer"
                on:click={() => openModal('Latte', 'Creamy espresso with milk. Rich espresso combined with steamed milk. A great choice for milk lovers.')}
            >
                <Card.Root class="card">
                    <Card.Header>
                        <Card.Title>Latte</Card.Title>
                        <Card.Description>Creamy espresso with milk</Card.Description>
                    </Card.Header>
                    <Card.Content>
                        <p class="card-footer">A great choice for milk lovers</p>
                    </Card.Content>
                </Card.Root>
            </button>

            <!-- Cafe Mocha -->
            <button
                class="cursor-pointer"
                on:click={() => openModal('Cafe Mocha', 'Chocolatey espresso drink. Espresso mixed with steamed milk and chocolate. A sweet indulgence for coffee lovers.')}
            >
                <Card.Root class="card">
                    <Card.Header>
                        <Card.Title>Cafe Mocha</Card.Title>
                        <Card.Description>Chocolatey espresso drink</Card.Description>
                    </Card.Header>
                    <Card.Content>
                        <p class="card-footer">A sweet indulgence for coffee lovers</p>
                    </Card.Content>
                </Card.Root>
            </button>

            <!-- Cappuccino -->
            <button
                class="cursor-pointer"
                on:click={() => openModal('Cappuccino', 'Frothy espresso drink. Equal parts espresso, steamed milk, and froth. Perfect for a rich coffee experience.')}
            >
                <Card.Root class="card">
                    <Card.Header>
                        <Card.Title>Cappuccino</Card.Title>
                        <Card.Description>Frothy espresso drink</Card.Description>
                    </Card.Header>
                    <Card.Content>
                        <p class="card-footer">Perfect for a rich coffee experience</p>
                    </Card.Content>
                </Card.Root>
            </button>

            <!-- Cold Brew -->
            <button
                class="cursor-pointer"
                on:click={() => openModal('Cold Brew', 'Chilled coffee for hot days. Slow-steeped coffee served cold. A refreshing pick-me-up.')}
            >
                <Card.Root class="card">
                    <Card.Header>
                        <Card.Title>Cold Brew</Card.Title>
                        <Card.Description>Chilled coffee for hot days</Card.Description>
                    </Card.Header>
                    <Card.Content>
                        <p class="card-footer">A refreshing pick-me-up</p>
                    </Card.Content>
                </Card.Root>
            </button>
        </div>
    </div>
    <BrewShortcuts userId={userId} />
    <!-- Coffee Configuration (Modal) -->
    <CoffeeConfiguration isOpen={isModalOpen} onClose={closeModal} title={modalTitle} description={modalDescription} userId={userId} />
</main>

<style>
    /* Grid layout for coffee options */
    .grid-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Responsive columns */
        gap: 1rem; /* Space between items */
    }
    


    /* Style for the card footer */
    .card-footer {
        font-weight: 500; /* Make it slightly bolder */
        color: #555; /* Subtle color for the footer */
        margin-top: auto; /* Pushes it to the bottom of the content */
    }
</style>
