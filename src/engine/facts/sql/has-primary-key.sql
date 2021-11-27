SELECT CASE
WHEN Count(index_id) = 1 THEN 'true'
	ELSE 'false'
	END
FROM sys.indexes 
WHERE object_id = object_id('$(table-name)') 
AND is_primary_key = 1;