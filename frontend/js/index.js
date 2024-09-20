$(document).ready(function() {
    let currentPage = 1; 
    const limit = 4;

    initEvents();
    obtenerTareas();

    function initEvents() {
        $('.add-btn').click(handleAddTask);
        $('#filter-btn').click(handleFilter);
        $('#export-excel').click(exportToExcel); 
        $('#export-pdf').click(exportToPdf); 
        $('#export-word').click(exportToWord); 
    }

    function handleAddTask() {
        const taskName = getTaskName();

        if (!isValidTaskName(taskName)) {
            showError('Por favor, ingresa un nombre para la tarea.');
            return;
        }

        hideError();
        createTask(taskName);
    }

    function getTaskName() {
        return $('.form-control').val().trim();
    }

    function isValidTaskName(taskName) {
        return taskName !== "";
    }

    function showError(message) {
        $('.err').text(message).removeClass('hidden');
    }

    function hideError() {
        $('.err').addClass('hidden');
    }

    function createTask(taskName) {
        $.ajax({
            type: "POST",
            url: "../backend/crear_tarea.php",
            data: { nombre: taskName },
            dataType: 'json',
            success: function(response) {
                handleTaskCreationResponse(response, taskName);
            },
            error: function(xhr, status, error) {
                alert('Error creando la tarea: ' + error);
            }
        });
    }

    function handleTaskCreationResponse(response, taskName) {
        if (response.success) {
            console.log(response.message);
            addTaskToList(taskName, response.taskId);
            clearInput();
            obtenerTareas();
        } else {
            alert(response.message);
        }
    }

    function addTaskToList(taskName, taskId, taskState = 'Pendiente', taskFecha) {
        const colorMap = {
            'Pendiente': 'yellow',
            'Realizada': 'green',
            'Cancelada': 'red'
        };
        
        const taskItem = $(`
            <tr data-id="${taskId}">
                <td>${taskName}</td>
                <td>
                    <select class="status-select" 
                            onchange="updateTaskStatus(${taskId}, this)" 
                            style="display: inline-block; margin-left: 5px; padding: 5px; border: none; border-radius: 4px; cursor: pointer; background-color: ${colorMap[taskState]};">
                        <option value="1" ${taskState === 'Pendiente' ? 'selected' : ''}>Pendiente</option>
                        <option value="2" ${taskState === 'Realizada' ? 'selected' : ''}>Realizada</option>
                        <option value="3" ${taskState === 'Cancelada' ? 'selected' : ''}>Cancelada</option>
                    </select>
                </td>
                <td>${taskFecha}</td>
                <td>
                        <button class="btn btn-warning edit-btn" 
                        style="width: 100%; margin-top: 5px;" 
                        onclick="handleEditTask(${taskId}, '${taskName}')">
                    Editar Nombre
                </button>
                    <button class="btn btn-danger delete-btn" 
                            style="width: 100%; margin-top: 5px;" 
                            onclick="handleDeleteTask(${taskId}, this)">
                        Eliminar Tarea
                    </button>
                </td>
            </tr>
        `);
    
        taskItem.find('.delete-btn').click(() => handleDeleteTask(taskId, taskItem));
        taskItem.find('.edit-btn').click(() => handleEditTask(taskId));
        taskItem.find('.status-select').change(() => {
            const selectedState = taskItem.find('.status-select option:selected').text();
            taskItem.find('.status-select').css('background-color', colorMap[selectedState]);
            updateTaskStatus(taskId, taskItem);
        });
    
        $('.todo-list').append(taskItem);
    }
    
    function handleEditTask(taskId, currentName) {
    Swal.fire({
        title: 'Actualizar Nombre de Tarea',
        input: 'text',
        inputLabel: 'Nombre nuevo',
        inputValue: currentName,
        showCancelButton: true,
        confirmButtonText: 'Actualizar',
        cancelButtonText: 'Cancelar',
        preConfirm: (newName) => {
            if (!newName) {
                Swal.showValidationMessage('Por favor, ingresa un nombre válido.');
            }
            return newName;
        }
    }).then((result) => {
        if (result.isConfirmed) {
            updateTaskName(taskId, result.value);
        }
    });
}

function updateTaskName(taskId, newName) {
    $.ajax({
        url: '../backend/actualizar_nombre_tarea.php',
        type: 'POST',
        data: { id: taskId, nombre: newName },
        success: function(response) {
            if (response.success) {
                Swal.fire('¡Éxito!', 'Nombre de tarea actualizado.', 'success');
                obtenerTareas(); 
            } else {
                Swal.fire('Error', response.message, 'error');
            }
        },
        error: function() {
            Swal.fire('Error', 'Ocurrió un error al intentar actualizar el nombre.', 'error');
        }
    });
}

    function clearInput() {
        $('.form-control').val('');
    }

  

function obtenerTareas() {
    $.ajax({
        url: `../backend/obtener_tareas.php?page=${currentPage}&limit=${limit}`,
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            mostrarTareas(data.tasks);
            updatePaginationControls(data.total);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error al obtener tareas:', textStatus, errorThrown);
        }
    });
}

function updatePaginationControls(totalTasks) {
    const totalPages = Math.ceil(totalTasks / limit);
    

    $('#pagination').empty();
    if (currentPage > 1) {
        $('#pagination').append(`<button onclick="changePage(${currentPage - 1})">Anterior</button>`);
    }
    if (currentPage < totalPages) {
        $('#pagination').append(`<button onclick="changePage(${currentPage + 1})">Siguiente</button>`);
    }
}

window.changePage = function(page) {
    currentPage = page;
    obtenerTareas();
};


    function mostrarTareas(tareas) {
        const lista = $('.todo-list');
        lista.empty();

        if (tareas.length === 0) {
            $('.no-items').removeClass('hidden').text('No hay tareas disponibles.');
        } else {
            $('.no-items').addClass('hidden');
            tareas.forEach(function(tarea) {
                addTaskToList(tarea.nombre, tarea.id, tarea.nombre_estado, tarea.fecha_creacion);
            });
        }
    }

    function handleFilter() {
        const filterName = $('#filter-name').val().trim().toLowerCase();
        const filterStatus = $('#filter-status').val();

        $.ajax({
            url: '../backend/obtener_tareas.php',
            method: 'GET',
            dataType: 'json',
            success: function(data) {
             
                const filteredTasks = data.tasks.filter(tarea => {
                    const matchesName = tarea.nombre.toLowerCase().includes(filterName.toLowerCase());
                    const matchesStatus = filterStatus === "" || tarea.nombre_estado == filterStatus;
                    return matchesName && matchesStatus;
                });
                mostrarTareas(filteredTasks);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Error al obtener tareas:', textStatus, errorThrown);
            }
        });
    }

    function handleDeleteTask(taskId, taskItem) {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Esta acción no se puede deshacer.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: '../backend/eliminar_tarea.php',
                    type: 'POST',
                    data: { id: taskId }, 
                    success: function(response) {
                        if (response.success) {
                            taskItem.remove(); 
                            Swal.fire('¡Eliminada!', 'Tarea eliminada exitosamente.', 'success');
                            obtenerTareas(); 
                        } else {
                            Swal.fire('Error', 'Error al eliminar la tarea: ' + response.message, 'error');
                        }
                    },
                    error: function() {
                        Swal.fire('Error', 'Ocurrió un error al intentar eliminar la tarea.', 'error');
                    }
                });
            }
        });
    }
    

    function updateTaskStatus(taskId, taskItem) {
        const newStatus = taskItem.find('.status-select').val();
        $.ajax({
            url: '../backend/actualizar_tarea.php',
            type: 'POST',
            data: {
                id: taskId,
                estado_id: newStatus
            },
            success: function(response) {
                if (response.success) {
                    Swal.fire({
                        title: '¡Éxito!',
                        text: 'Tarea actualizada correctamente.',
                        icon: 'success',
                        confirmButtonText: 'Aceptar'
                    });
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: response.message,
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    });
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                Swal.fire({
                    title: 'Error',
                    text: 'Error al actualizar la tarea.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
        });
    
        console.log(`Task ID: ${taskId}, New Status: ${newStatus}`);
    }
    

    function exportToExcel() {
        window.location.href = '../backend/exportar_excel.php';
    }

    function exportToPdf() {
        window.location.href = '../backend/exportar_pdf.php';
    }

    function exportToWord() {
        window.location.href = '../backend/exportar_word.php';
    }
});
