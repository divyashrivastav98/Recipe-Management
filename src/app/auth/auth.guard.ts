import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import {map,take} from 'rxjs/operators'

@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate{
    constructor(private authService : AuthService,private route:Router){}
    canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<boolean | UrlTree>|Promise<boolean | UrlTree>|boolean{
        return this.authService.user.pipe(
            take(1),
            map(userData=>{
            // return userData ? true : false;
            const isAuth = !!userData;
            if(isAuth){
                return true;
            }else{
                return this.route.createUrlTree(['/auth']);
            }
        }))
    }
}