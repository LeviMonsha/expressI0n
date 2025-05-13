CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  is_adult BOOLEAN NOT NULL,
  gender VARCHAR(10) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  is_dark_theme BOOLEAN NOT NULL,
  created DATE NOT NULL
);
