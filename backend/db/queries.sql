SELECT * FROM "jobs"
JOIN "experiences" ON "experiences"."job_post_id" = "jobs"."job_post_id"
JOIN "renumerations" ON "renumerations"."job_post_id" = "jobs"."job_post_id"
LIMIT 5;