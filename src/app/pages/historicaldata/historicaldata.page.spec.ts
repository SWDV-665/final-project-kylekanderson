import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HistoricalDataPage } from './historicaldata.page';

describe('HistoricalDataPage', () => {
  let component: HistoricalDataPage;
  let fixture: ComponentFixture<HistoricalDataPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HistoricalDataPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HistoricalDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
