<?php
include 'conexion.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id = $_POST['id'];

  
    $id = intval($id);

    $sql = "DELETE FROM tareas WHERE id = ?";
    $stmt = $conn->prepare($sql);
    
    if ($stmt) {
        $stmt->bind_param("i", $id); 

        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Tarea eliminada exitosamente"]);
        } else {
            echo json_encode(["success" => false, "message" => "Error al eliminar la tarea: " . $stmt->error]);
        }

        $stmt->close();
    } else {
        echo json_encode(["success" => false, "message" => "Error en la consulta: " . $conn->error]);
    }

    $conn->close();
}
?>
