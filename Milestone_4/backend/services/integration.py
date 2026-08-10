import sys
import os
import glob
import shutil

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../.."))

sys.path.append(os.path.join(ROOT, "Milestone 2", "backend"))
sys.path.append(os.path.join(ROOT, "Milestone_3", "backend"))

from pipeline.pipeline import PosePipeline
from injury_prediction.predictor import InjuryPredictor
from injury_prediction.risk_scoring import RiskScoringEngine
from injury_prediction.anomaly_detector import MovementAnomalyDetector
from injury_prediction.recommendation_engine import RecommendationEngine


MODEL_PATH = os.path.join(
    ROOT,
    "Milestone 2",
    "models",
    "pose_landmarker.task"
)

OUTPUT_PATH = os.path.join(
    ROOT,
    "Milestone 2",
    "outputs"
)

TARGET_CSV = os.path.join(OUTPUT_PATH, "running_joint_angles.csv")


class IntegrationService:

    def analyze(self, video_path):
        os.makedirs(OUTPUT_PATH, exist_ok=True)

        # 1. Capture timestamps of existing CSV files prior to running the pipeline
        before_mtime = os.path.getmtime(TARGET_CSV) if os.path.exists(TARGET_CSV) else 0

        # 2. Run PosePipeline on the uploaded video path
        pipeline = PosePipeline(MODEL_PATH)
        pipeline.run(video_path)

        # 3. Detect if PosePipeline generated a new CSV file under a different filename
        csv_files = glob.glob(os.path.join(OUTPUT_PATH, "*.csv"))
        newest_csv = None
        if csv_files:
            newest_csv = max(csv_files, key=os.path.getmtime)

        # 4. Ensure TARGET_CSV holds the newly generated video biomechanics data
        if newest_csv and os.path.exists(newest_csv) and os.path.getmtime(newest_csv) > before_mtime:
            if os.path.abspath(newest_csv) != os.path.abspath(TARGET_CSV):
                shutil.copyfile(newest_csv, TARGET_CSV)

        # 5. Run Milestone 3 engines on updated CSV data
        predictor = InjuryPredictor(OUTPUT_PATH)
        scorer = RiskScoringEngine(OUTPUT_PATH)
        detector = MovementAnomalyDetector(OUTPUT_PATH)
        recommender = RecommendationEngine(OUTPUT_PATH)

        prediction = predictor.predict()
        risk = scorer.generate_report()
        anomaly = detector.analyze()
        recommendation = recommender.generate()

        return {
            "prediction": prediction,
            "risk": risk,
            "anomalies": anomaly,
            "recommendations": recommendation,
        }