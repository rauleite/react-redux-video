import deepFreezeLib from 'deep-freeze'

export function deepFreeze (obj) {
  console.log(__DEV__)
  if (__DEV__) {
    console.log('frozing -----')
    deepFreezeLib(obj)
  }
}
