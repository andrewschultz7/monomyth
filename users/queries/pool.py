import os
from psycopg_pool import ConnectionPool

pool = ConnectionPool(conninfo=os.environ["DATABASE_URL2"])
print(f'USERS DATABASE_URL2: {os.environ["DATABASE_URL2"]}')
