import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnemyBuilderComponent } from './enemy-builder.component';

describe('EnemyBuilderComponent', () => {
  let component: EnemyBuilderComponent;
  let fixture: ComponentFixture<EnemyBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnemyBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnemyBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
