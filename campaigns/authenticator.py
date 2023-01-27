import os
from jwtdown_fastapi.authentication import Authenticator


class MyAuthenticator(Authenticator):
    async def get_account_data(
        self,
        email: str,
    ):
        pass

    def get_account_getter(
        self,
    ):
        pass

    def get_hashed_password(self):
        pass

    def get_account_data_for_cookie(self):
        pass


authenticator = MyAuthenticator(os.environ["SIGNING_KEY"])
