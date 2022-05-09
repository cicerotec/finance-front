import { HttpParams } from '@angular/common/http';
import { FinanceService } from './../finance.service';
import { Finance } from './../finance.model';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core'; //TAG
import { ActivatedRoute, Router } from '@angular/router';
import { MatAccordion } from '@angular/material/expansion';
import { MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from '../../bottom-sheet/bottom-sheet.component';
import { SaldoService } from '../../saldo/saldo.service';
import { Saldo } from '../../saldo/saldo.model';

//> TAG
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { ConteudoService } from '../../conteudo/conteudo.service';
//< TAG

@Component({
  selector: 'app-finance-read',
  templateUrl: './finance-read.component.html',
  styleUrls: ['./finance-read.component.css']
})
export class FinanceReadComponent implements OnInit {

  //> TAG
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredTags: Observable<string[]> | undefined;
  tags: any[] = [];
  allTags: string[] = [];

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement> | undefined;
  @ViewChild('auto') matAutocomplete: MatAutocomplete | undefined;
  //< TAG  

  @ViewChild(MatAccordion) accordion: MatAccordion | undefined;  

  isShowingSidenav: boolean | undefined;

  saldos: Saldo[] = [];
  colunas = ['instituicao_financeira','saldo'];

  nada_encontrado = "Nenhum registro encontrado!"
  saldo_nao_encontrado = "Nenhum saldo encontrado para o mês vigente!"

  finances: Finance[] = [];
  displayedColumns = [
    'data_de_referencia', 
    'data_do_evento', 
    'data_do_pagamento', 
    'descricao', 
    'nota', 
    'grupos', 
    'instituicao_financeira',     
    'renda', 
    'gastos', 
    'status', 
    'tags',
    'action'
  ]

  data_de_referencia!: Date;
  data_de_referencia_final!: Date
  descricao!: string;

  constructor(
    private financeService: FinanceService,
    private saldoService: SaldoService,
    private router: Router,
    private route: ActivatedRoute,
    private _bottomSheet: MatBottomSheet,
    private conteudoService: ConteudoService
  ) {
      //> TAG
      this.filteredTags = this.tagCtrl.valueChanges.pipe(
        startWith(null),
        map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice()));
      //< TAG 
   }

  ngOnInit(): void {
    this.data_de_referencia = this.getFirstDayOfMonth()
    this.data_de_referencia_final = this.getLastDayOfMonth()
    this.searchDataReferencia()
    this.conteudoService.readByTipoResultValor('tag').subscribe((allTagsBackend: string[]) => {
      this.allTags = allTagsBackend
    })    
  }

  searchDataReferencia(): void {
    if(typeof this.data_de_referencia!='undefined' 
      && this.data_de_referencia
      && typeof this.data_de_referencia_final!='undefined' 
      && this.data_de_referencia_final) {

        let paramsFinance = new HttpParams()
          .set('data_de_referencia', this.data_de_referencia.toISOString())
          .set('data_de_referencia_final', this.data_de_referencia_final.toISOString())

        this.financeService.readByParams(paramsFinance).subscribe(finances => {
          this.finances = []
          this.finances = finances

          this.searchSaldo();
        }, error => {
          this.financeService.showMessage(this.nada_encontrado)
        })
    }
  }  

  searchSaldo(): void {

    let paramsSaldo = new HttpParams()
      .set('data_de_referencia', this.data_de_referencia.toISOString())
      .set('data_de_referencia_final', this.data_de_referencia_final.toISOString())

    this.saldoService.readByParams(paramsSaldo).subscribe(saldos => {
      this.saldos = []
      this.saldos = saldos

    }, error => {
      this.saldos = []
      if(this.isShowingSidenav) {
        this.saldoService.showMessage(this.saldo_nao_encontrado)
        this.toggleSidenav()
      }
    })

  }

  toggleSidenav() {
    this.isShowingSidenav = !this.isShowingSidenav;
 }

  getFirstDayOfMonth(): Date {
    let date = new Date(), y = date.getFullYear(), m = date.getMonth();
    //let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    let firstDay = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    return firstDay
  }

  getLastDayOfMonth(): Date {
    let date = new Date(), y = date.getFullYear(), m = date.getMonth();
    //let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);    
    let lastDay = new Date(date.getFullYear(), date.getMonth(), 0);        
    return lastDay
  }
  
  monthForward(): void {
    this.data_de_referencia = new Date(this.data_de_referencia.getFullYear(), this.data_de_referencia.getMonth() + 1, 1)
    this.data_de_referencia_final = new Date(this.data_de_referencia_final.getFullYear(), this.data_de_referencia_final.getMonth() + 2, 0)
    console.log("monthForward data inicial "+this.data_de_referencia)
    console.log("monthForward data final "+this.data_de_referencia)
    this.searchDataReferencia()
  }

  monthBackward(): void {
    this.data_de_referencia = new Date(this.data_de_referencia.getFullYear(), this.data_de_referencia.getMonth() - 1, 1)
    this.data_de_referencia_final = new Date(this.data_de_referencia_final.getFullYear(), this.data_de_referencia_final.getMonth(), 0)
    console.log("monthBackward data inicial "+this.data_de_referencia)
    console.log("monthBackward data final "+this.data_de_referencia)    
    this.searchDataReferencia()
  }

  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetComponent);
  }

  //> TAG
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our tag
    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.tagCtrl.setValue(null);
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    if (typeof this.tagInput != 'undefined') {
      this.tagInput.nativeElement.value = '';
    }
    this.tagCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
  }
  //< TAG  

}
