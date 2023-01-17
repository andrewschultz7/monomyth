from pydantic import BaseModel
from typing import Optional, List, Union
from datetime import date
from queries.pool import pool


class Error(BaseModel):
    message: str

class DuplicateParticipantError(ValueError):
    pass

class ParticipantIn(BaseModel):
    character: str
    email: str
    event: Optional[str]

class ParticipantOut(BaseModel):
    participant_id: int
    character: str
    email: str
    event: Optional[str]


class ParticipantRepository:
    def get_all(self) -> Union[Error, List[ParticipantOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT participant_id,character,email,event
                        FROM participants
                        ORDER BY participant_id;
                        """
                    )
                    # result = []
                    # for record in db:
                    #     participant = ParticipantOut(
                    #         participant_id= record[0],
                    #         character=record[1],
                    #         email=record[2],
                    #         description=record[3],
                    #         thoughts=record[4],
                    #     )
                    #     result.append(vacation)
                    # return result
                    # ***  BELOW IS A LIST COMP WAY  OF WHATS ABOVE ***
                    return [
                        ParticipantOut(
                            participant_id= record[0],
                            character=record[1],
                            email=record[2],
                            event=record[3],
                        )
                        for record in db
                    ]
        except Exception:
            return {"message": "Could not get all Participants"}

    def create(self, participant: ParticipantIn) -> ParticipantOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO participants
                        (character
                        ,email
                        ,event)
                    VALUES
                        (%s, %s, %s)
                    RETURNING participant_id;
                    """,
                    [
                        participant.character,
                        participant.email,
                        participant.event,
                    ]
                )
                participant_id = result.fetchone()[0]
                old_data = participant.dict()
                return ParticipantOut (participant_id=participant_id, **old_data)

# this is where we did hashed_password in event
# test
