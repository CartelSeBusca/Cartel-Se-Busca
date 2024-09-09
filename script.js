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
    const poster = document.querySelector('.poster');
    html2canvas(poster).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'cartel-se-busca.png';
        link.click();
    });
});
