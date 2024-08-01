const excludedText = "https://taffah.netlify.app/principal/";

function generateQRCode(text, line) {
    if (text === excludedText) {
        return; // Skip this text
    }

    const qrcodeContainer = document.getElementById(`qrcode-${line}`);
    const textBelow = document.getElementById(`text-below-${line}`);
    const printQrcodeContainer = document.getElementById(`print-qrcode-${line}`);
    const printTextBelow = document.getElementById(`print-text-below-${line}`);

    qrcodeContainer.innerHTML = '';
    textBelow.innerHTML = '';
    printQrcodeContainer.innerHTML = '';
    printTextBelow.innerHTML = '';

    if (text) {
        const canvas = document.createElement('canvas');
        const printCanvas = document.createElement('canvas');
        qrcodeContainer.appendChild(canvas);
        printQrcodeContainer.appendChild(printCanvas);

        QRCode.toCanvas(canvas, text, function (error) {
            if (error) {
                console.error(error);
            } else {
                console.log('Code QR généré avec succès!');
                textBelow.textContent = text;
                QRCode.toCanvas(printCanvas, text, function (error) {
                    if (error) {
                        console.error(error);
                    } else {
                        printTextBelow.textContent = text;
                    }
                });
            }
        });
    } else {
        alert('Veuillez entrer du texte ou une URL pour générer le code QR.');
    }
}

document.getElementById('update-btn').addEventListener('click', function() {
    qrcodeCounter = 1; // Reset counter for each update
    for (let i = 1; i <= 5; i++) {
        const text = document.getElementById(`text-input-${i}`).value;
        if (text && text !== excludedText) {
            generateQRCode(text, qrcodeCounter);
            qrcodeCounter++;
        }
    }
});

document.getElementById('generate-btn').addEventListener('click', function() {
    qrcodeCounter = 1; // Reset counter for each generation
    for (let i = 1; i <= 5; i++) {
        const text = document.getElementById(`text-input-${i}`).value;
        if (text && text !== excludedText) {
            generateQRCode(text, qrcodeCounter);
            qrcodeCounter++;
        }
    }
});

document.getElementById('print-btn').addEventListener('click', function() {
    for (let i = 1; i <= 7; i++) {
        const text = document.getElementById(`print-text-below-${i}`).textContent;
        if (text === excludedText) {
            document.getElementById(`print-qrcode-${i}`).style.display = 'none';
            document.getElementById(`print-text-below-${i}`).style.display = 'none';
        }
    }
    window.print();
    for (let i = 1; i <= 7; i++) {
        document.getElementById(`print-qrcode-${i}`).style.display = 'block';
        document.getElementById(`print-text-below-${i}`).style.display = 'block';
    }
});

document.getElementById('edit-btn').addEventListener('click', function() {
    for (let i = 1; i <= 5; i++) {
        const text = prompt(`Modifier le texte ou l'URL pour le champ ${i}:`, document.getElementById(`text-input-${i}`).value);
        if (text !== null) {
            document.getElementById(`text-input-${i}`).value = text;
        }
    }
    document.getElementById('update-btn').click();
});

document.getElementById('delete-btn').addEventListener('click', function() {
    for (let i = 1; i <= 5; i++) {
        document.getElementById(`text-input-${i}`).value = '';
    }
    for (let i = 1; i <= 7; i++) {
        document.getElementById(`qrcode-${i}`).innerHTML = '';
        document.getElementById(`text-below-${i}`).innerHTML = '';
        document.getElementById(`print-qrcode-${i}`).innerHTML = '';
        document.getElementById(`print-text-below-${i}`).innerHTML = '';
    }
});

document.getElementById('back-btn').addEventListener('click', function() {
    for (let i = 1; i <= 5; i++) {
        document.getElementById(`text-input-${i}`).value = '';
    }
    for (let i = 1; i <= 7; i++) {
        document.getElementById(`qrcode-${i}`).innerHTML = '';
        document.getElementById(`text-below-${i}`).innerHTML = '';
        document.getElementById(`print-qrcode-${i}`).innerHTML = '';
        document.getElementById(`print-text-below-${i}`).innerHTML = '';
    }
});
