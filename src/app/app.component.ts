import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  @Output() sidenavLayoutToggle = new EventEmitter<boolean>();

  title = 'finance-front';

  openMenu = false;
  clickMenu() {
    this.openMenu = !this.openMenu;
    this.sidenavLayoutToggle.emit(this.openMenu);
  }  
}
