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

from pydantic import BaseModel

from queries.campaigns import (
    CampaignIn,
    CampaignOut,
    CampaignRepository,
    DuplicateUserError,
)


class CampaignForm(BaseModel):
    title: str
    genre: str
    description: str
    rulebook: str
    campaign_email: str

class AccountToken(Token):
    account: CampaignOut

class HttpError(BaseModel):
    detail: str

router = APIRouter()


@router.post("/campaigns", response_model=CampaignOut | HttpError)
async def create_campaign(
    info: CampaignIn,
    request: Request,
    response: Response,
    repo: CampaignRepository = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        account = repo.create(info, hashed_password)
    except DuplicateUserError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create a campaign with those credentials",
        )
    form = CampaignForm(username=info.email, password=info.password)
    token = await authenticator.login(response, request, form, repo)
    return AccountToken(account=account, **token.dict())
