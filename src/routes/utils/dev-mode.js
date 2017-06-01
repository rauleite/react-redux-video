export const deepFreeze = (obj) => {
  if (__DEV__) {
    require('deep-freeze')(obj)
  }
}

export const ImmutablePropTypes = (
  __DEV__ ?
  require('react-immutable-proptypes') :
  null
)

