# 🌱 EcoImpact Tracker

**EcoImpact Tracker** es una solución integral (API + Extensión de Navegador) diseñada para concienciar sobre la huella de carbono digital. Permite monitorizar en tiempo real el consumo de datos y su impacto ambiental equivalente en gramos de CO2.



## 🚀 Características
- **Monitorización en tiempo real:** Cálculo continuo de GB y CO2 mediante Service Workers.
- **Persistencia:** El seguimiento no se detiene al cambiar de pestaña o cerrar el popup.
- **Seguridad:** Comunicación protegida mediante API Key Header.
- **Backend Robusto:** Desarrollado con FastAPI y validación de datos.

## 🛠️ Estructura del Proyecto
- `/api`: Servidor backend en Python.
- `/extension`: Archivos de la extensión de Chrome (HTML, CSS, JS).

## 🔧 Instalación y Configuración

### 1. Backend (API)
1. Navega a la carpeta `api`.
2. Crea un entorno virtual: `python -m venv env`.
3. Activa el entorno y instala las dependencias: `pip install fastapi uvicorn python-dotenv`.
4. Crea un archivo `.env` y añade tu clave: `API_KEY=tu_clave_secreta`.
5. Inicia el servidor: `uvicorn main:app --reload`.

### 2. Extensión de Chrome
1. Abre `extension/popup.js`.
2. Busca la línea del `fetch` y sustituye `"TU_CLAVE_AQUI"` por la clave que configuraste en el `.env`.
3. Ve a `chrome://extensions/` en tu navegador.
4. Activa el **Modo de desarrollador**.
5. Haz clic en **Cargar descomprimida** y selecciona la carpeta `extension`.

---
## 🛠️ Tecnologías utilizadas
- **Python / FastAPI**
- **JavaScript (Chrome Extension API)**
- **CSS3 / HTML5**
- **Uvicorn**
## Aviso Legal
Software bajo licencia Creative Commons Atribución-NoComercial 4.0. 
El uso comercial requiere licencia pagada. Contactar con Juan José Leiva Sánchez.