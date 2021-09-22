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
  isLoading = false;
  error: string = null;
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
    this.isLoading = true;
    if (!this.isLoginMode) {
      this.authService.signUp(email, password)
        .subscribe(data => {
          this.isLoading = false;
          console.log(data);
        }, error => {
          this.isLoading = false;
          console.log(error);
          this.error = 'An error occurred!';
        });
    } else {
      this.isLoading = false;
      console.log('Is login mode');
    }
    this.authForm.reset();
  }
}