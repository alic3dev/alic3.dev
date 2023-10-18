import validLocations from '@/utils/validLocations'

declare global {
  namespace Pages {
    type ValidLocation = (typeof validLocations)[number]
  }
}
