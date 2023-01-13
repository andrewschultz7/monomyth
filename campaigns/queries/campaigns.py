from pydantic import BaseModel
from typing import Optional, List, Union
from datetime import date
from queries.pool import pool


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


class CampaignRepository:
    def get_all(self) -> Union[Error, List[CampaignOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT campaign_id,title,genre,description,rulebook,campaign_email,users
                        FROM campaigns
                        ORDER BY campaign_id;
                        """
                    )
                    # result = []
                    # for record in db:
                    #     campaign = CampaignOut(
                    #         campaign_id= record[0],
                    #         title=record[1],
                    #         genre=record[2],
                    #         description=record[3],
                    #         thoughts=record[4],
                    #     )
                    #     result.append(vacation)
                    # return result
                    # ***  BELOW IS A LIST COMP WAY  OF WHATS ABOVE ***
                    return [
                        CampaignOut(
                            campaign_id= record[0],
                            title=record[1],
                            genre=record[2],
                            description=record[3],
                            rulebook=record[4],
                            campaign_email=record[5]
                        )
                        for record in db
                    ]
        except Exception:
            return {"message": "Could not get all Campaigns"}

    def create(self, campaign: CampaignIn) -> CampaignOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO campaigns
                        (title,genre,description,rulebook,campaign_email,users)
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
                old_data = campaign.dict()
                return CampaignOut (campaign_id=campaign_id, **old_data)

# this is where we did hashed_password in Users
