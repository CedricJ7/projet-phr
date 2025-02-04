const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const cors = require("cors");
const session = require("express-session");

const app = express();
const port = 3000;

// Connexion à la base de données
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "user_db"
});

db.connect(err => {
    if (err) {
        console.error("Erreur de connexion à la base de données:", err);
        return;
    }
    console.log("Connecté à MySQL");
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(session({
    secret: "secret_key",
    resave: false,
    saveUninitialized: true
}));

// Route pour récupérer les utilisateurs (uniquement si connecté)
app.get("/users", (req, res) => {
    if (!req.session.admin) {
        return res.status(403).json({ error: "Accès refusé" });
    }
    db.query("SELECT first_name, last_name, email FROM users", (err, results) => {
        if (err) return res.status(500).send("Erreur serveur");
        res.json(results);
    });
});

// Route de connexion admin
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    db.query("SELECT * FROM admin WHERE email = ?", [email], (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).json({ error: "Identifiants incorrects" });
        }

        const admin = results[0];
        bcrypt.compare(password, admin.password, (err, match) => {
            if (match) {
                req.session.admin = email;
                res.json({ success: true });
            } else {
                res.status(401).json({ error: "Mot de passe incorrect" });
            }
        });
    });
});
// Route pour vérifier si l'utilisateur est connecté
app.get("/check-auth", (req, res) => {
    if (req.session.admin) {
        res.json({ isLoggedIn: true });
    } else {
        res.json({ isLoggedIn: false });
    }
});

// Route de déconnexion
app.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("login.html");
    });
});


// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur en écoute sur http://localhost:${port}`);
});
