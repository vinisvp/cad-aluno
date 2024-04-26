import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from './course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  url = "http://localhost:3000/courses";

  constructor(private http: HttpClient) { }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.url);
  }

  postCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.url, course);
  }

  deleteCourse(course: Course): Observable<void> {
    return this.http.delete<void>(`${this.url}/${course.id}`);
  }

  putCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.url}/${course.id}`, course);
  }
}
