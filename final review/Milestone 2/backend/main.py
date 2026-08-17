import os
import sys

# Add backend folder to Python path
BACKEND_DIR = os.path.dirname(os.path.abspath(__file__))
if BACKEND_DIR not in sys.path:
    sys.path.insert(0, BACKEND_DIR)

from pipeline.pipeline import PosePipeline

MODEL_PATH = os.path.join(
    os.path.dirname(BACKEND_DIR),
    "models",
    "pose_landmarker.task"
)

VIDEO_PATH = os.path.join(
    os.path.dirname(BACKEND_DIR),
    "videos",
    "running.mp4"
)


def main():

    pipeline = PosePipeline(MODEL_PATH)

    result = pipeline.run(VIDEO_PATH)

    print("\n========== PIPELINE COMPLETE ==========\n")

    for key, value in result.items():
        print(f"{key}: {value}")


if __name__ == "__main__":
    main()