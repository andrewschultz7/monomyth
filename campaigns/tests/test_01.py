from fastapi.testclient import TestClient
from main import app
from routers.campaigns import CampaignOut
from authenticator import authenticator
from queries.campaigns import CampaignRepository

campaign_out = CampaignOut(
            campaign_id=3,
            title="test",
            genre="fiction",
            description="a test description",
            rulebook="put rulebook here",
            campaign_email="test@test.com",
            users="test"
        )

client = TestClient(app)


class FakeCampaignRepository:
    def get_one(self, campaign_id):
        return campaign_out


def fake_authenticator():
    pass


def test_get_campaign():
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_authenticator
    app.dependency_overrides[
        CampaignRepository
    ] = FakeCampaignRepository
    response = client.get("/campaigns/3")
    assert response.status_code == 200
    assert response.json() == campaign_out
