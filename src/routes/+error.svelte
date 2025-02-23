<script lang="ts">
  import { onMount } from "svelte";
  import Background from "./Background.svelte";
  import { navbarVisible } from "$lib/navbarStore";
  import { requireLoad } from "$lib/loaderStore";

  function handleBack() {
    history.back();
  }

  onMount(async () => {
    navbarVisible.set(false);
    requireLoad.set(false);
  });

  export let errorCode = 404;

  const errorMapping = {
    404: { digits: ["4", "0", "4"], words: ["NOT", "FOUND"] },
    403: { digits: ["4", "0", "3"], words: ["ACCESS", "DENIED"] },
    500: { digits: ["5", "0", "0"], words: ["SERVER", "ERROR"] }
  };

  const errorData = errorMapping[errorCode] || errorMapping[404];
</script>

<Background />

<div class="error-container">
  <div class="row1">
    {#each errorData.digits as digit, i}
      <span class="digit" style="grid-row: {i + 1}; grid-column: 1;">{digit}</span>
    {/each}

    {#each errorData.words as word, i}
      <span
        class="word {i === 0 ? 'not' : 'found'}"
        data-text={word}
        style="grid-row: {i + 1}; grid-column: 2; --delay: {0.2 + i * 0.2}s;"
      >
        <span class="hidden-text">{word}</span>
        {#if i === 0}
          <span class="crack"></span>
        {:else}
          <span class="crack2"></span>
        {/if}
      </span>
    {/each}
  </div>

  <div class="row2" on:click={handleBack}>Back</div>
</div>

<style>
  @import url("./../styles/common/common.css");

  .error-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(11, 11, 11, 0.3);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .row1 {
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: auto auto auto;
    column-gap: 20px;
    margin-bottom: 40px;
    align-items: start;
  }

  .row1 span {
    color: #f5f5f5;
    font-family: "IBM Plex Sans", sans-serif;
  }

  .digit {
    font-size: 64px;
    font-weight: 300;
    line-height: normal;
  }

  .hidden-text {
    visibility: hidden;
  }

  .word {
    position: relative;
    display: inline-block;
    font-size: 40px;
    font-weight: 400;
    line-height: normal;
    margin: 0;
    text-align: left;
    color: transparent;
    justify-self: start;
    align-self: start;
  }

  .word::before,
  .word::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: #f5f5f5;
    font-family: "IBM Plex Sans", sans-serif;
    font-size: 40px;
    font-weight: 400;
    line-height: normal;
  }

  .word.found::before {
    clip-path: polygon(0 -100%, 100% -100%, 100% 400%);
    animation: splitFoundBefore 0.5s forwards;
    animation-delay: var(--delay, 0s);
  }
  .word.found::after {
    clip-path: polygon(0 -100%, 0 200%, 100% 400%);
    animation: splitFoundAfter 0.5s forwards;
    animation-delay: var(--delay, 0s);
  }
  @keyframes splitFoundBefore {
    0% { transform: translate(0, 0); }
    100% { transform: translate(0, -5px); }
  }
  @keyframes splitFoundAfter {
    0% { transform: translate(0, 0); }
    100% { transform: translate(5px, 5px); }
  }

  .word.not::before {
    clip-path: polygon(0 0, 0% 300%, 100% 0%);
    animation: splitNotBefore 0.5s forwards;
    animation-delay: var(--delay, 0s);
  }
  .word.not::after {
    clip-path: polygon(0 300%, 100% 300%, 100% 0);
    animation: splitNotAfter 0.5s forwards;
    animation-delay: var(--delay, 0s);
  }
  @keyframes splitNotBefore {
    0% { transform: translate(0, 0); }
    100% { transform: translate(0, 5px); }
  }
  @keyframes splitNotAfter {
    0% { transform: translate(0, 0); }
    100% { transform: translate(5px, -5px); }
  }

  .crack {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
  .crack::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: 80px;
    height: 1px;
    background: #f5f5f5;
    transform: translate(-14%, -50%) rotate(-62.5deg);
    opacity: 0;
    animation: crackAppear 0.5s forwards;
    animation-delay: var(--delay, 0s);
  }
  .crack2 {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
  .crack2::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: 100px;
    height: 1px;
    background: #f5f5f5;
    transform: translate(-73.5%, -50%) rotate(60deg);
    opacity: 0;
    animation: crackAppear 0.5s forwards;
    animation-delay: var(--delay, 0s);
  }
  @keyframes crackAppear {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .word.not {
    margin-top: 8px;
  }
  .word.found {
    margin-top: 8px;
  }

  .row2 {
    width: 60px;
    text-align: center;
    border: 1px solid #a1bded;
    background: rgba(25, 45, 105, 0.1);
    padding: 12px 24px;
    font-family: "IBM Plex Sans", sans-serif;
    font-size: 18px;
    color: #f5f5f5;
    cursor: pointer;
    user-select: none;
    transition: background 0.3s;
  }
  .row2:hover {
    background: rgba(25, 45, 105, 0.2);
  }
</style>
