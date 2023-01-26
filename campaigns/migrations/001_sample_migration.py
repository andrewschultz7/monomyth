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
            gamemaster_id INT NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE campaigns;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE events (
            event_id SERIAL PRIMARY KEY NOT NULL,
            eventname VARCHAR(1000) NOT NULL,
            venuename VARCHAR(1000) NOT NULL,
            address VARCHAR(1000) NOT NULL,
            date DATE NOT NULL,
            campaign_id INT NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE events;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE participants (
            participant_id SERIAL PRIMARY KEY NOT NULL,
            user_id INT NOT NULL,
            character VARCHAR(1000) NOT NULL,
            event_id INT NOT NULL,
            campaign_id INT NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE participants;
        """,
    ],
]
