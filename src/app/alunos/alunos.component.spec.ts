import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunosComponent } from './alunos.component';

describe('AlunoComponent', () => {
  let component: AlunosComponent;
  let fixture: ComponentFixture<AlunosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlunosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlunosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
