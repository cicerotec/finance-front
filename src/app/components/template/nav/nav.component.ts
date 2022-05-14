import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatSidenav } from "@angular/material/sidenav";
import { SidenavService } from '../../sidenav/sidenav.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @ViewChild('sidenav') public sidenav!: MatSidenav;
  @Input() sidenavLayout:any;

  constructor(private sidenavService: SidenavService) { }

  ngOnInit(): void {
    this.sidenavService.setSidenav(this.sidenav);    
  }

}
