import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('imageUser') inputImageUser: ElementRef;
	public email: string = '';
	public password: string = '';

  uploadPercent: Observable<number>;
  urlImage: Observable<string>;

  constructor(private router: Router, private authService: AuthService, private storage: AngularFireStorage) { }

  ngOnInit() {
  }

  onUpload(e){
    //console.log('subir',e.target.files[0]);
    const id = Math.random().toString(36).substr(2);
    const file = e.target.files[0];
    const filePath = `uploads / profile_${ id }`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
  }

  onAddUser(){
  	this.authService.registerUser(this.email, this.password)
  	.then((res) => {
      this.authService.isAuth().subscribe(user => {
        if(user){
          user.updateProfile({
            displayName: '',
            photoURL: this.inputImageUser.nativeElement.value
          }).then((res) => {
            this.onLoginRedirect();
          }).catch(err => this.onCatchError(err));
        }
      })
  		//this.router.navigate(['/admin/list-books']);
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

  onLoginRedirect(): void{
    this.router.navigate(['admin/list-books']);
  }

  onCatchError(err): void{
    console.log('err', err.message);
  }
}
