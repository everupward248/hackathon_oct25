import psycopg
from config import config

def connect():
    try:
        connection = None
        params = config()
    except(Exception, psycopg.DatabaseError) as error:
        print(error)