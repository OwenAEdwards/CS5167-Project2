<script lang="js">
  import * as Card from "$lib/components/ui/card";
  import { Progress } from "$lib/components/ui/progress";
  import { dummyData, orderStore, isBrewing } from "$lib/stores";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import LastOrder from "$lib/LastOrder.svelte";

  let temperature = null;
  let pressure = null;
  let waterAmount = 100; // Start water at 100%
  let beansRemaining = 100; // Start beans at 100%
  let currentCoffee = "No brew selected";
  let countdownTime = null;
  let timer = countdownTime;
  let caffeineMilligrams = null;
  let lastOrder = writable(null);
  let waterInterval, beansInterval, countdownInterval;

  const unsubscribeOrder = orderStore.subscribe(orders => {
    const latestOrder = orders[orders.length - 1] || null;
    lastOrder.set(latestOrder);
    if (latestOrder) {
      changeCurrentBrew(latestOrder.title);
    }
  });

  onMount(() => {
    return () => {
      unsubscribeOrder();
      clearIntervals();
    };
  });

  function changeCurrentBrew(coffeeType) {
    currentCoffee = coffeeType;

    dummyData.subscribe((data) => {
      const brewInfo = data.find(item => item.currentBrew === coffeeType);
      if (brewInfo) {
        temperature = +brewInfo.temp;
        pressure = +brewInfo.pressure;
        timer = +brewInfo.timer;
        caffeineMilligrams = +brewInfo.caffAmt;

        increaseTemperature();
        simulatePressure();
        startCountdown();
        simulateWaterAmount();
        simulateBeansRemaining();
      } else {
        resetBrew();
      }
    })();
  }

  function increaseTemperature() {
    const interval = setInterval(() => {
      if (temperature < 100) {
        temperature += 5;
      } else {
        clearInterval(interval);
      }
    }, 1000);
  }

  function simulatePressure() {
    const interval = setInterval(() => {
      if (pressure < 20) {
        pressure += 1;
      } else {
        clearInterval(interval);
      }
    }, 1000);
  }

  function simulateWaterAmount() {
    clearInterval(waterInterval); // Clear any existing intervals
    if (currentCoffee !== "No brew selected") {
      waterInterval = setInterval(() => {
        if (timer > 0 && waterAmount > 0) {
          waterAmount -= 1; // Gradually decrease water amount
        } else {
          clearInterval(waterInterval);
        }
      }, 1000);
    }
  }

  function simulateBeansRemaining() {
    clearInterval(beansInterval); // Clear any existing intervals
    if (currentCoffee !== "No brew selected") {
      beansInterval = setInterval(() => {
        if (timer > 0 && beansRemaining > 0) {
          beansRemaining -= 0.5; // Gradually decrease beans remaining
        } else {
          clearInterval(beansInterval);
        }
      }, 1000);
    }
  }

  function resetBrew() {
    currentCoffee = "No brew selected";
    temperature = null;
    pressure = null;
    timer = null;
    caffeineMilligrams = null;
    // Keep waterAmount and beansRemaining unchanged after the brew concludes
  }

  function startCountdown() {
    clearInterval(countdownInterval); // Clear any existing countdown
    isBrewing.set(true); // Set brewing status to true
    countdownInterval = setInterval(() => {
        timer -= 1;
        if (timer <= 0) {
            clearInterval(countdownInterval);
            clearIntervals(); // Stop water/beans countdown
            resetBrew(); // Reset current coffee brewing
            
            // Set isBrewing to false when brewing is finished
            isBrewing.set(false);
        }
    }, 1000);
  }


  function clearIntervals() {
    clearInterval(waterInterval);
    clearInterval(beansInterval);
    clearInterval(countdownInterval);
  }
</script>

<div class="p-4">
  <div class="grid grid-cols-2 gap-4">
      <Card.Root>
          <Card.Header>
              <Card.Title>Temperature</Card.Title>
          </Card.Header>
          <Card.Content>
              {#if temperature !== null}
                <p>{temperature}°C</p>
              {:else}
                <p>No brew selected</p>
              {/if}
          </Card.Content>
      </Card.Root>

      <Card.Root>
          <Card.Header>
              <Card.Title>Pressure</Card.Title>
          </Card.Header>
          <Card.Content>
              {#if pressure !== null}
                <p>{pressure} bar</p>
              {:else}
                <p>No brew selected</p>
              {/if}
          </Card.Content>
      </Card.Root>
  </div>

  <div class="grid grid-cols-2 gap-4 mt-4">
      <Card.Root>
          <Card.Header>
              <Card.Title>Water Amount</Card.Title>
          </Card.Header>
          <Card.Content>
              <Progress value={Math.min(waterAmount, 100)} />
              <p>{Math.min(waterAmount, 100)}%</p> <!-- Always show progress bar and percentage -->
          </Card.Content>
      </Card.Root>

      <Card.Root>
          <Card.Header>
              <Card.Title>Beans Remaining</Card.Title>
          </Card.Header>
          <Card.Content>
              <Progress value={Math.min(beansRemaining, 100)} />
              <p>{Math.min(beansRemaining, 100)}%</p> <!-- Always show progress bar and percentage -->
          </Card.Content>
      </Card.Root>
  </div>

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

  <div class="grid grid-cols-2 gap-4 mt-4">
      <Card.Root>
          <Card.Header>
              <Card.Title>Timer</Card.Title>
          </Card.Header>
          <Card.Content>
              {#if timer !== null}
                <p>{timer} seconds</p>
              {:else}
                <p>No brew selected</p>
              {/if}
          </Card.Content>
      </Card.Root>

      <Card.Root>
          <Card.Header>
              <Card.Title>Caffeine Content</Card.Title>
          </Card.Header>
          <Card.Content>
              {#if caffeineMilligrams !== null}
                <Progress value={Math.min(caffeineMilligrams, 100)} />
                <p>{Math.min(caffeineMilligrams, 100)} mg</p>
              {:else}
                <p>No brew selected</p>
              {/if}
          </Card.Content>
      </Card.Root>
  </div>
  <LastOrder />
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
