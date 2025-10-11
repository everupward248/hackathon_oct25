import psycopg
from config import config

def connect():
    try:
        connection = None
        # import params from config file
        params = config()
        # unpack the parameters from the .ini file
        connection = psycopg.connect(**params)
        print("connection successful...")
        return connection
    except(Exception, psycopg.DatabaseError) as error:
        print(error)