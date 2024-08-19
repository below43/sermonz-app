export interface SeriesList {
	row_count:       number;
	page_number:     number;
	page_size:       number;
	order_by:        string;
	order_direction: string;
	series:          Series[];
}

export interface Series {
	series_id:         number;
	series_name:       string;
	series_thumb:      string;
	first_sermon_date: Date;
	last_sermon_date:  Date;
}
