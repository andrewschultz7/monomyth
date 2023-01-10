from fastapi import APIRouter, Depends, Response
from authenticator import authenticator
from typing import Union, List
from queries.users import Error, UserIn, UserOut, UserRepository

router = APIRouter()



@router.post('/token', response_model=Union[UserOut, Error])
async def log_in(
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    pass

@router.post('/token', response_model=Union[UserOut, Error])
async def log_out(
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    pass

@router.post('/signup', response_model=Union[UserOut, Error])
def create_user(
    user: UserIn,
    response: Response,
    repo: UserRepository = Depends()
):

    # response.status_code = 400
    return repo.create(user)
