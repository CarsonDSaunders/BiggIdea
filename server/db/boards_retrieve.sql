SELECT b.board_id,
    b.creation_date,
    b.board_name,
    q.query_id,
    q.platform_id,
    q.query_text,
    q.capture_mode
FROM boards b
    INNER JOIN queries q ON b.board_id = q.board_id
    AND b.board_id = $1;