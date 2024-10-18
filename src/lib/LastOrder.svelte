<script lang="js">
  import * as Card from "$lib/components/ui/card";
  import { writable } from "svelte/store";
  import { orderStore } from "$lib/stores";
  import { onDestroy } from "svelte";

  let lastOrder = writable(null);

  const unsubscribeOrder = orderStore.subscribe(orders => {
    const latestOrder = orders[orders.length - 1] || null;
    lastOrder.set(latestOrder);
  });

  // Cleanup subscription on component destroy
  onDestroy(() => {
    unsubscribeOrder();
  });
</script>

<div class="mt-4">
  {#if $lastOrder}
    <Card.Root>
      <Card.Header>
        <Card.Title>Last Order Details</Card.Title>
      </Card.Header>
      <Card.Content>
        <p>Brew: {$lastOrder.title}</p>
        <p>Roast: {$lastOrder.roast}</p>
        <p>Strength: {$lastOrder.strength}</p>
        <p>Size: {$lastOrder.size}</p>
      </Card.Content>
    </Card.Root>
  {:else}
    <p>No orders placed yet.</p>
  {/if}
</div>

<style>
  .mt-4 {
    margin-top: 1rem;
  }
</style>
