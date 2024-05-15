import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudiantePageComponent } from './estudiante-page.component';

describe('EstudiantePageComponent', () => {
  let component: EstudiantePageComponent;
  let fixture: ComponentFixture<EstudiantePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstudiantePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstudiantePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
