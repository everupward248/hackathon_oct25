import psycopg
from backend.functions.config import config

def connect():
    """
    initialize a connection with the postgresql db

    """
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


def get_all():
    try:
        conn = connect()
        with conn.cursor() as cur:
            cur.execute("""
               SELECT j."id", j."job_post_id", j."job_title", j."status", j."created_date", j."start_date", j."end_date", j."cig_sagc", j."work_type", j."employer", j."location", j."occupation", j."sub_industry", j."industry", e."required_education_level", e."years_experience", r."hours_per_week", r."currency", r."pay_frequency", r."description", r."min_salary", r."max_salary", r."annualised_min", r."annualised_max", r."mean_annualised_salary"
                FROM jobs as j
                JOIN "renumerations" as r ON r."job_post_id" = j."job_post_id"
                JOIN "experiences" AS e ON e."job_post_id" = j."job_post_id";
                        """)
            rows =cur.fetchall()
        
        # return as a list of dictionaries
        jobs = [
            {
                "id": r[0],
                "job_post_id": r[1],
                "job_title": r[2],
                "status": r[3],
                "created_date": r[4],
                "start_date": r[5],
                "end_date": r[6],
                "cig_sagc": r[7],
                "work_type": r[8],
                "employer": r[9],
                "location": r[10],
                "occupation": r[11],
                "sub_industry": r[12],
                "industry": r[13],
                "required_education_level": r[14], 
                "years_experience": r[15], 
                "hours_per_week": r[16], 
                "currency": r[17], 
                "pay_frequency": r[18], 
                "description": r[19], 
                "min_salary": r[20], 
                "max_salary": r[21], 
                "annualised_min": r[22], 
                "annualised_max": r[23], 
                "mean_annualised_salary": r[24]
            } for r in rows
        ]
        
        conn.close()

        return jobs
        
    except Exception as e:
        print(e)

def get_jobs():
    try:
        conn = connect()
        with conn.cursor() as cur:
            cur.execute("""
                SELECT * FROM jobs;
                """)
            rows =cur.fetchall()
        
        # return as a list of dictionaries
        jobs = [
            {
                "id": r[0],
                "job_post_id": r[1],
                "job_title": r[2],
                "status": r[3],
                "created_date": r[4],
                "start_date": r[5],
                "end_date": r[6],
                "cig_sagc": r[7],
                "work_type": r[8],
                "employer": r[9],
                "location": r[10],
                "occupation": r[11],
                "sub_industry": r[12],
                "industry": r[13]
            } for r in rows
        ]
        
        conn.close()

        return jobs
        
    except Exception as e:
        print(e)