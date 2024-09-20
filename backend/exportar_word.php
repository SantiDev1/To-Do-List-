<?php
header("Content-Type: application/vnd.ms-word");
header("Content-Disposition: attachment; filename=tareas.doc");

require_once 'conexion.php'; 

$query = "SELECT tareas.id, tareas.nombre, tareas.fecha_creacion, estados.nombre_estado 
FROM tareas 
JOIN estados ON tareas.estado_id = estados.id
WHERE estados.nombre_estado = 'Realizada'"; 
$result = $conn->query($query);

if ($result->num_rows > 0) {
    echo "<html>";
    echo "<head>";
    echo "<style>";
    echo "table { border-collapse: collapse; width: 100%; }";
    echo "th, td { border: 1px solid black; padding: 8px; text-align: left; }";
    echo "</style>";
    echo "</head>";
    echo "<body>";
    echo "<h2>Listado de Tareas</h2>";
    echo "<table>
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
    echo "</body></html>";
} else {
    echo "No hay datos disponibles.";
}
?>
