import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { SaveDataService } from "../shared/save-data.service";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit, OnDestroy {
    constructor(private dataStorageService: SaveDataService, private authService: AuthService) { }
    userSubs : Subscription;
    isAuthenticated = false;

    ngOnInit(){
        this.userSubs = this.authService.user.subscribe((userData)=>{
            this.isAuthenticated = !userData ? false : true;
        });
    }
    @Output() navPage = new EventEmitter<string>()

    onSaveData() {
        this.dataStorageService.saveRecipe();
    }

    onLogout(){
        this.authService.logout();
    }

    onFetchData() {
        this.dataStorageService.fetchRecipe().subscribe();
    }

    ngOnDestroy(){
        this.userSubs.unsubscribe();
    }
}