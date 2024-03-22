import { Component } from '@angular/core';
import { Student } from '../student';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.component.html',
  styleUrl: './aluno.component.css'
})
export class AlunoComponent {
  students: Student[] = [];
  studentFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder){
    this.studentFormGroup = formBuilder.group({
      id:[''],
      name:[''],
      course:['']
    });
  }

  save(){
    this.students.push(this.studentFormGroup.value);
  }
}
