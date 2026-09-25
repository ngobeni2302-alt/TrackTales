import jwt
import time
from typing import Optional, Dict
from fastapi import Header, HTTPException, Depends

# Secret key for signing JWT tokens (in production this would be set via environment variable)
JWT_SECRET = "tracktales_central_auth_secret_key_2026_south_africa_railways"
JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_SECONDS = 86400 * 30  # 30 days session lifetime for seamless cross-device login

def create_access_token(user_id: str, email: str, username: str) -> str:
    payload = {
        "sub": user_id,
        "email": email,
        "username": username,
        "iat": int(time.time()),
        "exp": int(time.time()) + JWT_EXPIRATION_SECONDS
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

def decode_access_token(token: str) -> Optional[Dict]:
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload
    except (jwt.ExpiredSignatureError, jwt.InvalidTokenError):
        return None

def get_current_user_optional(authorization: Optional[str] = Header(None)) -> Optional[Dict]:
    """Extract current user payload from Authorization header if present."""
    if not authorization:
        return None
    try:
        parts = authorization.split()
        if len(parts) == 2 and parts[0].lower() == "bearer":
            token = parts[1]
            return decode_access_token(token)
    except Exception:
        pass
    return None

def require_current_user(authorization: Optional[str] = Header(None)) -> Dict:
    """Dependency enforcing a valid JWT Bearer token."""
    user = get_current_user_optional(authorization)
    if not user:
        raise HTTPException(
            status_code=401,
            detail="Authentication required. Please log in to your TrackTales account.",
            headers={"WWW-Authenticate": "Bearer"}
        )
    return user
