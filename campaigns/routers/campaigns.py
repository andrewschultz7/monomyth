from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token
# from authenticator import authenticator
from token_auth import get_current_user
from typing import Union, Optional, List
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


@router.put("/campaigns{campaign_id}", response_model=Union[CampaignOut, HttpError])
async def update_campaign(
    campaign_id: int,
    campaign: CampaignIn,
    repo: CampaignRepository = Depends(),) -> Union[HttpError, CampaignOut]:

    return repo.update(campaign_id, campaign)


@router.delete("/campaigns{campaign_id}", response_model=bool)
def delete_campaign(
    campaign_id: int,
    repo: CampaignRepository = Depends(),
) -> bool:
    return repo.delete(campaign_id)


@router.get("/campaigns/{campaign_id}", response_model=Optional[CampaignOut])
def get_one_campaign(
    campaign_id: int,
    response: Response,
    repo: CampaignRepository = Depends(),
) -> CampaignOut:
    campaign = repo.get_one(campaign_id)
    if campaign is None:
        response.status_code = 404
    return campaign


@router.get("/campaigns", response_model=Union[HttpError, List[CampaignOut]])
def get_all_campaigns(
    repo: CampaignRepository = Depends(),
):
    return repo.get_all_campaigns()


    # form = CampaignForm(username=info.email, password=info.password)
    # token = await authenticator.login(response, request, form, repo)
    # return AccountToken(account=account, **token.dict())
