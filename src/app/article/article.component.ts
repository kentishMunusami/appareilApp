import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  articleSubscription: Subscription;
  articles: any[];

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.articleSubscription = this.articleService.articlesSubject.subscribe(
      (articles: any[]) => {
        this.articles = articles;
      }
    );
    this.articleService.getArticleFromServer();
    this.articleService.emitArticleSubject();
    
    
  }

}
