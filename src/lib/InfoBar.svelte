<script lang="js">
  import * as Card from "$lib/components/ui/card";
  import { Progress } from "$lib/components/ui/progress";

  // Mock data for coffee machine state
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

  // Function to start the countdown
  // function startCountdown() {
  //     const interval = setInterval(() => {
  //         timer -= 1;
  //         if (timer <= 0) {
  //             clearInterval(interval);
  //             timer = 0; // Stop at 0
  //         }
  //     }, 1000);
  // }

  // Start the countdown when the component mounts
  // startCountdown();
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
