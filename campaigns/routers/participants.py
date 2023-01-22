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
from typing import Optional, Union, List

from pydantic import BaseModel

from queries.participants import (
    ParticipantIn,
    ParticipantOut,
    ParticipantRepository,
    DuplicateParticipantError,
)

from queries.events import(
    EventIn,
    EventOut
)


class ParticipantForm(BaseModel):
    character: str
    event_id: int
    campaign_id: int

class AccountToken(Token):
    account: ParticipantOut

class HttpError(BaseModel):
    detail: str

router = APIRouter()


@router.post("/events/participants", response_model=ParticipantOut | HttpError)
async def create_participant(
    info: ParticipantForm,
    request: Request,
    response: Response,
    repo: ParticipantRepository = Depends(),
    user: dict = Depends(authenticator.get_current_account_data),
):
    print(user, "TTTTTTTTTTTTTTTTTTTTTTT")
    try:
        info = repo.create(info, user)
    except DuplicateParticipantError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an event with those credentials",
        )
    return info


@router.put("/events/participants/{participant_id}", response_model=Union[ParticipantOut, HttpError])
async def update_participant(
    participant_id: int,
    event: ParticipantIn,
    repo: ParticipantRepository = Depends(),
    user: dict = Depends(authenticator.get_current_account_data),
    ) -> Union[HttpError, ParticipantOut]:

    return repo.update(participant_id, event)


@router.delete("/events/participants/{participant_id}", response_model=bool)
def delete_participant(
    participant_id: int,
    repo: ParticipantRepository = Depends(),
    user: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    return repo.delete(participant_id)


@router.get("/events/participants/{participant_id}", response_model=Optional[ParticipantOut])
def get_one_participant(
    participant_id: int,
    response: Response,
    repo: ParticipantRepository = Depends(),
    user: dict = Depends(authenticator.get_current_account_data),
) -> ParticipantOut:
    event = repo.get_one(participant_id)
    if event is None:
        response.status_code = 404
    return event


@router.get("/events/participants", response_model=Union[HttpError, List[ParticipantOut]])
def get_all_participants(
    repo: ParticipantRepository = Depends(),
    user: dict = Depends(authenticator.get_current_account_data),
):
    return repo.get_all_participants()


    # form = EventForm(username=info.email, password=info.password)
    # token = await authenticator.login(response, request, form, repo)
    # return AccountToken(account=account, **token.dict())
