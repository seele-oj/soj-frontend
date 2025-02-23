<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { navbarVisible, navbarBack } from "$lib/navbarStore";
  import { animationEnded, loadFinished } from "$lib/loaderStore";
  import { goto } from "$app/navigation";
  import Difficulty from "../../../stories/Misc/Difficulty.svelte";
  import "../../../styles/pages/view.css";
  import Paragraph from "../../../stories/Paragraph.svelte";
  import { diffAlt } from "$lib/difficulty";
  import { fade } from "svelte/transition";
  import Button from "../../../stories/Button.svelte";
  import Editor from "../../../stories/Editor.svelte";
  import type { UpdateEditor } from "../../../stories/Editor.svelte";
  import init, {
    format_code,
    problem_description,
    render_markdown,
  } from "soj-wasm-api";
  import LanguageSelect from "../../../stories/LanguageSelect.svelte";
  import DarkModeToggle from "../../../stories/DarkModeToggle.svelte";
  import JudgeResult from "../../../stories/View/JudgeResult.svelte";
  import { Judgement } from "$lib/judgement";
  import { isDark } from "$lib/themeStore";
  import "../../../styles/github-markdown-dark.css";
  import "../../../styles/github-markdown-light.css";
  import renderMathInElement from "$lib/auto-render.mjs";
  import katex from "$lib/katex.mjs";

  let { data } = $props();

  let source = $state("\n\n\n\n");
  let isApiInit = false;

  let problem_number = $state(1000);
  const problem_title = "쿠쿠리아 고아원의 숨바꼭질 놀이";
  const major_level = 9;
  const minor_level = 2;

  let mathCounter = 0;
  const mathMap = new Map<string, string>(); // key: 고유 ID, value: 원본 LaTeX

  function processMarkdownWithMath(md: string): string {
    return md.replace(/\$(.+?)\$/g, (match, p1) => {
      const id = `math-${mathCounter++}`;
      mathMap.set(id, p1);
      return `<span class="math" data-math-id="${id}">$${p1}$</span>`;
    });
  }

  // 외부(left/right) splitter 관련 코드
  let leftWidth = $state(55);
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

  // 내부(files/results) splitter 관련 코드
  let fileAreaHeight = $state(60);
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

  function handleCopy(event: ClipboardEvent) {
    const selection = window.getSelection();
    if (!selection) return;

    const container = document.createElement("div");
    for (let i = 0; i < selection.rangeCount; i++) {
      container.appendChild(selection.getRangeAt(i).cloneContents());
    }

    const mathEls = container.querySelectorAll(".math[data-math-id]");
    mathEls.forEach((el) => {
      const id = el.getAttribute("data-math-id");
      if (id && mathMap.has(id)) {
        const original = mathMap.get(id);
        const textNode = document.createTextNode(`$${original}$`);
        el.parentNode?.replaceChild(textNode, el);
      }
    });

    event.clipboardData?.setData("text/plain", container.textContent || "");
    event.preventDefault();
  }

  let problem_desc = $state("");

  onMount(async () => {
    problem_number = parseInt(data.id);
    await init("/assets/soj_wasm_api_bg.wasm");
    isApiInit = true;
    problem_description(
      window.location.origin,
      problem_number,
      (result: string | null) => {
        if (result != null) {
          let md = render_markdown(result);
          md = processMarkdownWithMath(md);
          let el = document.createElement("div");
          el.innerHTML = md;
          renderMathInElement(el, {
            delimiters: [{ left: "$", right: "$", display: false }],
            throwOnError: false,
          });
          problem_desc = el.innerHTML;
        }
      }
    );
    loadFinished.set(true);
    navbarVisible.set(false);
    navbarBack.set("");
    document.addEventListener("copy", handleCopy);
  });

  onDestroy(() => {
    document.removeEventListener("copy", handleCopy);
  });

  let lang = $state("rs");

  function highlight(e: UpdateEditor) {
    const { output } = e.detail;
    if (isApiInit) output.innerHTML = format_code(source, lang);
  }
  const debouncedHighlight = highlight;

  function handleLangChange(event: CustomEvent) {
    lang = event.detail.lang;
  }

  let settingsOpen = $state(false);
  let isDarkMode = $derived($isDark);
  let isLoaded = $derived($animationEnded);
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/katex@0.16.21/dist/katex.min.css"
    integrity="sha384-zh0CIslj+VczCZtlzBcjt5ppRcsAmDnRem7ESsYwWwg3m/OaJ2l4x7YBZl9Kxxib"
    crossorigin="anonymous"
  />
</svelte:head>

{#if isLoaded}
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
        <button class="title-settings" on:click={() => (settingsOpen = true)}>
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
            <div class="problem-icon problem-icon">
              <span
                class="material-icons"
                style="color: var(--btext-color); line-height: 3.5rem; font-size: 30px;"
              >
                favorite
              </span>
            </div>
            <div class="problem-icon">
              <span
                class="material-icons"
                style="color: var(--btext-color); line-height: 3.5rem; font-size: 30px;"
              >
                how_to_vote
              </span>
            </div>
          </div>
          <h2 style="color: var(--htext-color);">{problem_title}</h2>
        </div>
        <div class="problem-contents">
          <Paragraph name="지문" considerDark={true}>
            <div class="description">
              {#if isDarkMode}
                <div class="markdown-body-dark">
                  {@html problem_desc}
                </div>
              {:else}
                <div class="markdown-body-light">
                  {@html problem_desc}
                </div>
              {/if}
            </div>
          </Paragraph>
          <Paragraph name="입력" considerDark={true}>
            <div class="description"></div>
          </Paragraph>
          <Paragraph name="출력" considerDark={true}>
            <div class="description"></div>
          </Paragraph>
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
          <!-- 파일 영역 (files) -->
          <div class="files" style="height: {fileAreaHeight}%;">
            <div class="file">
              <!-- 파일 제목 영역: 파일명과 언어 선택 콤보박스를 flex 컨테이너로 배치 -->
              <div
                class="file-title"
                style="display: flex; justify-content: space-between; align-items: center;"
              >
                <div class="file-name">solution.{lang}</div>
                <LanguageSelect bind:lang on:change={handleLangChange} />
              </div>
              <!-- 코드 에디터 영역 -->
              <div class="code-block">
                <Editor
                  on:update={debouncedHighlight}
                  bind:source
                  fontFamily="Nanum Gothic Coding"
                  fontSize="1.0rem"
                  width="100%"
                  height="100%"
                  background="#333"
                  class="my-editor"
                />
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
            <div class="result-title">{"실행 결과"}</div>
            <JudgeResult id={1} judge_result={Judgement.Evaluate} />
            <div class="horizontal">
              <div class="horizontal-bar"></div>
            </div>
            <JudgeResult id={2} judge_result={Judgement.WrongAnswer} />
            <div class="horizontal">
              <div class="horizontal-bar"></div>
            </div>
            <JudgeResult id={3} judge_result={Judgement.Accepted} />
            <div class="horizontal">
              <div class="horizontal-bar"></div>
            </div>
            <JudgeResult id={4} judge_result={Judgement.Score} />
            <div class="horizontal">
              <div class="horizontal-bar"></div>
            </div>
            <JudgeResult id={5} judge_result={Judgement.MemoryLimitExceed} />
            <div class="horizontal">
              <div class="horizontal-bar"></div>
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

  <div class="settings-menu" class:open={settingsOpen}>
    <div class="settings-menu-header">
      <button
        class="settings-menu-close"
        on:click={() => (settingsOpen = false)}
      >
        <span class="material-icons">close</span>
      </button>
    </div>
    <div class="settings-container">
      <DarkModeToggle toggleId="darkmode-settings" />
    </div>
  </div>
{/if}
