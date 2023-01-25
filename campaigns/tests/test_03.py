# get participant by id

from fastapi.testclient import TestClient
from main import app
from routers.participants import ParticipantOut
from authenticator import authenticator
from queries.participants import ParticipantRepository
from pydantic import BaseModel

participant_out = ParticipantOut(
    participant_id=3,
    user_id=1,
    character="test",
    event_id=1,
    campaign_id=1,
)


client = TestClient(app)


class FakeParticipantRepository:
    def get_one(self, user_id):
        return participant_out


def fake_authenticator():
    pass


def test_get_participant():
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_authenticator
    app.dependency_overrides[ParticipantRepository] = FakeParticipantRepository
    response = client.get("/campaigns/1/events/1/participants/3")
    assert response.status_code == 200
    assert response.json() == participant_out
