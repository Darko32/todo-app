import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm !: FormGroup;

  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router) {
    
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }


  onSubmit() {
    console.log(this.loginForm.value);
    this.accountService.onLogin(this.loginForm.value).subscribe(
      (res: any) => {
      localStorage.setItem('token', res.jwt);
      console.log(res)
      this.router.navigateByUrl('/');
    },
    (error) => {
      console.log(error);
      this.loginForm.setErrors({ serverError: error?.error?.serverError });
    }
    );
  }

}
