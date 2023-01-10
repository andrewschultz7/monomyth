steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE users (
            user_id SERIAL PRIMARY KEY NOT NULL,
            email VARCHAR(1000) NOT NULL,
            password VARCHAR(1000) NOT NULL,
            campaigns TEXT
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE users;
        """
    ],
]
