import { CourseService } from './../course.service';
import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../student.service';
import { Course } from '../course';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];
  courses: Course[] = [];
  studentFormGroup: FormGroup;
  isEditing: boolean = false;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private service: StudentService,
              private courseService: CourseService
    ){
    this.studentFormGroup = formBuilder.group({
      id:[''],
      name:['', [Validators.minLength(3), Validators.required]],
      active:['true'],
      period:['', [Validators.required]],
      course:['', [Validators.required]]
    });
  }

  loadStudents(){
    this.service.getStudents().subscribe({
      next: data => this.students = data
    });
  }

  loadCourses(){
    this.courseService.getCourses().subscribe({
      next: data => this.courses = data
    });
  }

  ngOnInit(): void {
    this.loadStudents();
    this.loadCourses();
  }

  compareCourses(course1: Course, course2: Course): boolean {
    return course1 && course2 ? course1.id === course2.id : course1 === course2;
  }

  save(){
    this.submitted = true;
    if(this.studentFormGroup.valid)
    {
      if(!this.isEditing)
      {
        this.service.postStudent(this.studentFormGroup.value).subscribe({
          next: data => {
            this.students.push(data);
            this.studentFormGroup.reset();
            this.submitted = false;
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
            this.submitted = false;
          }
        })
      }
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

  get name(): any {
    return this.studentFormGroup.get('name');
  }

  get course(): any {
    return this.studentFormGroup.get('course');
  }

  get period(): any{
    return this.studentFormGroup.get('period')
  }
}
