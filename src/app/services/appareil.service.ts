import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AppareilService {

  appareilsSubject = new Subject<any[]>();

  private appareils = [];
  // private appareils = [
  //   {
  //     id: 1,
  //     name: 'Machine à laver',
  //     status: 'éteint'
  //   },
  //   {
  //     id: 2,
  //     name: 'Frigo',
  //     status: 'allumé'
  //   },
  //   {
  //     id: 3,
  //     name: 'Ordinateur',
  //     status: 'éteint'
  //   }
  // ];

  constructor(private httpClient: HttpClient) { }

  emitAppareilSubject() {
    console.log(this.appareils);
    
    this.appareilsSubject.next(this.appareils.slice());
  }

  switchOnOne(i: number) {
    this.appareils[i].status = 'allumé';
  }

  switchOffOne(i: number) {
    this.appareils[i].status = 'éteint';
  }

  getAppareilById(id: number) {
    const appareil = this.appareils.find(
      (s) => {
        return s.id === id;
      }
    );
    return appareil;
  }

  addAppareil(name: string, status: string) {
    const appareilObject = {
      id: 0,
      name: '',
      status: ''
    };
    appareilObject.name = name;
    appareilObject.status = status;
    appareilObject.id = this.appareils[(this.appareils.length - 1)].id + 1;
    this.appareils.push(appareilObject);
    this.emitAppareilSubject();
  }

  saveAppareilsToServer() {
    this.httpClient
      .put('https://appareil-fd3ed.firebaseio.com/appareils.json', this.appareils)
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  getAppareilsFromServer() {
    this.httpClient
      .get<any[]>('https://appareil-fd3ed.firebaseio.com/appareils.json')
      .subscribe(
        (response) => {
          this.appareils = response['-M35gb8khcHQl4S0Fdsb'];
          
          this.emitAppareilSubject();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

}