document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    const fileInput = document.querySelector('input[type="file"]');
    const file = fileInput.files[0];
    const reader = new FileReader();
    
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            // Aquí puedes añadir el código para aplicar el estilo "se busca"
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(file);
});
