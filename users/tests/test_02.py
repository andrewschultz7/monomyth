from fastapi.testclient import TestClient
from main import app
from queries.users import UserOutWithPassword, UserIn, UserRepository
from routers.users import AccountToken
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator
from routers.users import get_authenticator


client = TestClient(app)

user_out = UserOutWithPassword(
    user_id=1, email="no@No.com", role="test", hashed_password="password"
)

token = Token(access_token="test", token_type="test")
account_token = AccountToken(account=user_out, **token.dict())


class FakeUserRepository:
    def create(self, user, hashed_password):
        return user_out

    def get(self, email):
        return user_out


class FakeAuthenticator:
    def hash_password(self, password):
        return "password"

    async def login(self, response, request, form, repo):
        return token

info=UserIn(email="no@No.com", password="password")
hashed_password="hashed_password"


def test_create_user():
    app.dependency_overrides[get_authenticator] = FakeAuthenticator
    app.dependency_overrides[UserRepository] = FakeUserRepository
    # app.dependency_overrides[repo] = FakeUserRepository
    user_in = UserIn(email="no@No.com", password="password")
    response = client.post("/signup", json=user_in.dict())
    assert response.status_code == 200
