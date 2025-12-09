// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class CourseService {

//   private storedCourseData: any = null;

//   saveCourseData(data: any) {
//     this.storedCourseData = data;
//     console.log("Course stored temporarily:", this.storedCourseData);
//   }

//   getCourseData() {
//     return this.storedCourseData;
//   }
// }
import { Injectable } from '@angular/core';
import { HttpService } from '../../../../services/api-service';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private API: HttpService) {}

  // POST course details to backend
  postCourseDetails(courseData: any) {
    return this.API.post('courses/uploa', courseData);
  }

  activateCourse(courseId: string) {
    return this.API.put(`courses/activate/${courseId}`, {});
  }
   rejectcourses(courseId: string) {
    return this.API.put(`courses/inactivate/${courseId}`, {});
  }

  getinactivecourses() {
    return this.API.get('courses/getinactivecourses');
  }

  getCoursesforUserId(userId: string|null) {
  return this.API.get(`courses/usercourses/${userId}`);
}
  saveCourseData(data: any) {
    localStorage.setItem('courseData', JSON.stringify(data));
  }
    getVideoBlob(fileName: string) {
  return this.API.get(
    'uploads/' + fileName,
    {
      responseType: 'blob',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }
  );
}

}
