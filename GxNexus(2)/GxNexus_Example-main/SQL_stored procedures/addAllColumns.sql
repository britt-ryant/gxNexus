CREATE DEFINER=`root`@`localhost` PROCEDURE `addColumns`(
IN tableName VARCHAR(255),
IN columnData VARCHAR(255)

)
BEGIN
	SET @tableName = tableName;
    SET @columnData = columnData;
    
    SET @SQL = CONCAT('ALTER TABLE ', @tableName, ' ADD ', @columnData);
    PREPARE stmt FROM @SQL;
	EXECUTE stmt;
END