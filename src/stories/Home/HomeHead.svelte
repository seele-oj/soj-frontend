<script lang="ts">
  import { onMount, tick, createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import { spring } from "svelte/motion";

  import "./homehead.css";
  import SearchBar from "../../stories/SearchBar.svelte";

  interface Props {
    isAnimationEnded: boolean;
  }
  export let isAnimationEnded: boolean = false;

  const dispatch = createEventDispatcher();

  // 타이핑 애니메이션 관련
  let typingStarted: boolean = false;
  const typing_text1: string = "모두를";
  const typing_text2: string = "위한";
  const typing_text3: string = "온라인저지";

  let line1: string[] = [];
  let line2: string[] = [];
  let line3: string[] = [];

  async function typeTextArray(
    fullText: string,
    updateFn: (arr: string[]) => void,
    delay: number = 200
  ) {
    let arr: string[] = [];
    for (let i = 0; i < fullText.length; i++) {
      arr.push(fullText[i]);
      updateFn([...arr]);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  async function typeAllText() {
    await typeTextArray(typing_text1, (arr) => (line1 = arr));
    await typeTextArray(typing_text2, (arr) => (line2 = arr));
    await typeTextArray(typing_text3, (arr) => (line3 = arr));
  }

  $: if (isAnimationEnded && !typingStarted) {
    typingStarted = true;
    tick().then(() => {
      typeAllText();
    });
  }

  // 검색 실행 시 상태 관리 및 상위 컴포넌트에 이벤트 전파
  let searchActivated: boolean = false;
  function handleSearch(event: string) {
    searchActivated = true;
    dispatch("search", event);
  }

  // container2의 top 위치를 spring으로 애니메이션 처리
  // 초기 top 값은 125px, 검색 활성화되면 100px로 이동
  const topPosition = spring(125, {
    stiffness: 0.05, // 스프링 강도 (값을 조정하면서 부드러움 및 탄력성을 조절)
    damping: 0.5    // 감쇠 계수 (값을 조정하면서 넘침현상 방지)
  });

  // searchActivated 값이 바뀔 때마다 spring의 값을 업데이트합니다.
  $: topPosition.set(searchActivated ? -123 : 125);
</script>

<div class="home-head { searchActivated ? 'no-border' : '' }">
  {#if !searchActivated}
    <div class="sea-of-quanta is-not-dark-mode">
      <enhanced:img
        src="/static/sea-of-quanta.png"
        draggable="false"
        alt="Background"
      />
    </div>
    <div class="sea-of-quanta is-dark-mode">
      <enhanced:img
        src="/static/sea-of-quanta-dark.png"
        draggable="false"
        alt="Background"
      />
    </div>
    <div class="sea-of-quanta-effect"></div>
    <div class="head-logo">
      <div class="show-small">
        <div class="home-logo">
          <img src="/seele-oj-logo_bright.svg" draggable="false" alt="Logo" />
        </div>
      </div>
    </div>
  {/if}
  <!-- inline style로 top 값을 바인딩하여 spring 애니메이션 적용 -->
  <div class="container2" style="top: {$topPosition}px">
    {#if !searchActivated}
      <div class="atext1" out:fade>
        <span>
          {#each line1 as char, index (index)}
            <span in:fade>{char}</span>
          {/each}
          {#if line1.length !== typing_text1.length}
            <span class="cursor">|</span>
          {/if}
        </span>
        <br />
        <span>
          {#each line2 as char, index (index)}
            <span in:fade>{char}</span>
          {/each}
          {#if line1.length === typing_text1.length && line2.length !== typing_text2.length}
            <span class="cursor">|</span>
          {/if}
        </span>
        <br />
        <span>
          {#each line3 as char, index (index)}
            <span in:fade>{char}</span>
          {/each}
          {#if line1.length === typing_text1.length && line2.length === typing_text2.length && line3.length !== typing_text3.length}
            <span class="cursor">|</span>
          {/if}
        </span>
        <br /><br />
      </div>
    {/if}
    <div class="search-bar-container">
      <SearchBar onSearch={handleSearch} />
    </div>
  </div>
</div>
