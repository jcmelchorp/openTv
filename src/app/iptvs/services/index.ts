import { CategoriesService } from "./categories.service";
import { ChannelsService } from "./channels.service";
import { CountriesService } from "./countries.service";
import { IptvDtoService } from "./iptv-dto.service";
import { IptvService } from "./iptv.service";
import { StreamsService } from "./streams.service";

export const iptvServices: any[] = [
    IptvService,
    ChannelsService,
    IptvDtoService,
    StreamsService,
    CategoriesService,
    CountriesService,
];
export * from './iptv.service';
export * from './channels.service';
export * from './iptv-dto.service';
export * from './streams.service';
export * from './categories.service';
export * from './countries.service';
