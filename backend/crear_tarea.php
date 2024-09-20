<?php
include 'conexion.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST['nombre'];
    $estado_id = 1; 

    $sql = "INSERT INTO tareas (nombre, estado_id) VALUES ('$nombre', $estado_id)";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => true, "message" => "Tarea creada exitosamente"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error: " . $conn->error]);
    }

    $conn->close();
}
?>
