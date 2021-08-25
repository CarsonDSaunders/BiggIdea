UPDATE users
SET password = $2
WHERE user_id = $1;