import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  autoCompleteData = ['AB', 'ABC', 'ABCD', 'ABCDE', 'ABCDEF'];
  defaultData = ['ABC', 'DEF', 'GHI', 'JKL', 'MNO'];
  multiSelectData = [{key: 1, data: 'ABC'}, {key: 2, data: 'DEF'}, {key: 3, data: 'GHI'}, {key: 4, data: 'JKL'}, {key: 5, data: 'MNO'}]

  enable1: boolean = true;
  enable2: boolean = true;
  enable3: boolean = true;

}
