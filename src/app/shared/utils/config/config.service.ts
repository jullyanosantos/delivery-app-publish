import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private uriPrefix = 'assets/data/config/';
  private uriSuffix = '.json';

  constructor(private httpClient: HttpClient) { }

  public get(filename: string): Promise<any> {
    var object = this.httpClient.get<any>(this.uriPrefix + filename + this.uriSuffix).toPromise();

    return object;
  }

}

/*

// import { Inject, Injectable } from '@angular/core';

// import { UtilsConfig } from '../../models/models';
// import { UtilsConfigService } from '../config.service';

  constructor(@Inject(UtilsConfigService) private config: UtilsConfig,
              private httpClient: HttpClient) {

    // this.uriPrefix = this.uriPrefix + this.config.defaultLanguage.split('-')[0] + '/';
  }

*/
