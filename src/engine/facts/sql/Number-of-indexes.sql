SELECT count(*) 
FROM  sys.indexes AS IND
WHERE object_id = object_ID('$(table-name)')
AND index_id != 0;