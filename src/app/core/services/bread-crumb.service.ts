import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadCrumbService {

  private title: string = '-';
  private title$: Subject<string> = new Subject();

  constructor() { }

  getTitlePage$(): Observable<string> {
    return this.title$.asObservable();
  }

  setTitle(title: string = '-') {
    this.title = title;
    this.title$.next(this.title);
  }
}
