export interface Speaker {
	id:           number;
	name:         string;
	sermon_count: number;

	//transient field
	initials: string;
}
