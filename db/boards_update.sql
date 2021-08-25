UPDATE boards
SET board_name = $2
WHERE board_id = $1;
UPDATE queries
SET query_text = $3,
    capture_mode = $4
WHERE board_id = $1;