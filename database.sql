CREATE DATABASE user_db;
USE user_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100) UNIQUE
);

INSERT INTO users (first_name, last_name, email) VALUES
('Alice', 'Dupont', 'alice.dupont@example.com'),
('Bob', 'Martin', 'bob.martin@example.com'),
('Charlie', 'Durand', 'charlie.durand@example.com');

CREATE TABLE admin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255)
);

-- Mot de passe "admin123" hashé (bcrypt)
INSERT INTO admin (email, password) VALUES
('admin@example.com', '$2b$10$BpVm2.qFSqNULIoC9/iBKuQh.IvCHCxC9IUJfjP3udFN0T8IHH8Ey');