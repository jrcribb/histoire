export function clone (data) {
  try {
    return structuredClone(data)
  } catch (e) {
    console.warn(e, `Fallback to JSON cloning`)
    try {
      return JSON.parse(JSON.stringify(data))
    } catch (e) {
      console.error(e)
    }
    return data
  }
}

export function omit (data, keys: string[]) {
  const copy = {}
  for (const key in data) {
    if (!keys.includes(key)) {
      copy[key] = data[key]
    }
  }
  return copy
}

export function applyState (target: any, state: any, override = false) {
  for (const key in state) {
    if (!override && target[key] && !key.startsWith('_h') && typeof target[key] === 'object' && !Array.isArray(target[key])) {
      Object.assign(target[key], state[key])
    } else {
      target[key] = state[key]
    }
  }
}
