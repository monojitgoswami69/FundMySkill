"""
Certificates router - handles certificate generation and verification.
"""
from fastapi import APIRouter, HTTPException
import secrets
import string
from datetime import datetime, timezone

from app.services.firebase import get_firestore, datetime_to_firestore, firestore_to_datetime
from app.models.certificate import (
    GenerateCertificateRequest,
    Certificate,
    CertificateResponse,
    VerifyCertificateResponse,
)

router = APIRouter(prefix="/api/certificates", tags=["certificates"])


def generate_certificate_id() -> str:
    """Generate a unique 256-character certificate ID."""
    alphabet = string.ascii_letters + string.digits
    return ''.join(secrets.choice(alphabet) for _ in range(256))


@router.post("/generate")
async def generate_certificate(request: GenerateCertificateRequest) -> CertificateResponse:
    """
    Generate a certificate for a completed course.
    Only works if user has 100% progress.
    """
    db = get_firestore()

    # Check if user has completed the course
    progress_id = f"{request.user_id}_{request.course_id}"
    progress_doc = db.collection("user_progress").document(progress_id).get()

    if not progress_doc.exists:
        raise HTTPException(status_code=404, detail="User not enrolled in this course")

    progress_data = progress_doc.to_dict()
    progress_percentage = progress_data.get("progress_percentage", 0)

    if progress_percentage < 100:
        raise HTTPException(
            status_code=400,
            detail=f"Course not completed. Current progress: {progress_percentage}%"
        )

    # Check if certificate already exists
    existing_certs = list(
        db.collection("certificates")
        .where("user_id", "==", request.user_id)
        .where("course_id", "==", request.course_id)
        .stream()
    )

    if existing_certs:
        # Return existing certificate
        cert_data = existing_certs[0].to_dict()
        issue_date = firestore_to_datetime(cert_data.get("issue_date"))
        completion_date = firestore_to_datetime(cert_data.get("completion_date"))

        return CertificateResponse(
            success=True,
            certificate=Certificate(
                id=existing_certs[0].id,
                certificate_id=cert_data.get("certificate_id"),
                user_id=cert_data.get("user_id"),
                course_id=cert_data.get("course_id"),
                course_title=cert_data.get("course_title"),
                holder_name=cert_data.get("holder_name"),
                instructor_name=cert_data.get("instructor_name"),
                issue_date=issue_date,
                completion_date=completion_date,
                credential_url=cert_data.get("credential_url"),
            ),
            message="Certificate already exists"
        )

    # Get course details
    course_doc = db.collection("courses").document(request.course_id).get()
    if not course_doc.exists:
        raise HTTPException(status_code=404, detail="Course not found")

    course_data = course_doc.to_dict()

    # Generate unique certificate ID
    certificate_id = generate_certificate_id()

    # Get enrollment date as completion date
    enrollment_date = progress_data.get("enrollment_date")
    if enrollment_date:
        completion_date = firestore_to_datetime(enrollment_date)
    else:
        completion_date = datetime.now(timezone.utc)

    now = datetime.now(timezone.utc)

    # Create certificate document
    cert_data = {
        "certificate_id": certificate_id,
        "user_id": request.user_id,
        "course_id": request.course_id,
        "course_title": course_data.get("title", ""),
        "holder_name": request.holder_name,
        "instructor_name": course_data.get("instructor_name", "Unknown Instructor"),
        "issue_date": datetime_to_firestore(now),
        "completion_date": datetime_to_firestore(completion_date),
        "credential_url": f"/verify?id={certificate_id}",
    }

    # Store in database
    _, doc_ref = db.collection("certificates").add(cert_data)

    return CertificateResponse(
        success=True,
        certificate=Certificate(
            id=doc_ref.id,
            certificate_id=certificate_id,
            user_id=request.user_id,
            course_id=request.course_id,
            course_title=course_data.get("title", ""),
            holder_name=request.holder_name,
            instructor_name=course_data.get("instructor_name", "Unknown Instructor"),
            issue_date=now,
            completion_date=completion_date,
            credential_url=f"/verify?id={certificate_id}",
        ),
        message="Certificate generated successfully"
    )


@router.get("/verify/{certificate_id}")
async def verify_certificate(certificate_id: str) -> VerifyCertificateResponse:
    """
    Verify a certificate by its unique ID.
    Returns certificate details if valid.
    """
    db = get_firestore()

    # Find certificate by certificate_id
    cert_docs = list(
        db.collection("certificates")
        .where("certificate_id", "==", certificate_id)
        .stream()
    )

    if not cert_docs:
        return VerifyCertificateResponse(
            verified=False,
            certificate=None,
            message="Certificate not found. This certificate ID is invalid or does not exist."
        )

    cert_data = cert_docs[0].to_dict()
    issue_date = firestore_to_datetime(cert_data.get("issue_date"))
    completion_date = firestore_to_datetime(cert_data.get("completion_date"))

    return VerifyCertificateResponse(
        verified=True,
        certificate=Certificate(
            id=cert_docs[0].id,
            certificate_id=cert_data.get("certificate_id"),
            user_id=cert_data.get("user_id"),
            course_id=cert_data.get("course_id"),
            course_title=cert_data.get("course_title"),
            holder_name=cert_data.get("holder_name"),
            instructor_name=cert_data.get("instructor_name"),
            issue_date=issue_date,
            completion_date=completion_date,
            credential_url=cert_data.get("credential_url"),
        ),
        message="Certificate verified successfully"
    )


@router.get("/user/{user_id}/course/{course_id}")
async def get_certificate(user_id: str, course_id: str) -> CertificateResponse:
    """
    Get existing certificate for a user's course.
    """
    db = get_firestore()

    cert_docs = list(
        db.collection("certificates")
        .where("user_id", "==", user_id)
        .where("course_id", "==", course_id)
        .stream()
    )

    if not cert_docs:
        return CertificateResponse(
            success=False,
            certificate=None,
            message="No certificate found"
        )

    cert_data = cert_docs[0].to_dict()
    issue_date = firestore_to_datetime(cert_data.get("issue_date"))
    completion_date = firestore_to_datetime(cert_data.get("completion_date"))

    return CertificateResponse(
        success=True,
        certificate=Certificate(
            id=cert_docs[0].id,
            certificate_id=cert_data.get("certificate_id"),
            user_id=cert_data.get("user_id"),
            course_id=cert_data.get("course_id"),
            course_title=cert_data.get("course_title"),
            holder_name=cert_data.get("holder_name"),
            instructor_name=cert_data.get("instructor_name"),
            issue_date=issue_date,
            completion_date=completion_date,
            credential_url=cert_data.get("credential_url"),
        ),
        message="Certificate found"
    )
