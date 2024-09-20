# Aplicación Web para la Gestión de Tareas

Nuestra aplicación ofrece una solución intuitiva y eficiente para la gestión de tareas. Diseñada para facilitar el proceso tanto para clientes como para profesionales, permite gestionar tareas de manera cómoda y segura. Con características que optimizan la experiencia del usuario, como la creación y actualización en tiempo real, buscamos mejorar el acceso y la visibilidad de las tareas.

## Tabla de Contenidos

1. [Requisitos](#requisitos)
2. [Instalación](#instalación)
3. [Configuración](#configuración)
4. [Uso](#uso)
5. [Contribución](#contribución)
6. [Licencia](#licencia)
7. [Test](#test)

## Requisitos

- PHP (versión 8.0 o superior)
- Servidor Apache o Nginx (se recomienda usar [Laragon](https://laragon.org/))
- MySQL o MariaDB para la base de datos
- Navegador web moderno

## Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/SantiDev1/AppToDoList.git
   cd AppToDoList

2. Configura Laragon o xampp para que apunte al directorio donde clonaste el repositorio.

3. Crea la base de datos en MySQL:

   CREATE DATABASE lista_tareas;

4. Importa el archivo SQL proporcionado en el email

5. Configura las credenciales de la base de datos en el archivo conexion.php:

  header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "lista_tareas";
$port = 3307;

$conn = new mysqli($servername, $username, $password, $dbname, $port);

if ($conn->connect_error) {
    die(json_encode(["error" => "Conexión fallida: " . $conn->connect_error]));
} 

## Configuración

1. Asegúrate de que Laragon o xampp esté configurado correctamente y que el servidor Apache y MySQL estén en funcionamiento.

2. Ajusta las rutas en los archivos PHP si es necesario, para que coincidan con tu entorno local.

## Uso

Para iniciar la aplicación:

1. Abre tu navegador en mi caso el puerto es 81 y visita http://localhost:81/todo_list/frontend/index.html o la URL configurada en Laragon o xampp.

2. La aplicación cargará la interfaz de la lista de tareas, donde podrás crear, editar, eliminar y actualizar el estado de las tareas.

## Contribución

Si quieres contribuir a este proyecto, sigue estos pasos:

1. Haz un fork del repositorio.
2. Clona tu fork localmente.
3. Crea una nueva rama para tu contribución:

   
bash
   git checkout -b mi-contribucion

   Haz commit de tus cambios:

   git commit -m "Descripción de mi contribución"
Haz push de tu rama:

git push origin mi-contribucion

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.

## Test

Para realizar pruebas, simplemente navega por la aplicación y verifica que todas las funcionalidades de CRUD (Crear, Leer, Actualizar, Eliminar) de las tareas funcionen correctamente.

