"""
PROYECTO: EcoImpact API
AUTOR: Juan José Leiva Sánchez (C) 2026
LICENCIA: Creative Commons Atribución-NoComercial 4.0
AVISO LEGAL: El uso comercial requiere una licencia pagada.
"""

import os
from dotenv import load_dotenv
from fastapi import FastAPI, Query, Security, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security.api_key import APIKeyHeader

# 1. Carga la clave desde el archivo .env automáticamente
load_dotenv()

app = FastAPI(title="EcoImpact Business API", version="1.0.0")

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

# 2. Lee la variable de entorno que definiste en tu archivo .env
API_KEY = os.getenv("API_KEY") 
api_key_header = APIKeyHeader(name="X-API-Key", auto_error=True)

def validar_api_key(api_key: str = Security(api_key_header)):
    if api_key != API_KEY:
        raise HTTPException(status_code=403, detail="The key is hidden or invalid")
    return api_key

EQUIVALENCIAS_HORA = {
    "Netflix 4K": 85.5,
    "Netflix HD": 35.6,
    "TikTok/Instagram": 11.4,
    "Videollamada": 17.8,
    "Spotify": 0.9,
    "Gaming": 21.4
}

@app.get("/v1/calculate", tags=["Cálculos"])
def calculate_footprint(gb: float = Query(..., gt=0), api_key: str = Security(validar_api_key)):
    co2_g = gb * 0.015 * 475
    arboles = co2_g / 54
    moviles = int(co2_g / 8)
    tabla = {nombre: round(co2_g / valor, 1) for nombre, valor in EQUIVALENCIAS_HORA.items()}
    
    return {
        "resumen": {"co2": round(co2_g, 2), "arboles": round(arboles, 2), "moviles": moviles},
        "tabla_comparativa": tabla
    }