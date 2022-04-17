import { ProductService } from './../../../../../../frontend/src/app/components/product/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FinanceService } from './../finance.service';
import { Finance } from './../finance.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-finance-update',
  templateUrl: './finance-update.component.html',
  styleUrls: ['./finance-update.component.css']
})
export class FinanceUpdateComponent implements OnInit {

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

  updateFinance(): void {
    this.financeService.update(this.finance).subscribe(() => {
      this.financeService.showMessage('Registro atualizado com sucesso!')
      this.router.navigate(['/finances'])
    })
  }

  cancel(): void {
    this.router.navigate(['/finances'])
  }

}
