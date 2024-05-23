
document.addEventListener('DOMContentLoaded', function() {
    // Mensaje informativo inicial
    addMessageToChat('Chatbot', '¡Hola! Soy el asistente virtual de Javier Aparicio, esta es una demo para mis clientes de Workana. ¿En qué puedo ayudarte hoy?<br><br>Puedes preguntar acerca de los siguientes puntos:<br><br>1. Servicios que realizo<br>2. Preguntar por precios<br>3. Preguntar por los proyectos realizados');
});

document.getElementById('chat-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let userInput = document.getElementById('user-input').value;
    
    // Agregar el mensaje del usuario al chat
    addMessageToChat('Usuario', userInput);

    // Enviar el mensaje a Wit.ai
    fetch('https://api.wit.ai/message?v=20200513&q=' + encodeURIComponent(userInput), {
        headers: {
            'Authorization': 'Bearer N42ZOPMIISEW7U3B47F5PRJDTOXOOXC7'
        }
    })
    .then(response => response.json())
    .then(data => {
        // Obtener el intent name desde el JSON de respuesta
        let intentName = data.intents && data.intents.length > 0 ? data.intents[0].name : null;
        let botResponse;

        switch(intentName) {
            case 'saludar':
                botResponse = '¡Hola! ¿Cómo puedo ayudarte hoy?';
                break;
            case 'precios':
                botResponse = 'Los precios dependerán del proyecto, por lo general el precio suele ser muy asumible y se ajusta a las necesidades de cada uno :)';
                break;
            case 'servicios':
                botResponse = 'Los ámbitos en los que estoy especializado desarrollo de software con c, desarrollo de bots y desarrollo de aplicaciones en Android con java';
                break;
            case 'proyectos':
                    botResponse = 'He realizado múltiples proyectos relacionados con el desarrollo de soluciones software a lo largo de mi vida entre ellos destacan el desarrollo de un bot especializado en cualquier ámbito de negocio o el desarrollo de una aplicación móvil para monitorear las comunicaciones BLE entre 2 dispositivos';
                    break;
            // Añade más casos según tus intents
            default:
                botResponse = 'No estoy seguro de cómo responder a eso.';
                break;
        }

        // Agregar la respuesta del bot al chat
        addMessageToChat('Chatbot', botResponse);
    })
    .catch(error => {
        console.error('Error:', error);
        addMessageToChat('Chatbot', 'Error en la comunicación con Wit.ai');
    });

    // Limpiar el campo de entrada
    document.getElementById('user-input').value = '';
});

function addMessageToChat(sender, message) {
    let chatBox = document.getElementById('chat-box');
    let messageElement = document.createElement('div');
    messageElement.classList.add('chat-message');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Desplazar hacia abajo
}

