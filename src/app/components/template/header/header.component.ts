import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SidenavService } from '../../sidenav/sidenav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  @Output() sidenavToggle = new EventEmitter<void>();

  constructor(private sidenav: SidenavService) { }

  ngOnInit(): void {
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

}
