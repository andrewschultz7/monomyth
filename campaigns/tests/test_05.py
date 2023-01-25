from fastapi.testclient import TestClient
from main import app
from authenticator import authenticator
from queries.participants import ParticipantRepository


client = TestClient(app)
data2 = {
    "participant_id": 1,
    "character": "monster",
    "email": "no@no.com",
    "event": "test",
}


class FakeParticipantRepository:
    def create(self, participant):
        return data2


def fake_authenticator():
    pass


def test_create_participant():
    app.dependency_overrides[ParticipantRepository] = FakeParticipantRepository
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_authenticator
    data = {"character": "monster", "email": "no@no.com", "event": "test"}
    response = client.post("/events/participants", json=data)
    assert response.status_code == 200
