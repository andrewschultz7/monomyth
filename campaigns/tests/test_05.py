from fastapi.testclient import TestClient
from main import app
from authenticator import authenticator
from queries.participants import ParticipantRepository
client = TestClient(app)
data2 = {
    "participant_id": 1,
    "user_id": 1,
    "character": "monster",
    "event_id": 2,
    "campaign_id": 1,
}
class FakeParticipantRepository:
    def create(self, event_id, campaign_id):
        return data2
def fake_authenticator():
    pass
def test_create_participant():
    app.dependency_overrides[ParticipantRepository] = FakeParticipantRepository
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_authenticator
    data = {
        "user_id": 1,
        "character": "monster",
        "event_id": 2,
        "campaign_id": 1,
    }
    response = client.post("/campaigns/1/events/2/participants", json=data)
    assert response.status_code == 200
