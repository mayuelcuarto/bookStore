import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    public email: string = '';
    public password: string = '';

  constructor(
    public afAuth: AngularFireAuth, 
    private router: Router,
    private authService: AuthService,
    ) {}

  ngOnInit() {
  }

  onLogin(): void{
    this.authService.loginEmailUser(this.email, this.password)
    .then((res) => {
      this.onLoginRedirect();
    }).catch(err => this.onCatchError(err));    
  }

  onLoginGoogle(): void{
    this.authService.loginGoogleUser()
    .then((res) => {
      this.onLoginRedirect();
    }).catch(err => this.onCatchError(err));  	
  }

  onLoginFacebook(): void{
  	this.authService.loginFacebookUser()
    .then((res) => {
      this.onLoginRedirect();
    }).catch(err => this.onCatchError(err));    
  }

  onLogout(): void{
  	this.authService.logoutUser();
  }

  onLoginRedirect(): void{
    this.router.navigate(['admin/list-books']);
  }

  onCatchError(err): void{
    console.log('err', err.message);
  }
}