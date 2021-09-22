import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoginMode = true;
  @ViewChild('authForm') authForm: NgForm;

  constructor(
    private authService: AuthService
  ) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }
    const email = this.authForm.value.email;
    const password = this.authForm.value.password;
    if (!this.isLoginMode) {
      this.authService.signUp(email, password)
        .subscribe(data => {
          console.log(data);
        }, error => {
          console.log(error);
        });
    } else {
      console.log('Is login mode');
    }
    this.authForm.reset();
  }
}