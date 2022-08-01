import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private _HttpClient: HttpClient) { }

  getMoviesApi(mediaType:string): Observable<any> {

    return this._HttpClient.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=829075d6b59e95b66c99c05e3231dbd8`);

  }
  getMovieById(id:string): Observable<any> {

    return this._HttpClient.get(`https://api.themoviedb.org/3/movie/${id}?api_key=829075d6b59e95b66c99c05e3231dbd8`);

  }
}
