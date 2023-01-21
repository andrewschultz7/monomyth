from main import app
from fastapi.testclient import TestClient
from authenticator import authenticator

client = TestClient(app)


def test_get_current_user():
        response = client.get("/token")
        assert response.status_code == 200
