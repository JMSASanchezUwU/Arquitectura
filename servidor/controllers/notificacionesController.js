// Ruta para recibir notificaciones
app.post('/api/notificaciones', (req, res) => {
    const { message } = req.body;
    // Aquí, puedes enviar la notificación al componente de notificaciones en el frontend
    // Asegúrate de configurar CORS adecuadamente para permitir solicitudes desde el frontend.
    // Puedes usar sockets o una API REST para enviar la notificación al frontend.
    // Por ejemplo:
    io.emit('notificacion', message);
    res.status(200).json({ message: 'Notificación recibida' });
  });