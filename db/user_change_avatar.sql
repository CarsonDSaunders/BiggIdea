UPDATE users
SET avatar = $2
WHERE user_id = $1;