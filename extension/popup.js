let uiInterval;

async function updateUI() {
    chrome.storage.local.get(["isRunning", "totalGB"], async (data) => {
        if (data.isRunning && data.totalGB !== undefined) {
            const currentGB = data.totalGB;

            try {
                // Enviamos los GB REALES a tu API de Python
                const response = await fetch(`http://127.0.0.1:8000/v1/calculate?gb=${currentGB}`, {
                    headers: { "X-API-Key": "TU_API_KEY_AQUI" } // <--- CAMBIA ESTO POR TU CLAVE REAL PARA PROBAR
                });
                const result = await response.json();

                document.getElementById('co2').innerText = result.resumen.co2 + " g";
                document.getElementById('gb').innerText = currentGB.toFixed(6) + " GB";
            } catch (error) {
                console.error("Error con la API:", error);
            }
        }
    });
}

document.getElementById('start').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: "start" });
    document.getElementById('start').disabled = true;
    document.getElementById('stop').disabled = false;
    if (!uiInterval) uiInterval = setInterval(updateUI, 1000);
});

document.getElementById('stop').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: "stop" });
    clearInterval(uiInterval);
    document.getElementById('start').disabled = false;
    document.getElementById('stop').disabled = true;
    document.getElementById('co2').innerText = "0 g";
    document.getElementById('gb').innerText = "0.000000 GB";
});

chrome.storage.local.get(["isRunning"], (res) => {
    if (res.isRunning) {
        document.getElementById('start').disabled = true;
        document.getElementById('stop').disabled = false;
        updateUI();
        uiInterval = setInterval(updateUI, 1000);
    }
});