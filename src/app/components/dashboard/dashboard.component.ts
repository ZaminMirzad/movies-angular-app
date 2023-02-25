import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/Model/movie';
import { DataService } from '../../Service/data.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  latestMovies: any;
  popularMovies!: Movie;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getNowPlayingMovies();
    this.getPopularMovies();
  }

  ngOnDestroy(): void {}

  // get movies
  getNowPlayingMovies() {
    this.dataService.getNowplaying().subscribe(
      res => {
        this.latestMovies = this.modifyData(res);
      },
      err => {
        console.log('error occured', err);
      }
    );
  }
  getPopularMovies() {
    this.dataService.getPopularMovies().subscribe(
      res => {
        this.popularMovies = this.modifyData(res);
      },
      err => {
        console.log('error occured', err);
      }
    );
  }
  // change data
  changeData(res: any): any {
    if (!res.backdrop_path) {
      res.backdrop_path =
        'https://image.tmdb.org/t/p/original' + res?.poster_path;
    } else {
      res.backdrop_path =
        'https://image.tmdb.org/t/p/original' + res?.backdrop_path;
    }

    return res;
  }
  // modify image path
  modifyData(movies: Movie): Movie {
    if (movies.results) {
      movies.results.forEach(movie => {
        movie.backdrop_path =
          'https://image.tmdb.org/t/p/original' +
          movie.backdrop_path +
          '?api_key=' +
          environment.api_key;

        if (!movie.title) {
          movie.title = movie?.name;
        }
      });
    }
    return movies;
  }
}
