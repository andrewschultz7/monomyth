import os
from psycopg_pool import ConnectionPool

pool = ConnectionPool(conninfo=os.environ["DATABASE_URL2"])
pool2 = ConnectionPool(conninfo="postgresql://users:password@postgres/")
