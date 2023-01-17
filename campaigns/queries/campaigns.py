from pydantic import BaseModel
from typing import Optional, List, Union
from datetime import date
from queries.pool import pool, pool2
from fastapi import Depends
from authenticator import authenticator


class Error(BaseModel):
    message: str

class DuplicateCampaignError(ValueError):
    pass

class CampaignIn(BaseModel):
    title: str
    genre: str
    description: str
    rulebook: str
    campaign_email: str
    users: Optional[str]

class CampaignOut(BaseModel):
    campaign_id: int
    title: str
    genre: str
    description: str
    rulebook: str
    campaign_email: str
    users: Optional[str]

class UserOut(BaseModel):
    user_id: int
    email: str
    role: str


class CampaignRepository:
    def get_one(self, campaign_id: int) -> Optional[CampaignOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT campaign_id
                        , title
                        , genre
                        , description
                        , rulebook
                        , campaign_email
                        , users
                        FROM campaigns
                        WHERE campaign_id = %s
                        """,
                        [campaign_id]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_campaign_out(record)
        except Exception:
            return {"message": "Could not get that Campaign"}

    def delete(self, campaign_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM campaigns
                        WHERE campaign_id = %s;
                        """,
                        [campaign_id]
                    )
                    return True
        except Exception:
            return False


    def update(self, campaign_id: int, campaign: CampaignIn) -> Union[CampaignOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE campaigns
                        SET title = %s
                        , genre = %s
                        , description = %s
                        , rulebook = %s
                        , campaign_email = %s
                        , users = %s
                        WHERE campaign_id = %s
                        """,
                        [
                            campaign.title,
                            campaign.genre,
                            campaign.description,
                            campaign.rulebook,
                            campaign.campaign_email,
                            campaign.users,
                            campaign_id

                        ]
                    )
                # old_data = campaign.dict()
                # return CampaignOut(campaign_id=campaign_id, **old_data)
                return self.campaign_in_to_out(campaign_id, campaign)
        except Exception:
            return {"message": "Could not updateCampaigns"}


    def get_all_campaigns(self) -> Union[Error, List[CampaignOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT campaign_id
                        , title
                        , genre
                        , description
                        , rulebook
                        , campaign_email
                        , users
                        FROM campaigns
                        ORDER BY campaign_id;
                        """
                    )
                    result = []
                    for record in db:
                        campaign = CampaignOut(
                            campaign_id= record[0],
                            title=record[1],
                            genre=record[2],
                            description=record[3],
                            rulebook=record[4],
                            campaign_email=record[5],
                            users=record[6],
                        )
                        result.append(campaign)
                    return result
                    # ***  BELOW IS A LIST COMP WAY  OF WHATS ABOVE ***
                    # return [
                    #     self.record_to_campaign_out(record)
                    #     for record in db
                    # ]
        except Exception:
            return {"message": "Could not get all Campaigns"}

    def create(
        self,
        campaign: CampaignIn,
        user: dict = Depends(authenticator.get_current_account_data)
        ) -> CampaignOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO campaigns
                        (title
                        , genre
                        , description
                        , rulebook
                        , campaign_email
                        , users)
                    VALUES
                        (%s, %s, %s, %s, %s, %s)
                    RETURNING campaign_id;
                    """,
                    [
                        campaign.title,
                        campaign.genre,
                        campaign.description,
                        campaign.rulebook,
                        campaign.campaign_email,
                        campaign.users
                    ]
                )
                campaign_id = result.fetchone()[0]
        with pool2.connection() as conn2:
            with conn2.cursor() as db2:
                db2.execute(
                    """
                    UPDATE public.users
                    SET role='gamemaster'
                    """,
                    [user.user_id]
                )
                old_data = campaign.dict()
                return CampaignOut (campaign_id=campaign_id, **old_data)
                # return campaign_in_to_out(campaign_id, campaign)

# this is where we did hashed_password in Users

#Refactor for Campaign Out
    def record_to_campaign_out(self, record):
        return CampaignOut(
            campaign_id= record[0],
            title=record[1],
            genre=record[2],
            description=record[3],
            rulebook=record[4],
            campaign_email=record[5]
        )

#Refactor of In to Out Campaign
    def campaign_in_to_out(self, campaign_id: int, campaign: CampaignIn):
        old_data = campaign.dict()
        return CampaignOut(campaign_id=campaign_id, **old_data)
