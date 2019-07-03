import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';
import { interval, Observable, Observer, Subscription } from 'rxjs';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [ OfertasService ]
})
export class OfertaComponent implements OnInit, OnDestroy {
  private oferta: Oferta;
  private tempoObserableSubscription: Subscription;
  private meuObservableTeste: Subscription;
  
  constructor(
    private route: ActivatedRoute, 
    private ofertasService: OfertasService
  ) {}

  ngOnInit() {
    // this.route.snapshot.params['id']
    // this.route.params.subscribe((parametro: any) => {})
    this.ofertasService.getOfertaPorId(this.route.snapshot.params['id'])
    .then((oferta: Oferta)=> {
      this.oferta = oferta;
    })

    // this.route.params.subscribe(
    //   (parametro: any) => {console.log('aaaaa', parametro)},
    //   (erro: any) => console.log(erro),
    //   () => console.log('recurso finalizado')
    // );

    let tempo = interval(2000);
    this.tempoObserableSubscription = tempo.subscribe((intervalo: number) => console.log(intervalo));

    let meuObservableTeste = Observable.create(
      (observer: Observer<string>) => {
        observer.next('primeiro enveto da stream')
        observer.next('segundo enveto da stream')
        observer.error('aconteeu um erro')
        observer.next('terceiro enveto da stream')
        observer.complete();
      }
    );

    this.meuObservableTeste = meuObservableTeste.subscribe(
      (resultado: any) => {console.log(resultado)},
      (erro: string) => {console.log(erro)},
      () => {console.log('finalizado')}
    )
  }

  ngOnDestroy() {
    this.tempoObserableSubscription.unsubscribe();
    this.meuObservableTeste.unsubscribe();
  }

}
