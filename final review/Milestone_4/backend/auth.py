import os
import json
import base64
import hmac
import hashlib
import time
from typing import Optional, Dict

SECRET_KEY = "sports-ai-super-secret-key-change-in-production"
ALGORITHM = "HS256"
TOKEN_EXPIRE_SECONDS = 86400  # 24 hours


def hash_password(password: str) -> str:
    """Hashes a password using PBKDF2-HMAC-SHA256."""
    salt = os.urandom(16)
    key = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt, 100000)
    return salt.hex() + ":" + key.hex()


def verify_password(stored_password_hash: str, password_attempt: str) -> bool:
    """Verifies a plain password against the stored PBKDF2 hash string."""
    try:
        salt_hex, key_hex = stored_password_hash.split(":")
        salt = bytes.fromhex(salt_hex)
        expected_key = bytes.fromhex(key_hex)
        key_attempt = hashlib.pbkdf2_hmac('sha256', password_attempt.encode('utf-8'), salt, 100000)
        return hmac.compare_digest(expected_key, key_attempt)
    except Exception:
        return False


def _base64url_encode(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).decode('utf-8').rstrip('=')


def _base64url_decode(data: str) -> bytes:
    padding = '=' * (4 - (len(data) % 4))
    return base64.urlsafe_b64decode(data + padding)


def create_access_token(payload_data: dict) -> str:
    """Creates a signed JWT string using HMAC-SHA256."""
    header = {"alg": "HS256", "typ": "JWT"}
    payload = payload_data.copy()
    payload["exp"] = int(time.time()) + TOKEN_EXPIRE_SECONDS

    encoded_header = _base64url_encode(json.dumps(header).encode('utf-8'))
    encoded_payload = _base64url_encode(json.dumps(payload).encode('utf-8'))

    signature_input = f"{encoded_header}.{encoded_payload}".encode('utf-8')
    signature = hmac.new(SECRET_KEY.encode('utf-8'), signature_input, hashlib.sha256).digest()
    encoded_signature = _base64url_encode(signature)

    return f"{encoded_header}.{encoded_payload}.{encoded_signature}"


def verify_access_token(token: str) -> Optional[Dict]:
    """Decodes and verifies a JWT token string."""
    try:
        parts = token.split(".")
        if len(parts) != 3:
            return None

        encoded_header, encoded_payload, encoded_signature = parts
        signature_input = f"{encoded_header}.{encoded_payload}".encode('utf-8')
        expected_sig = _base64url_encode(hmac.new(SECRET_KEY.encode('utf-8'), signature_input, hashlib.sha256).digest())

        if not hmac.compare_digest(expected_sig, encoded_signature):
            return None

        payload = json.loads(_base64url_decode(encoded_payload).decode('utf-8'))
        if payload.get("exp", 0) < time.time():
            return None

        return payload
    except Exception:
        return None