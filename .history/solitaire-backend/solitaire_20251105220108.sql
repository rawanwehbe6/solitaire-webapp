CREATE DATABASE IF NOT EXISTS solitaire_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE solitaire_db;

CREATE TABLE IF NOT EXISTS leaderboard (
  id INT AUTO_INCREMENT PRIMARY KEY,
  player_name VARCHAR(100) NOT NULL,
  score INT NOT NULL,
  duration_seconds INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO leaderboard (player_name, score, duration_seconds) VALUES
('rawan', 940, 135),
('charbel', 790, 200),
('nour', 1020, 120),
('george', 860, 185);
