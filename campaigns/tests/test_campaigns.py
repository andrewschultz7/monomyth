# from fastapi.testclient import TestClient
# from main import app


# client = TestClient(app)


# expected_post_response = {
#         "campaign_id": 1,
#         "title": "Star Wars",
#         "genre": "Fiction",
#         "description": "Fight for the galaxy",
#         "rulebook": "optional",
#         "campaign_email": "starwars@no.com",
#     }

# class MockCampaignQueries:
#     def create_campaign(self, new_campaign):
#         return expected_post_response


# def test_get_campaign():
#     # Arrange
#     req_body = {
#         "title": "Star Wars",
#         "genre": "Fiction",
#         "description": "Fight for the galaxy",
#         "rulebook": "optional",
#         "campaign_email": "starwars@no.com",
#     }

#     # app.dependency_overrides[CampaignQueries] = MockCampaignQueries

#     # Act
#     resp = client.post('/campaigns', json=req_body)
#     actual = resp.json()

#     # Assert
#     assert actual == expected_post_response
#     # Clean up
#     app.dependency_overrides = {}
