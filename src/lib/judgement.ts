export enum Judgement {
    Wait = 0x00,
    Compile = 0x10,
    Evaluate = 0x11,
    CompileError = 0x20,
    RuntimeError = 0x21,
    Score = 0x22,
    Accepted = 0x23,
    WrongAnswer = 0x24,
    MemoryLimitExceed = 0x25,
    TimeLimitExceed = 0x26,
    InternalError = 0xFF,
}

export interface JudgeEvaluate {
    percentage: number;
}

export interface JudgeCompileError {
    output: string;
}

export interface JudgeRuntimeError {
    exit_code: number;
    output: string;
}

export interface JudgeScore {
    score: number;
}

export interface JudgeInternalError { 
    output: string;
}

export function mapProgressColor(state: Judgement) {
    switch (state) {
        case Judgement.CompileError:
        case Judgement.WrongAnswer:
        case Judgement.InternalError:
            return "#EF5350";
        default:
            return "#A6ADCE";
    }
}

export function mapJudgementColor(state: Judgement) {
    switch (state) {
        /*case Judgement.CompileError:
        case Judgement.WrongAnswer:
        case Judgement.InternalError:
            return "#EF5350";*/
        default:
            return "var(--btext-color)";
    }
}

export function mapProgressImage(state: Judgement) {
    switch (state) {
        case Judgement.CompileError:
        case Judgement.WrongAnswer:
        case Judgement.InternalError:
            return "url(\"/stripe_red.svg\")";
        default:
            return "url(\"/stripe.svg\")";
    }
}

export function mapDescription(state: Judgement, raw: JudgeEvaluate | JudgeCompileError | JudgeRuntimeError | JudgeScore | null) {
    switch (state) {
        case Judgement.Wait:
            return "대기 중...";
        case Judgement.Compile:
            return "컴파일 중...";
        case Judgement.Evaluate:
            return "채점 중..."
        case Judgement.CompileError:
            return "컴파일 에러";
        case Judgement.RuntimeError:
            return "런타임 에러";
        case Judgement.Score:
            if (raw as JudgeScore != null) {
                return (raw as JudgeScore).score + "점";
            } else {
                return "채점 완료";
            }
        case Judgement.Accepted:
            return "맞았습니다";
        case Judgement.WrongAnswer:
            return "틀렸습니다";
        case Judgement.MemoryLimitExceed:
            return "메모리 초과";
        case Judgement.TimeLimitExceed:
            return "시간 초과";
        case Judgement.InternalError:
            return "채점 오류";
    }
}