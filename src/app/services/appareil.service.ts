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
      name: '',
      status: ''
    };
    appareilObject.name = name;
    appareilObject.status = status;
    
    this.httpClient.post('http://localhost:8080/api/appareil/new', appareilObject).subscribe(
      (response) => {
        console.log(response);
        
        this.emitAppareilSubject();
        
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      });
    // appareilObject.id = this.appareils[(this.appareils.length - 1)].id + 1;
    // this.appareils.push(appareilObject);
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

  deleteAppareil(id: number) {

    this.httpClient.delete<any[]>(`http://localhost:8080/api/appareil/${id}`).subscribe(
        (response) => {
          this.appareils = response;
          this.emitAppareilSubject();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
    }

  getAppareilsFromServer() {
    this.httpClient
      .get<any[]>('http://localhost:8080/api/appareil/all')
      .subscribe(
        (response) => {
          this.appareils = response;
          this.emitAppareilSubject();
          
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );


    // this.httpClient
    //   .get<any[]>('https://appareil-fd3ed.firebaseio.com/appareils.json')
    //   .subscribe(
    //     (response) => {
          
    //       this.appareils = response['-M35gb8khcHQl4S0Fdsb'];
    //       this.emitAppareilSubject();
    //     },
    //     (error) => {
    //       console.log('Erreur ! : ' + error);
    //     }
    //   );
  }

}