<?php
include 'conexion.php';
header('Content-Type: application/json');

$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 100; 
$offset = ($page - 1) * $limit;

$totalSql = "SELECT COUNT(*) as total FROM tareas";
$totalResult = $conn->query($totalSql);
$totalRow = $totalResult->fetch_assoc();
$totalTasks = $totalRow['total'];


$sql = "SELECT tareas.id, tareas.nombre, tareas.fecha_creacion, estados.nombre_estado 
        FROM tareas 
        JOIN estados ON tareas.estado_id = estados.id 
        LIMIT $limit OFFSET $offset";
$result = $conn->query($sql);

$tareas = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $tareas[] = $row;
    }
}


$response = array(
    'total' => $totalTasks,
    'tasks' => $tareas,
);

echo json_encode($response);
$conn->close();
?>
