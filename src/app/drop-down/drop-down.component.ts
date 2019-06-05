import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.scss']
})
export class DropDownComponent implements OnInit {

  @Input() values: any[];
  @Input() label: string;
  @Input() searchable: boolean;
  @Input() placeholder: string;
  @Input() enabled: boolean;
  @Input() multiSelect: boolean;

  value = '';
  multipleValue: any[] = [];
  multipleValueString: any[] = [];
  optionId = '';
  option = 0;
  opened = false;
  openedAgain: boolean;
  filteredData: string[];
  hovered: boolean;


  constructor() {
    this.enabled = true;
  }

  searchOption(event) {
    this.filteredData = this.values.filter(word => word.toLowerCase().includes(event.target.value.toLowerCase()));
  }

  chooseOption(item) {
    if (this.multiSelect) return;
    this.opened = false;
    this.value = item;
  }

  multipleChooseOption(event, item) {
    //saves value in array, display via string.
    if (event.target.checked) {
      if (!this.arrayContains(this.multipleValue, item)) {
        this.multipleValue.push(item);
        this.multipleValueString.push(item['data']);
      }
    } else {
      let index = this.multipleValue.indexOf(item);
      this.multipleValue.splice(index, 1);
      this.multipleValueString.splice(index, 1);
    }
    this.value = this.multipleValueString.join(', ');
  }

  handleClick() {
    if (!this.enabled) return;
    if (this.multiSelect) {
      this.handleMultiSelectClick();
    }
    this.opened = !this.opened;
    this.filteredData = null;
    this.option = -1;
  }

  handleMultiSelectClick() {
    if (this.opened && this.multipleValue.length > 0) {
      this.openedAgain = true;
    } else if (this.openedAgain && this.multipleValue.length === 0) {
      this.openedAgain = false;
    }
  }

  clearChecks() {
    this.multipleValue = [];
    this.multipleValueString = [];
    this.value = '';
  }

  keyDownFunction(event) {
    if (this.multiSelect) return;
    if (this.optionId) {
      document.getElementById(this.optionId).classList.remove('selected-option');
    }
    if (this.values) {
      if (event.which === 40) {
        this.option++;
        if (this.option > this.values.length - 1) {
          this.option = 0;
        }
        this.chooseOption(this.values[this.option]);
        this.optionId = this.option.toString();
      }
      if (event.which === 38) {
        this.option--;
        if (this.option < 0) {
          this.option = this.values.length - 1;
        }
        this.chooseOption(this.values[this.option]);
        this.optionId = this.option.toString();
      }

    }

    this.opened = event.which !== 13;

    if (this.optionId) {
      document.getElementById(this.optionId).classList.add('selected-option');
    }
  }

  arrayContains(arr: any[], value) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i]['key'] == value['key']) {
        return true;
      }
    }
  }

  ngOnInit() {
  }

}
