import {Component, inject, signal } from '@angular/core';
import { GifList } from "../../components/side-menu/gif-list/gif-list";
import { GifService } from '../../services/gif.service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'search-page',
  templateUrl: './search-page.html',
  imports: [GifList]
})
export default class SearchPage {
  gifService= inject(GifService);
  gifs= signal<Gif[]>([]);
  onSearch(query:string){
    this.gifService.searchGifs(query).subscribe((resp)=>{
      this.gifs.set(resp);
       //console.log({resp});
    });
    
  }
}
