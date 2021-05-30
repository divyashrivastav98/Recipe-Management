import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from 'rxjs/operators';
import { Subject, throwError, BehaviorSubject } from 'rxjs';
import { User } from "./user.model";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment"

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean
}

@Injectable({ providedIn: 'root' })

export class AuthService {

    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;

    constructor(private http: HttpClient, private route: Router) { }

    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }).pipe(catchError(this.errorHandler), tap(responseData => {
                this.handleAuthentication(
                    responseData.email,
                    responseData.localId,
                    responseData.idToken,
                    +responseData.expiresIn
                )
            }));
    }

    logIn(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }).pipe(catchError(this.errorHandler), tap(responseData => {
                this.handleAuthentication(
                    responseData.email,
                    responseData.localId,
                    responseData.idToken,
                    +responseData.expiresIn
                )
            }));
    }

    autoLogin() {
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));

        if (!userData) {
            return
        }

        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate))
        if (loadedUser.token) {
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
            this.user.next(loadedUser);

        }
    }

    private handleAuthentication(email: string, id: string, token: string, expiresIn: number) {
        let expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
        const user = new User(email, id, token, expirationDate)
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private errorHandler(errorData: HttpErrorResponse) {
        let errorMessage = 'An error has occured';
        if (!errorData.error || !errorData.error.error) {
            return throwError(errorMessage);
        }
        switch (errorData.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'Email already registered';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'Email not registered';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'Password is incorrect';
                break;
        }

        return throwError(errorMessage);
    }

    logout() {
        this.user.next(null);
        this.route.navigate(['/auth']);
        localStorage.removeItem('userData')
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer)
        }

        this.tokenExpirationTimer = null;

    }

    autoLogout(expirationDate: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDate)
    }
}