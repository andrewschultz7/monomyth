import os
from psycopg_pool import ConnectionPool


print(f'CAMPAIGNS DATABASE_URL: {os.environ["DATABASE_URL"]}')
pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])
# pool2 = ConnectionPool(conninfo='postgresql://users:password@postgres/')
