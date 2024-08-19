/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */

import { throwError as observableThrowError, of as observableOf, Observable, Subject } from 'rxjs';

import { tap } from 'rxjs/operators';
//taken from https://hackernoon.com/angular-simple-in-memory-cache-service-on-the-ui-with-rxjs-77f167387e39
//changed to use session storage

import { Injectable } from '@angular/core';

interface CacheContent
{
	expiry: number;
	value: any;
}

/**
 * Cache Service is an observables based in-memory cache implementation
 * Keeps track of in-flight observables and sets a default expiry for cached values
 *
 * @export
 * @class CacheService
 */
@Injectable({
  providedIn: 'root'
})
export class CacheService
{
	constructor()
	{
	}

	private inFlightObservables: Map<string, Subject<any>> = new Map<string, Subject<any>>();
	private readonly DEFAULT_MAX_AGE: number = 300000;

	private formatKey(key: string): string
	{
		const customerNumber = '';
		const formattedKey = customerNumber + key;
		// console.log("CacheService cachekey is ", formattedKey);
		return formattedKey;
	}

	/**
	 * Gets the value from cache if the key is provided.
	 * If no value exists in cache, then check if the same call exists
	 * in flight, if so return the subject. If not create a new
	 * Subject inFlightObservable and return the source observable.
	 */
	public get(key: string, fallback?: Observable<any>, maxAge?: number, retryIfLengthIsZero: boolean = true): Observable<any> | Subject<any>
	{
		const formattedKey = this.formatKey(key);
		// console.log(`%ccache.service.ts get: ${formattedKey}`, 'color: blue');
		if (formattedKey && this.hasValidCachedValue(formattedKey))
		{
			console.log(`%cGetting cache: ${formattedKey}`, 'color: green');
			const value = this.getFromCache(formattedKey).value;
			// console.log (value);
			if (retryIfLengthIsZero && (!value || value.length === 0))
			{
				//don't return
				// console.log("Cached list is empty, so fetching from API");
			}
			else
			{
				return observableOf(value);
			}
		}

		if (!maxAge)
		{
			maxAge = this.DEFAULT_MAX_AGE;
		}

		if (fallback && fallback instanceof Observable)
		{
			if (formattedKey)
			{
				this.inFlightObservables.set(formattedKey, new Subject());
				console.log(`%cCalling api: ${formattedKey}`, 'color: purple');
			}
			return fallback.pipe(tap((value) =>
			{
				this.set(key, value, maxAge);
			}));
		} else
		{
			return observableThrowError('Requested key is not available in Cache');
		}

	}


	/**
	 * Sets the value with key in the cache
	 * Notifies all observers of the new value
	 */
	public set(key: string, value: any, maxAge: number = this.DEFAULT_MAX_AGE): void
	{
		const formattedKey = this.formatKey(key);
		if (formattedKey)
		{
			//this.cache.set(key, { value: value, expiry: Date.now() + maxAge });
			console.log(`%cSetting cache: ${formattedKey}`, 'color: teal');
			sessionStorage.setItem(formattedKey, JSON.stringify({ value, expiry: Date.now() + maxAge }));
			this.notifyInFlightObservers(formattedKey, value);
		}
	}

	/**
	 * Removes cache item for given key if it exists
	 */
	public clear(key: string): void
	{
		const formattedKey = this.formatKey(key);
		sessionStorage.removeItem(formattedKey);
	}

	private getFromCache(formattedKey: string): any
	{
		if (!formattedKey)
		{
			return null;
		}

		const itemStr = sessionStorage.getItem(formattedKey);
		let item = null;
		if (itemStr && itemStr.length > 0)
		{
			try
			{
				item = JSON.parse(itemStr);
			}
			catch (e)
			{
				item = null;
			}
		}
		return item;
	}

	/**
	 * Checks if the a key exists in cache
	 */
	private has(key: string): boolean
	{
		const formattedKey = this.formatKey(key);
		//return this.cache.has(key);
		return (!!sessionStorage.getItem(formattedKey));
	}

	/**
	 * Publishes the value to all observers of the given
	 * in progress observables if observers exist.
	 */
	private notifyInFlightObservers(key: string, value: any): void
	{
		const formattedKey = this.formatKey(key);
		if (!formattedKey)
		{
			return;
		}

		if (this.inFlightObservables.has(formattedKey))
		{
			const inFlight = this.inFlightObservables.get(formattedKey);
			if (inFlight) {
				const observersCount = inFlight.observers.length;
				if (observersCount)
				{
					console.log(`%cNotifying ${inFlight.observers.length} flight subscribers for ${formattedKey}`, 'color: blue');
					inFlight.next(value);
				}
				inFlight.complete();
				this.inFlightObservables.delete(formattedKey);
			}
		}
	}

	/**
	 * Checks if the key exists and has not expired.
	 */
	private hasValidCachedValue(formattedKey: string): boolean
	{
		if (!formattedKey)
		{
			return false;
		}

		const item = this.getFromCache(formattedKey);

		if (item)
		{
			if (item.expiry < Date.now())
			{
				sessionStorage.removeItem(formattedKey);
				return false;
			}
			return true;
		} else
		{
			return false;
		}
	}

	clearAll()
	{
		sessionStorage.clear();
	}
}
