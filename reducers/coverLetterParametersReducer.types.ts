export interface CoverLetterParameters {
  date: Date
  employersName: string
  companyName: string
  companyAddress: string
  jobTitle: string
  specificReasons: string
}

interface CoverLetterParametersReducerActionBase {
  type: 'set' | 'reset'
}

interface CoverLetterParametersReducerActionSet
  extends CoverLetterParametersReducerActionBase {
  type: 'set'
  values: Partial<CoverLetterParameters>
}

interface CoverLetterParametersReducerActionReset
  extends CoverLetterParametersReducerActionBase {
  type: 'reset'
}

export type CoverLetterParametersReducerAction =
  | CoverLetterParametersReducerActionSet
  | CoverLetterParametersReducerActionReset
