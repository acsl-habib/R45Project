import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { RegistrationModel } from '../../../models/authentication/registration-model';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { NotifyService } from '../../../services/common/notify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  data!: RegistrationModel;
  returnUrl: string = "/login";
  constructor(
    private registerService: AuthenticationService,
    private notifyService: NotifyService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }
  registerForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  })
  get f() {
    return this.registerForm.controls;
  }
  register() {
    if (this.registerForm.invalid) return;
    this.data = {};
    Object.assign(this.data, this.registerForm.value);
    this.registerService.register(this.data)
      .subscribe(r => {
        this.router.navigateByUrl(this.returnUrl);
        this.notifyService.success("successfully registerd", "DISMISS");
        this.registerForm.reset({});
        this.registerForm.markAsPristine();
        this.registerForm.markAsUntouched();
      }, err => {
        this.notifyService.fail("Registration failed", "DISMISS");
        throwError(err.error || err);
      })
  }
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(q => {
      this.returnUrl = q['returnUrl'] ?? "/login";
      //console.log(this.returnUrl);
    })
    //this.data = new LoginModel();
  }

}
