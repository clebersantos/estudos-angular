import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';
import { Observable, Subject, of } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged, catchError } from 'rxjs/operators'

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [ OfertasService ],
})
export class TopoComponent implements OnInit {
  public ofertas: Observable<Oferta[]>;
  private subjectPesquisa: Subject<string> = new Subject<string>();

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.ofertas = this.subjectPesquisa //retorno Oferta[
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((termo: string) => {
          if(termo.trim() === '') {
            return of<Oferta[]>([]);
          }

          return this.ofertasService.pesquisarOfertas(termo)
        }),
        catchError((err: any) => {
          console.log('errrorrr', err);
          return of<Oferta[]>([]);
        })
      )

      this.ofertas.subscribe((ofertas: Oferta[]) => console.log('offfff', ofertas))
  }

  public pesquisar(termoDaBusca: string): void {
    console.log('pesquisaaaa', termoDaBusca);
    this.subjectPesquisa.next(termoDaBusca);
  }

}
