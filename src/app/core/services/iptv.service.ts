import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, firstValueFrom, retry, throwError } from 'rxjs';
import { Stream } from '../../core/models/stream.model';
import { Channel } from '../models/channel.model';

@Injectable()
export class IptvService {
  //private apiUrl = 'https://iptv-org.github.io/api/streams.json';
  private URL: string = 'https://iptv-org.github.io/api/';
  constructor(private http: HttpClient) {
  }
  // Http Options
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  async getStreams() {
    return firstValueFrom(
      this.http
        .get<Stream[]>(this.URL + 'streams.json', this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        )
    );
  }
  async getChannels() {
    return firstValueFrom(
      this.http
        .get<Channel[]>(this.URL + 'channels.json', this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        )
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