steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE campaigns (
            campaign_id SERIAL PRIMARY KEY NOT NULL,
            title VARCHAR(1000) NOT NULL,
            genre VARCHAR(1000) NOT NULL,
            description TEXT NOT NULL,
            rulebook VARCHAR(1000) NOT NULL,
            campaign_email VARCHAR(1000) NOT NULL,
            users TEXT NOT NULL,
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE campaigns;
        """
    ],
]
