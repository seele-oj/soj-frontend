<script context="module" lang="ts">
  import { afterUpdate, createEventDispatcher, onMount } from "svelte";
  import { isDark } from "$lib/themeStore";

  export type UpdateEditorDetail = {
    input: HTMLTextAreaElement;
    output: HTMLElement;
    content: HTMLElement;
    source: string;
  };

  export type UpdateEditor = CustomEvent<UpdateEditorDetail>;

  const range = (start: number, end: number) =>
    new Array(end - start + 1).fill(0).map((_, i) => i + start);
</script>

<script lang="ts">
  $: (async () => {
    if ($isDark) {
      await import("../styles/code/theme-dark.css");
    } else {
      await import("../styles/code/theme-light.css");
    }
  })();

  export { className as class };
  export let hideLines = false;
  export let lineCount = 1;
  export let source = "";
  /* -------- Styling -------- */
  export let background = null as unknown as string;
  export let fontFamily = "Nanum Gothic Coding";
  export let fontSize = "1rem";
  export let height = "100%";
  export let lineHeight = "initial";
  export let lineNumbersBg = null;
  export let lineNumbersFg = "var(--btext-color)";
  export let padding = "1rem";
  export let padx = "0rem";
  export let pady = "1rem";
  export let tabSize = 2;
  export let width = "100%";

  export let inputClass = "";
  export let outputClass = "";
  export let contentClass = "";
  export let lineNumbersClass = "";

  let input: HTMLTextAreaElement;
  let output: HTMLElement;
  let content: HTMLElement;
  let className = "editor";
  let linesWidth = 0;

  let lastWidth = 0,
    lastHeight = 0;

  const dispatch = createEventDispatcher<{ update: UpdateEditorDetail }>();

  export const update = () => {
    if (output) {
      dispatch("update", { input, output, content, source });
      setTimeout(resizeInput, 0);
    }
  };

  function resizeInput() {
    if (content) {
      const { width, height } = content.getBoundingClientRect();

      if (width != lastWidth) {
        input.style.width = `${width}px`;
        lastWidth = width;
      }

      if (height != lastHeight) {
        input.style.height = `${height}px`;
        lastHeight = height;
      }
    }
  }

  function ident(e: KeyboardEvent) {
    if (e.key == "Tab") {
      e.preventDefault();
      const cursor = input.selectionEnd;
      const [before, after] = [source.slice(0, cursor), source.slice(cursor)];

      source = before + "\t" + after;
      (document.activeElement as HTMLElement).blur();
      update();
      setTimeout(() => (input.selectionEnd = cursor + 1), 0);
      setTimeout(() => input.focus(), 0);
    }
  }

  onMount(update);
  afterUpdate(update);

  $: lineCount = source ? source.split("\n").length : 1;
</script>

<svelte:window on:resize={resizeInput} />

<div
  class="editor {className}"
  style:--background={background}
  style:--fontFamily={fontFamily}
  style:--fontSize={fontSize}
  style:--height={height}
  style:--lineHeight={lineHeight}
  style:--lineNumbersBg={lineNumbersBg}
  style:--lineNumbersFg={lineNumbersFg}
  style:--marginLeft="calc({linesWidth}px + var(--padx))"
  style:--padding={padding}
  style:--padx={padx ?? padding ?? (hideLines ? "1rem" : "0rem")}
  style:--pady={pady ?? padding}
  style:--tabSize={tabSize}
  style:--width={width}
  class:with-bg={!!background}
  on:scroll
>
  {#if !hideLines}
    <ol
      class="lines {lineNumbersClass}"
      class:with-lines-bg={!!lineNumbersBg}
      bind:clientWidth={linesWidth}
    >
      {#each range(1, lineCount) as n}
        <li class={lineNumbersClass}>{n}</li>
      {/each}
    </ol>
  {/if}
  <div class="editor-area">
    <textarea
      class="input {inputClass}"
      spellcheck={false}
      bind:this={input}
      bind:value={source}
      on:input={update}
      on:keydown={ident}
      on:input
      on:keypress
      on:keydown
      on:focus
      on:click
      on:mousedown
      on:mouseup
      on:mousemove
      on:mouseenter
      on:mouseleave
      on:mouseover
    />
    <pre class="content {contentClass}" aria-hidden="true" bind:this={content}>
		<code class="output {outputClass}" bind:this={output} />
	</pre>
  </div>
</div>

<style>
  .editor,
  .editor *,
  .editor *::after,
  .editor *::before {
    box-sizing: border-box;
    margin: 0;
  }

  .editor {
    /* Sizing */
    width: var(--width);
    height: var(--height);
    /* Other */
    position: relative;
  }

  .editor .editor-area {
    position: absolute;
    width: calc(100% - var(--padx) - var(--marginLeft));
    left: var(--marginLeft);
    top: 0;
    height: 100%;
    overflow: auto;
  }

  .lines {
    top: 0;
    left: 0;
    z-index: 10;
    position: sticky;
    color: var(--lineNumbersFg);
    padding: var(--pady) 0.825rem;
    background-color: inherit;
    min-height: 100%;
    height: max-content;
    min-width: 5ch;
    width: max-content;
    font-weight: 600;
    list-style-type: none;
    text-align: right;
  }

  .lines.with-lines-bg {
    background-color: var(--lineNumbersBg);
  }

  .input,
  .output {
    tab-size: var(--tabSize);
    padding: var(--pady) var(--padx);
  }

  .input,
  .output,
  .lines {
    font-family: var(--fontFamily);
    font-size: var(--fontSize);
    line-height: var(--lineHeight);
  }

  .input {
    min-width: 100%;
    min-height: 100%;
  }

  .input {
    overflow: hidden;
  }

  .input,
  .content {
    top: 0;
    left: 0;
    position: absolute;
    white-space: pre;
  }

  .output {
    top: 0;
    left: 0;
    position: absolute;
    white-space: pre;
  }

  .content {
    pointer-events: none;
  }

  .input {
    z-index: 1;
    caret-color: var(--btext-color);
    color: transparent;
    background: transparent;
    resize: none;
    border: none;
    border-radius: 0;
    outline: none;
  }
</style>
