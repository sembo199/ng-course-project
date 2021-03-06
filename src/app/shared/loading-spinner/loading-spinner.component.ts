import { Component } from "@angular/core";

@Component({
  selector: 'app-loading-spinner',
  template: `<div class="lds-dual-ring"></div>`,
  styles: [`
  .lds-dual-ring {
    display: inline-block;
    width: 20px;
    height: 20px;
  }
  .lds-dual-ring:after {
    content: " ";
    display: block;
    width: 16px;
    height: 16px;
    margin: 8px;
    border-radius: 50%;
    border: 2px solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }`]
})
export class LoadingSpinnerComponent {

}