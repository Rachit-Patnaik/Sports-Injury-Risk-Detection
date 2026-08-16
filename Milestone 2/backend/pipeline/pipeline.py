import os
import sys

from pose_estimation.video_reader import VideoReader
from pose_estimation.pose_detector import PoseDetector
from pose_estimation.landmark_extractor import LandmarkExtractor
from pose_estimation.csv_exporter import CSVExporter
from pose_estimation.joint_angle_calculator import JointAngleCalculator

# MediaPipe Pose Landmark Indices
LEFT_SHOULDER = 11
RIGHT_SHOULDER = 12
LEFT_ELBOW = 13
RIGHT_ELBOW = 14
LEFT_WRIST = 15
RIGHT_WRIST = 16
LEFT_HIP = 23
RIGHT_HIP = 24
LEFT_KNEE = 25
RIGHT_KNEE = 26
LEFT_ANKLE = 27
RIGHT_ANKLE = 28


def _get_point(landmark):
    return (landmark.x, landmark.y)


class PosePipeline:

    def __init__(self, model_path, output_dir=None):
        if output_dir is None:
            output_dir = os.path.abspath(
                os.path.join(os.path.dirname(__file__), "..", "..", "outputs")
            )

        self.output_dir = output_dir
        self.reader = None
        self.detector = PoseDetector(model_path)
        self.extractor = LandmarkExtractor()
        self.exporter = CSVExporter(output_dir)

    def run(self, video_path):
        self.reader = VideoReader(video_path)
        metadata = self.reader.get_metadata()
        fps = metadata.get("fps", 30) or 30

        frame_number = 0
        all_landmarks = []
        angle_data = []

        for frame in self.reader.frames():
            timestamp_ms = int((frame_number / fps) * 1000)
            results = self.detector.detect(frame, timestamp_ms)
            frame_number += 1

            frame_data = self.extractor.extract(
                results,
                frame_number,
                timestamp_ms / 1000,
            )

            if frame_data:
                all_landmarks.extend(frame_data)

            if results.pose_landmarks and len(results.pose_landmarks) > 0:
                lms = results.pose_landmarks[0]
                try:
                    left_knee = JointAngleCalculator.calculate_angle(
                        _get_point(lms[LEFT_HIP]),
                        _get_point(lms[LEFT_KNEE]),
                        _get_point(lms[LEFT_ANKLE]),
                    )
                    right_knee = JointAngleCalculator.calculate_angle(
                        _get_point(lms[RIGHT_HIP]),
                        _get_point(lms[RIGHT_KNEE]),
                        _get_point(lms[RIGHT_ANKLE]),
                    )
                    left_hip = JointAngleCalculator.calculate_angle(
                        _get_point(lms[LEFT_SHOULDER]),
                        _get_point(lms[LEFT_HIP]),
                        _get_point(lms[LEFT_KNEE]),
                    )
                    right_hip = JointAngleCalculator.calculate_angle(
                        _get_point(lms[RIGHT_SHOULDER]),
                        _get_point(lms[RIGHT_HIP]),
                        _get_point(lms[RIGHT_KNEE]),
                    )
                    left_elbow = JointAngleCalculator.calculate_angle(
                        _get_point(lms[LEFT_SHOULDER]),
                        _get_point(lms[LEFT_ELBOW]),
                        _get_point(lms[LEFT_WRIST]),
                    )
                    right_elbow = JointAngleCalculator.calculate_angle(
                        _get_point(lms[RIGHT_SHOULDER]),
                        _get_point(lms[RIGHT_ELBOW]),
                        _get_point(lms[RIGHT_WRIST]),
                    )
                    left_shoulder = JointAngleCalculator.calculate_angle(
                        _get_point(lms[LEFT_ELBOW]),
                        _get_point(lms[LEFT_SHOULDER]),
                        _get_point(lms[LEFT_HIP]),
                    )
                    right_shoulder = JointAngleCalculator.calculate_angle(
                        _get_point(lms[RIGHT_ELBOW]),
                        _get_point(lms[RIGHT_SHOULDER]),
                        _get_point(lms[RIGHT_HIP]),
                    )

                    angle_data.append({
                        "frame": frame_number,
                        "left_knee": round(left_knee, 2),
                        "right_knee": round(right_knee, 2),
                        "left_hip": round(left_hip, 2),
                        "right_hip": round(right_hip, 2),
                        "left_elbow": round(left_elbow, 2),
                        "right_elbow": round(right_elbow, 2),
                        "left_shoulder": round(left_shoulder, 2),
                        "right_shoulder": round(right_shoulder, 2),
                    })
                except Exception:
                    pass

        landmark_csv = self.exporter.export(all_landmarks, "running_landmarks.csv")
        joint_angles_csv = self.exporter.export(angle_data, "running_joint_angles.csv")

        self.detector.close()

        return {
            "frames_processed": frame_number,
            "landmarks_detected": len(all_landmarks),
            "landmark_csv": landmark_csv,
            "joint_angles_csv": joint_angles_csv,
            "metadata": metadata,
        }