# from bson.objectid import ObjectId
from pydantic import BaseModel

# class PydanticObjectId(ObjectId):
#     @classmethod
#     def __get_validators__(cls):
#         yield cls.validate

# @classmethod
# def validate(cls, value: ObjectId | str) -> ObjectId:
#     if value:
#         try:
#             ObjectId(value)
#         except:
#             raise ValueError(f"Not a valid object id: {value}")
#     return value


class UserOut(BaseModel):
    user_id: int
    email: str
    role: str
