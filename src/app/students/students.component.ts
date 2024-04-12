import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];
  studentFormGroup: FormGroup;
  isEditing: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private service: StudentService
    ){
    this.studentFormGroup = formBuilder.group({
      id:[''],
      name:[''],
      course:['']
    });
  }

  loadStudents(){
    this.service.getStudents().subscribe({
      next: data => this.students = data
    });
  }

  ngOnInit(): void {
    this.loadStudents();
  }

  save(){
    if(!this.isEditing)
    {
      this.service.postStudent(this.studentFormGroup.value).subscribe({
        next: data => {
          this.students.push(data);
          this.studentFormGroup.reset();
        }
      })
    }
    else
    {
      this.service.putStudent(this.studentFormGroup.value).subscribe({
        next: () => {
          this.loadStudents();
          this.studentFormGroup.reset();
          this.isEditing = false;
        }
      })
    }
  }

  delete(student: Student){
    this.service.deleteStudent(student).subscribe({
      next: () => this.loadStudents()
    })
  }

  update(student: Student){
    this.isEditing = true;
    this.studentFormGroup.setValue(student);
  }
}
