import { Component, OnInit } from '@angular/core';
import  { OfertasService } from '../ofertas.service'
import { Oferta } from '../shared/oferta.model'
import { interval } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ OfertasService ] 
})
export class HomeComponent implements OnInit {
  public ofertas: Oferta[];

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    // this.ofertas = this.ofertasService.getOfertas();
    // console.log(this.ofertas);

    this.ofertasService.getOfertas2()
      .then(
        (ofertas: Oferta[]) => { 
          console.log('foi resolvida depois de tres segundos')  
          this.ofertas = ofertas 
        }
      ).catch(( param: any ) => console.log(param));

      // let tempo = interval(500);

      // tempo.subscribe((tempo2: number) => {
      //   console.log('sssss', tempo2)
      // })
  }

}
