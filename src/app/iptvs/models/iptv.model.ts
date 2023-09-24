import { Country } from "./country.model";
import { Channel } from "./channel.model";
import { Language } from "./language.model";
import { Region } from "./region.model";
import { Stream } from "./stream.model";
import { Category } from "../../iptvs/models/category.model";

export class Iptv {
    id!: string;
    stream?: Stream;
    category?: Category;
    channel?: Channel;
    language?: Language;
    region?: Region;
}
