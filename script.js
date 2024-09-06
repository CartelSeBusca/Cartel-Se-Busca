document.getElementById('uploadForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    
    if (!file) {
        alert("Por favor, selecciona un archivo.");
        return;
    }
    
    const reader = new FileReader();
    
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');
            
            canvas.width = img.width;
            canvas.height = img.height;
            
            // Limpiar el canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Dibujar la imagen subida centrada en el canvas
            ctx.drawImage(img, 0, 0, img.width, img.height);
            
            // Convertir la imagen a blanco y negro
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            
            for (let i = 0; i < data.length; i += 4) {
                const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                data[i] = avg; // Red
                data[i + 1] = avg; // Green
                data[i + 2] = avg; // Blue
            }
            
            ctx.putImageData(imageData, 0, 0);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(file);
});
