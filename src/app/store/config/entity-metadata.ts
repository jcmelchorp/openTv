import { EntityMetadataMap } from '@ngrx/data';
import * as fromIptv from '../iptv';
import { IptvDto } from 'src/app/core/models/iptv-dto.model';

export const entityMetadata: EntityMetadataMap = {
    [fromIptv.entityCollectionName]: {
        sortComparer: (a: IptvDto, b: IptvDto) => a.countryCode.localeCompare(b.countryCode!),
        filterFn: (entities: IptvDto[], { channelName, countryCode, countryName, languageNames, categories }: Partial<IptvDto>) =>
            entities
                .filter((e) => (channelName ? e.channelName!.includes(channelName) : true))
                .filter((e) => (countryName ? e.channelName!.includes(countryName) : true))
                .filter((e) => (countryCode ? e.countryCode === countryCode : true))
                .filter((e) => (categories ? e.categories!.includes(categories[0]) : true))
                .filter((e) => (languageNames ? e.languageNames === languageNames : true)),
        selectId: (iptv: IptvDto) => iptv.id,
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
    [fromIptv.entityCollectionName]: fromIptv.pluralizedEntityName
};

export const entityConfig = {
    entityMetadata,
    pluralNames
};
