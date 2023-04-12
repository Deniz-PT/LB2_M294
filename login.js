// Aug funktion von chatGPT
const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#password");

togglePassword.addEventListener("click", function (e) {
  const type =
    password.getAttribute("type") === "password" ? "email" : "password";
  password.setAttribute("type", type);

  this.classList.toggle("fa-eye-slash");
  this.classList.toggle("fa-eye");
});

// von Diego inspiriert
async function checkLoggedIn() {
  const response = await fetch("http://localhost:3011/auth/cookie/status", {
    credentials: "include",
  });

  if (response.ok) {
    window.location.href = "index.html";
  } else if (response.status == 401) {
    alert("username or Password wrong");
  }
}

// von Diego inspiriert
async function tryLogIn() {
  const email = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const response = await fetch("http://localhost:3011/auth/cookie/login", {
    credentials: "include",
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
  checkLoggedIn();
}

async function logout() {
  const response = await fetch("http://localhost:3011/auth/cookie/logout", {
    credentials: "include",
    method: "POST",
  });

  if (response.ok) {
    window.location.href = "login.html";
  } else {
    alert("error logging out");
  }
}
