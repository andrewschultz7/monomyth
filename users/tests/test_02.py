from fastapi.testclient import TestClient
from main import app


client = TestClient(app)


def test_create_user():
    data = {"email": "no@no.com", "password": "password", "role": "participant"}
    response = client.post("/signup", json=data)
    assert response.status_code == 200
