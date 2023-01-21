import os

# from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator


class MyAuthenticator(Authenticator):
    async def get_account_data(
        self,
        email: str,
    ):
        pass
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

# import os
# from fastapi import Depends
# from jwtdown_fastapi.authentication import Authenticator
# from pydantic import BaseModel
# from psycopg_pool import ConnectionPool
# from typing import Union, List


# pool = ConnectionPool(conninfo=os.environ["DATABASE_URL2"])


# class Error(BaseModel):
#     message: str


# class DuplicateUserError(ValueError):
#     pass


# class UserIn(BaseModel):
#     email: str
#     password: str
#     # role: Optional[str]


# class UserOut(BaseModel):
#     user_id: int
#     email: str
#     role: str


# class UserOutWithPassword(UserOut):
#     hashed_password: str


# class UserRepository:
#     def create(
#         self, user: UserIn, hashed_password: str
#     ) -> UserOutWithPassword:
#         with pool.connection() as conn:
#             with conn.cursor() as db:
#                 result = db.execute(
#                     """
#                     INSERT INTO users
#                         (email, password, role)
#                     VALUES
#                         (%s, %s, 'player')
#                     RETURNING user_id;
#                     """,
#                     [
#                         user.email,
#                         hashed_password,
#                     ],
#                 )
#                 user_id = result.fetchone()[0]
#                 old_data = user.dict()
#                 old_data["role"] = "player"
#                 return UserOutWithPassword(
#                     user_id=user_id,
#                     hashed_password=hashed_password,
#                     **old_data
#                 )

#     def get_all(self) -> Union[Error, List[UserOutWithPassword]]:
#         try:
#             with pool.connection() as conn:
#                 with conn.cursor() as db:
#                     db.execute(
#                         """
#                         SELECT user_id,email,password,role
#                         FROM users
#                         WHERE email = %s;
#                         """
#                     )
#                     return [
#                         UserOut(
#                             user_id=record[0],
#                             email=record[1],
#                             password=record[2],
#                             role=record[3],
#                         )
#                         for record in db
#                     ]
#         except Exception:
#             return {"message": "Could not get all users"}

#     def get(self, email: str) -> Union[Error, UserOutWithPassword]:
#         try:
#             with pool.connection() as conn:
#                 with conn.cursor() as db:
#                     result = db.execute(
#                         """
#                         SELECT user_id,email,password,role
#                         FROM users
#                         WHERE email = %s;
#                         """,
#                         [email],
#                     )
#                     record = result.fetchone()
#                     if record is None:
#                         return None
#                     return UserOutWithPassword(
#                         user_id=record[0],
#                         email=record[1],
#                         hashed_password=record[2],
#                         role=record[3],
#                     )

#         except Exception:
#             return {"message": "Could not get all users"}


# class MyAuthenticator(Authenticator):
#     async def get_account_data(
#         self,
#         email: str,
#         accounts: UserRepository,
#     ):
#         # Use your repo to get the account based on the
#         # username (which could be an email)
#         return accounts.get(email)

#     def get_account_getter(
#         self,
#         accounts: UserRepository = Depends(),
#     ):
#         # Return the accounts. That's it.
#         return accounts

#     def get_hashed_password(self, account: UserOutWithPassword):
#         # Return the encrypted password value from your
#         # account object
#         return account.hashed_password

#     def get_account_data_for_cookie(self, account: UserOut):
#         # Return the username and the data for the cookie.
#         # You must return TWO values from this method.
#         return account.email, UserOut(**account.dict())


# authenticator = MyAuthenticator(os.environ["SIGNING_KEY"])
