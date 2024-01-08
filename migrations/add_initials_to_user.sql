-- migrations/add_initials_to_users.sql
ALTER TABLE users ADD COLUMN initials VARCHAR(10);