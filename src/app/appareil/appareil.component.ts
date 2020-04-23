import { Component, Input, OnInit } from '@angular/core';
import { AppareilService } from '../services/appareil.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-appareil',
  templateUrl: './appareil.component.html',
  styleUrls: ['./appareil.component.scss']
})
export class AppareilComponent implements OnInit {

  @Input() appareilName: string;
  @Input() appareilStatus: string;
  @Input() index: number;
  @Input() id: number;
  private modify: boolean;

  constructor(private appareilService: AppareilService) { }

  ngOnInit() {
  }

  getStatus() {
    return this.appareilStatus;
  }

  getColor() {
    if (this.appareilStatus === 'allumé') {
      return 'green';
    } else if (this.appareilStatus === 'éteint') {
      return 'red';
    }
  }

  onSwitch() {
    if (this.appareilStatus === 'allumé') {
      this.appareilService.switchOffOne(this.index);
    } else if (this.appareilStatus === 'éteint') {
      this.appareilService.switchOnOne(this.index);
    }
  }

  delete() {
    this.appareilService.deleteAppareil(this.id);
  }

  onSubmit(form: NgForm) {
    const updateAppareil = {
      id: this.id, 
      name: form.value['name'],
      status: form.value['status']
    };
    this.appareilService.updateAppareil(updateAppareil)
    this.showFormulaire();
    
    
  //   appareilObject.name = name;
  //   appareilObject.status = status;
  //   const name = form.value['name'];
  //   const status = form.value['status'];
  //   this.appareilService.addAppareil(name, status);
  //   this.router.navigate(['/appareils']);
  }


  showFormulaire(){
    this.modify = !this.modify;
  }

}