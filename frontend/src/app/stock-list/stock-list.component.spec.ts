import { MockLogger } from './../mock-logger';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { StockService } from './../services/stock.service';
import { Stock } from './../models/stock';
import { HttpModule } from '@angular/http';
import { Logger } from 'angular2-logger/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockListComponent } from './stock-list.component';

const fakeStocks = [
  new Stock(1, 'US0378331005', 'AAPL', 'Apple', new Date('2016-11-25T21:50:05.000+0100')),
  new Stock(2, 'US02079K3059', 'GOOGL', 'Google', new Date('2016-11-25T21:50:05.000+0100')),
  new Stock(3, 'US5949181045', 'MSŒFT', 'Microsoft', new Date('2016-11-25T21:50:05.000+0100'))
];

class MockStockService {
  public getAllStocks(): Observable<Stock[]> {
    return Observable.of(fakeStocks);
  }
}

describe('StockListComponent', () => {
  let component: StockListComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StockListComponent],
      providers: [
        { provide: Logger, useClass: MockLogger },
      ],
      imports: [HttpModule, RouterModule, RouterTestingModule]
    });

    TestBed.overrideComponent(StockListComponent, {
      set: {
        providers: [{ provide: StockService, useClass: MockStockService }]
      }
    });

    const fixture: ComponentFixture<StockListComponent> = TestBed.createComponent(StockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have a defined component', () => {
    expect(component).toBeDefined();
  });

  it('should init stocks', () => {
    component.initStocks();
    expect(component.stocks).toEqual(fakeStocks);
  });

  it('should add new stock', () => {
    let stock: Stock = new Stock(4, 'FR1234567890', 'NEW', 'new', new Date('2016-11-26T21:50:05.000+0100'));
    let expectedStocks = fakeStocks;
    expectedStocks.push(stock);

    expect(component.stocks).toEqual(fakeStocks);
    component.addStock(stock);
    expect(component.stocks).toEqual(expectedStocks);
  });

});
