import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ArticleService {

    articlesSubject = new Subject<any[]>();
    private articles = [];


    constructor(private httpClient: HttpClient) { }

    emitArticleSubject() {
        this.articlesSubject.next(this.articles.slice());
    }


    getArticles(){
        return this.httpClient.get<any[]>('http://localhost:8080/articles/all');
      }

      getArticleFromServer() {
        this.getArticles()
          .subscribe(
            (response) => {
              this.articles = response;
              this.emitArticleSubject();
              
            },
            (error) => {
              console.log('Erreur ! : ' + error);
            }
          );
        }
}