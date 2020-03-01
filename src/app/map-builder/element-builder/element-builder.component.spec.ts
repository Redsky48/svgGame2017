import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementBuilderComponent } from './element-builder.component';

describe('ElementBuilderComponent', () => {
  let component: ElementBuilderComponent;
  let fixture: ComponentFixture<ElementBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
