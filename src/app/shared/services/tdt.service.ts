import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, mergeMap, Observable, retry, tap, throwError } from "rxjs";
import { TdtDto } from "src/app/tdts/models/tdt-dto.model";

@Injectable()
export class TdtService {
    private URL: string = 'https://raw.githubusercontent.com/jcmelchorp/openTv/refs/heads/main/src/assets/lists/tdt.json';
    constructor(private http: HttpClient) {
    }
    // Http Options
    private httpOptions = {
        headers: new HttpHeaders({
        }),
    };
    list(): Observable<TdtDto[]> {
        return this.getChannels()
        // .pipe(
        //     map(channels => channels.map(channel => {
        //         let tdt: TdtDto = {
        //             id: channel.id,
        //             channelId: channel.channelId,
        //             channelName: channel.channelName,
        //             countryCode: channel.countryCode,
        //             isNsfw: channel.isNsfw,
        //             languageCodes: channel.languageCodes,
        //             logo: channel.logo,
        //             website: channel.website,
        //             categories: channel.categories,
        //             subdivision: channel.subdivision,
        //         }
        //         return tdt;
        //     })),
        // mergeMap(tdts => {
        //     return this.getStreams().pipe(
        //         map(streams => tdts.map(tdt => {
        //             let url = streams.find(stream => stream.channel === tdt.channelId)?.url;
        //             let obj: TdtDto = { ...tdt, url: url };
        //             return obj;
        //         }))
        //     );
        // }),
        // mergeMap(tdts => {
        //     return this.getCountries().pipe(
        //         map(countries => tdts.map(tdt => {
        //             let name = countries.find(country => country.code === tdt.countryCode).name;
        //             let flag = countries.find(country => country.code === tdt.countryCode).flag;
        //             let obj: TdtDto = { ...tdt, countryName: name, countryFlag: flag };
        //             return obj;
        //         }))
        //     );
        // }),
        // mergeMap(tdts => {
        //     return this.getCategories().pipe(
        //         map(categories => tdts.map(tdt => {
        //             let names = tdt.categories.map(categoryId => categories.find(category => category.id = categoryId).name)
        //             let obj: TdtDto = { ...tdt, categoryNames: names };
        //             return obj;
        //         }))
        //     );
        // }),
        //);
    }
    // getStreams() {
    //     return this.http
    //         .get<Stream[]>(this.URL + 'streams.json', this.httpOptions)
    //         .pipe(
    //             retry(1),
    //             catchError(this.handleError)
    //         );
    // }
    getChannels() {
        return this.http
            .get<TdtDto[]>(this.URL, this.httpOptions)
            .pipe(
                map(channels => {
                    let channelsList = [];
                    // let ambits = [];
                    channels["countries"].map(country => {
                        let countryName = country["name"];
                        country["ambits"].map(ambit => {
                            // ambits.push(ambit["name"]);
                            let ambitName = ambit["name"];
                            let channs2 = ambit["channels"].map(channel => {
                                let firstUrl = channel.options[0]?.url!.replace(/[?DVR]/g, '').split('&')[0];
                                let channelId = channel.name.replace(/[^a-zA-Z0-9]/g, '')
                                let obj: TdtDto = {
                                    id: channel.epg_id || channelId,
                                    channelId: channel.epg_id || channelId,
                                    channelName: channel.name,
                                    countryCode: countryName,
                                    countryName: countryName,
                                    isNsfw: 'false',
                                    //languageCodes: channel.languageCodes,
                                    logo: channel.logo,
                                    website: channel.web,
                                    categories: [ambitName],
                                    url: firstUrl,
                                    //subdivision: channel.subdivision,
                                }
                                channelsList.push(obj);

                            });
                        });
                    }
                    )
                    // const uniq = (items) => [...new Set(items)];

                    // const uniqAges = uniq(ambits.map((item) => item));

                    // console.log('categories: ', uniqAges);
                    return channelsList;
                }),
                retry(1),
                catchError(this.handleError)
            );
    }
    // getCountries() {
    //     return this.http
    //         .get<Country[]>(this.URL + 'countries.json', this.httpOptions)
    //         .pipe(
    //             retry(1),
    //             catchError(this.handleError)
    //         );
    // }
    // getCategories() {
    //     return this.http
    //         .get<Category[]>(this.URL + 'categories.json', this.httpOptions)
    //         .pipe(
    //             retry(1),
    //             catchError(this.handleError)
    //         );
    // }
    // getLanguages() {
    //     return this.http
    //         .get<Language[]>(this.URL + 'languages.json', this.httpOptions)
    //         .pipe(
    //             retry(1),
    //             catchError(this.handleError)
    //         );
    // }
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
