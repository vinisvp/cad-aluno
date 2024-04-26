import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Course } from '../course';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  courseFormGroup: FormGroup;
  isEditing: boolean = false;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private service: CourseService
  ){
    this.courseFormGroup = formBuilder.group({
      id:[''],
      name:['']
    });
  }

  loadCourses() {
    this.service.getCourses().subscribe({
      next: data => this.courses = data
    });
  }

  ngOnInit(): void {
    this.loadCourses();
  }

  save() {
    if (!this.isEditing) {
      this.service.postCourse(this.courseFormGroup.value).subscribe({
        next: () => {
          this.loadCourses();
          this.courseFormGroup.reset();
        }
      });
    }
    else {
      this.service.postCourse(this.courseFormGroup.value).subscribe({
        next: () => {
          this.loadCourses();
          this.courseFormGroup.reset();
          this.isEditing = false;
        }
      });
    }
  }

  update(course: Course) {
    this.isEditing = true;
    this.courseFormGroup.setValue(course);
  }

  delete(course: Course) {
    this.service.deleteCourse(course).subscribe({
      next: () => this.loadCourses()
    });
  }
}
