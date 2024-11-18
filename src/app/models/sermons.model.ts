export interface SermonsList
{
	row_count: number;
	page_number: number;
	page_size: number;
	order_by: string;
	order_direction: string;
	sermons: Sermon[];
}

export interface Sermon
{
	sermon_id: number;
	passage: string;
	speaker_name: string;
	speaker_id: number;
	sermon_title: string;
	sermon_date: Date;
	passage_link: string;
	sermon_file: string;
	series_id: number;
	series_name: string;
	series_thumb: string;
	series_image: string;
	sermon_video_embed_code: null;
	sermon_duration: string;

	//transient fields
	row_index: number;
}

