<?php
require('fpdf/fpdf.php'); // 

class PDF extends FPDF {
    function Header() {
        $this->SetFont('Arial', 'B', 12);
        $this->Cell(0, 10, 'Listado de Tareas', 0, 1, 'C');
        $this->Ln(10);
    }
}

$pdf = new PDF();
$pdf->AddPage();
$pdf->SetFont('Arial', 'B', 12);
$pdf->Cell(10, 10, 'ID', 1);
$pdf->Cell(80, 10, 'Nombre', 1);
$pdf->Cell(40, 10, 'Estado', 1);
$pdf->Cell(50, 10, 'Fecha de Creacion', 1);
$pdf->Ln();

require_once 'conexion.php'; 

$query = "SELECT tareas.id, tareas.nombre, DATE(tareas.fecha_creacion) as fecha_creacion , estados.nombre_estado 
FROM tareas 
JOIN estados ON tareas.estado_id = estados.id
WHERE estados.nombre_estado = 'Realizada'"; 
$result = $conn->query($query);

while ($row = $result->fetch_assoc()) {
    $pdf->Cell(10, 10, $row['id'], 1);
    $pdf->Cell(80, 10, $row['nombre'], 1);
    $pdf->Cell(40, 10, $row['nombre_estado'], 1);
    $pdf->Cell(50, 10, $row['fecha_creacion'], 1);
    $pdf->Ln();
}

$pdf->Output('D', 'tareas.pdf');
?>
