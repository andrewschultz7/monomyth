from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator, MyAuthenticator
from pydantic import BaseModel

from queries.users import (
    UserIn,
    UserOut,
    UserRepository,
    DuplicateUserError,
)
import json


class AccountForm(BaseModel):
    username: str
    password: str


class AccountToken(Token):
    account: UserOut


class HttpError(BaseModel):
    detail: str


router = APIRouter()


@router.get("/endpoint", response_model=bool)
async def protected_endpoint(
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return True


@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: UserOut = Depends(authenticator.try_get_current_account_data),
) -> AccountToken | None:
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }


@router.post("/signup", response_model=AccountToken | HttpError)
async def create_account(
    info: UserIn,
    request: Request,
    response: Response,
    repo: UserRepository = Depends(),
    authenticator: MyAuthenticator = Depends(authenticator)
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        account = repo.create(info, hashed_password)
    except DuplicateUserError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(username=info.email, password=info.password)
    token = await authenticator.login(response, request, form, repo)
    return AccountToken(account=account, **token.dict())


@router.get("/current", response_model=UserOut | None)
async def get_curr_user(request: Request, repo: UserRepository = Depends()):
    data = request.payload["user"]["email"]
    user = repo.get(data)
    return json.dumps({"id": user.id, "email": user.email, "role": user.role})


# @router.get("/users", response_model=Union[HttpError, List
# [UserOut]])
# def get_all_users(
#     repo: UserRepository = Depends(),
#     user: dict = Depends(authenticator.get_current_account_data),
#  ):

#     return repo.get_all_users()
