# Sports Injury Risk Detection

![Python 3.12](https://img.shields.io/badge/Python-3.12-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![OpenCV](https://img.shields.io/badge/OpenCV-5C3EE8?style=for-the-badge&logo=opencv&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![License MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

A modular, milestone-based AI system that analyzes pose estimation data and biomechanical metrics to predict potential sports injuries, detect movement anomalies, assess overall injury risk, and deliver personalized prevention recommendations — served through a modern React web dashboard and a secure, role-based FastAPI backend.

---

## 📌 Project Overview

Sports injuries are often preceded by subtle, repeatable movement faults — compensations that are hard to catch with the naked eye but show up clearly in joint kinematics over time. This project builds an end-to-end pipeline that:

1. **Extracts pose landmarks** from athlete movement video using MediaPipe & OpenCV.
2. **Converts landmarks into interpretable biomechanical features** (joint angles, angular velocity, range of motion, symmetry).
3. **Fuses multi-modal sensor telemetry** by overlaying vision kinematic curves with wearable IMU impact data ($G$-force).
4. **Scores injury risk and flags anomalous movement patterns** (e.g., knee valgus, excessive ground impact).
5. **Generates downloadable clinical PDF reports** with mobile QR verification for instant digital access.

The goal is to move from **reactive injury treatment** to **proactive injury prevention**.

---

## 🚀 Features

- 🎥 **Pose Estimation**: Landmark extraction from video using MediaPipe Pose Landmarker & OpenCV.
- 📐 **Multi-Joint Biomechanical Feature Extraction**: Calculates joint angles and angular velocity ($\omega = \frac{d\theta}{dt}$) for knees, hips, shoulders, and ankles.
- 📊 **Multi-Modal IMU Sensor Fusion**: Synchronized dual-axis Recharts telemetry overlaying joint flexion velocity against simulated wearable IMU impact acceleration ($G$-force).
- ⚠️ **Injury Risk Prediction & Scoring**: Computes overall movement hazard scores and categorizes risk levels (Low, Moderate, High).
- 🔍 **Movement Anomaly Detection**: Automatic detection of critical mechanical defects like knee valgus overload and asymmetric gait.
- 💡 **Personalized Prevention Recommendations**: Contextual drill and movement guidance based on kinematic thresholds.
- 📄 **Automated PDF Clinical Report**: Renders professional assessment summaries complete with metadata, risk heatmaps, diagnostic tables, and a mobile QR verification code.
- 🔒 **JWT Authentication & Role-Based Access Control (RBAC)**: Multi-role support for Physiotherapists, Coaches, Athletes, and Researchers.
- ⚡ **Interactive Web Dashboard**: React 18 + Vite frontend with Material UI / Lucide icons and dark-mode styling.

---

## 🧩 Milestone Progress

| Milestone | Scope | Status |
| :--- | :--- | :---: |
| **1 — Foundation** | PostgreSQL setup, SQLAlchemy models, JWT auth, RBAC routers | ✅ Complete |
| **2 — Pose Pipeline** | Video ingestion, landmark extraction, CSV export, skeleton visualization | ✅ Complete |
| **3 — Biomechanics & API** | Joint angle calculation, injury prediction, risk scoring, FastAPI exposure | ✅ Complete |
| **4 — Dashboard & Sensor Fusion** | Full React dashboard, video processing engine, dual-axis IMU fusion, PDF clinical generator with QR verification | ✅ Complete |

---

## 📁 Project Structure

```text
Sports-Injury-Risk-Detection/
│
├── Milestone_1/                   # Auth, DB Models, PostgreSQL Schemas
│   ├── auth/                      # JWT authentication & RBAC routers
│   └── models.py                  # SQLAlchemy ORM models
│
├── Milestone_2/                   # Pose Estimation Pipeline & Datasets
│   ├── outputs/                   # Extracted landmark CSVs
│   └── videos/                    # Source movement videos
│
├── Milestone_3/                   # Biomechanical Engine & Prediction APIs
│   └── backend/
│       ├── injury_prediction/     # Risk scoring, anomaly detection, recommendations
│       ├── biomechanics/          # Angle calculator & feature extraction
│       ├── api.py                 # FastAPI endpoint definitions
│       └── main.py                # Server execution entrypoint
│
├── Milestone_4/                   # Web Dashboard, Sensor Fusion & Reports
│   ├── backend/                   # Kinematic processing API & MP4 output generator
│   │   ├── main.py                # Video analysis & IMU telemetry calculation
│   │   └── processed_output/      # Skeleton-annotated output video MP4s
│   └── frontend/                  # React + Vite Web Application
│       └── src/
│           ├── components/        # SensorFusionChart, ClinicalReportPDF, Header
│           └── pages/             # Upload, Dashboard, Insights, Live Screening
│
├── .gitignore                     # Git exclusion rules
└── README.md                      # Project documentation