WITH nfhn_diss AS (SELECT ST_COLLECT(geom) as "collect_geom" FROM crfc."nhfn")
SELECT

submissions.name,
submissions.email,
submissions.org,
submissions.description,
ST_Length(ST_Transform(submissions.geom, 3436))/5280 as "submssion_length",
ST_DISTANCE(ST_Transform(submissions.geom, 3436), ST_Transform(collect_geom, 3436))/5280  as "distance_from_hwy", ST_ShortestLine(ST_Transform(submissions.geom, 3436), ST_Transform(collect_geom, 3436)) as "the_geom", ST_GeometryType(submissions.geom)
FROM nfhn_diss, crfc.submissions
WHERE ST_GeometryType(submissions.geom) = 'ST_LineString'




SELECT
  a.cartodb_id AS submission_gid,
  b.id AS hwy_gid,
  b.aadt,
  b.hcv,
  CASE
     WHEN ST_Within(a.geom,b.geom)
     THEN a.geom
     ELSE ST_Multi(ST_Intersection(a.geom,b.geom))
  END AS geom
FROM crfc.submissions a
JOIN crfc.hwy2016 b
ON ST_Intersects(a.geom, b.geom)
WHERE b.aadt != 0
