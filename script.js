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

                // Dibujar la imagen en el canvas
                ctx.drawImage(img, 0, 0);

                // Agregar un marco de cartel
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 8;  // Ajustar el grosor del marco
                ctx.strokeRect(0, 0, canvas.width, canvas.height);

                // Agregar texto de "Se Busca"
                ctx.font = 'bold 50px "Times New Roman", serif';  // Fuente estilo viejo oeste
                ctx.fillStyle = 'white';  // Color del texto
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.shadowColor = 'black';  // Sombra del texto
                ctx.shadowOffsetX = 2;
                ctx.shadowOffsetY = 2;
                ctx.shadowBlur = 2;
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
