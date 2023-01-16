from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator
# from token_auth import get_current_user
from typing import Union, Optional, List
from pydantic import BaseModel

from queries.events import (
    EventIn,
    EventOut,
    EventRepository,
    DuplicateEventError,
)


class EventForm(BaseModel):
    eventname: str
    venuename: str
    address: str
    date: str
    participants: str
    campaign: Optional[str]

class AccountToken(Token):
    account: EventOut

class HttpError(BaseModel):
    detail: str

router = APIRouter()


@router.post("/events", response_model=EventOut | HttpError)
async def create_event(
    info: EventIn,
    request: Request,
    response: Response,
    repo: EventRepository = Depends(),
    user: dict = Depends(authenticator.get_current_account_data),
):
    try:
        info = repo.create(info)
    except DuplicateEventError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an event with those credentials",
        )
    return info


@router.put("/events/{event_id}", response_model=Union[EventOut, HttpError])
async def update_event(
    event_id: int,
    event: EventIn,
    repo: EventRepository = Depends(),
    user: dict = Depends(authenticator.get_current_account_data),
    ) -> Union[HttpError, EventOut]:

    return repo.update(event_id, event)


@router.delete("/events/{event_id}", response_model=bool)
def delete_event(
    event_id: int,
    repo: EventRepository = Depends(),
    user: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    return repo.delete(event_id)


@router.get("/events/{event_id}", response_model=Optional[EventOut])
def get_one_event(
    event_id: int,
    response: Response,
    repo: EventRepository = Depends(),
    user: dict = Depends(authenticator.get_current_account_data),
) -> EventOut:
    event = repo.get_one(event_id)
    if event is None:
        response.status_code = 404
    return event


@router.get("/events", response_model=Union[HttpError, List[EventOut]])
def get_all_events(
    repo: EventRepository = Depends(),
    user: dict = Depends(authenticator.get_current_account_data),
):
    return repo.get_all_events()


    # form = EventForm(username=info.email, password=info.password)
    # token = await authenticator.login(response, request, form, repo)
    # return AccountToken(account=account, **token.dict())
