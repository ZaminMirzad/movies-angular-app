import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Movie } from '../Model/movie';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  url: string = 'https://api.themoviedb.org/3';
  constructor(private http: HttpClient) {}

  getNowplaying(): Observable<any> {
    return this.http.get<any>(
      this.url + '/trending/all/week?api_key=' + environment.api_key
    );
  }
  getPopularMovies(): Observable<Movie> {
    return this.http.get<Movie>(
      this.url + '/movie/popular?api_key=' + environment.api_key
    );
  }
}
