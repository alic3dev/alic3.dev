import type {
  CoverLetterParameters,
  CoverLetterParametersReducerAction,
} from '@/reducers/coverLetterParametersReducer.types'

export const getDefaultCoverLetterParameters = (
  overrides: Partial<CoverLetterParameters> = {},
): CoverLetterParameters => ({
  date: new Date(),
  employersName: '',
  companyName: '',
  companyAddress: '',
  jobTitle: '',
  specificReasons: '',
  ...overrides,
})

export const coverLetterParametersReducer: React.Reducer<
  CoverLetterParameters,
  CoverLetterParametersReducerAction
> = (
  prevState: CoverLetterParameters,
  action: CoverLetterParametersReducerAction,
): CoverLetterParameters => {
  if (action.type === 'set') {
    return {
      ...prevState,
      ...action.values,
    }
  }

  if (action.type === 'reset') {
    return getDefaultCoverLetterParameters()
  }

  return { ...prevState }
}
