<?php
header("Content-Type: application/vnd.ms-excel");
header("Content-Disposition: attachment; filename=tareas.xls");

require_once 'conexion.php'; 

$query = "SELECT tareas.id, tareas.nombre, tareas.fecha_creacion, estados.nombre_estado 
FROM tareas 
JOIN estados ON tareas.estado_id = estados.id
WHERE estados.nombre_estado = 'Realizada'"; 
$result = $conn->query($query);

if ($result->num_rows > 0) {
    echo "<table border='1'>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Estado</th>
                <th>Fecha de Creación</th>
            </tr>";
    
    while ($row = $result->fetch_assoc()) {
        echo "<tr>
                <td>{$row['id']}</td>
                <td>{$row['nombre']}</td>
                <td>{$row['nombre_estado']}</td>
                <td>{$row['fecha_creacion']}</td>
              </tr>";
    }
    echo "</table>";
} else {
    echo "No hay datos disponibles.";
}
?>
