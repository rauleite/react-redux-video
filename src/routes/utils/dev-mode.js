import deepFreezeLib from 'deep-freeze'

export function deepFreeze (obj) {
  if (__DEV__) {
    deepFreezeLib(obj)
  }
}
