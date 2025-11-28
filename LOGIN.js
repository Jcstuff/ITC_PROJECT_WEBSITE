document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector(".login-form");
  const usernameInput = loginForm.querySelector('input[type="text"]');
  const passwordInput = loginForm.querySelector('input[type="password"]');
  const adminButton = document.getElementById("downloadAccounts");
  const resetButton = document.getElementById("resetStorage");
  const attemptIndicator = document.getElementById("attemptIndicator");
  const loginBtn = document.getElementById("loginBtn");

  // Hide admin button by default
  if (adminButton) {
    adminButton.style.display = "none";
  }

  // Load attempts and update indicator
  let attempts = parseInt(localStorage.getItem("loginAttempts")) || 0;
  const maxAttempts = 3;
  const remaining = maxAttempts - attempts;
  attemptIndicator.textContent = `Attempts left: ${remaining > 0 ? remaining : 0}`;

  // Disable button if already at max attempts
  if (attempts >= maxAttempts) {
    loginBtn.disabled = true;
    attemptIndicator.textContent = "Attempts left: 0 (Access blocked)";
  }

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

  

    if (attempts >= maxAttempts) {
      alert("Maximum login attempts reached (3). Access is now blocked.");
      return;
    }

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    localStorage.setItem("PFPUSERNAME",username);

    if (username === "" || password === "") {
      alert("Please fill in both fields.");
      return;
    }

    let accounts = JSON.parse(localStorage.getItem("accounts")) || [];

    const found = accounts.find(
      acc => acc.username === username && acc.password === password
    );

    if (username === "admin" && password === "202515232") {
        if (adminButton) adminButton.style.display = "block";
    }

    if (found) {
      alert("Login successful!");
      localStorage.setItem("loginAttempts", 0);
      localStorage.setItem("currentUser", username);
      window.location.href = "HOME.html";
      
    } else if (username === "admin" && password === "202515232") {
      // admin logged in but no redirect
    } else {
      attempts++;
      localStorage.setItem("loginAttempts", attempts);
      const remaining = maxAttempts - attempts;
      attemptIndicator.textContent = `Attempts left: ${remaining > 0 ? remaining : 0}`;

      if (attempts >= maxAttempts) {
        loginBtn.disabled = true;
        attemptIndicator.textContent = "Attempts left: 0 (Access blocked)";
        alert("Incorrect! You have used all 3 attempts. Access blocked.");
      } else {
        alert(`Incorrect username or password. Attempts left: ${remaining}`);
      }
    }
  });

  // Reset local storage button
  if (resetButton) {
    resetButton.addEventListener("click", () => {
      localStorage.clear(); // Clears all localStorage data
      attempts = 0;
      attemptIndicator.textContent = "Attempts left: 3";
      loginBtn.disabled = false;
      if (adminButton) adminButton.style.display = "none";
      alert("Local storage reset! Attempts and accounts cleared.");
    });
  }

  if (adminButton) {
    adminButton.addEventListener("click", () => {
      const data = localStorage.getItem("accounts");

      if (!data) {
        alert("No accounts found in localStorage.");
        return;
      }

      const blob = new Blob([data], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "accounts.json";
      a.click();

      URL.revokeObjectURL(url);
    });
  }
});