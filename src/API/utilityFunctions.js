export async function getJson(res) {
  try {
    var resp = await res.json()
  } catch (e) {
    return {
      error: {
        message: `An error ocurried (${res.status})`
      }
    }
  }
  return resp
}

export function catcher(e) {
  return {
    error: {
      message: `An error ocurried (${e})`
    }
  }
}
