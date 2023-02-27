import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Movie } from 'src/app/Model/movie';
import { DataService } from 'src/app/Service/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  id: any;
  movie: any;
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    this.getMovieDetails();
  }

  getMovieDetails() {
    this.dataService.getMovie(this.id).subscribe(
      res => {
        this.movie = this.changeData(res);
        console.log(res);
      },
      err => {
        console.log('error occured', err);
      }
    );
  }

  // change movie url
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
}
