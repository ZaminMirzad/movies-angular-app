import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/Service/data.service';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.scss'],
})
export class TvComponent implements OnInit {
  id: any;
  tv: any;
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    this.getTvDetails();
  }

  getTvDetails() {
    this.dataService.getTv(this.id).subscribe(
      res => {
        this.tv = this.changeData(res);
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
