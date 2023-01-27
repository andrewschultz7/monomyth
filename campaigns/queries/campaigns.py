from pydantic import BaseModel
from typing import Optional, List, Union
from datetime import date
from queries.pool import pool

## BaseModel is for our ENDPOINTS


# class Error(BaseModel):
#     message: str


# class VacationIn(BaseModel):
#     name: str
#     from_date: date
#     to_date: date
#     thoughts: Optional[str]


# class VacationOut(BaseModel):
#     id: int
#     name: str
#     from_date: date
#     to_date: date
#     thoughts: Optional[str]


# class VacationRepository:
#     def get_all(self) -> Union[Error, List[VacationOut]]:
#         try:
#             with pool.connection() as conn:
#                 with conn.cursor() as db:
#                     result = db.execute(
#                         """
#                         SELECT id,name,from_date,to_date,thoughts
#                         FROM vacations
#                         ORDER BY from_date;
#                         """
#                     )
#                     # result = []
#                     # for record in db:
#                     #     vacation = VacationOut(
#                     #         id= record[0],
#                     #         name=record[1],
#                     #         from_date=record[2],
#                     #         to_date=record[3],
#                     #         thoughts=record[4],
#                     #     )
#                     #     result.append(vacation)
#                     # return result
#                     # ***  BELOW IS A LIST COMP WAY  OF WHATS ABOVE ***
#                     return [
#                         VacationOut(
#                             id= record[0],
#                             name=record[1],
#                             from_date=record[2],
#                             to_date=record[3],
#                             thoughts=record[4]
#                         )
#                         for record in db
#                     ]
#         except Exception:
#             return {"message": "Could not get all vacations"}

#     def create(self, vacation: VacationIn) -> VacationOut:
#         with pool.connection() as conn:
#             with conn.cursor() as db:
#                 result = db.execute(
#                     """
#                     INSERT INTO vacations
#                         (name, from_date, to_date, thoughts)
#                     VALUES
#                         (%s, %s, %s, %s)
#                     RETURNING id;
#                     """,
#                     [
#                         vacation.name,
#                         vacation.from_date,
#                         vacation.to_date,
#                         vacation.thoughts
#                     ]
#                 )
#                 id = result.fetchone()[0]
#                 old_data = vacation.dict()
#                 return Vacationout (id=id, **old_data)
