steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE users (
            user_id SERIAL PRIMARY KEY NOT NULL,
            email VARCHAR(1000) UNIQUE NOT NULL,
            password VARCHAR(1000) NOT NULL,
            role VARCHAR(1000) DEFAULT 'player'
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE users;
        """,
    ],
]
