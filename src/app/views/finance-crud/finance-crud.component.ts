import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-finance-crud',
  templateUrl: './finance-crud.component.html',
  styleUrls: ['./finance-crud.component.css']
})
export class FinanceCrudComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToFinanceCreate(): void {
    this.router.navigate(['/finances/create'])
  }

}
