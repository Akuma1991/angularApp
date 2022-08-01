import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movie.service';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-moviedetails',
  templateUrl: './moviedetails.component.html',
  styleUrls: ['./moviedetails.component.css']
})
export class MoviedetailsComponent implements OnInit {
  message: string = '';
  imagePrefix: string = 'https://image.tmdb.org/t/p/w500';
  movieId: string = '';
  movieDetails: any = {};
  constructor(private _ActivatedRoute: ActivatedRoute, private _MovieService: MovieService, private _AuthService: AuthService) { }

  ngOnInit(): void {
    this._AuthService.logOutCheck();
    this.movieId = this._ActivatedRoute.snapshot.params['id'];
    this._MovieService.getMovieById(this.movieId).subscribe({
      next: (res) => {
        this.movieDetails = res;

      },
      error: (err) => this.message = err.message,
      complete: () => console.info('complete')
    })
  }

}
