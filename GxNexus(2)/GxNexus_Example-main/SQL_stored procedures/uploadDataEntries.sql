CREATE DEFINER=`root`@`localhost` PROCEDURE `uploadDataEntries`(
IN tableName VARCHAR(255)
)
BEGIN
	SELECT tableName;
END