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
    event_id: int
    campaign_id: int

class ParticipantOut(BaseModel):
    participant_id: int
    user_id: int
    character: str
    event_id: int = 0
    campaign_id: int


class ParticipantRepository:
    def get_all(self) -> Union[Error, List[ParticipantOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT participant_id,character
                        FROM participants
                        ORDER BY participant_id;
                        """
                    )
                    result = []
                    for record in db:
                        participant = ParticipantOut(
                            participant_id= record[0],
                            character=record[1],
                        )
                        result.append(participant)
                    return result
        except Exception:
            return {"message": "Could not get all Participants"}

    def create(self, participant: ParticipantIn, user) -> ParticipantOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                # participant.user_id = user["user_id"]
                result = db.execute(
                    """
                    INSERT INTO participants
                        (user_id
                        , character
                        , event_id
                        , campaign_id
                       )
                    VALUES
                        (%s, %s, %s, %s)
                    RETURNING participant_id;
                    """,
                    [
                        user["user_id"],
                        participant.character,
                        participant.event_id,
                        participant.campaign_id,
                    ]
                )
                participant_id = result.fetchone()[0]
                old_data = participant.dict()
                return ParticipantOut (participant_id=participant_id, user_id=user["user_id"], **old_data)

# this is where we did hashed_password in event
# test
