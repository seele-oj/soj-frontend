<script lang="ts">
  import "./search_bar.css";

  interface Props {
    onSearch?: (query: string) => void;
  }

  export let onSearch: (query: string) => void;
  export let query: string = "";

  let isFocus = false;

  function focusIn(event: Event) {
    isFocus = true;
  }

  function focusOut(event: Event) {
    isFocus = false;
  }

  function onPreSearch(event: CustomEvent) {
    onSearch(query);
  }
</script>

<form on:submit={onPreSearch} class="search-form">
  <div class="search-box {isFocus ? "focus" : ""}">
    <div class="search-icon">
      <img src="/search.svg" alt="Search" />
    </div>
    <input type="text" on:focusout={focusOut} on:focusin={focusIn} bind:value={query} aria-label="Search" />
  </div>
</form>
