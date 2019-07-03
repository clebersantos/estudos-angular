import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [ OfertasService ],
})
export class TopoComponent implements OnInit {
  public ofertas: Observable<Oferta[]>;
  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
  }

  public pesquisar(termoDaBusca: string): void {
    // console.log((<HTMLInputElement>event.target).value);
    this.ofertas = this.ofertasService.pesquisarOfertas(termoDaBusca);

    this.ofertas.subscribe(
      (ofertas: Oferta[]) => console.log(ofertas),
      (erro: any) => console.log('Erro status', erro.status),
      (() => console.log('fluxo de eventos compleo'))
    )
  }

}
