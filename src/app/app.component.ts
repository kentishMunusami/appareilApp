import { Component, OnInit, OnChanges } from '@angular/core';
import { AppareilService } from './services/appareil.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { interval } from 'rxjs';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isAuth = false;
  secondes: number;
  counterSubscription: Subscription;
  subjectSubscription: Subscription;

  lastUpdate = new Promise((resolve, reject) => {
    const date = new Date();
    setTimeout(
      () => {
        resolve(date);
      }, 2000
    );
  });

  appareils: any[];

  appareilOne = 'Machine à laver';
  appareilTwo = 'Frigo';
  appareilThree = 'Ordinateur';



  constructor(private appareilService: AppareilService) {
    setTimeout(
      () => {
        this.isAuth = true;
      }, 4000
    );
  }
  

  ngOnInit() {
    // const counter = interval(1000);
    // this.counterSubscription = counter.subscribe(
    //   (value) => {
    //     this.secondes = value;
    //   },
    //   (error) => {
    //     console.log('Uh-oh, an error occurred! : ' + error);
    //   },
    //   () => {
    //     console.log('Observable complete!');
    //   }
    // );

    // Behavior subjects need a first value
    let subject = new BehaviorSubject<string>("First value");

    this.subjectSubscription = subject.asObservable().subscribe((data) => {
      console.log("First subscriber got data >>>>> " + data);
    });

    const counter = interval(3000);
    this.counterSubscription = counter.subscribe(
      (value) => {
        subject.next("Second value");
        this.subjectSubscription.unsubscribe()
      });

    
  }

  ngOnDestroy() {
    this.counterSubscription.unsubscribe();
    this
  }

  // onAllumer() {
  //   this.appareilService.switchOnAll();
  // }

  // onEteindre() {
  //   if (confirm('Etes-vous sûr de vouloir éteindre tous vos appareils ?')) {
  //     this.appareilService.switchOffAll();
  //   } else {
  //     return null;
  //   }
  // }
}