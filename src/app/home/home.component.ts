import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  message: string = '';
  imagePrefix: string = 'https://image.tmdb.org/t/p/w500';
  trendingMovies: any[] = [];
  trendingTvs: any[] = [];
  trendingPersons: any[] = [];

  constructor(private _MovieService: MovieService, private _AuthService:AuthService) { }

  
  ngOnInit(): void {

   this._AuthService.logOutCheck();

    this._MovieService.getMoviesApi('movie').subscribe(
      {

        next: (res) => {
          this.trendingMovies = res.results.slice(0, 10);

        },
        error: (err) => this.message = err.message,
        complete: () => console.info('complete')
      }
    );
    this._MovieService.getMoviesApi('tv').subscribe(
      {

        next: (res) => {
          this.trendingTvs = res.results.slice(0, 10);

        },
        error: (err) => this.message = err.message,
        complete: () => console.info('complete')
      }
    );
    this._MovieService.getMoviesApi('person').subscribe(
      {

        next: (res) => {
          this.trendingPersons = res.results.slice(0, 10);

        },
        error: (err) => this.message = err.message,
        complete: () => console.info('complete')
      }
    );
  }

}
