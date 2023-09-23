import { Injectable } from '@angular/core';
import { ChannelsService } from './channels.service';
import { StreamsService } from './streams.service';
import { CategoriesService } from './categories.service';
import { CountriesService } from './countries.service';
import { firstValueFrom } from 'rxjs';
import { IptvDto } from '../../core/models/iptv-dto.model';
import { Channel } from '../../core/models/channel.model';
import { Firestore } from '@angular/fire/firestore';
import { Database } from '@angular/fire/database';
import { FirebaseService } from '../generic services';

@Injectable()
export class IptvDtoService extends FirebaseService<IptvDto>{

    constructor(
        public afStore: Firestore,
        public afDatabase: Database,
        private channelsService: ChannelsService,
        private streamsService: StreamsService,
        private categoriesService: CategoriesService,
        private countriesService: CountriesService,

    ) {
        super('iptvs', afStore, afDatabase);
    }

    getChannels(): Promise<Channel[]> {
        return firstValueFrom(
            this.channelsService.list()
        );
    }


    // override getWithQuery(queryParams: HttpParams): Promise<IptvDto[]> {
    //     return firstValueFrom(this.channelsService.getWithQuery(queryParams).pipe(
    //         map(channels => channels.map(channel => {
    //             let obj: IptvDto = {
    //                 channelId: channel.id,
    //                 channelName: channel.name,
    //                 countryCode: channel.country,
    //                 languageCodes: channel.languages,
    //                 isNsfw: channel.is_nsfw,
    //                 website: channel.website,
    //                 logo: channel.logo,
    //                 url: channel.url,
    //             };
    //             // this.streamsService.getByChannelId(channel.id).pipe(map(stream => { obj.streamUrl = stream.url }))
    //             this.countriesService.getById(channel.country).pipe(map(country => {
    //                 obj.countryName = country.name
    //                 obj.countryFlag = country.flag
    //             }));
    //             return obj;
    //         }))
    //     ));
    // }
}
