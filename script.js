function generatePoster() {
    const fileInput = document.getElementById('imageUpload');
    const preview = document.getElementById('posterPreview');

    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const img = new Image();
            img.src = e.target.result;

            preview.innerHTML = '';
            preview.appendChild(img);

            // Aquí puedes añadir más código para agregar efectos, como el marco de "Se Busca"
        };

        reader.readAsDataURL(fileInput.files[0]);
    }
}
