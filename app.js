const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware para manejo de errores (opcional)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // CORS: Permitir acceso desde cualquier origen
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Métodos permitidos
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Encabezados permitidos
    next();
});

// Endpoint básico "/hola"
app.get('/hola', (req, res) => {
    res.send('¡Hola desde la API!');
});

// Endpoint de verificación de salud "/health"
app.get('/health', (req, res) => {
    // Este endpoint será utilizado por Azure para verificar la salud de la aplicación
    res.status(200).send('Healthy');  // Respondemos con un estado 200 si la API está funcionando
});

// Configuración para manejar errores (si la ruta no existe)
app.use((req, res, next) => {
    res.status(404).send('Recurso no encontrado');
});

// Configuración para manejar errores en el servidor
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Hubo un error en el servidor');
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
