CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteEntry`(
IN id VARCHAR(255),
IN tableName VARCHAR(255)
)
BEGIN
SET @ID = id;
SET @tableName = tableName;
SELECT @ID;
SELECT @tableName;

SET @SQL = CONCAT('DELETE FROM ', @tableName, ' WHERE ID=', QUOTE(@ID));
SELECT @SQL;
PREPARE stmt FROM @SQL;
EXECUTE stmt;
END