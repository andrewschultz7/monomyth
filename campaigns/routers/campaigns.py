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
from token_auth import get_current_user

from pydantic import BaseModel

from queries.campaigns import (
    CampaignIn,
    CampaignOut,
    CampaignRepository,
    DuplicateCampaignError,
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
    repo: CampaignRepository = Depends(get_current_user),
):
    try:
        info = repo.create(info)
    except DuplicateCampaignError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create a campaign with those credentials",
        )
    return info
    # form = CampaignForm(username=info.email, password=info.password)
    # token = await authenticator.login(response, request, form, repo)
    # return AccountToken(account=account, **token.dict())
