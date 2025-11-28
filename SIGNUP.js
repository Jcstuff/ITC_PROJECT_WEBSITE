document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.querySelector(".signup-form");  // Fixed: Changed from ".login-form" to ".signup-form"
  const usernameInput = signupForm.querySelector('input[type="text"]');
  const passwordInput = signupForm.querySelector('#password');  // Fixed: Select the first password input specifically
  const confirmPasswordInput = signupForm.querySelector('#confirmPassword');

  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    if (username === "" || password === "") {
      alert("Please fill in both username and password.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Get saved accounts or create a new array
    let accounts = JSON.parse(localStorage.getItem("accounts")) || [];

    // Check if username already exists
    const exists = accounts.some(acc => acc.username === username);
    if (exists) {
      alert("Username already exists. Try a different one.");
      return;
    }

    // Add new account
    accounts.push({ username, password });

    // Save back to localStorage
    localStorage.setItem("accounts", JSON.stringify(accounts));

    alert("ACCOUNT CREATED SUCCESSFULLY!");
    window.location.href = "LOGIN.html";  // Fixed: Changed from "LOGINs.html" to "LOGIN.html"
  });
});