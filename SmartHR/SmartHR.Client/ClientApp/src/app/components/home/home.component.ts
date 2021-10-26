import { Component, OnInit } from '@angular/core';
import { LoginModel } from 'src/app/models/authentication/login-model';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private authService:AuthenticationService
  ) { }

  ngOnInit(): void {
    ()=>{/**/}
   /*  let data = new LoginModel("ESADR45", "@Open1234");
    this.authService.login(data).subscribe(x=>{
        console.log('done');
    }, err=>{
      console.log(err.error ?? err);

    }) */
  }

}
