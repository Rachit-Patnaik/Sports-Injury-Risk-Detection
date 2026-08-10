Sports-Injury-Risk-Detection/├── Milestone_1/                   # Auth, DB Models, PostgreSQL Schemas├── Milestone_2/                   # Pose Estimation Pipeline & Landmark Datasets├── Milestone_3/                   # Biomechanical Calculation Engine & Prediction APIs├── Milestone_4/                   # Full Stack Web Application & Fusion Engine│   ├── backend/                   # FastAPI Server, OpenCV Kinematic Processing, API Routers│   │   ├── main.py                # Main FastAPI Server & Video Processing Pipeline│   │   ├── processed_output/      # Processed & Annotated MP4 Video Exports│   │   └── requirements.txt       # Python Backend Dependencies│   └── frontend/                  # React + Vite Dashboard Application│       ├── src/│       │   ├── components/        # SensorFusionChart, ClinicalReportPDF, Header│       │   ├── pages/             # Dashboard, Upload, Insights, Live Screening│       │   └── App.jsx            # Application Router & Navigation Layout│       └── package.json           # Frontend Dependencies├── .gitignore                     # Repository Exclusions└── README.md                      # Project Documentation
---

## 💻 Tech Stack

| Category | Technologies & Tools |
| :--- | :--- |
| **Frontend** | React 18, Vite, Recharts, Framer Motion, Material UI (MUI), Lucide React |
| **PDF & Verification** | jsPDF, html2canvas, qrcode.react |
| **Backend Framework** | Python 3.12, FastAPI, Uvicorn, Pydantic |
| **Computer Vision & Kinematics** | OpenCV, MediaPipe (PoseLandmarker), NumPy, Pandas |
| **Database & Auth** | PostgreSQL, SQLAlchemy, Python-Jose (JWT Passwords & Hashes) |
| **Deployment & Containers** | Docker, Docker Compose |

---

## ⚙️ Local Installation & Setup

### Prerequisites
- Python 3.10+
- Node.js 18+ & npm
- OpenCV dependencies (`ffmpeg` / `libx264` support)

### 1. Clone the Repository
```bash
git clone [https://github.com/springboardmentor1234r/Sports-Injury-Risk-.git](https://github.com/springboardmentor1234r/Sports-Injury-Risk-.git)
cd Sports-Injury-Risk-Detection
git checkout Rachit_Patnaik
2. Backend SetupBashcd Milestone_4/backend
python -m venv venv

# Windows Activation:
.\\venv\\Scripts\\activate

# Install Dependencies:
pip install -r requirements.txt

# Start FastAPI Engine:
python main.py
The API will run at http://localhost:8000 with interactive Swagger docs at http://localhost:8000/docs.3. Frontend SetupBashcd ../frontend
npm install

# Start Development Server with Local Network Exposure:
npm run dev -- --host
Access the web dashboard at http://localhost:5173 (or via your local network IP provided in the Vite console for mobile QR verification).📡 Key API EndpointsMethodEndpointDescriptionAuth RequiredGET/api/healthService health & engine status checkNoPOST/api/analyzeVideo upload, kinematic vector calculation, & risk scoringNoGET/api/download-video/{filename}Download processed & skeleton-annotated MP4 clipNoPOST/auth/loginUser authentication & JWT issuanceNoGET/predictMulti-joint risk predictionsYesGET/reportComprehensive clinical JSON assessmentYes📊 Workflow Architecture[ Movement Video Input (.mp4 / .mov) ]
                 │
                 ▼
[ Pose Landmark Extraction (MediaPipe / OpenCV) ]
                 │
                 ▼
[ Biomechanical Vector Calculation (Joint Angles θ, Angular Velocity ω) ]
                 │
                 ▼
[ Telemetry Synchronization (IMU Accelerometer G-force Alignment) ]
                 │
                 ▼
[ Risk Assessment & Anomaly Detection Engine ]
                 │
                 ▼
┌───────────────────────────────────────────────────────────┐
│               Interactive Dashboard & Output              │
├─────────────────────────────┬─────────────────────────────┤
│ Annotated Video Export (.mp4)│ Recharts Sensor Telemetry  │
├─────────────────────────────┼─────────────────────────────┤
│ Risk Heatmaps & Analytics   │ PDF Report with Mobile QR   │
└─────────────────────────────┴─────────────────────────────┘
👤 AuthorRachit PatnaikB.Tech Computer Science and Engineering, Siksha 'O' Anusandhan University (ITER)GitHub: @Rachit-Patnaik"""with open("README.md", "w", encoding="utf-8") as f:f.write(readme_content)print("README.md successfully created!")
```text?code_stdout&code_event_index=1
README.md successfully created!

Your Markdown file is ready[file-tag: code-generated-file-e400d0e2-c4d3-474c-bf96-0868d35029e6]Updated README.md File ContentReplace the contents of your project's root README.md (D:\Sports-Injury-Risk-Detection\README.md) with the code below:Markdown# Sports Injury Risk Detection

An end-to-end AI-powered biomechanical analysis system that leverages computer vision pose estimation, time-series IMU sensor telemetry fusion, movement risk scoring algorithms, and interactive web dashboards to predict athletic injury risks and export cryptographically verified clinical reports.

---

## 🌟 Key Features

- 🎥 **Biomechanical Pose Estimation**: Automatic joint landmark tracking using MediaPipe & OpenCV for kinematic motion analysis (knees, hips, shoulders, ankles).
- 📊 **Multi-Modal Sensor Fusion**: Synchronized dual-axis telemetry visualization of joint angular velocity ($\omega = \frac{d\theta}{dt}$) overlaid with wearable IMU impact telemetry ($G$-force).
- 🚨 **Injury Risk Scoring & Anomaly Detection**: Real-time identification of biomechanical risks such as knee valgus, excessive joint overload, and asymmetric gait mechanics.
- 📄 **Clinical PDF Report with Mobile QR Verification**: Automated generation of 2-page assessment summaries featuring heatmaps, joint diagnostic tables, and scannable QR codes for cryptographically verified digital report access.
- 🔐 **JWT Auth & Role-Based Access Control (RBAC)**: Multi-role support for Physiotherapists, Strength Coaches, Athletes, and Lead Researchers.
- ⚡ **Interactive Web Dashboard & FastAPI Backend**: Modern React frontend built with Vite, Tailwind/MUI components, and a high-performance FastAPI back-end processing engine.

---

## 🚀 Milestone Progress Overview

| Milestone | Module & Scope | Status |
| :--- | :--- | :---: |
| **Milestone 1** | **Foundation & Security**: PostgreSQL schema, SQLAlchemy ORM models, JWT authentication, and RBAC routers | ✅ Complete |
| **Milestone 2** | **Pose Estimation Pipeline**: Frame-by-frame video ingestion, MediaPipe landmark extraction, joint vector calculation, skeleton visualization, and CSV telemetry exports | ✅ Complete |
| **Milestone 3** | **Biomechanics & Risk Engine**: Joint flexion angle calculations, movement anomaly classification, risk scoring engine, and FastAPI REST endpoints | ✅ Complete |
| **Milestone 4** | **Full Application, IMU Sensor Fusion & Clinical Reports**: React web dashboard, real-time video processing engine, Recharts dual-axis IMU + vision overlay, and automated PDF clinical report with mobile QR verification | ✅ Complete |

---

## 🏗 Project Architecture

Sports-Injury-Risk-Detection/├── Milestone_1/                   # Auth, DB Models, PostgreSQL Schemas├── Milestone_2/                   # Pose Estimation Pipeline & Landmark Datasets├── Milestone_3/                   # Biomechanical Calculation Engine & Prediction APIs├── Milestone_4/                   # Full Stack Web Application & Fusion Engine│   ├── backend/                   # FastAPI Server, OpenCV Kinematic Processing, API Routers│   │   ├── main.py                # Main FastAPI Server & Video Processing Pipeline│   │   ├── processed_output/      # Processed & Annotated MP4 Video Exports│   │   └── requirements.txt       # Python Backend Dependencies│   └── frontend/                  # React + Vite Dashboard Application│       ├── src/│       │   ├── components/        # SensorFusionChart, ClinicalReportPDF, Header│       │   ├── pages/             # Dashboard, Upload, Insights, Live Screening│       │   └── App.jsx            # Application Router & Navigation Layout│       └── package.json           # Frontend Dependencies├── .gitignore                     # Repository Exclusions└── README.md                      # Project Documentation
---

## 💻 Tech Stack

| Category | Technologies & Tools |
| :--- | :--- |
| **Frontend** | React 18, Vite, Recharts, Framer Motion, Material UI (MUI), Lucide React |
| **PDF & Verification** | jsPDF, html2canvas, qrcode.react |
| **Backend Framework** | Python 3.12, FastAPI, Uvicorn, Pydantic |
| **Computer Vision & Kinematics** | OpenCV, MediaPipe (PoseLandmarker), NumPy, Pandas |
| **Database & Auth** | PostgreSQL, SQLAlchemy, Python-Jose (JWT Passwords & Hashes) |
| **Deployment & Containers** | Docker, Docker Compose |

---

## ⚙️ Local Installation & Setup

### Prerequisites
- Python 3.10+
- Node.js 18+ & npm
- OpenCV dependencies (`ffmpeg` / `libx264` support)

### 1. Clone the Repository
```bash
git clone [https://github.com/springboardmentor1234r/Sports-Injury-Risk-.git](https://github.com/springboardmentor1234r/Sports-Injury-Risk-.git)
cd Sports-Injury-Risk-Detection
git checkout Rachit_Patnaik
2. Backend SetupBashcd Milestone_4/backend
python -m venv venv

# Windows Activation:
.\venv\Scripts\activate

# Install Dependencies:
pip install -r requirements.txt

# Start FastAPI Engine:
python main.py
The API will run at http://localhost:8000 with interactive Swagger docs at http://localhost:8000/docs.3. Frontend SetupBashcd ../frontend
npm install

# Start Development Server with Local Network Exposure:
npm run dev -- --host
Access the web dashboard at http://localhost:5173 (or via your local network IP provided in the Vite console for mobile QR verification).📡 Key API EndpointsMethodEndpointDescriptionAuth RequiredGET/api/healthService health & engine status checkNoPOST/api/analyzeVideo upload, kinematic vector calculation, & risk scoringNoGET/api/download-video/{filename}Download processed & skeleton-annotated MP4 clipNoPOST/auth/loginUser authentication & JWT issuanceNoGET/predictMulti-joint risk predictionsYesGET/reportComprehensive clinical JSON assessmentYes📊 Workflow Architecture[ Movement Video Input (.mp4 / .mov) ]
                 │
                 ▼
[ Pose Landmark Extraction (MediaPipe / OpenCV) ]
                 │
                 ▼
[ Biomechanical Vector Calculation (Joint Angles θ, Angular Velocity ω) ]
                 │
                 ▼
[ Telemetry Synchronization (IMU Accelerometer G-force Alignment) ]
                 │
                 ▼
[ Risk Assessment & Anomaly Detection Engine ]
                 │
                 ▼
┌───────────────────────────────────────────────────────────┐
│               Interactive Dashboard & Output              │
├─────────────────────────────┬─────────────────────────────┤
│ Annotated Video Export (.mp4)│ Recharts Sensor Telemetry  │
├─────────────────────────────┼─────────────────────────────┤
│ Risk Heatmaps & Analytics   │ PDF Report with Mobile QR   │
└─────────────────────────────┴─────────────────────────────┘
👤 AuthorRachit PatnaikB.Tech Computer Science and Engineering, Siksha 'O' Anusandhan University (ITER)GitHub: @Rachit-Patnaik
---

### Step-by-Step Instructions to Update & Push to GitHub

Run these commands in your PowerShell terminal from `D:\Sports-Injury-Risk-Detection`:

```powershell
cd D:\Sports-Injury-Risk-Detection

# 1. Save the updated README.md file
git add README.md

# 2. Commit the changes
git commit -m "docs: update README with complete Milestone 4 architecture and features"

# 3. Push to your branch on the mentor evaluation repository
git push mentor Rachit_Patnaik