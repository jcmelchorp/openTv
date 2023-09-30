import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, concatMap, firstValueFrom, map, mergeAll, mergeMap, retry, switchMap, throwError } from 'rxjs';
import { Category } from 'src/app/iptvs/models/category.model';
import { Channel } from 'src/app/iptvs/models/channel.model';
import { Country } from 'src/app/iptvs/models/country.model';
import { IptvDto } from 'src/app/iptvs/models/iptv-dto.model';
import { Language } from 'src/app/iptvs/models/language.model';
import { Stream } from 'src/app/iptvs/models/stream.model';

@Injectable()
export class ApiService {
    private URL: string = 'https://iptv-org.github.io/api/';
    constructor(private http: HttpClient) {
    }
    // Http Options
    private httpOptions = {
        headers: new HttpHeaders({
        }),
    };
    list(): Observable<IptvDto[]> {
        return this.getChannels().pipe(
            map(channels => channels.map(channel => {
                let iptv: IptvDto = {
                    id: channel.id,
                    channelId: channel.id,
                    channelName: channel.name,
                    countryCode: channel.country,
                    isNsfw: channel.is_nsfw,
                    languageCodes: channel.languages,
                    logo: channel.logo,
                    website: channel.website,
                    categories: channel.categories,
                    subdivision: channel.subdivision,
                }
                return iptv;
            })),
            mergeMap(iptvs => {
                return this.getStreams().pipe(
                    map(streams => iptvs.map(iptv => {
                        let url = streams.find(stream => stream.channel === iptv.channelId)?.url;
                        let obj: IptvDto = { ...iptv, url: url };
                        return obj;
                    }))
                );
            }),
            // mergeMap(iptvs => {
            //     return this.getCountries().pipe(
            //         map(countries => iptvs.map(iptv => {
            //             let name = countries.find(country => country.code === iptv.countryCode).name;
            //             let flag = countries.find(country => country.code === iptv.countryCode).flag;
            //             let obj: IptvDto = { ...iptv, countryName: name, countryFlag: flag };
            //             return obj;
            //         }))
            //     );
            // }),
            // mergeMap(iptvs => {
            //     return this.getCategories().pipe(
            //         map(categories => iptvs.map(iptv => {
            //             let names = iptv.categories.map(categoryId => categories.find(category => category.id = categoryId).name)
            //             let obj: IptvDto = { ...iptv, categoryNames: names };
            //             return obj;
            //         }))
            //     );
            // }),
        );
    }
    getStreams() {
        return this.http
            .get<Stream[]>(this.URL + 'streams.json', this.httpOptions)
            .pipe(
                retry(1),
                catchError(this.handleError)
            );
    }
    getChannels() {
        return this.http
            .get<Channel[]>(this.URL + 'channels.json', this.httpOptions)
            .pipe(
                retry(1),
                catchError(this.handleError)
            );
    }
    getCountries() {
        return this.http
            .get<Country[]>(this.URL + 'countries.json', this.httpOptions)
            .pipe(
                retry(1),
                catchError(this.handleError)
            );
    }
    getCategories() {
        return this.http
            .get<Category[]>(this.URL + 'categories.json', this.httpOptions)
            .pipe(
                retry(1),
                catchError(this.handleError)
            );
    }
    getLanguages() {
        return this.http
            .get<Language[]>(this.URL + 'languages.json', this.httpOptions)
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
