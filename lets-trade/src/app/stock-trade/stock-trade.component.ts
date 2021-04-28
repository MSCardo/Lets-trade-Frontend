import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { TradeApiService } from '../trade-api.service';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DatePickerComponent } from '../date-picker/date-picker.component';

@Component({
  selector: 'app-stock-trade',
  templateUrl: './stock-trade.component.html',
  styleUrls: ['./stock-trade.component.css'],
})
export class StockTradeComponent implements OnInit {
  @Input() symbol: string = '';
  @Input() amount: number = 3;

  sendForm = this.formBuilder.group({
    amount: 1,
  });

  date: any = undefined;

  constructor(
    private formBuilder: FormBuilder,
    private tradeApi: TradeApiService,
    public dialog: MatDialog
  ) {}

  buyStock() {
    this.tradeApi.tradeStock(
      'buy',
      this.symbol,
      this.sendForm.value.amount,
      this.date
    );
  }

  sellStock() {
    this.tradeApi.tradeStock(
      'sell',
      this.symbol,
      this.sendForm.value.amount,
      this.date
    );
  }
  cancelSchedule() {
    this.date = undefined;
  }
  onSubmit() {}

  openDatePicker() {
    const dialogRef = this.dialog.open(DatePickerComponent);
    dialogRef.afterClosed().subscribe((result) => {
      this.date = result.date || undefined;
    });
  }

  ngOnInit() {}
}
