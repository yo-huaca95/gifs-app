import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { GiphyResponse } from '../interfaces/giphy.interfaces';
import { environment } from '@enviroments/environment';
import { GifMapper } from '../mapper/gif.mapper';
import { Gif } from '../interfaces/gif.interface';

@Injectable({
  providedIn: 'root',
})
export class GifService {
  private http= inject(HttpClient);

  trendingGifs= signal<Gif[]>([]);
  trendingGifsLoading=signal(true);

  constructor() {
    console.log('Servicio creado!..')
    this.loadTrendingGifs();
  }

  loadTrendingGifs(){
    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`,{
      params:{
        api_key:environment.giphyapiKey,
        limit:20,
      }
    }).subscribe((resp)=>{
      const gifs= GifMapper.mapGiphyItemsTGifArray(resp.data);
      this.trendingGifs.set(gifs);
      this.trendingGifsLoading.set(false);
      console.log(gifs);
    })
  }
}
