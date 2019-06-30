import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progresso',
  templateUrl: './progresso.component.html',
  styleUrls: ['./progresso.component.sass']
})
export class ProgressoComponent implements OnInit {
  // Input semelhante ao props do vue
  @Input() public progresso: number = 0;

  constructor() { }

  ngOnInit() {
  }

}
