from functools import lru_cache

from app.config import get_settings
from app.services.chunker import ChunkerService
from app.services.firebase import FirebaseService
from app.services.gemini import GeminiService
from app.services.pinecone import PineconeService
from app.services.rag import RAGService


@lru_cache
def get_gemini_service() -> GeminiService:
    """Get cached Gemini service instance."""
    return GeminiService(get_settings())


@lru_cache
def get_pinecone_service() -> PineconeService:
    """Get cached Pinecone service instance."""
    return PineconeService(get_settings())


@lru_cache
def get_firebase_service() -> FirebaseService:
    """Get cached Firebase service instance."""
    return FirebaseService(get_settings())


@lru_cache
def get_chunker_service() -> ChunkerService:
    """Get cached Chunker service instance."""
    settings = get_settings()
    return ChunkerService(
        chunk_size=settings.chunk_size,
        overlap=settings.chunk_overlap,
    )


@lru_cache
def get_rag_service() -> RAGService:
    """Get cached RAG service instance."""
    settings = get_settings()
    return RAGService(
        gemini=get_gemini_service(),
        pinecone=get_pinecone_service(),
        firebase=get_firebase_service(),
        chunker=get_chunker_service(),
        top_k=settings.top_k,
    )
