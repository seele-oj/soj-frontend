<script lang="ts">
  import { onMount } from "svelte";
  let lib: typeof import("soj-wasm");

  let progress_level = 0;

  onMount(async () => {
    lib = await import("soj-wasm");
    await lib.default();
    const canvas = document.getElementById(
      "star-background"
    ) as HTMLCanvasElement;
    lib.start_starfield("star-background", 500);

    // 진행률(%) 증가 시뮬레이션
    const interval = setInterval(() => {
        progress_level += 1;
        progress_level %= 4;
    }, 400);
  });
</script>

<canvas id="star-background"></canvas>

<div class="loader">
  <img src="/flowers.svg" alt="Logo" class="logo" />
  <!-- <div class="progress-bar">
    <div
      class="progress-fill"
      style="width: {`calc(${progress}% - 0.4rem)`}"
    ></div>
  </div> -->
  {#if progress_level == 0}
  <p class="progress-text">Loading</p>
  {/if}
  {#if progress_level == 1}
  <p class="progress-text">Loading.</p>
  {/if}
  {#if progress_level == 2}
  <p class="progress-text">Loading..</p>
  {/if}
  {#if progress_level == 3}
  <p class="progress-text">Loading...</p>
  {/if}
</div>

<style>
  /* 별 배경을 전체 페이지로 고정 */
  canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  .loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: white;
    z-index: 10;
    font-family: sans-serif;
  }

  /* ──────────────────────────────────────────────────────────────────
       로고 회전 애니메이션
    ────────────────────────────────────────────────────────────────── */
  .logo {
    max-width: 200px;
    margin-bottom: 20px;
    /* 애니메이션 추가 */
    animation: rotate 10s linear infinite;
    /* 참고: 아래 duration/함수/반복 횟수를 변경하여 원하는 효과 연출 가능 */
  }

  /* keyframes 정의: 0%에서 360도까지 회전 */
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .progress-bar {
    width: 300px;
    height: 15px;
    border: 0.2rem solid rgba(245, 245, 245, 0.8);
    border-radius: 10px;
    overflow: hidden;
    margin: 0 auto;
  }

  .progress-fill {
    margin-left: 0.2rem;
    margin-top: 0.2rem;
    height: 60%;
    background: rgba(245, 245, 245, 0.8);
    width: 0%;
    border-radius: 10px;
    overflow: hidden;
    transition: width 0.2s ease-out;
  }

  .progress-text {
    margin-top: 10px;
    font-size: 1.2rem;
  }
</style>
