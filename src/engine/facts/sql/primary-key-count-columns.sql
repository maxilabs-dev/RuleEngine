SELECT COUNT(INC.column_id)
FROM sys.indexes as IND
		INNER JOIN sys.index_columns as INC
			ON IND.object_id = INC.object_id
			AND IND.index_id = INC.index_id
WHERE IND.object_id = object_id('$(table-name)') 
	AND IND.is_primary_key = 1;