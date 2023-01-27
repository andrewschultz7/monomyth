from pydantic import BaseModel


class UserOut(BaseModel):
    user_id: int
    email: str
    role: str
