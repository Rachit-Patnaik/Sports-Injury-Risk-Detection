<div align="center">

#  Sports Injury Risk Detection

### AI-Powered Biomechanical Analysis Platform for Athletic Injury Prevention

[![Python 3.12](https://img.shields.io/badge/Python-3.12-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React 18](https://img.shields.io/badge/React-18.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![OpenCV](https://img.shields.io/badge/OpenCV-5C3EE8?style=for-the-badge&logo=opencv&logoColor=white)](https://opencv.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

*Analyzing athlete movement videos with computer vision, fusing wearable telemetry, and generating clinically verified injury‑risk reports — end to end.*

</div>

---

## 📌 Executive Summary

Sports injuries are often preceded by subtle, repeatable movement faults — compensations that are hard to catch with the naked eye but show up clearly in joint kinematics over time. This platform builds an end-to-end prevention pipeline:

1. **Pose Landmark Extraction** — Tracks keypoints across movement video frames via MediaPipe & OpenCV.
2. **Biomechanical Kinematics** — Computes real-time joint angles, flexion velocity, range of motion, and bilateral symmetry.
3. **Multi-Modal Sensor Fusion** — Overlays vision kinematic curves with wearable IMU impact telemetry (G-force).
4. **Injury Risk Scoring** — Detects mechanical defects (knee valgus, ground impact overload) and classifies overall risk.
5. **Clinical PDF Generation** — Exports printable, A4 assessment summaries featuring diagnostic heatmaps and mobile QR verification codes.

---

## 📸 Screenshots

| Dashboard | Live Analysis |
|---|---|
| ![Dashboard](dashboard.png.png) | ![Live Analysis](livescreen.png.png) |

| AI Insights | Athlete Profile |
|---|---|
| ![AI Insights](AiInsights.png.png) | ![Profile](Profile.png.png) |

| Athletes List | Reports |
|---|---|
| ![Profiles](Profiles.png.png) | ![Reports](Reports.png.png) |

<p align="center">
  <img src="Downloadedpdf.png.png" alt="Downloaded Clinical PDF Report" width="600"/>
  <br/><em>Downloaded clinical PDF report with QR verification</em>
</p>

---

## 🚀 Core Features

| | |
|---|---|
| 🎥 **Biomechanical Pose Estimation** | Automatic joint landmark tracking using MediaPipe Pose Landmarker & OpenCV for kinematic motion analysis. |
| 📐 **Kinematic Feature Extraction** | Calculates joint angles and angular velocity (ω = dθ/dt) for knees, hips, shoulders, and ankles. |
| 📊 **Multi-Modal IMU Sensor Fusion** | Synchronized dual-axis Recharts telemetry overlaying joint flexion velocity against simulated wearable IMU impact acceleration (G-force). |
| 🚨 **Injury Risk Prediction & Anomaly Detection** | Automatically flags mechanical defects such as knee valgus collapse and asymmetric gait mechanics. |
| 📄 **Print-Isolated Clinical PDF Reports** | Renders 2-page assessment summaries complete with metadata, risk heatmaps, diagnostic tables, and scannable QR codes for mobile access. |
| 🔐 **JWT Auth & Role-Based Access Control** | Multi-role interface tailored for Athletes, Coaches, Physiotherapists, Sports Scientists, and Administrators. |
| ⚡ **Interactive Web Dashboard** | React 18 + Vite frontend with dark-mode UI styling and real-time canvas overlays. |

---

## 🧩 Milestone Completion Overview

| Milestone | Scope & Deliverables | Status |
|:---|:---|:---:|
| **1 — Foundation & Security** | PostgreSQL schema, SQLAlchemy ORM models, JWT authentication, and RBAC routers | ✅ Complete |
| **2 — Pose Pipeline** | Video ingestion, MediaPipe landmark extraction, CSV telemetry export, and skeleton visualization | ✅ Complete |
| **3 — Biomechanics & API** | Joint angle calculation engine, movement anomaly classification, risk scoring, and REST API endpoints | ✅ Complete |
| **4 — Web Dashboard & Sensor Fusion** | React web application, real-time video processing engine, dual-axis IMU + vision overlay, and automated PDF clinical report with QR verification | ✅ Complete |

---

## 🏗 Project Architecture

```
Sports-Injury-Risk-Detection/
├── Milestone_1/                   # Auth, DB Models & Schemas
│   ├── auth/                      # JWT authentication & RBAC routers
│   └── models.py                  # SQLAlchemy ORM models
│
├── Milestone_2/                   # Pose Estimation Pipeline & Datasets
│   ├── outputs/                   # Extracted landmark CSVs
│   └── videos/                    # Source movement videos
│
├── Milestone_3/                   # Biomechanical Engine & Prediction APIs
│   └── backend/
│       ├── injury_prediction/     # Risk scoring & anomaly detection
│       ├── biomechanics/          # Angle calculator & feature extraction
│       ├── api.py                 # FastAPI endpoint definitions
│       └── main.py                # Server execution entrypoint
│
├── Milestone_4/                   # Web Dashboard, Sensor Fusion & Reports
│   ├── backend/                   # Kinematic processing API & MP4 generator
│   │   ├── main.py                # Main FastAPI server & video processing pipeline
│   │   └── processed_output/      # Processed & annotated MP4 video exports
│   └── frontend/                  # React + Vite Dashboard Application
│       └── src/
│           ├── components/        # SensorFusionChart, ClinicalReportPDF, Header
│           └── pages/             # Upload, Dashboard, Insights, Live, Athletes, Reports
│
├── .gitignore                     # Git exclusion rules
└── README.md                      # Project documentation
```

---

## 💻 Tech Stack

| Category | Tools & Libraries |
|---|---|
| **Backend Framework** | Python 3.12, FastAPI, Uvicorn, Pydantic |
| **Frontend Framework** | React 18, Vite, Recharts, Framer Motion, Material UI (MUI) |
| **Computer Vision & Kinematics** | OpenCV, MediaPipe (PoseLandmarker), NumPy, Pandas |
| **PDF & Verification** | jsPDF, html2canvas, qrcode.react |
| **Database & Auth** | PostgreSQL, SQLAlchemy, Python-Jose (JWT), Passlib |
| **Deployment & Containers** | Docker, Docker Compose |

---

## ⚙️ Quick Start Guide

### 1. Clone the Repository
```bash
git clone https://github.com/springboardmentor1234r/Sports-Injury-Risk-.git
cd Sports-Injury-Risk-Detection
git checkout Rachit_Patnaik
```

### 2. Backend Setup (FastAPI)
```bash
cd Milestone_4/backend
python -m venv venv

# Activate Virtual Environment (Windows PowerShell):
.\venv\Scripts\activate

# Install Dependencies & Start Server:
pip install -r requirements.txt
python main.py
```
Server runs at **http://localhost:8000**
Interactive Swagger Docs: **http://localhost:8000/docs**

### 3. Frontend Setup (React + Vite)
```bash
cd ../frontend
npm install

# Start Vite Development Server with Local Network Exposure:
npm run dev -- --host
```
Web Dashboard runs at **http://localhost:5173**

---

## 📡 API Reference

| Method | Endpoint | Description | Auth Required |
|---|---|---|:---:|
| `GET` | `/api/health` | Service health & engine status check | No |
| `GET` | `/api/athletes` | Retrieve registered athlete roster & physical metrics | No |
| `POST` | `/api/analyze` | Upload video, calculate kinematic vectors, & generate risk score | No |
| `GET` | `/api/download-video/{filename}` | Download processed & skeleton-annotated MP4 clip | No |
| `POST` | `/auth/login` | User authentication & JWT issuance | No |
| `GET` | `/predict` | Multi-joint risk predictions | Yes |
| `GET` | `/report` | Comprehensive clinical JSON assessment | Yes |

---

## 👤 Author

**Rachit Patnaik**
B.Tech Computer Science and Engineering (Data Science), Siksha 'O' Anusandhan University (ITER)
GitHub: [@Rachit-Patnaik](https://github.com/Rachit-Patnaik)

---

<div align="center">

**⭐ If this project helped you, consider giving it a star!**

</div>
