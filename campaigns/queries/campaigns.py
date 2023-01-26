from pydantic import BaseModel
from typing import Optional, List, Union
from queries.pool import pool


class Error(BaseModel):
    message: str


class DuplicateCampaignError(ValueError):
    pass


class UserList(BaseModel):
    user_id: str
    character: str


class CampaignIn(BaseModel):
    title: str
    genre: str
    description: str
    rulebook: str
    campaign_email: str
    gamemaster_id: Optional[int]


class CampaignOut(BaseModel):
    campaign_id: int
    title: str
    genre: str
    description: str
    rulebook: str
    campaign_email: str
    gamemaster_id: Optional[int]


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
                        , gamemaster_id
                        FROM campaigns
                        WHERE campaign_id = %s
                        """,
                        [campaign_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_campaign_out(record)
        except Exception:
            return {"message": "Could not get that Campaign"}

    def create(self, campaign: CampaignIn, user_id) -> CampaignOut:
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
                        , gamemaster_id)
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
                        user_id,
                    ],
                )
                campaign_id = result.fetchone()[0]
                old_data = campaign.dict()
                return CampaignOut(campaign_id=campaign_id, **old_data)

    def delete(self, campaign_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM campaigns
                        WHERE campaign_id = %s;
                        """,
                        [campaign_id],
                    )
                    return True
        except Exception:
            return False

    def update(
        self, campaign_id: int, campaign: CampaignIn, user_id
    ) -> CampaignOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE campaigns
                        SET campaign_id = %s
                        , title = %s
                        , genre = %s
                        , description = %s
                        , rulebook = %s
                        , campaign_email = %s
                        , gamemaster_id = %s
                        WHERE campaign_id = %s
                        """,
                        [
                            campaign_id,
                            campaign.title,
                            campaign.genre,
                            campaign.description,
                            campaign.rulebook,
                            campaign.campaign_email,
                            user_id,
                            campaign_id,
                        ],
                    )
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
                        , gamemaster_id
                        FROM campaigns
                        ORDER BY campaign_id;
                        """
                    )
                    result = []
                    for record in db:
                        campaign = CampaignOut(
                            campaign_id=record[0],
                            title=record[1],
                            genre=record[2],
                            description=record[3],
                            rulebook=record[4],
                            campaign_email=record[5],
                            gamemaster_id=record[6],
                        )
                        result.append(campaign)
                    return result
        except Exception:
            return {"message": "Could not get all Campaigns"}

    def record_to_campaign_out(self, record):
        return CampaignOut(
            campaign_id=record[0],
            title=record[1],
            genre=record[2],
            description=record[3],
            rulebook=record[4],
            campaign_email=record[5],
            gamemaster_id=record[6],
        )

    def campaign_in_to_out(self, campaign_id: int, campaign: CampaignIn):
        old_data = campaign.dict()
        return CampaignOut(campaign_id=campaign_id, **old_data)
