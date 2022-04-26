import { Component, OnInit, ElementRef, ViewChild } from '@angular/core'; //TAG
import { Finance } from './../finance.model';
import { FinanceService } from './../finance.service';
import { Router } from '@angular/router';
import { ConteudoService } from '../../conteudo/conteudo.service';

//> TAG
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
//< TAG

@Component({
  selector: 'app-finance-create',
  templateUrl: './finance-create.component.html',
  styleUrls: ['./finance-create.component.css']
})
export class FinanceCreateComponent implements OnInit {

  finance: Finance = {
    data_de_referencia: new Date,
    data_do_evento: new Date,
    data_do_pagamento: new Date,
    descricao: '',
    nota: null,
    grupos: [],
    instituicao_financeira: '',
    renda: null,
    gastos: null,
    status: '',
    tags: []
  }

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

  status: any[] = [];
  instituicoes: any[] = [];
  grupos: any[] = [];

  constructor(
    private financeService: FinanceService,
    private router: Router,
    private conteudoService: ConteudoService) { 
      //> TAG
      this.filteredTags = this.tagCtrl.valueChanges.pipe(
        startWith(null),
        map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice()));
      //< TAG        
    }

  ngOnInit(): void {
    this.conteudoService.readByTipo('status').subscribe((status: any) => {
      this.status = status
    })
    this.conteudoService.readByTipo('instituicao').subscribe((instituicoes: any) => {
      this.instituicoes = instituicoes
    })
    this.conteudoService.readByTipo('grupo').subscribe((grupos: any) => {
      this.grupos = grupos
    })
    this.conteudoService.readByTipoResultValor('tag').subscribe((allTagsBackend: string[]) => {
      this.allTags = allTagsBackend
    })
  }

  createFinance(tags: string[]): void {
    this.finance.tags = tags
    this.financeService.create(this.finance).subscribe(() => {
      this.financeService.showMessage('Evento registrado!')
      this.router.navigate(['/'])
    })
  }

  cancel(): void {
    this.router.navigate(['/finances'])
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