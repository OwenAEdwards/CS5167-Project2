<script>
  import "./app.css";
  import CoffeeHome from "$lib/CoffeeHome.svelte";
  import InfoBar from "$lib/InfoBar.svelte";

  let selectedUserId = 'profile1'; // Default user ID for initial render

  function handleProfileChange(event) {
    selectedUserId = event.target.value;
    console.log("Profile changed to:", selectedUserId);
  }
</script>

<main>
  <div class="container">
    <div class="eighty-container">
      <div class="header" style="display: flex; align-items: center; justify-content: space-between;">
        <h1 style="font-size: 2em;">Smart Coffee Maker</h1>
        <select class="profile-select" on:change={handleProfileChange}>
          <option value="profile1">Tobey Macguire</option>
          <option value="profile2">Andrew Garfield</option>
          <option value="profile3">Tom Holland</option>
        </select>
      </div>
      <!-- Passing selected user ID to CoffeeHome component -->
      <CoffeeHome userId={selectedUserId} />
    </div>
    <div class="twenty-container">
      <InfoBar />
    </div>
  </div>
</main>
