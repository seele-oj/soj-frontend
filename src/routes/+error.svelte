<script>
  import Background from "./Background.svelte";

  // Back 버튼 클릭 시 이전 페이지로 이동 (또는 원하는 경로로 변경)
  function handleBack() {
    history.back();
  }
</script>

<Background />

<div class="error-container">
  <!-- Row1: 왼쪽 열에 404, 오른쪽 열에 NOT, FOUND -->
  <div class="row1">
    <!-- 왼쪽 열: 404 숫자들을 세로로 배치 -->
    <span class="digit" style="grid-row: 1; grid-column: 1;">4</span>
    <span class="digit" style="grid-row: 2; grid-column: 1;">0</span>
    <span class="digit" style="grid-row: 3; grid-column: 1;">4</span>

    <!-- 오른쪽 열: NOT과 FOUND (내부 텍스트로 영역 확보, 실제 텍스트는 숨김) -->
    <span
      class="word not"
      data-text="NOT"
      style="grid-row: 1; grid-column: 2; --delay: 0.2s;"
    >
      <span class="hidden-text">NOT</span>
      <span class="crack"></span>
    </span>
    <span
      class="word found"
      data-text="FOUND"
      style="grid-row: 2; grid-column: 2; --delay: 0.4s;"
    >
      <span class="hidden-text">FOUND</span>
      <span class="crack2"></span>
    </span>
  </div>

  <!-- Row2: Back 버튼 -->
  <div class="row2" on:click={handleBack}>Back</div>
</div>

<style>
  @import url("./../styles/common/common.css");

  /* 전체 컨테이너: 전체 화면 고정 및 중앙 정렬 */
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

  /* Row1: 왼쪽 열(3행)과 오른쪽 열(2행)의 2열 그리드 */
  .row1 {
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: auto auto auto;
    column-gap: 20px;
    margin-bottom: 40px;
    align-items: start;
  }

  /* Row1 내부 공통 텍스트 스타일 */
  .row1 span {
    color: #f5f5f5;
    font-family: "IBM Plex Sans", sans-serif;
  }

  /* 왼쪽 열의 404 숫자 스타일 */
  .digit {
    font-size: 64px;
    font-weight: 300;
    line-height: normal;
  }

  /* 내부 텍스트는 보이지 않되 영역은 확보 */
  .hidden-text {
    visibility: hidden;
  }

  /* .word: 단층(분할) 효과 적용 영역 – 실제 표시되는 텍스트는 data-text로 처리 */
  .word {
    position: relative;
    display: inline-block;
    font-size: 40px;
    font-weight: 400;
    line-height: normal;
    margin: 0;
    text-align: left;
    /* 원래 텍스트는 투명하게 처리 */
    color: transparent;
    justify-self: start;
    align-self: start;
  }

  /* pseudo‑element로 data-text 값을 표시하여 분할 효과 구현 */
  /* 두 조각는 동일한 분할면(좌상단→우하단, fault line의 기울기 –45°)을 기준 */
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

  /* FOUND의 경우: 두 조각이 fault line과 평행하게 이동 (fault line 기울기: –45°) */
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
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(0, -5px);
    }
  }
  @keyframes splitFoundAfter {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(5px, 5px);
    }
  }

  /* NOT의 경우: 두 조각이 fault line에 수직(반대쪽)으로 이동하도록 */
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
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(0, 5px);
    }
  }
  @keyframes splitNotAfter {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(5px, -5px);
    }
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
    /* fault line 길이 ≒ √2×100% → 약 141.4% */
    width: 80px;
    height: 1px;
    background: #f5f5f5;
    /* fault line이 -45°이면 crack line도 -45°로 회전해야 평행 */
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
    /* fault line 길이 ≒ √2×100% → 약 141.4% */
    width: 100px;
    height: 1px;
    background: #f5f5f5;
    /* fault line이 -45°이면 crack line도 -45°로 회전해야 평행 */
    transform: translate(-73.5%, -50%) rotate(60deg);
    opacity: 0;
    animation: crackAppear 0.5s forwards;
    animation-delay: var(--delay, 0s);
  }
  @keyframes crackAppear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  /* 미세 위치 조정 (필요시 조정) */
  .word.not {
    margin-top: 8px;
  }
  .word.found {
    margin-top: 8px;
  }

  /* Row2: Back 버튼 스타일 */
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
