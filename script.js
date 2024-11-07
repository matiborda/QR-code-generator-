const qrInput = document.getElementById('qrInput');
const generateBtn = document.getElementById('generateBtn');
const qrStage = document.getElementById('qrStage');
const inputStage = document.getElementById('inputStage');
const qrCodeContainer = document.getElementById('qrCodeContainer');
const downloadBtn = document.getElementById('downloadBtn');
const shareBtn = document.getElementById('shareBtn');

let qr;

generateBtn.addEventListener('click', () => {
  const url = qrInput.value.trim();
  if (url) {
    if (!qr) {
      qr = new QRious({
        element: document.createElement('canvas'),
        size: 250
      });
      qrCodeContainer.appendChild(qr.element);
    }
    qr.value = url;

    // Mostrar la segunda etapa
    inputStage.classList.add('hidden');
    qrStage.classList.remove('hidden');
  }
});

downloadBtn.addEventListener('click', () => {
  if (qr && qr.value) {
    const link = document.createElement('a');
    link.href = qr.element.toDataURL();
    link.download = 'QRCode.png';
    link.click();
  }
});

shareBtn.addEventListener('click', () => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(qrInput.value)
      .then(() => alert('URL copiada al portapapeles'))
      .catch(err => alert('Error al copiar: ' + err));
  } else {
    alert('El navegador no soporta copiar al portapapeles');
  }
});

