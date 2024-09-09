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

document.getElementById('leyendaSelect').addEventListener('change', function(event) {
    const textoLeyenda = event.target.value;
    document.getElementById('textoLeyenda').textContent = textoLeyenda;
});

document.getElementById('download').addEventListener('click', function() {
    // Usar html2canvas para capturar la imagen del cartel con el filtro aplicado
    html2canvas(document.querySelector('.poster'), { useCORS: true }).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'cartel-se-busca.png';
        link.click();
    });
});
