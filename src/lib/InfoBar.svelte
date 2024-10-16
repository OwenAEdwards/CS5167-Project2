<script lang="js">
  import * as Card from "$lib/components/ui/card";
  import { Progress } from "$lib/components/ui/progress";
  import { dummyData, orderStore } from "$lib/stores";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";

  // Store variables for the coffee machine state
  let temperature = 90; // in Celsius
  let pressure = 15; // in bar
  let waterAmount = 70; // percentage
  let beansRemaining = 50; // percentage
  let currentCoffee = "Espresso";

  // Timer setup
  let countdownTime = 45; // Countdown in seconds
  let timer = countdownTime;

  // Caffeine in milligrams
  let caffeineMilligrams = 85; // milligrams

  // Store to hold the last order details
  let lastOrder = writable(null);

  // Subscribe to the orderStore to get the latest order
  const unsubscribeOrder = orderStore.subscribe(orders => {
    lastOrder.set(orders[orders.length - 1] || null); // Set the latest order
  });

  // Cleanup the subscription on component destroy
  onMount(() => {
    return () => {
      unsubscribeOrder();
    };
  });

  // Function to simulate temperature increase
  function increaseTemperature() {
    const interval = setInterval(() => {
      if (temperature < 100) {
        temperature += 5; // Increase temperature by 5°C
      } else {
        clearInterval(interval);
      }
    }, 1000);
  }

  // Function to simulate pressure behavior
  function simulatePressure() {
    const interval = setInterval(() => {
      if (pressure < 20) {
        pressure += 1; // Increase pressure by 1 bar
      } else {
        clearInterval(interval);
      }
    }, 1000);
  }

  // Function to simulate water amount behavior
  function simulateWaterAmount() {
    const interval = setInterval(() => {
      if (waterAmount > 0) {
        waterAmount -= 5; // Decrease water amount by 5%
      } else {
        clearInterval(interval);
      }
    }, 1000);
  }

  // Function to simulate beans remaining behavior
  function simulateBeansRemaining() {
    const interval = setInterval(() => {
      if (beansRemaining > 0) {
        beansRemaining -= 1; // Decrease beans remaining by 1%
      } else {
        clearInterval(interval);
      }
    }, 1000);
  }

  // Function to change the current coffee brewing
  function changeCurrentBrew(coffeeType) {
    currentCoffee = coffeeType;

    // Get the coffee data from the store
    dummyData.subscribe((data) => {
      const brewInfo = data.find(item => item.currentBrew === coffeeType);
      if (brewInfo) {
        temperature = +brewInfo.temp; // Convert to number
        pressure = +brewInfo.pressure; // Convert to number
        waterAmount = +brewInfo.waterAmt; // Convert to number
        beansRemaining = +brewInfo.beans; // Convert to number
        timer = +brewInfo.timer; // Convert to number
        caffeineMilligrams = +brewInfo.caffAmt; // Convert to number
      }
    })();
  }

  // Function to start the countdown timer
  function startCountdown() {
    const interval = setInterval(() => {
      timer -= 1;
      if (timer <= 0) {
        clearInterval(interval);
        timer = 0; // Stop at 0
      }
    }, 1000);
  }

  // Start brewing process and timer on mount
  onMount(() => {
    increaseTemperature();
    simulatePressure();
    simulateWaterAmount();
    simulateBeansRemaining();
    startCountdown();
  });
</script>

<div class="p-4">
  <!-- Temperature and Pressure -->
  <div class="grid grid-cols-2 gap-4">
      <!-- Temperature -->
      <Card.Root>
          <Card.Header>
              <Card.Title>Temperature</Card.Title>
          </Card.Header>
          <Card.Content>
              <p>{temperature}°C</p>
          </Card.Content>
      </Card.Root>

      <!-- Pressure -->
      <Card.Root>
          <Card.Header>
              <Card.Title>Pressure</Card.Title>
          </Card.Header>
          <Card.Content>
              <p>{pressure} bar</p>
          </Card.Content>
      </Card.Root>
  </div>

  <!-- Water Amount and Beans Remaining -->
  <div class="grid grid-cols-2 gap-4 mt-4">
      <!-- Water Amount -->
      <Card.Root>
          <Card.Header>
              <Card.Title>Water Amount</Card.Title>
          </Card.Header>
          <Card.Content>
              <Progress value={waterAmount} />
              <p>{waterAmount}%</p>
          </Card.Content>
      </Card.Root>

      <!-- Beans Remaining -->
      <Card.Root>
          <Card.Header>
              <Card.Title>Beans Remaining</Card.Title>
          </Card.Header>
          <Card.Content>
              <Progress value={beansRemaining} />
              <p>{beansRemaining}%</p>
          </Card.Content>
      </Card.Root>
  </div>

  <!-- Current Coffee Brewing -->
  <div class="grid grid-cols-1 gap-4 mt-4">
      <Card.Root>
          <Card.Header>
              <Card.Title>Current Coffee Brewing</Card.Title>
          </Card.Header>
          <Card.Content>
              <p>{currentCoffee}</p>
          </Card.Content>
      </Card.Root>
  </div>

  <!-- Timer and Caffeine Milligrams -->
  <div class="grid grid-cols-2 gap-4 mt-4">
      <!-- Timer -->
      <Card.Root>
          <Card.Header>
              <Card.Title>Timer</Card.Title>
          </Card.Header>
          <Card.Content>
              <p>{timer} seconds</p>
          </Card.Content>
      </Card.Root>

      <!-- Caffeine in Milligrams -->
      <Card.Root>
          <Card.Header>
              <Card.Title>Caffeine (mg)</Card.Title>
          </Card.Header>
          <Card.Content>
              <Progress value={caffeineMilligrams} />
              <p>{caffeineMilligrams} mg</p>
          </Card.Content>
      </Card.Root>
  </div>

  <!-- Last Order Details -->
  <div class="mt-4">
      {#if $lastOrder}
          <Card.Root>
              <Card.Header>
                  <Card.Title>Last Order Details</Card.Title>
              </Card.Header>
              <Card.Content>
                  <p>Roast: {$lastOrder.roast}</p>
                  <p>Strength: {$lastOrder.strength}</p>
                  <p>Size: {$lastOrder.size}</p>
              </Card.Content>
          </Card.Root>
      {:else}
          <p>No orders placed yet.</p>
      {/if}
  </div>
</div>

<style>
.p-4 {
  padding: 1rem;
}

.grid {
  display: grid;
}

.grid-cols-2 {
  grid-template-columns: repeat(2, 1fr);
}

.grid-cols-1 {
  grid-template-columns: 1fr;
}

.gap-4 {
  gap: 1rem;
}

.mt-4 {
  margin-top: 1rem;
}
</style>
