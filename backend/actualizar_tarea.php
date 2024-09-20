<?php
include 'conexion.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id = $_POST['id'];
    $nuevo_estado_id = $_POST['estado_id'];

    $sql = "UPDATE tareas SET estado_id = $nuevo_estado_id WHERE id = $id";

    if ($conn->query($sql) === TRUE) {
     
        echo json_encode(["success" => true, "message" => "Estado actualizado exitosamente"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error: " . $conn->error]);
    }

    $conn->close();
}
?>
