<script lang="ts">
  import "./search_bar.css";

  interface Props {
    onSearch?: (query: Event) => void;
  }

  let query = "";

  export let onSearch: (query: Event) => void;

  let isFocus = false;

  function focusIn(event: Event) {
    isFocus = true;
  }

  function focusOut(event: Event) {
    isFocus = false;
  }
</script>

<form on:submit={onSearch} class="search-form">
  <div class="search-box {isFocus ? "focus" : ""}">
    <div class="search-icon">
      <img src="/search.svg" alt="Search" />
    </div>
    <input type="text" on:focusout={focusOut} on:focusin={focusIn} bind:value={query} aria-label="Search" />
  </div>
</form>
