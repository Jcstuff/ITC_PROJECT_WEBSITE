const LOGOUT = document.getElementById('LOGOUTDIV');
const feed = document.getElementById('feed');
const profile = document.getElementById('PROFILE');
const setting = document.getElementById('SETTINGS');

feed.onclick = function () {
  window.location.href = "HOME.html";
}

profile.onclick = function () {
  window.location.href = "PROFILE.html";
}

setting.onclick = function () {
  window.location.href = "SETTINGS.html";
}

LOGOUT.onclick = function(){
  window.location.href = "LOGIN.html";
}

const button = document.getElementById('savechanges');

button.addEventListener("click", (e) => {
  e.preventDefault();


  let accounts = JSON.parse(localStorage.getItem('accounts')) || [];
  const currentUser = document.getElementById('current-username').value.trim();
  const currentPassword = document.getElementById('current-password').value.trim();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!username || !password) {
    alert("Username and password cannot be empty!");
  return;
}

  if (accounts.some(acc => acc.username === currentUser && acc.password === currentPassword)){
  accounts = accounts.filter(acc => !(acc.username === currentUser && acc.password === currentPassword));

  
  const exists = accounts.some(acc => acc.username === username);
  if (exists) {
    alert("Username already exists. Try a different one.");
    return;
  }

 
  accounts.push({ username, password });
  localStorage.setItem("accounts", JSON.stringify(accounts));

  alert("ACCOUNT UPDATED SUCCESSFULLY!");
  localStorage.setItem("PFPUSERNAME", username);
  document.getElementById('PFPNAME').textContent = username;
  window.location.reload();
} else {
  alert("WRONG CURRENT USER OR PASS!");
}
});
