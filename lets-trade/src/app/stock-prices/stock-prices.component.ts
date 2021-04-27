import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { isObjectLiteralExpression } from 'typescript';
import { StockApiService } from '../stock-api.service';

@Component({
  selector: 'app-stock-prices',
  templateUrl: './stock-prices.component.html',
  styleUrls: ['./stock-prices.component.css'],
})
export class StockPricesComponent implements OnInit {
  prices: number[] = [];
  stockList: string[] = [];
  companyList: string[] = [];

  constructor(private stockApi: StockApiService) {}

  listPrices() {
    console.log(this.prices);
  }

  ngOnInit(): void {
    let stocks: number[] = [];
    this.stockApi.getAllStock().forEach((element: any) => {
      element.subscribe({
        next: (data: any) => {
          this.prices.push(data.latestPrice);
          this.companyList.push(data.companyName);
          this.stockList.push(data.companyName + ': ' + data.latestPrice);
        },
      });
    });
  }
}
