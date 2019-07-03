import { HttpClient, HttpResponse } from '@angular/common/http';
import { Oferta } from './shared/oferta.model'
import { Injectable } from '@angular/core'

import { URL_API } from './app.api'
import { Observable } from 'rxjs';
import { map, retry } from  'rxjs/operators'

@Injectable()
export class OfertasService {
    private url_ofertas = `${URL_API}/ofertas`;
    private url_como_usar = `${URL_API}/como-usar`;
    private url_onde_fica = `${URL_API}/onde-fica`;
    
    constructor(private http: HttpClient) {}

    public getOfertas(): Promise<Oferta[]> {
        return this.http.get(`${this.url_ofertas}?destaque=true`) // retorna um Observable
        .toPromise() // converte para promise
        .then((resposta: any) => resposta)
    }

    public getOfertasPorCategoria(categoria: string) : Promise<Oferta[]> {
        return this.http.get(`${this.url_ofertas}?categoria=${categoria}`)
        .toPromise()
        .then((resposta: any) => resposta)
    }
    
    //resposta.shift() extrai o índice zero
    public getOfertaPorId(id: number): Promise<Oferta> {
        return this.http.get(`${this.url_ofertas}?id=${id}`)
        .toPromise()
        .then((resposta: any) => resposta.shift());
    }

    public getComoUsarOfertaPorId(id: number): Promise<string> {
        return this.http.get(`${this.url_como_usar}?id=${id}`)
        .toPromise()
        .then((resposta: any) => resposta.shift().descricao);
    }

    public getOndeFicaOfertaPorId(id: number): Promise<string> {
        return this.http.get(`${this.url_onde_fica}?id=${id}`)
        .toPromise()
        .then((resposta: any) => resposta.shift().descricao);
    }

    public pesquisarOfertas(termo: string): Observable<Oferta[]> {
        return this.http.get(`${this.url_ofertas}?descricao_oferta_like=${termo}`)
        .pipe(
            retry(3),
            map((resposta: any) => {
                return resposta
            })
        );
    }
}