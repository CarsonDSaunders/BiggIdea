INSERT INTO boards (user_id, creation_date, board_name)
VALUES ($1, CURRENT_TIMESTAMP, $2)
RETURNING board_id;