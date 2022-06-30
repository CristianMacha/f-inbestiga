import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadScriptService {

  constructor() { }

  public loadScript(id: string, url: string) {
    return new Promise((resolve, reject) => {

      if (id && document.getElementById(id)) {
        console.log('+>');
        
        resolve({ id, loaded: true, status: 'Already loaded.' });
      }

      let body = document.body;
      let script = document.createElement('script');
      // script.type = 'text/javascript';
      // script.innerHTML = '';
      script.src = `./${url}`;
      script.id = id;
      script.onload = () => resolve({ id, loaded: true, status: `${url} Loaded.` });
      script.onerror = () => resolve({ id, loaded: false, status: `${url} Loaded.` });
      // script.async = true;
      // script.defer = true;
      body.appendChild(script);

    });
  }

  public removeScript(id: string) {
    let scrip = document.getElementById(id);
    console.log(scrip);
    
    if (scrip) {
      scrip.remove();
    }
  }

}
