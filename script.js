document.addEventListener("DOMContentLoaded", function () {
    fetch("/users")
        .then(response => {
            if (response.status === 403) {
                window.location.href = "/login.html";
            }
            return response.json();
        })
        .then(users => {
            let tableBody = document.querySelector("#user-table tbody");
            users.forEach(user => {
                let row = document.createElement("tr");
                row.innerHTML = `<td>${user.first_name}</td><td>${user.last_name}</td><td>${user.email}</td>`;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error("Erreur:", error));
});

// Déconnexion
function logout() {
    fetch("/logout")
        .then(() => window.location.href = "login.html");
}
