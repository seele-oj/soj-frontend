<script lang="ts">
    import { createEventDispatcher, onMount, onDestroy } from "svelte";
  
    export let lang: string = "rs"; // 기본 선택 언어
  
    const dispatch = createEventDispatcher();
    let open = false;
    let selectContainer: HTMLElement; // 드롭다운 전체 컨테이너 참조
  
    interface Language {
        value: string;
        label: string;
    }

    const languages = [
      { value: "rs", label: "Rust" },
      { value: "cpp", label: "C++" },
      { value: "c", label: "C" },
      { value: "py", label: "Python" }
      // 필요시 다른 언어 추가
    ];
  
    function toggleOpen() {
      open = !open;
    }
  
    function selectLanguage(language: Language) {
      lang = language.value;
      open = false;
      dispatch("change", { lang });
    }
  
    // 클릭한 대상이 selectContainer 내부에 없으면 드롭다운을 닫음
    function handleClickOutside(event: MouseEvent) {
      // event.target을 Node로 캐스팅합니다.
      const target = event.target as Node;
      if (selectContainer && !selectContainer.contains(target)) {
        open = false;
      }
    }
  
    onMount(() => {
      window.addEventListener("click", handleClickOutside);
    });
  
    onDestroy(() => {
      window.removeEventListener("click", handleClickOutside);
    });
  </script>
  
  <div class="custom-select" bind:this={selectContainer}>
    <div class="select-trigger" on:click={toggleOpen}>
      <span>{languages.find(l => l.value === lang)?.label}</span>
      <div class="arrow">&#9662;</div>
    </div>
    {#if open}
      <div class="options">
        {#each languages as language}
          <div class="option" on:click={() => selectLanguage(language)}>
            {language.label}
          </div>
        {/each}
      </div>
    {/if}
  </div>
  
  <style>
    @import url("../styles/common/common.css");

    .custom-select {
      position: relative;
      width: 150px;
      font-size: 14px;
      user-select: none;
    }
    .select-trigger {
      background-color: var(--background-color);
      border: 1px solid var(--border-color);
      padding: 6px 32px 6px 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
    }
    .arrow {
      position: absolute;
      right: 8px;
      pointer-events: none;
      font-size: 12px;
      color: var(--btext-color);
    }
    .options {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background-color: var(--background-color);
      border: 1px solid var(--border-color);
      border-top: none;
      z-index: 100;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
    }
    .option {
      padding: 6px 8px;
      cursor: pointer;
    }
    .option:hover {
      background-color: var(--hover-background);
    }
  </style>
  