import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPageKbizNewComponent } from './product-page-kbiz-new.component';

describe('ProductPageKbizNewComponent', () => {
  let component: ProductPageKbizNewComponent;
  let fixture: ComponentFixture<ProductPageKbizNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductPageKbizNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPageKbizNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
