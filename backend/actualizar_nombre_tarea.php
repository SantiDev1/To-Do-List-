<?php
include 'conexion.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id = $_POST['id'];
    $nombre = $_POST['nombre'];


    $nombre = $conn->real_escape_string($nombre);
    $id = (int)$id; 

    $sql = "UPDATE tareas SET nombre = '$nombre' WHERE id = $id";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => true, "message" => "Nombre de tarea actualizado exitosamente"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error: " . $conn->error]);
    }

    $conn->close();
}
?>
