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
    mapProgressBackgroundColor,
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
  }

  export let judge_result: Judgement = Judgement.Wait;
  export let judge_raw: JudgementRaw = null;
  export let id: number = 1;
</script>

<div
  class="judge-row"
>
  <div class="judge-title">
    #{id}
  </div>
  {#if judge_result == Judgement.Evaluate}
  <div class="judge-spinner"></div>
  {:else if judge_result == Judgement.CompileError || judge_result == Judgement.WrongAnswer || judge_result == Judgement.InternalError}
  <div class="judge-failed"></div>
  {:else if judge_result == Judgement.Accepted}
  <div class="judge-success"></div>
  {:else if judge_result == Judgement.MemoryLimitExceed || judge_result == Judgement.TimeLimitExceed || judge_result == Judgement.RuntimeError}
  <div class="judge-warning"></div>
  {:else if judge_result == Judgement.Score}
  <div class="judge-partial"></div>
  {/if}
  <div class="judge-description">{mapDescription(judge_result, judge_raw)}</div>
  {#if (judge_result & 0x20) !== 0}
  <div class="judge-button">
    <spawn class="material-icons">
        arrow_outward
    </spawn>
  </div>
  {/if}
</div>
