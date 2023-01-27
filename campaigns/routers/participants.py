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


class ParticipantForm(BaseModel):
    character: str
    event_id: int
    campaign_id: int


class AccountToken(Token):
    account: ParticipantOut


class HttpError(BaseModel):
    detail: str


router = APIRouter()


@router.post(
    "/campaigns/{campaign_id}/events/{event_id}/participants",
    response_model=ParticipantOut | HttpError,
)
async def create_participant(
    info: ParticipantForm,
    request: Request,
    response: Response,
    repo: ParticipantRepository = Depends(),
    user: dict = Depends(authenticator.get_current_account_data),
):
    try:
        info = repo.create(info, user)
    except DuplicateParticipantError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an event with those credentials",
        )
    return info


@router.put(
    "/campaigns/{campaign_id}/events/{event_id}/participants/{participant_id}",
    response_model=Optional[ParticipantOut],
)
async def update_participant(
    response: Response,
    participant_id: int,
    event: ParticipantIn,
    repo: ParticipantRepository = Depends(),
    user: dict = Depends(authenticator.get_current_account_data),
) -> ParticipantOut:
    event2 = repo.update(participant_id, event, user["user_id"])
    return event2


@router.delete("/events/participants/{participant_id}", response_model=bool)
def delete_participant(
    participant_id: int,
    repo: ParticipantRepository = Depends(),
    user: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    return repo.delete(participant_id)


@router.get("/campaigns/events/participants",
    response_model=Optional[ParticipantOut],
)
def get_one_participant(
    response: Response,
    repo: ParticipantRepository = Depends(),
    user: dict = Depends(authenticator.get_current_account_data),
) -> ParticipantOut:
    event = repo.get_one(user["user_id"])
    if event is None:
        response.status_code = 404
    return event


@router.get("/events/participants",
    response_model=Union[HttpError, List[ParticipantOut]],
)
def get_all_participants(
    repo: ParticipantRepository = Depends(),
    user: dict = Depends(authenticator.get_current_account_data),
):
    return repo.get_all_participants()
