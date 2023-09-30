export const validLocations = ['home', 'work', 'personal', 'contact'] as const
export type ValidLocation = (typeof validLocations)[number]
