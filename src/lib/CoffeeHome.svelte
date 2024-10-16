<script lang="js">
    import * as Card from "$lib/components/ui/card";
    import CoffeeConfiguration from "./CoffeeConfiguration.svelte";

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
        <div class="flex-auto grid grid-cols-3 gap-4">
            <!-- Drip -->
            <div class="cursor-pointer" on:click={() => openModal('Drip', 'Classic brewed coffee. Rich and flavorful drip coffee. Perfect for your morning routine.')}>
                <Card.Root>
                    <Card.Header>
                        <Card.Title>Drip</Card.Title>
                        <Card.Description>Classic brewed coffee.</Card.Description>
                    </Card.Header>
                    <Card.Content>
                        <p>Rich and flavorful drip coffee.</p>
                    </Card.Content>
                    <Card.Footer>
                        <p>Perfect for your morning routine.</p>
                    </Card.Footer>
                </Card.Root>
            </div>

            <!-- Espresso -->
            <div class="cursor-pointer" on:click={() => openModal('Espresso', 'Strong and bold coffee shot. Concentrated coffee served in a small cup. Ideal for a quick energy boost.')}>
                <Card.Root>
                    <Card.Header>
                        <Card.Title>Espresso</Card.Title>
                        <Card.Description>Strong and bold coffee shot.</Card.Description>
                    </Card.Header>
                    <Card.Content>
                        <p>Concentrated coffee served in a small cup.</p>
                    </Card.Content>
                    <Card.Footer>
                        <p>Ideal for a quick energy boost.</p>
                    </Card.Footer>
                </Card.Root>
            </div>

            <!-- Latte -->
            <div class="cursor-pointer" on:click={() => openModal('Latte', 'Creamy espresso with milk. Rich espresso combined with steamed milk. A great choice for milk lovers.')}>
                <Card.Root>
                    <Card.Header>
                        <Card.Title>Latte</Card.Title>
                        <Card.Description>Creamy espresso with milk.</Card.Description>
                    </Card.Header>
                    <Card.Content>
                        <p>Rich espresso combined with steamed milk.</p>
                    </Card.Content>
                    <Card.Footer>
                        <p>A great choice for milk lovers.</p>
                    </Card.Footer>
                </Card.Root>
            </div>

            <!-- Cafe Mocha -->
            <div class="cursor-pointer" on:click={() => openModal('Cafe Mocha', 'Chocolatey espresso drink. Espresso mixed with steamed milk and chocolate. A sweet indulgence for coffee lovers.')}>
                <Card.Root>
                    <Card.Header>
                        <Card.Title>Cafe Mocha</Card.Title>
                        <Card.Description>Chocolatey espresso drink.</Card.Description>
                    </Card.Header>
                    <Card.Content>
                        <p>Espresso mixed with steamed milk and chocolate.</p>
                    </Card.Content>
                    <Card.Footer>
                        <p>A sweet indulgence for coffee lovers.</p>
                    </Card.Footer>
                </Card.Root>
            </div>

            <!-- Cappuccino -->
            <div class="cursor-pointer" on:click={() => openModal('Cappuccino', 'Frothy espresso drink. Equal parts espresso, steamed milk, and froth. Perfect for a rich coffee experience.')}>
                <Card.Root>
                    <Card.Header>
                        <Card.Title>Cappuccino</Card.Title>
                        <Card.Description>Frothy espresso drink.</Card.Description>
                    </Card.Header>
                    <Card.Content>
                        <p>Equal parts espresso, steamed milk, and froth.</p>
                    </Card.Content>
                    <Card.Footer>
                        <p>Perfect for a rich coffee experience.</p>
                    </Card.Footer>
                </Card.Root>
            </div>

            <!-- Cold Brew -->
            <div class="cursor-pointer" on:click={() => openModal('Cold Brew', 'Chilled coffee for hot days. Slow-steeped coffee served cold. A refreshing pick-me-up.')}>
                <Card.Root>
                    <Card.Header>
                        <Card.Title>Cold Brew</Card.Title>
                        <Card.Description>Chilled coffee for hot days.</Card.Description>
                    </Card.Header>
                    <Card.Content>
                        <p>Slow-steeped coffee served cold.</p>
                    </Card.Content>
                    <Card.Footer>
                        <p>A refreshing pick-me-up.</p>
                    </Card.Footer>
                </Card.Root>
            </div>
        </div>
    </div>

    <!-- Coffee Configuration (Modal) -->
    <CoffeeConfiguration isOpen={isModalOpen} onClose={closeModal} title={modalTitle} description={modalDescription} />
</main>
