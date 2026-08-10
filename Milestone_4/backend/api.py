import os
import shutil
import uuid

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from services.integration import IntegrationService

app = FastAPI(title="Sports Injury Risk Detection - Milestone 4")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

UPLOAD_DIR = os.path.join(BASE_DIR, "uploads")

os.makedirs(UPLOAD_DIR, exist_ok=True)

service = IntegrationService()


@app.get("/")
def home():
    return {
        "project": "Sports Injury Risk Detection",
        "version": "Milestone 4",
        "status": "Running"
    }


@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):

    if not file.filename.lower().endswith((".mp4", ".avi", ".mov")):
        raise HTTPException(
            status_code=400,
            detail="Upload a valid video file."
        )

    filename = f"{uuid.uuid4()}_{file.filename}"

    filepath = os.path.join(UPLOAD_DIR, filename)

    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    result = service.analyze(filepath)

    return result