from pydantic import BaseModel
from typing import Optional, List, Union
from datetime import date
from queries.pool import pool


class Error(BaseModel):
    message: str

class DuplicateEventError(ValueError):
    pass

class EventIn(BaseModel):
    # event_id: int
    eventname: str
    venuename: str
    address: str
    date: date
    campaign_id: Optional[int]

class EventOut(BaseModel):
    event_id: int
    eventname: str
    venuename: str
    address: str
    date: date
    campaign_id: Optional[int]


class EventRepository:
    def get_one(self, event_id: int) -> Optional[EventOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT event_id
                        , eventname
                        , venuename
                        , address
                        , date
                        , campaign_id
                        FROM events
                        WHERE event_id = %s
                        """,
                        [event_id]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_event_out(record)
        except Exception:
            return {"message": "Could not get that event"}

    def delete(self, event_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM events
                        WHERE event_id = %s;
                        """,
                        [event_id]
                    )
                    return True
        except Exception:
            return False


    def update(self, event_id: int, event: EventIn) -> Union[EventOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE event
                        SET eventname = %s
                        , venuename = %s
                        , address = %s
                        , date = %s
                        , campaign_id = %s
                        WHERE event_id = %s
                        """,
                        [
                            event.eventname,
                            event.venuename,
                            event.address,
                            event.date,
                            event.campaign_id,
                            event_id
                        ]
                    )
                # old_data = event.dict()
                # return EventOut(event_id=event_id, **old_data)
                return self.event_in_to_out(event_id, event)
        except Exception:
            return {"message": "Could not updateevents"}


    def get_all_events(self) -> Union[Error, List[EventOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT event_id
                        , eventname
                        , venuename
                        , address
                        , date
                        , campaign_id
                        FROM events
                        ORDER BY event_id;
                        """
                    )
                    result = []
                    for record in db:
                        event = EventOut(
                            event_id= record[0],
                            eventname=record[1],
                            venuename=record[2],
                            address=record[3],
                            date=record[4],
                            campaign_id=record[5],
                        )
                        result.append(event)
                    return result
        except Exception:
            return {"message": "Could not get all events"}

    def create(self, event: EventIn) -> EventOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO events
                        (eventname
                        , venuename
                        , address
                        , date
                        , campaign_id)
                    VALUES
                        (%s, %s, %s, %s, %s)
                    RETURNING event_id;
                    """,
                    [
                        event.eventname,
                        event.venuename,
                        event.address,
                        event.date,
                        event.campaign_id
                    ]
                )
                event_id = result.fetchone()[0]
                old_data = event.dict()
                return EventOut (event_id=event_id, **old_data)
                # return event_in_to_out(event_id, event)

# this is where we did hashed_password in campaign

#Refactor for event Out
    def record_to_event_out(self, record):
        return EventOut(
            event_id= record[0],
            eventname=record[1],
            venuename=record[2],
            address=record[3],
            date=record[4],
            campaign_id=record[5]
        )

#Refactor of In to Out event
    def event_in_to_out(self, event_id: int, event: EventIn):
        old_data = event.dict()
        return EventOut(event_id=event_id, **old_data)
