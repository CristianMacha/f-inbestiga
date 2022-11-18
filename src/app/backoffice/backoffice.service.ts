import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BackofficeService {
  private isMenuOpen: boolean = true;
  private isMenuOpen$: Subject<boolean> = new Subject();

  constructor() { }

  isMogglemenuOpen(status: boolean) {
    this.isMenuOpen = status;
    this.isMenuOpen$.next(this.isMenuOpen);
  }

  isMetStatusmenuOpen() {
    return this.isMenuOpen$.asObservable();
  }
}
