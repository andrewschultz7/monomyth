from fastapi.testclient import TestClient
from main import app
from routers.participants import ParticipantOut
from authenticator import authenticator
from queries.participants import ParticipantRepository


client = TestClient(app)


class FakeParticipantRepo:
    def get_one(self, uid=1):
        return ParticipantOut(
            participant_id=3,
            user_id=uid,
            character="testCH",
            event_id=1,
            campaign_id=1,
        )


def fake_authenticator():
    return {"user_id": 1, "email": "test@email.com", "role": "player"}


def test_get_a_participant():
    participant_expected = {
        "participant_id": 3,
        "user_id": 1,
        "character": "testCH",
        "event_id": 1,
        "campaign_id": 1,
    }

    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_authenticator
    app.dependency_overrides[ParticipantRepository] = FakeParticipantRepo

    response = client.get("/campaigns/events/participants/")

    assert response.status_code == 200
    assert response.json() == participant_expected

    app.dependency_overrides = {}
