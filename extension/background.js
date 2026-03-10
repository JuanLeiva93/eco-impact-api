// Variable para acumular bytes
let accumulatedBytes = 0;

// Escuchador de CUALQUIER trozo de datos que entre (chunked transfer)
chrome.webRequest.onResponseStarted.addListener(
    (details) => {
        chrome.storage.local.get(["isRunning", "totalGB"], (data) => {
            if (data.isRunning) {
                // Intentamos sacar el tamaño de las cabeceras
                const header = details.responseHeaders.find(h => h.name.toLowerCase() === 'content-length');
                let bytes = 0;

                if (header) {
                    bytes = parseInt(header.value);
                } else {
                    // Si es streaming (DASH), no hay content-length. 
                    // Estimamos un tamaño medio por petición de trozo de video (aprox 1MB) 
                    // o ignoramos si queremos precisión quirúrgica.
                    // Para video 4K, cada petición suele ser grande.
                    bytes = 500000; // 0.5MB de media por petición sin cabecera (estimación segura)
                }

                if (!isNaN(bytes)) {
                    const nuevosGB = (data.totalGB || 0) + (bytes / 1073741824);
                    chrome.storage.local.set({ totalGB: nuevosGB });
                }
            }
        });
    },
    { urls: ["<all_urls>"] },
    ["responseHeaders"]
);

// Listener para mensajes del popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "start") {
        chrome.storage.local.set({ isRunning: true, totalGB: 0 });
    } else if (request.action === "stop") {
        chrome.storage.local.set({ isRunning: false });
    }
});