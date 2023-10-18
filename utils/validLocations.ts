export const validLocations = ['home', 'focus', 'work', 'contact'] as const
export type ValidLocation = (typeof validLocations)[number]
