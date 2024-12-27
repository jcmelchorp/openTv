export class TdtDto {
    id: string;
    channelId!: string;
    priority?: number;
    channelName?: string;
    countryCode?: string;
    countryName?: string;
    countryFlag?: string;
    countryNameFlag?: string;
    languageCodes?: string[];
    languageNames?: string[];
    categories?: string[];
    categoryNames?: string[];
    isNsfw?: string;
    website?: string;
    logo?: string;
    url?: string;
    guideSite?: string;
    guideUrl?: string;
    subdivision?: string;
}