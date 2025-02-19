<script lang="ts">
  import "./judgeresult.css";
  import "./../DarkMode.svelte";
  import {
    Judgement,
    type JudgeCompileError,
    type JudgeEvaluate,
    type JudgeInternalError,
    type JudgeRuntimeError,
    type JudgeScore,
    mapDescription,
    mapJudgementColor,
    mapProgressColor,
    mapProgressImage,
  } from "$lib/judgement";

  type JudgementRaw =
    | JudgeEvaluate
    | JudgeCompileError
    | JudgeRuntimeError
    | JudgeScore
    | JudgeInternalError
    | null;

  interface Props {
    judge_result: Judgement;
    judge_raw: JudgementRaw;
    id: number;
    progress: number;
  }

  export let judge_result: Judgement = Judgement.Wait;
  export let judge_raw: JudgementRaw = null;
  export let progress: number = 100;
  export let id: number = 1;

  $: progress_width = ((progress / 100.0) * 150.0).toString() + "px";
</script>

<div
  class="judge-row"
  style:--progress-border-color={mapProgressColor(judge_result)}
  style:--judgement-color={mapJudgementColor(judge_result)}
  style:--progress-image={mapProgressImage(judge_result)}
  style:--progress-width={progress_width}
>
  <div class="judge-title">
    #{id}
  </div>
  <div class="judge-progress">
    <div class="judge-bar"></div>
  </div>
  <div class="judge-description">{mapDescription(judge_result, judge_raw)}</div>
  {#if (judge_result & 0x20) !== 0}
  <div class="judge-button">
    <spawn class="material-icons">
        arrow_outward
    </spawn>
  </div>
  {/if}
</div>
