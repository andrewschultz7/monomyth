from pydantic import BaseModel
from typing import Optional, List, Union
from datetime import date
from queries.pool import pool


class Error(BaseModel):
    message: str


class UserIn(BaseModel):
    email: str
    password: str
    campaigns: Optional[str]

class UserOut(BaseModel):
    user_id: int
    email: str
    password: str
    campaigns: str




class UserRepository:
    def get_all(self) -> Union[Error, List[UserOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT user_id,email,password,campaigns
                        FROM users
                        ORDER BY user_id;
                        """
                    )
                    # result = []
                    # for record in db:
                    #     vacation = VacationOut(
                    #         id= record[0],
                    #         name=record[1],
                    #         from_date=record[2],
                    #         to_date=record[3],
                    #         thoughts=record[4],
                    #     )
                    #     result.append(vacation)
                    # return result
                    # ***  BELOW IS A LIST COMP WAY  OF WHATS ABOVE ***
                    return [
                        UserOut(
                            user_id= record[0],
                            email=record[1],
                            password=record[2],
                            campaigns=record[3],
                        )
                        for record in db
                    ]
        except Exception:
            return {"message": "Could not get all users"}

    def create(self, user: UserIn) -> UserOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO users
                        (email, password, campaigns)
                    VALUES
                        (%s, %s, %s)
                    RETURNING user_id;
                    """,
                    [
                        user.email,
                        user.password,
                        user.campaigns,
                    ]
                )
                user_id = result.fetchone()[0]
                old_data = user.dict()
                return UserOut (user_id=user_id, **old_data)
