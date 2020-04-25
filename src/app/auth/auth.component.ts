import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { Observable, interval } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  authStatus: boolean;
  loginForm: FormGroup;
  notAllow: boolean;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder,) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email:    [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(3)]],
    });
  }

  connect() {
    if (this.loginForm.valid) {
      this.authService.authenticate(this.loginForm.get('email').value, this.loginForm.get('password').value).subscribe((response: HttpResponse<any>) => {
        console.log(response.status);
        
          if (response.status === 200) {
            this.authService.isAuth = true;
            this.authService.handleSuccess(response.headers);
            this.router.navigate(['appareils']);
          }
        }
        ,(err) => {
          this.notAllow = true;
            setTimeout(function() {
              this.notAllow = false;
          }.bind(this), 3000);
        });
    }
  }

  // onSignIn() {
  //   this.authService.signIn().then(
  //     () => {
  //       console.log('Sign in successful!');
  //       this.authStatus = this.authService.isAuth;
  //       this.router.navigate(['appareils']);
  //     }
  //   );
  // }

  // onSignOut() {
  //   this.authService.signOut();
  //   this.authStatus = this.authService.isAuth;
  // }

}
