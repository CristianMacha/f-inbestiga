import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

import {matchValidator} from "../../core/helpers/confirmPassword.validator";
import {SnackBarService, UserService} from "@core/services";
import {finalize} from "rxjs";

declare function loadInputs(): any;

@Component({
  selector: 'vs-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  year = new Date().getFullYear();

  registerForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    fullname: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', [Validators.required, matchValidator('password')])
  });

  loading: boolean = false;

  constructor(
    private userService: UserService,
    private snackBar: SnackBarService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    loadInputs();
  }

  handleRegister(): void {
    this.registerForm.invalid ? this.registerForm.markAllAsTouched() : this.register();
  }

  register(): void {
    this.loading = true;
    this.userService.create(this.registerForm.value)
      .pipe(finalize(() => this.loading = false))
      .subscribe((resp) => {
        this.registerForm.reset();
        this.router.navigateByUrl('auth/login');
        this.snackBar.openTopEnd('Usuario registrado.');
      });
  }
}
