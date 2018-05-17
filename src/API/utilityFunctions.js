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

export function getToken() {
  try {
    return localStorage.getItem('token')
  } catch (e) {
    console.log("Can't get token from localStorage")
  }
}
