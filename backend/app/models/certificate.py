"""
Certificate models for course completion certificates.
"""
from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class GenerateCertificateRequest(BaseModel):
    user_id: str
    course_id: str
    holder_name: str


class Certificate(BaseModel):
    id: str
    certificate_id: str  # 256-char unique ID
    user_id: str
    course_id: str
    course_title: str
    holder_name: str
    instructor_name: str
    issue_date: datetime
    completion_date: datetime
    credential_url: str


class CertificateResponse(BaseModel):
    success: bool
    certificate: Optional[Certificate] = None
    message: str


class VerifyCertificateResponse(BaseModel):
    verified: bool
    certificate: Optional[Certificate] = None
    message: str
