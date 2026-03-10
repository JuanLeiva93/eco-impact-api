🌱 EcoImpact Tracker
EcoImpact Tracker es una solución integral (API + Extensión de Navegador) diseñada para concienciar sobre la huella de carbono digital. Permite monitorizar en tiempo real el consumo de datos y su impacto ambiental equivalente en gramos de CO2.


🚀 Características

Monitorización en tiempo real: Cálculo continuo de GB y CO2 mediante Service Workers.
Persistencia: El seguimiento no se detiene al cambiar de pestaña o cerrar el popup.
Seguridad: Comunicación protegida mediante API Key Header.
Backend Robusto: Desarrollado con FastAPI y validación de datos.


🛠️ Estructura del Proyecto

/api: Servidor backend en Python.
/extension: Archivos de la extensión de Chrome (HTML, CSS, JS).


🔧 Instalación y Configuración

1. Backend (API)
Navega a la carpeta api.
Crea un entorno virtual: python -m venv env.
Activa el entorno y instala las dependencias: pip install fastapi uvicorn python-dotenv.
Crea un archivo .env y añade tu clave: API_KEY=tu_clave_secreta.
Inicia el servidor: uvicorn main:app --reload.
3. Extensión de Chrome
Abre extension/popup.js.
Busca la línea del fetch y sustituye "TU_CLAVE_AQUI" por la clave que configuraste en el .env.
Ve a chrome://extensions/ en tu navegador.
Activa el Modo de desarrollador.
Haz clic en Cargar descomprimida y selecciona la carpeta extension.


🛠️ Tecnologías utilizadas
Python / FastAPI
JavaScript (Chrome Extension API)
CSS3 / HTML5
Uvicorn

## Aviso Legal ##
Software bajo licencia Creative Commons Atribución-NoComercial 4.0. El uso comercial requiere licencia pagada. Contactar con Juan Leiva Sánchez.
