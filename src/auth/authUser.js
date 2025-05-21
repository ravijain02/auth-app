export function saveSession(data) {
  localStorage.setItem("auth", JSON.stringify(data));
}

export function getSession() {
  const data = localStorage.getItem("auth");
  return data ? JSON.parse(data) : null;
}

export function clearSession() {
  localStorage.removeItem("auth");
}

export function isLoggedIn() {
  return !!getSession()?.token;
}
