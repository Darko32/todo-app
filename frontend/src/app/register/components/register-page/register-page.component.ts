import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit{

  registerForm !: FormGroup;

  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      password2: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit() {
    console.log(this.registerForm.value);
    this.accountService.onRegister(this.registerForm.value).subscribe((res: any) => {
      // localStorage.setItem('token', res.jwt);
      console.log(res)
    });
    this.router.navigateByUrl('login');
  }



}
