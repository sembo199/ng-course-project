import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild('authForm') authForm: NgForm;
  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;
  private closeSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
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

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if (!this.isLoginMode) {
      authObs = this.authService.signUp(email, password);
    } else {
      authObs = this.authService.signIn(email, password);
    }

    authObs.subscribe(data => {
      this.error = null;
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    }, errorMsg => {
      this.error = errorMsg;
      this.showErrorAlert(errorMsg);
      this.isLoading = false;
    });

    this.authForm.reset();
  }

  onHandleError() {
    this.error = null;
  }

  private showErrorAlert(errorMessage: string) {
    // This code is valid code, but wont work in Angular
    // const alertCmp = new AlertComponent();

    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const alertComponentRef = hostViewContainerRef.createComponent(alertComponentFactory);
    alertComponentRef.instance.message = errorMessage;
    this.closeSub = alertComponentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
}