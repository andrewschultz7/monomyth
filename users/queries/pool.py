import os
from psycopg_pool import ConnectionPool


print(f'USERS DATABASE_URL2: {os.environ["DATABASE_URL2"]}')
pool = ConnectionPool(conninfo=os.environ["DATABASE_URL2"])
