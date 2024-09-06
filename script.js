function generatePoster() {
    const fileInput = document.getElementById('imageUpload');
    const preview = document.getElementById('posterPreview');

    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            // Crear un elemento de imagen para mostrar la foto
            const img = new Image();
            img.src = e.target.result;
            img.onload = function() {
                // Crear un canvas para dibujar la imagen y el cartel
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                // Establecer dimensiones del canvas
                canvas.width = img.width;
                canvas.height = img.height;

                // Dibujar el filtro amarillento
                ctx.filter = 'sepia(1)';  // Aplicar filtro sepia
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                // Restablecer el filtro para los siguientes dibujos
                ctx.filter = 'none';

                // Dibujar la imagen en un óvalo
                ctx.globalCompositeOperation = 'destination-in';  // Mantener solo el área del óvalo
                ctx.beginPath();
                ctx.ellipse(canvas.width / 2, canvas.height / 2, canvas.width / 2, canvas.height / 2, 0, 0, 2 * Math.PI);
                ctx.fill();
                ctx.globalCompositeOperation = 'source-over';  // Restaurar el modo de composición

                // Agregar un marco de cartel
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 10;  // Grosor del marco
                ctx.stroke();
                
                // Agregar texto de "Se Busca"
                ctx.font = 'bold 48px "Arial", sans-serif';  // Fuente ajustada para mejor visibilidad
                ctx.fillStyle = 'white';  // Color del texto
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.shadowColor = 'black';  // Agregar sombra para mejor contraste
                ctx.shadowOffsetX = 3;
                ctx.shadowOffsetY = 3;
                ctx.shadowBlur = 5;
                ctx.fillText('SE BUSCA', canvas.width / 2, 20);  // Ajustar la posición vertical

                // Limpiar el contenedor de vista previa
                preview.innerHTML = '';

                // Mostrar el canvas en la vista previa
                preview.appendChild(canvas);
            }
        };

        reader.readAsDataURL(fileInput.files[0]);
    } else {
        alert("Por favor, selecciona una imagen.");
    }
}
