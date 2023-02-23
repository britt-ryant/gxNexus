CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllInfo`(
IN tableName VARCHAR(500)
)
BEGIN
	SET @tableName = tableName;
     SET @SQL = CONCAT('SELECT * FROM ', @tableName);
    PREPARE stmt FROM @SQL;
	EXECUTE stmt;
END