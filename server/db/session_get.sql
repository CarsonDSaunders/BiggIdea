SELECT session_id,
    login_info
FROM logins
WHERE user_id = $1;