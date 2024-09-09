document.getElementById('upload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.getElementById('imagenUsuario');
            img.src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
});

document.getElementById('download').addEventListener('click', function() {
    html2canvas(document.querySelector('.poster')).then(canvas => {
        const context = canvas.getContext('2d');
        const img = document.getElementById('imagenUsuario');

        // Re-dibujar la imagen del usuario en blanco y negro en un nuevo canvas
        const imgCanvas = document.createElement('canvas');
        imgCanvas.width = img.width;
        imgCanvas.height = img.height;
        const imgContext = imgCanvas.getContext('2d');

        imgContext.drawImage(img, 0, 0, img.width, img.height);
        const imgData = imgContext.getImageData(0, 0, imgCanvas.width, imgCanvas.height);
        const data = imgData.data;

        for (let i = 0; i < data.length; i += 4) {
            const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i] = data[i + 1] = data[i + 2] = avg;
        }

        imgContext.putImageData(imgData, 0, 0);

        // Añadir la imagen en blanco y negro al canvas principal
        context.drawImage(imgCanvas, 0, 0, imgCanvas.width, imgCanvas.height, 
                          img.x, img.y, img.width, img.height);

        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'cartel-se-busca.png';
        link.click();
    });
});
