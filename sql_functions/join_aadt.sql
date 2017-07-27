
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
