CREATE TABLE blogs (                
  id SERIAL PRIMARY KEY,
  author text,
  url text NOT NULL,
  title text NOT NULL,
  likes integer DEFAULT 0
);

INSERT INTO blogs (author, url, title) VALUES ('John Doe', 'https://fly.io', 'Fly.io');

INSERT INTO blogs (author, url, title) VALUES ('Jane Doe', 'https://google.com', 'Google');