from sqlalchemy import Column, Integer, String, Float, DateTime, Text, ForeignKey
from datetime import datetime
from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    role = Column(String, default="Athlete")  # Athlete, Coach, Physiotherapist, SportsScientist, Admin
    created_at = Column(DateTime, default=datetime.utcnow)


class Athlete(Base):
    __tablename__ = "athletes"

    id = Column(Integer, primary_key=True, index=True)
    athlete_code = Column(String, unique=True, index=True)
    full_name = Column(String, nullable=False)
    sport_type = Column(String, default="General Sports")
    position = Column(String, default="Forward")
    age = Column(Integer, default=21)
    height_cm = Column(Float, default=180.0)
    weight_kg = Column(Float, default=75.0)


class EvaluationReport(Base):
    __tablename__ = "evaluation_reports"

    id = Column(Integer, primary_key=True, index=True)
    athlete_id = Column(String, default="ATH-8842")
    video_name = Column(String, nullable=False)
    activity = Column(String, default="Running")
    overall_score = Column(Integer, nullable=False)
    overall_risk = Column(String, nullable=False)
    acl_risk = Column(String)
    hamstring_risk = Column(String)
    shoulder_risk = Column(String)
    gait_symmetry = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)