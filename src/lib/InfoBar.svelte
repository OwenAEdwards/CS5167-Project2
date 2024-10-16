<script lang="js">
  import * as Card from "$lib/components/ui/card";
  import { Progress } from "$lib/components/ui/progress";

  // Mock data for coffee machine state
  let temperature = 90; // in Celsius
  let pressure = 15; // in bar
  let waterAmount = 70; // percentage
  let beansRemaining = 50; // percentage
  let currentCoffee = "Espresso";
  let timer = "00:45"; // Timer for brewing
  let caffeinePercentage = 85; // percentage
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

  <!-- Timer and Caffeine Percentage -->
  <div class="grid grid-cols-2 gap-4 mt-4">
      <!-- Timer -->
      <Card.Root>
          <Card.Header>
              <Card.Title>Timer</Card.Title>
          </Card.Header>
          <Card.Content>
              <p>{timer}</p>
          </Card.Content>
      </Card.Root>

      <!-- Caffeine Percentage -->
      <Card.Root>
          <Card.Header>
              <Card.Title>Caffeine %</Card.Title>
          </Card.Header>
          <Card.Content>
              <Progress value={caffeinePercentage} />
              <p>{caffeinePercentage}%</p>
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