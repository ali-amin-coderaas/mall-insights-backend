// Helper method to determine the fields to group by based on the type
export function getGroupByFields(type: string) {
	let groupByQuery = "";

	switch (type) {
		case "yearly":
			groupByQuery = `DATE_FORMAT(t.dateTime, '%Y')`; // Group by year
			break;
		case "monthly":
			groupByQuery = `DATE_FORMAT(t.dateTime, '%Y-%m')`; // Group by year and month
			break;
		case "weekly":
			groupByQuery = `YEAR(t.dateTime), WEEK(t.dateTime)`; // Group by year and week number
			break;
		case "daily":
			groupByQuery = `DATE_FORMAT(t.dateTime, '%Y-%m-%d')`; // Group by year, month, and day
			break;
		case "hourly":
			groupByQuery = `DATE_FORMAT(t.dateTime, '%Y-%m-%d %H')`; // Group by year, month, day, and hour
			break;
		default:
			groupByQuery = ""; // No grouping
			break;
	}
}
