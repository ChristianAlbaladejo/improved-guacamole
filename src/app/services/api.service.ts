import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;
const TOKEN_KEY = 'my-token';
const USER = '';

@Injectable()
export class ApiService {
    public url: string;
    public identify;
    public stats;
    public token;
    constructor(public _http: HttpClient) { }

    async get(): Promise<Observable<any>> {
        let token = await Storage.get({ key: TOKEN_KEY });
        console.log(token.value);
        let headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=UTF-8"',
            'Authorization': 'Bearer ' + token.value
        });

        return this._http.get('https://clouddemosjnc.dyndns.org:5001/DescargaDocumento/ObtenerImagenes?imagenes=79', { headers: headers });
    }
}