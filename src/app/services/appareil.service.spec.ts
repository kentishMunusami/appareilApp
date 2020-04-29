import { TestBed, getTestBed } from '@angular/core/testing';

import { AppareilService } from './appareil.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AppareilService', () => {
  let injector: TestBed;
  let service: AppareilService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AppareilService],
    });

    injector = getTestBed();
    service = injector.get(AppareilService);
    httpMock = injector.get(HttpTestingController);
  });

const appareilListResponse =  [
      { id: 1, name: 'machine', status: 'éteint'},
      { id: 2, name: 'lave vaisselle', status: 'allumé'},
      { id: 3, name: 'seche linge', status: 'éteint'},
    ];
  
  it('getUserList() should return data', () => {
      service.getAppareils().subscribe(appareils => {
        console.log(appareils);
        
        expect(appareils.length).toBe(3);
        expect(appareils).toEqual(appareilListResponse);
      });
  
      const req = httpMock.expectOne('http://localhost:8080/appareil/all');
      expect(req.request.method).toBe('GET');
      req.flush(appareilListResponse);//permet de lier le service à l'objet déclaré
    });


  afterEach(() => {
    httpMock.verify();
  });
});
