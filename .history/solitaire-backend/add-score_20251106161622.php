<?php
header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($input['name'])) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Missing player name'
    ]);
    exit;
}

$playerName = trim($input['name']);

if ($playerName === '') {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Player name cannot be empty'
    ]);
    exit;
}


$score = rand(100, 1000);
$durationSeconds = rand(30, 600);

require_once 'db/db.php';

$stmt = $mysqli->prepare(
    "INSERT INTO leaderboard (player_name, score, duration_seconds)
     VALUES (?, ?, ?)"
);

if (!$stmt) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Prepare failed: ' . $mysqli->error
    ]);
    exit;
}

$stmt->bind_param('sii', $playerName, $score, $durationSeconds);

if (!$stmt->execute()) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Execute failed: ' . $stmt->error
    ]);
    $stmt->close();
    exit;
}

$newId = $stmt->insert_id;
$stmt->close();

echo json_encode([
    'success' => true,
    'data' => [
        'id' => $newId,
        'player_name' => $playerName,
        'score' => $score,
        'duration_seconds' => $durationSeconds
    ]
]);
