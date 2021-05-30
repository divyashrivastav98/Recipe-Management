import { Component, ComponentFactoryResolver } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService, AuthResponseData } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: 'auth.component.html'
})

export class AuthComponent {

    constructor(private authService: AuthService, private route: Router, private componentFactoryResolver: ComponentFactoryResolver) { }

    isLoginMode = true;
    isLoading = false;
    error: string = null;

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {

        if (!form.value) {
            return
        }

        let email = form.value.email;
        let password = form.value.password;
        this.isLoading = true;

        let authObs: Observable<AuthResponseData>;

        if (this.isLoginMode) {
            authObs = this.authService.logIn(email, password);
        } else {
            authObs = this.authService.signUp(email, password)
        }

        authObs.subscribe((response) => {
            this.route.navigate(['/recipes']);
            this.isLoading = false;
        }, (errMessage) => {
            this.error = errMessage
            this.isLoading = false;
            // this.onShowError(errMessage);
        })

        form.reset();
    }

    onResetError() {
        this.error = null;
    }

    // private onShowError(error: string){

    // }

}
