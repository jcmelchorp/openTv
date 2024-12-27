import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, retry, throwError } from 'rxjs';
import { Movie } from 'src/app/movies/models/movie.model';

@Injectable()
export class MoviesService {
    private URL: string = 'https://raw.githubusercontent.com/jcmelchorp/openTv/refs/heads/main/';
    private omdbURL: string = 'https://www.omdbapi.com/?apikey=505a6669&t=';
    constructor(private http: HttpClient) {
    }
    // Http Options
    private httpOptions = {
        headers: new HttpHeaders({
        }),
    };
    list(): Observable<Movie[]> {
        return this.getMovies().pipe(
            map(channels => channels.map(channel => {
                let movie: Movie = {
                    id: channel.id,
                    channelId: channel.channelId,
                    name: channel.name,
                    logo: channel.logo,
                    url: channel.url
                }
                return movie;
            })),
            // mergeMap(movies => {
            //     return this.getStreams().pipe(
            //         map(streams => movies.map(movie => {
            //             let urlObj = streams.find(stream => stream.channel === movie.channelId)?.url;
            //             let obj: Movie = { ...movie, url: urlObj };
            //             return obj;
            //         }))
            //     );
            // }),
            // mergeMap(movies => {
            //     return this.getCountries().pipe(
            //         map(countries => movies.map(movie => {
            //             let name = countries.find(country => country.code === movie.countryCode).name;
            //             let flag = countries.find(country => country.code === movie.countryCode).flag;
            //             let obj: Movie = { ...movie, countryName: name, countryFlag: flag };
            //             return obj;
            //         }))
            //     );
            // }),
            // mergeMap(movies => {
            //     return this.getCategories().pipe(
            //         map(categories => movies.map(movie => {
            //             let names = movie.categories.map(categoryId => categories.find(category => category.id = categoryId).name)
            //             let obj: Movie = { ...movie, categoryNames: names };
            //             return obj;
            //         }))
            //     );
            // }),
        );
    }

    getMovies() {
        return this.http
            .get<Movie[]>(this.URL + 'movies.json', this.httpOptions)
            .pipe(
                retry(1),
                catchError(this.handleError)
            );
    }

    getInfo(title: string) {
        return this.http
            .get<Movie>(this.omdbURL + title, this.httpOptions)
            .pipe(
                retry(1),
                catchError(this.handleError)
            );
    }
    // Error handling
    handleError(error: any) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMessage);
        return throwError(() => {
            return errorMessage;
        });
    }
}
