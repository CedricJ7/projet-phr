document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        window.location.href = "/index.html";
      } else {
        document.getElementById("error-message").textContent = data.error;
      }
    })
    .catch(error => console.error("Erreur:", error));
  });
  