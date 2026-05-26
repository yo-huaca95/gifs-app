import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';

import { map, tap } from 'rxjs';

import { environment } from '@enviroments/environment';
import { GifMapper } from '../mapper/gif.mapper';
import { Gif } from '../interfaces/gif.interface';
import { GiphyResponse } from '../interfaces/giphy.interfaces';

//Orden de las importaciones: 1. Importaciones de angular - 2. Importaciones de terceros - 3. Importaciones propias

@Injectable({
  providedIn: 'root',
})
export class GifService {
  private http= inject(HttpClient);

  trendingGifs= signal<Gif[]>([]);
  trendingGifsLoading=signal(true);

  searchHistory = signal<Record<string,Gif[]>>({});
  searchHistoryKeys = computed(()=> Object.keys(this.searchHistory()));

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
      //console.log(gifs);
    })
  }

  searchGifs(query:string){
    return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`,{
      params:{
        api_key:environment.giphyapiKey,
        limit:20,
        q:query,
        }
  })
  .pipe(
    map(({data})=>data),
    map((items)=>GifMapper.mapGiphyItemsTGifArray(items)),

    //Historial
    tap((items) =>{
      this.searchHistory.update((history)=>({
        ...history,
        [query.toLowerCase()]:items,
      }));
    })
  )

  // .subscribe((resp)=>{
  //     const gifs= GifMapper.mapGiphyItemsTGifArray(resp.data);
  //     this.trendingGifs.set(gifs);
  //     this.trendingGifsLoading.set(false);
  //     console.log(gifs);
  // })

  }

  getHistoryGifs(query:string):Gif[]{
      return this.searchHistory()[query]??[];
  }

}
