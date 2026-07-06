import {Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { GifList } from "../../components/side-menu/gif-list/gif-list";
import { GifService } from '../../services/gif.service';

// const imageUrls: string[] = [
//     "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg",
//     "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
//     "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg",
//     "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg",
//     "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg",
//     "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg",
//     "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg",
//     "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg",
//     "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg",
//     "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg",
//     "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg",
//     "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg"
// ];

@Component({
  selector: 'trending-page',
  templateUrl: './trending-page.html',
  //imports: [GifList],
   imports: [],
})
export default class TrendingPage { 
  gifService= inject(GifService);

  //Infinity Scroll
  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  onScroll(event: Event){
    const scrollDiv= this.scrollDivRef()?.nativeElement;
    if(!scrollDiv) return;
     
    const scrollTop=scrollDiv.scrollTop;
    const clienHeight= scrollDiv.clientHeight;
    const scrollHeight = scrollDiv.scrollHeight;
    
    //console.log({scrollTotal:scrollTop+clienHeight, scrollTop, clienHeight,scrollHeight});

    const isAtBottom= scrollTop+clienHeight+300 >= scrollHeight;
    console.log({isAtBottom});
    if(isAtBottom){
      //TODO: Cargar la siguiente página de gifs
    }
    
  }


}
