<script>
    function brewLast() {
        console.log("Brew Last button clicked");
    }

    function brewFavorite() {
        console.log("Brew Favorite button clicked");
    }
</script>

<style>
    button {
        margin: 5px;
        padding: 10px;
        font-size: 16px;
    }
</style>

<div>
    <button on:click={brewLast}>Brew Last</button>
    <button on:click={brewFavorite}>Brew Favorite</button>
</div>