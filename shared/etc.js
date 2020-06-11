export const sendPatch = (fn, name, state) => state
  ? e => fn({...state, [name]: e.target.value})
  : e => fn({[name]: e.target.value})