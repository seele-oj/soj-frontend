<script lang="ts">
  import { onMount, tick } from "svelte";
  import { navbarVisible, navbarBack } from "$lib/navbarStore";
  import { apiNeeded } from "$lib/loaderStore";
  import { goto } from "$app/navigation";
  import Difficulty from "../../../stories/Misc/Difficulty.svelte";
  import "../../../styles/pages/view.css";
  import Paragraph from "../../../stories/Paragraph.svelte";
  import { diffAlt } from "$lib/difficulty";
  import { fade } from "svelte/transition";
  import Button from "../../../stories/Button.svelte";

  const problem_number = 1000;
  const problem_title = "쿠쿠리아 고아원의 숨바꼭질 놀이";
  const major_level = 9;
  const minor_level = 2;

  // 에디터 내용 (기본 내용)
  let codeContent = "/* 여기에 코드를 입력하세요. */";
  $: lines = codeContent.split('\n');

  // 외부(left/right) splitter
  let leftWidth = 55;
  let isDragging = false;
  function handleMouseDown(event: MouseEvent) {
    if (window.innerWidth <= 768) return;
    isDragging = true;
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  }
  function handleMouseMove(event: MouseEvent) {
    if (!isDragging) return;
    const container = document.querySelector(".split-view") as HTMLElement;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    let newLeftWidth = ((event.clientX - rect.left) / rect.width) * 100;
    newLeftWidth = Math.max(10, Math.min(90, newLeftWidth));
    leftWidth = newLeftWidth;
  }
  function handleMouseUp(event: MouseEvent) {
    isDragging = false;
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  }

  // 내부(files/results) splitter
  let fileAreaHeight = 60;
  let codeIsDragging = false;
  function handleCodeMouseDown(event: MouseEvent) {
    if (window.innerWidth <= 768) return;
    codeIsDragging = true;
    window.addEventListener("mousemove", handleCodeMouseMove);
    window.addEventListener("mouseup", handleCodeMouseUp);
  }
  function handleCodeMouseMove(event: MouseEvent) {
    if (!codeIsDragging) return;
    const container = document.querySelector(".code-area") as HTMLElement;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    let newFileHeight = ((event.clientY - rect.top) / rect.height) * 100;
    newFileHeight = Math.max(10, Math.min(90, newFileHeight));
    fileAreaHeight = newFileHeight;
  }
  function handleCodeMouseUp(event: MouseEvent) {
    codeIsDragging = false;
    window.removeEventListener("mousemove", handleCodeMouseMove);
    window.removeEventListener("mouseup", handleCodeMouseUp);
  }

  onMount(async () => {
    await tick();
    navbarVisible.set(false);
    navbarBack.set("");
    apiNeeded.set(true);
  });
</script>

<div class="title-bar">
  <div class="row">
    <button
      class="title-back-button"
      style="margin-left: 10px;"
      on:click={() => goto("/")}
      in:fade
    >
      <span class="material-icons">arrow_back</span>
    </button>
    {"#" + problem_number.toString()}
    <div class="problem-title">
      {problem_title}
    </div>
    <div class="right">
      <button class="title-settings">
        <span class="material-icons">settings</span>
      </button>
    </div>
  </div>
</div>

<!-- 문제 영역: 왼쪽은 문제 지문, 오른쪽은 코드 에디터 등 -->
<div class="problem">
  <div class="split-view">
    <div class="left-column" style="width: {leftWidth}%;">
      <div class="problem-title">
        <div class="problem-diff">
          <div style="margin-right: 10px">
            <Difficulty {major_level} {minor_level} />
          </div>
          <span
            class="material-icons"
            style="color: var(--btext-color); line-height: 3.5rem; font-size: 30px;"
            >favorite</span
          >
          <span
            class="material-icons"
            style="color: var(--btext-color); line-height: 3.5rem; font-size: 30px;"
            >how_to_vote</span
          >
        </div>
        <h2 style="color: var(--htext-color);">{problem_title}</h2>
      </div>
      <div class="problem-contents">
        <Paragraph name="지문" considerDark={true}>
          <div class="description">
            쿠쿠리아 고아원의 모두가 함께 N×M 크기의 앞마당에서 숨바꼭질을 하고
            있어요. 놀이를 하기 위해서 술래를 정한 결과 제레가 술래로 뽑혔어요.
            <br />
            하지만, 제레는 혼자 드넓은 앞마당을 돌아다니기 무서워서 브로냐 언니도
            함께 술래를 하기로 했어요. 셋.. 둘.. 하나.. 이제 쿠쿠리아 고아원의 아이들을
            찾을 때가 왔어요.
            <br /><br />
            하지만 어찌된 일인지 아이들은 보이지 않았답니다. 심술궂은 신 말의 장난으로
            아이들이 붕괴능에 의해 모두 투명하게 보이게 되었답니다. 하지만 성흔의
            각성자이자 붕괴능 재능이 높은 제레는 최대 k번 잠시 t초 동안 투명해진
            아이들을 볼 수 있습니다. 브로냐와 제레를 제외한 숨바꼭질에 참여하는 모든
            아이들은 매 초마다 다음 규칙으로 이동합니다:
          </div>
        </Paragraph>
        <Paragraph name="입력" considerDark={true}></Paragraph>
        <Paragraph name="출력" considerDark={true}></Paragraph>
      </div>
    </div>

    <!-- 외부 splitter (좌/우 영역) -->
    <div class="splitter" on:mousedown={handleMouseDown}>
      <div class="handle handle-vertical">
        <div class="rect"></div>
        <div class="rect"></div>
        <div class="rect"></div>
      </div>
    </div>

    <div class="right-column" style="width: {100 - leftWidth}%;">
      <div class="code-area">
        <div class="files" style="height: {fileAreaHeight}%;">
          <div class="file">
            <div class="file-title">
              {"solution.rs"}
            </div>
            <!-- 수정된 code-block -->
            <div class="code-block">
              <div class="code-editor">
                <div class="line-numbers">
                  {#each lines as _, i}
                    <div class="line-number">{i + 1}</div>
                  {/each}
                </div>
                <div
                  class="code-content"
                  contenteditable="true"
                  on:keydown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const selection = window.getSelection();
                      if (selection && selection.rangeCount > 0) {
                        const range = selection.getRangeAt(0);
                        // <br> 태그 삽입
                        const br = document.createElement("br");
                        range.insertNode(br);
                        // 커서를 <br> 뒤로 이동
                        range.setStartAfter(br);
                        range.collapse(true);
                        selection.removeAllRanges();
                        selection.addRange(range);
                        // on:input 이벤트가 발생하도록 강제로 dispatch (선택사항)
                        e.currentTarget.dispatchEvent(new Event("input"));
                      }
                    }
                  }}
                  on:input={(e) => (codeContent = e.currentTarget.innerText)}
                  bind:innerText={codeContent}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <!-- 내부 splitter (files/results) -->
        <div class="code-splitter" on:mousedown={handleCodeMouseDown}>
          <div class="handle handle-horizontal">
            <div class="rect"></div>
            <div class="rect"></div>
            <div class="rect"></div>
          </div>
        </div>
        <div
          class="results"
          style="height: calc({100 - fileAreaHeight}% - 22px);"
        >
          <div class="result-title">
            {"실행 결과"}
          </div>
        </div>
      </div>
      <div class="action-area">
        <div class="right-area">
          <Button text="제출" />
        </div>
      </div>
    </div>
  </div>
</div>
