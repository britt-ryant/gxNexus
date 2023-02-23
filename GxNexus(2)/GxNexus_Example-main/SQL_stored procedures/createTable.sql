CREATE DEFINER=`root`@`localhost` PROCEDURE `createTable`(
	IN data VARCHAR(255)
    )
BEGIN
SET @tableName = data;
SET @SQL = CONCAT('CREATE TABLE ', @tableName, ' (ID VARCHAR(255), TIMESTAMP DATETIME)');
PREPARE stmt FROM @SQL;
EXECUTE stmt;

END