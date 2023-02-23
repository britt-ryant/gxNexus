CREATE DEFINER=`root`@`localhost` PROCEDURE `updateCells`(
IN tableName VARCHAR(255),
IN columnName VARCHAR(255),
IN newCellData VARCHAR(255),
IN dataType VARCHAR(255),
IN id VARCHAR(255)
)
BEGIN
SET @tableName = tableName;
SET @columnName = columnName;
SELECT
	CASE 
		WHEN dataType = 'string' THEN CAST(newCellData AS CHAR(255))
		WHEN dataType = 'number' THEN CAST(newCellData AS SIGNED)
        WHEN dataType = 'date' THEN CAST(newCellData AS DATETIME)
	END
INTO @convertedData;
SET @ID = id;
    -- CASE 
     SET @SQL = CONCAT('UPDATE ', @tableName, ' SET ', @columnName, '=', (
																			CASE 
                                                                            WHEN dataType = 'number' THEN @convertedData
                                                                            ELSE QUOTE(@convertedData)
                                                                            END
                                                                            ) ,' WHERE ID=', QUOTE(@ID), ';');
	SELECT @SQL;
    PREPARE stmt FROM @SQL;
	EXECUTE stmt;
    

END