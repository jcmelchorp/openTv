import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, finalize } from 'rxjs';
import { CategoriesService, ChannelsService, CountriesService, IptvDtoService, StreamsService } from '../../services';
// import categories from '../../../../assets/data/categories.json';
// import countries from '../../../../assets/data/countries.json';
// import languages from '../../../../assets/data/languages.json';
// import iptvs from '../../../../assets/data/iptvs.json';
// import streams from '../../../../assets/data/streams.json';
// import channels from '../../../../assets/data/channels.json';
import { DomSanitizer } from '@angular/platform-browser';
import { IptvDto } from '../../models/iptv-dto.model';
@Component({
  selector: 'app-surfer-seed-db',
  templateUrl: './surfer-seed-db.component.html',
  styleUrls: ['./surfer-seed-db.component.scss']
})
export class SurferSeedDbComponent implements OnInit {
  uploadPercent!: Observable<number>;
  filename: string = 'iptvs.json';
  downloadURL!: Observable<string>;
  selectedFiles!: FileList | null;
  forma: FormGroup;
  tests!: Observable<any[]>;
  fsChannelService: any;
  // languages: Language[] = languages as Language[];
  // categories: Category[] = categories as Category[];
  // countries: Country[] = countries as Country[];
  // iptvs: IptvDto[] = iptvs as IptvDto[];
  // streams: Stream[] = streams as Stream[];
  // channels: Channel[] = channels as Channel[];

  constructor(
    public sanitizer: DomSanitizer,
    fb: FormBuilder,
    public fsChannelsService: ChannelsService,
    public fsStreamsService: StreamsService,
    public fsCountriesService: CountriesService,
    public fsCategoriesService: CategoriesService,
    public fsIptvService: IptvDtoService,
  ) {
    this.forma = fb.group({
      categoria: [''],

    })
    // const iptvs: IptvDto[] = this.channelsArray.map((channel) => {
    //   let iptv = new IptvDto();
    //   iptv.channelId = channel.id;
    //   iptv.channelName = channel.name;
    //   iptv.countryCode = channel.country;
    //   iptv.countryName = this.countriesArray.find(
    //     (country) => country.code === channel.country
    //   )?.name;
    //   iptv.countryFlag = this.countriesArray.find(
    //     (country) => country.code === channel.country
    //   )?.flag;
    //   //  iptv.languageCodes=
    //   //  iptv.languageNames=
    //   iptv.categoryNames = channel.categories.map(
    //     (id: string) =>
    //       this.categoriesArray.find((category) => category.id === id)?.name!
    //   );
    //   //  iptv.is_nsfw!: boolean;
    //   // website!: string;
    //   iptv.logo = channel.logo;
    //   iptv.streamUrl = this.streamsArray.find(
    //     (stream) => stream.channel === channel.id
    //   )?.url;
    //   // guideSite!: string;
    //   // guideUrl!: string;
    //   if (channel.id === 'XEIPNTDT.mx') {
    //     this.iptv$ = new BehaviorSubject<IptvDto>(iptv);
    //   }
    //   return iptv;
    // });
    // this.iptvs$.next(iptvs);
  }

  ngOnInit() {
  }

  detectFiles(event: any) {
    this.selectedFiles = event.target.files[0];
    console.log(this.selectedFiles)
  }
  // uploadCategories() {
  //   this.categories.forEach(category => this.fsCategoriesService.add(category, category.id));
  // }
  // uploadCountries() {
  //   this.countries.forEach(country => this.fsCountriesService.add(country, country.code));
  // }
  // uploadStreams() {
  //   this.streams.forEach(stream => this.fsStreamsService.add(stream, stream.channel));
  // }

  get dataUri() {
    let array = this.uploadChannels();
    const jsonData = JSON.stringify(array);
    const uri = 'data:application/json;charset=UTF-8,' + encodeURIComponent(jsonData);
    return this.sanitizer.bypassSecurityTrustUrl(uri);
  }

  uploadChannels() {
    // console.log(this.channels)
    let array: IptvDto[] = [];
    // this.iptvs.forEach(iptv => {
    // this.streams.forEach(stream => {
    //   const iptvChannel = this.channels.find(channel => channel.id == stream.channel)!;
    // let obj: IptvDto = {
    // ...iptv,
    // isNsfw: iptv?.isNsfw ? iptv?.isNsfw.toString() : 'false',
    // channelId: stream.channel,
    // url: stream.url,
    // logo: iptvChannel?.logo,
    // isNsfw: iptvChannel?.is_nsfw ? iptvChannel?.is_nsfw.toString() : 'false',
    // channelName: iptvChannel?.name,
    // languageCodes: iptvChannel?.languages,
    // categoryNames: iptvChannel?.categories ? iptvChannel?.categories : [],
    // countryCode: iptvChannel?.country,
    // };
    // obj.languageNames = iptv?.languageCodes?.map((code: string) => this.languages.find(lang => lang.code === code)?.name!);
    // obj.categories = iptv?.categoryNames?.map((id: string) => this.categories.find(category => category.id === id)?.name!) || [];
    // obj.countryName = this.countries.find(country => country.code === iptv?.countryCode)?.name!;
    // obj.countryFlag = this.countries.find(country => country.code === iptv?.countryCode)?.flag!;
    // this.fsIptvService.add(obj)
    // obj.url ? this.fsIptvService.add(obj) : console.log(obj);
    // obj.url ? console.log(obj) : console.log(obj);
    // array.push(obj);
    // });
    // return array;
    // this.fsIptvService.addMany(array);
  }

  // uploadFile() {
  //   const myTest = this.fsChannelService.collection(this.forma.get('categoria')).ref.doc();
  //   console.log(JSON.stringify(this.selectedFiles))

  //   const file = this.selectedFiles
  //   const filePath = `${myTest.id}`;
  //   const fileRef = this.storage.ref(filePath);
  //   const task = this.storage.upload(filePath, file);

  //   this.uploadPercent = task.percentageChanges();

  //   task.snapshotChanges().pipe(
  //     finalize(() => {
  //       fileRef.getDownloadURL().toPromise().then((url: Observable<string>) => {
  //         this.downloadURL = url;

  //         myTest.set({
  //           categoria: this.forma.value.categoria,
  //           imagenes: this.downloadURL,
  //           myId: myTest.id
  //         })

  //         console.log(this.downloadURL)
  //       }).catch((err: any) => { console.log(err) });
  //     })
  //   )
  //     .subscribe()
  // }

}
