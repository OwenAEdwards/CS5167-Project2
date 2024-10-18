<script>
import "./app.css";
import CoffeeHome from "$lib/CoffeeHome.svelte";
import InfoBar from "$lib/InfoBar.svelte";
</script>

<main>
  <div class="container">
    <div class="eighty-container">
      <div class="header" style="display: flex; align-items: center; justify-content: space-between;">
        <h1 style="font-size: 2em;">Smart Coffee Maker</h1>
        <select class="profile-select">
          <option value="profile1">Tobey Macguire</option>
          <option value="profile2">Andrew Garfield</option>
          <option value="profile3">Tom Holland</option>
        </select>
      </div>
      <CoffeeHome />
      
    </div>
    <div class="twenty-container">
      <InfoBar />
    </div>
  </div>
</main>
