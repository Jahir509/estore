import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BaseService<T> {
    protected apiEndpoint: string = '';
    protected readonly API_BASE_URL = 'http://localhost:5001';

    constructor(protected http: HttpClient) {}

    get baseUrl(): string {
        return this.API_BASE_URL;
    }

    
    get apiUrl(): string {
        return this.apiEndpoint;
    }
    /** 
     * Setter for apiUrl that appends the provided url to the base URL. This allows derived services to easily set their specific endpoint.
     * Example usage in a derived service:
     * @param url (e.g., '/products')
     * @returns full API URL (e.g., 'http://localhost:5001/products')
     */
    set apiUrl(url: string) {
        this.apiEndpoint = `${this.API_BASE_URL}${url}`;
    }


    /**
     * GET all items (T[])
     */
    getAll(): Observable<T[]> {
        return this.http.get<T[]>(this.apiUrl);
    }

    /**
     * GET single item by ID (T)
     */
    getById(id: number | string): Observable<T> {
        return this.http.get<T>(`${this.apiUrl}/${id}`);
    }

    /**
     * CREATE new item (T)
     */
    create(item: T): Observable<T> {
        return this.http.post<T>(this.apiUrl, item);
    }

    /**
     * UPDATE existing item (T)
     */
    update(id: number | string, item: T): Observable<T> {
        return this.http.put<T>(`${this.apiUrl}/${id}`, item);
    }

    /**
     * DELETE item by ID
     */
    delete(id: number | string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }


    /**
     * SEARCH with filters (T[])
     */
    search(params: Record<string, any>): Observable<T[]> {
        let queryString = Object.keys(params)
            .filter(key => params[key] !== null && params[key] !== undefined)
            .map(key => `${key}=${encodeURIComponent(params[key])}`)
            .join('&');
        
        return this.http.get<T[]>(`${this.apiUrl}?${queryString}`);
    }
}