import { EntityMetadataMap } from '@ngrx/data';
import * as fromIptv from '../iptv';
import * as fromTdt from '../tdt';
import { IptvDto } from 'src/app/iptvs/models/iptv-dto.model';
import { TdtDto } from 'src/app/tdts/models/tdt-dto.model';

export const entityMetadata: EntityMetadataMap = {
    [fromIptv.entityCollectionName]: {
        sortComparer: (a: IptvDto, b: IptvDto) => a.countryCode.localeCompare(b.countryCode!),
        filterFn: (entities: IptvDto[], { channelName, subdivision, countryCode, countryName, languageNames, category }: any) =>
            entities
                .filter((e) => (channelName ? e.channelName!.includes(channelName) : true))
                .filter((e) => (countryName ? e.channelName!.includes(countryName) : true))
                // .filter((e) => (subdivision ? e.subdivision === subdivision.split('@@')[0] : true))
                .filter((e) => (countryCode ? e.countryCode === countryCode : true))
                .filter((e) => (category ? e.categories?.includes(category) : true))
                .filter((e) => (languageNames ? e.languageNames === languageNames : true)),
        selectId: (iptv: IptvDto) => iptv.id,
        entityDispatcherOptions: {
            optimisticAdd: false,
            optimisticUpdate: false,
            optimisticSaveEntities: false,
            optimisticDelete: false,
            optimisticUpsert: false,
        }
    },
    [fromTdt.entityCollectionName]: {
        //sortComparer: (a: TdtDto, b: TdtDto) => a.countryCode.localeCompare(b.countryCode!),
        filterFn: (entities: TdtDto[], { channelName, countryCode, countryName, languageNames, category }: any) =>
            entities
                .filter((e) => (channelName ? e.channelName!.includes(channelName) : true))
                .filter((e) => (countryName ? e.channelName!.includes(countryName) : true))
                // .filter((e) => (subdivision ? e.subdivision === subdivision.split('@@')[0] : true))
                .filter((e) => (countryCode ? e.countryCode === countryCode : true))
                .filter((e) => (category ? e.categories?.includes(category) : true))
                .filter((e) => (languageNames ? e.languageNames === languageNames : true)),
        selectId: (tdt: TdtDto) => tdt.id,
        entityDispatcherOptions: {
            optimisticAdd: false,
            optimisticUpdate: false,
            optimisticSaveEntities: false,
            optimisticDelete: false,
            optimisticUpsert: false,
        }
    }
}
// because the plural of "hero" is not "heros"
const pluralNames = {
    [fromIptv.entityCollectionName]: fromIptv.pluralizedEntityName,
    [fromTdt.entityCollectionName]: fromTdt.pluralizedEntityName

};

export const entityConfig = {
    entityMetadata,
    pluralNames
};
