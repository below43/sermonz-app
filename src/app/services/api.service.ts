import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { constants } from '../constants';
import { Sermon, SermonsList } from '../models/sermons.model';
import { Series, SeriesList } from '../models/series.model';
import { Speaker } from '../models/speakers.model';
import { CacheService } from './cache.service';

@Injectable({
	providedIn: 'root'
})
export class ApiService
{

	private _token: string = '';
	private _username: string = '';

	constructor(
		private httpClient: HttpClient,
		private storageService: StorageService,
		private cacheService: CacheService
	)
	{
	}

	public getSermonsCached(refreshCache: boolean = false, pageNumber: number = 1, pageSize: number = 10, search: string = '', book: string = '', speakerId: number = 0, seriesId: number = 0, orderBy: string = 'sermon_date', orderDirection: string = 'desc', cacheMilliseconds: number = 86400000): Observable<SermonsList> {
		const cacheKey = `sermons${pageNumber}${pageSize}${search}${book}${speakerId}${seriesId}${orderBy}${orderDirection}`;
		if (refreshCache) {
			this.cacheService.clear(cacheKey);
		}
		return this.cacheService.get(cacheKey, this.getSermons(pageNumber, pageSize, search, book, speakerId, seriesId, orderBy, orderDirection), cacheMilliseconds);
	}

	/*
	/api/v1/sermons
	Params:
	page_number: page number (default: 1)
	page_size: page size (default: 10; max: 100)
	search (optional): keyword search
	book (optional): book search
	speaker_id (optional): search for specific speaker id
	series_id (optional): search for specific series id
	order_by (optional): sermon_date
	order_direction (optional): asc, desc
	*/
	private getSermons(pageNumber: number = 1, pageSize: number = 10, search: string = '', book: string = '', speakerId: number = 0, seriesId: number = 0, orderBy: string = 'sermon_date', orderDirection: string = 'desc'): Observable<SermonsList>
	{
		let params = new HttpParams();
		params = params.append('page_number', pageNumber.toString());
		params = params.append('page_size', pageSize.toString());
		if (search) params = params.append('search', search);
		if (book) params = params.append('book', book);
		if (speakerId) params = params.append('speaker_id', speakerId.toString());
		if (seriesId) params = params.append('series_id', seriesId.toString());
		if (orderBy) params = params.append('order_by', orderBy);
		if (orderDirection) params = params.append('order_direction', orderDirection);

		return this.httpClient.get<SermonsList>(`${environment.apiUrl}/sermons`, { params });
	}

	/*
	/api/v1/sermons/{id}/download - download sermon
	*/
	public downloadSermon(id: number): Observable<any>
	{
		return this.httpClient.get(`${environment.apiUrl}/sermons/${id}/download`);
	}


	public getSeriesListCached(refreshCache = false, pageNumber: number = 1, pageSize: number = 12, orderBy: string = 'last_sermon_date', orderDirection: string = 'desc'): Observable<SeriesList>
	{
		const cacheKey = `${environment.apiUrl}series${pageNumber}${pageSize}${orderBy}${orderDirection}`;
		const cacheMilliseconds = 1 * 60 * 60000 * 24; //24 hour
		if (refreshCache)
		{
			this.cacheService.clear(cacheKey);
		}
		return this.cacheService.get(cacheKey, this.getSeriesList(pageNumber, pageSize, orderBy, orderDirection), cacheMilliseconds);
	}

	/*
	/api/v1/series - Lists series
	Params:
	page_number: page number (default: 1)
	page_size: page size (default: 10; max: 100)
	order_by (optional): last_sermon_date, first_sermon_date
	order_direction (optional): asc, desc
	*/
	public getSeriesList(pageNumber: number = 1, pageSize: number = 12, orderBy: string = 'last_sermon_date', orderDirection: string = 'desc'): Observable<SeriesList>
	{
		let params = new HttpParams();
		params = params.append('page_number', pageNumber.toString());
		params = params.append('page_size', pageSize.toString());
		if (orderBy) params = params.append('order_by', orderBy);
		if (orderDirection) params = params.append('order_direction', orderDirection);

		return this.httpClient.get<SeriesList>(`${environment.apiUrl}/series`, { params });
	}

	// Cached version for getSeriesById
	public getSeriesByIdCached(id: string, refreshCache = false): Observable<Series>
	{
		const cacheMilliseconds = 1 * 60 * 60000 * 24; //24 hour
		const cacheKey = `${environment.apiUrl}series-id-${id}`;
		if (refreshCache)
		{
			this.cacheService.clear(cacheKey);
		}
		return this.cacheService.get(cacheKey, this.getSeriesById(id), cacheMilliseconds);
	}

	///api/v1/series/{id} - Lists speakers
	private getSeriesById(id: string): Observable<Series>
	{
		return this.httpClient.get<Series>(`${environment.apiUrl}/series/${id}`);
	}

	// Cached version for getBooks
	public getBookListCached(refreshCache = false): Observable<string[]>
	{
		const cacheMilliseconds = 1 * 60 * 60000 * 24; //24 hours
		const cacheKey = `${environment.apiUrl}books`;
		if (refreshCache)
		{
			this.cacheService.clear(cacheKey);
		}
		return this.cacheService.get(cacheKey, this.getBooks(), cacheMilliseconds);
	}

	///api/v1/books - Lists books of the Bible that have sermons available
	private getBooks(): Observable<string[]>
	{
		return this.httpClient.get<string[]>(`${environment.apiUrl}/books`);
	}

	// Cached version for getSpeakers
	public getSpeakersCached(refreshCache: boolean = false): Observable<Speaker[]>
	{
		const cacheMilliseconds = 1 * 60 * 24; //24 hour
		const cacheKey = `${environment.apiUrl}speakers`;
		if (refreshCache)
		{
			this.cacheService.clear(cacheKey);
		}
		return this.cacheService.get(cacheKey, this.getSpeakers(), cacheMilliseconds);
	}

	///api/v1/speakers - Lists speakers
	private getSpeakers(): Observable<Speaker[]>
	{
		return this.httpClient.get<Speaker[]>(`${environment.apiUrl}/speakers`);
	}

	// Cached version for getSpeakerById
	public getSpeakerByIdCached(id: number, refreshCache: boolean = false): Observable<Speaker>
	{
		const cacheMilliseconds = 1 * 60 * 24; //24 hour
		const cacheKey = `${environment.apiUrl}speaker-id-${id}`;
		if (refreshCache)
		{
			this.cacheService.clear(cacheKey);
		}
		return this.cacheService.get(cacheKey, this.getSpeakerById(id), cacheMilliseconds);
	}

	///api/v1/speakers/{id} - Lists speaker
	private getSpeakerById(id: number): Observable<Speaker>
	{
		return this.httpClient.get<Speaker>(`${environment.apiUrl}/speakers/${id}`);
	}


	// Cached version for getSermonById
	public getSermonByIdCached(id: string, refreshCache = false): Observable<Sermon>
	{
		const cacheMilliseconds = 1 * 60 * 60000 * 24; //24 hour
		const cacheKey = `${environment.apiUrl}sermon-id-${id}`;
		if (refreshCache)
		{
			this.cacheService.clear(cacheKey);
		}
		return this.cacheService.get(cacheKey, this.getSermonById(id), cacheMilliseconds);
	}

	///api/v1/sermon/{id} - Get sermon by ID
	private getSermonById(id: string): Observable<Sermon>
	{
		return this.httpClient.get<Sermon>(`${environment.apiUrl}/sermons/${id}`);
	}

}
