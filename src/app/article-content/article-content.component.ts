import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-article-content',
  templateUrl: './article-content.component.html',
  styleUrls: ['./article-content.component.scss']
})
export class ArticleContentComponent implements OnInit {
  @Input() title: string;
  @Input() description: string;
  @Input() author: string;
  @Input() publishedAt: string;
  private modify: boolean;

  constructor() { }

  ngOnInit() {
  }

}
