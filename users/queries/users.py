from pydantic import BaseModel
from typing import Optional, List, Union
from datetime import date
from queries.pool import pool


class Error(BaseModel):
    message: str

class DuplicateUserError(ValueError):
    pass

class UserIn(BaseModel):
    email: str
    password: str
    role: Optional[str]

class UserOut(BaseModel):
    user_id: int
    email: str
    role: str

class UserOutWithPassword(UserOut):
    hashed_password: str


class UserRepository:
    def create(self, user: UserIn, hashed_password:str) -> UserOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO users
                        (email, password, role)
                    VALUES
                        (%s, %s, %s)
                    RETURNING user_id;
                    """,
                    [
                        user.email,
                        hashed_password,
                        user.role,
                    ]
                )
                user_id = result.fetchone()[0]
                old_data = user.dict()
                print("\n")
                print(old_data)
                print("\n")
                return UserOutWithPassword (user_id=user_id, hashed_password=hashed_password, **old_data)

    def get_all(self) -> Union[Error, List[UserOutWithPassword]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT user_id,email,password,role
                        FROM users
                        WHERE email = %s;
                        """
                    )
                    return [
                        UserOut(
                            user_id= record[0],
                            email=record[1],
                            password=record[2],
                            role=record[3],
                        )
                        for record in db
                    ]
        except Exception:
            return {"message": "Could not get all users"}

    def get(self, email:str) -> Union[Error, UserOutWithPassword]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT user_id,email,password,role
                        FROM users
                        WHERE email = %s;
                        """,
                        [email]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return UserOutWithPassword(
                            user_id= record[0],
                            email=record[1],
                            hashed_password=record[2],
                            role=record[3],
                        )

        except Exception:
            return {"message": "Could not get all users"}
