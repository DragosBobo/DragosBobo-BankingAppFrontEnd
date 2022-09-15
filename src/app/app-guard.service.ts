import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";


export class GuardService implements CanActivate {
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
        return false;
    }
}