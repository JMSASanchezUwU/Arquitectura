// const { Telegraf } = require("telegraf")

// const bot = new Telegraf('6450157363:AAEoQZdQZLlZukap3tj5Nho-gmMK0B4ySNE')

// bot.start((ctx) => {
//     const firstName = ctx.from.first_name;
//     let welcome = `Bienvenido, ${firstName}!.\n\n`;
//     welcome += "Usa los siguientes comandos para brindarte ayuda:\n\n";
//     welcome += "/info - Información del bot.\n";
//     welcome += "/help - Muestra la ayuda del bot.\n";
//     welcome += "/comunicate - Comunicarte con una persona real.\n";
//     welcome += "/pedido - Información de pedido.\n";
//     welcome += "/paqueteria - Información de la paquetería del pedido.\n";
//     ctx.reply(welcome);
// });

// // Comando /info
// bot.command('info', (ctx) => {
//     ctx.reply('Este es un bot de información. Puedo proporcionar detalles sobre cómo usar este bot y responder a tus preguntas.');
// });

// // Comando /help
// bot.command('help', (ctx) => {
//     ctx.reply('¡Claro! Aquí tienes una lista de comandos disponibles:\n\n/info - Información del bot\n/help - Muestra la ayuda del bot\n/comunicate - Comunicarte con una persona real\n/pedido - Información de pedido\n/paqueteria - Información de la paquetería del pedido');
// });

// // Comando /comunicate
// bot.command('comunicate', (ctx) => {
//     ctx.reply('Puedes comunicarte con nosotros enviando un mensaje a este bot. Estamos aquí para ayudarte.');
// });

// // Comando /pedido
// bot.command('pedido', (ctx) => {
//     ctx.reply('El comando /pedido te proporcionará información sobre tus pedidos. Por favor, proporciona más detalles si es necesario.');
// });

// // Comando /paqueteria
// bot.command('paqueteria', (ctx) => {
//     ctx.reply('Con el comando /paqueteria, podrás obtener detalles sobre la paquetería de tus pedidos. Por favor, proporciona más información específica si es necesario.');
// });


// bot.launch()