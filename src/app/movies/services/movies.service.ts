import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, concatAll, concatMap, concatWith, concat, map, merge, mergeAll, retry, switchMap, throwError, tap } from 'rxjs';
import { Movie } from 'src/app/movies/models/movie.model';

@Injectable()
export class MoviesService {
    private URL: string = 'https://raw.githubusercontent.com/jcmelchorp/openTv/refs/heads/main/src/assets/lists/';
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
            map((channels: Movie[]) => channels.map(channel => {
                let movie: Movie = {
                    id: channel.id,
                    channelId: channel.channelId,
                    name: channel.name,
                    logo: channel.logo,
                    url: channel.url
                }
                return movie;
            })),
            // mergeMap((movies: Movie[]) => {
            //     return this.getInfo(movie.name).pipe(
            //         map((info: Movie) => movies.map(movie => {
            //             let obj: Movie = { ...movie, ...info };
            //             console.log(obj);
            //             return obj;
            //         }))
            //     )
            // })
        );
        // mergeMap(movies => {
        //     return this.getInfo().pipe(
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
    }


    getMovies(): Observable<Movie[]> {
        return this.http
            //  .get<Movie[]>(this.URL + 'movies.json', this.httpOptions)
            .get<Movie[]>(this.URL + '205-chan.json', this.httpOptions)
            .pipe(
                retry(1),
                catchError(this.handleError)
            );
    }

    getInfo(title: string): Observable<Movie> {
        let searchStr = title.split('(')[0].trim().replace(' ', '+');
        console.log(searchStr);
        return this.http
            .get<Movie>(this.omdbURL + searchStr, this.httpOptions)
            .pipe(
                retry(1),
                tap((movie) => console.log(movie)),
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
function mergeMap(arg0: (movies: any) => any): import("rxjs").OperatorFunction<Movie[], Movie[]> {
    throw new Error('Function not implemented.');
}

