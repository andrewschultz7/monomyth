# from fastapi.testclient import TestClient
# from main import app
# from routers.events import EventOut
# from authenticator import authenticator
# from queries.events import EventRepository
# from datetime import date, datetime


# event_out = EventOut(
#             event_id=3,
#             eventname="test",
#             venuename="a place",
#             address="500 test place",
#             date=datetime.date(),
#             participants="me",
#             campaign="star wars"
# )

# client = TestClient(app)


# class FakeEventRepository:
#     def get_one(self, event_id):
#         return event_out


# def fake_authenticator():
#     pass


# def test_get_event():
#     app.dependency_overrides[
#         authenticator.get_current_account_data
#     ] = fake_authenticator
#     app.dependency_overrides[
#         EventRepository
#     ] = FakeEventRepository
#     response = client.get("/events/3")
#     assert response.status_code == 200
#     assert response.json() == event_out
