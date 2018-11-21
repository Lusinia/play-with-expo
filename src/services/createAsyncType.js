export default function createActionTypes(actionType) {
  return {
    SUCCESS: `${actionType}_SUCCESS`,
    CLEAR_ERROR: `${actionType}_CLEAR_ERROR`,
    ERROR: `${actionType}_ERROR`
  };
}