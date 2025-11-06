<?php

header('Content-Type: application/json');

require_once 'db/db.php';

$sql = "SELECT id, player_name, score, duration_seconds, created_at
        FROM leaderboard
        ORDER BY score DESC, duration_seconds ASC
        LIMIT 20";

$result = $mysqli->query($sql);

if (!$result) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Database query failed: ' . $mysqli->error
    ]);
    exit;
}

$rows = [];
while ($row = $result->fetch_assoc()) {
    $rows[] = $row;
}

echo json_encode([
    'success' => true,
    'data' => $rows
]);
