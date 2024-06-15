import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevolucionListComponent } from './devolucion-list.component';

describe('DevolucionListComponent', () => {
  let component: DevolucionListComponent;
  let fixture: ComponentFixture<DevolucionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevolucionListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DevolucionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
