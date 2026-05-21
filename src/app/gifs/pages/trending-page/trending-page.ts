import {Component } from '@angular/core';
import { GifList } from "../../components/side-menu/gif-list/gif-list";

@Component({
  selector: 'trending-page',
  templateUrl: './trending-page.html',
  imports: [GifList],
})
export default class TrendingPage {}
