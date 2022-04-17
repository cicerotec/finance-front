import { Router, ActivatedRoute } from '@angular/router';
import { FinanceService } from './../finance.service';
import { Finance } from './../finance.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-finance-delete',
  templateUrl: './finance-delete.component.html',
  styleUrls: ['./finance-delete.component.css']
})
export class FinanceDeleteComponent implements OnInit {

  finance!: Finance;

  constructor(
    private financeService: FinanceService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.financeService.readById(id).subscribe(finance => {
      this.finance = finance
    })
  }

  deleteFinance(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.financeService.delete(id).subscribe(() => {
      this.financeService.showMessage('Registro deletado com sucesso!')
      this.router.navigate(['/finances'])
    })
  }

  cancel(): void {
    this.router.navigate(['/finances'])
  }

}
