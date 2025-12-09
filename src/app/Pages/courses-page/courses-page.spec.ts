import { Component, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CourseService } from './service/course-service';
@Component({
  selector: 'app-courses-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './courses-page.html',
  styleUrls: ['./courses-page.scss'],
})
export class CoursesPage {

  constructor(private courseService: CourseService ) {}

  activeTab: number = 0;
  activeCourseTab: 'Course 1' | 'Course 2' | 'Course 3' = 'Course 1';
showModal = false;


 activeModalTab: string = 'content';
  courseTitle = '';
  courseDesc = '';
  courseSkill = '';
  courseCategory = '';
  courseLevel = 'Beginner';
  courseLanguage = 'English';
  courseDuration = '';
  courseThumbnail: File | null = null;
  selectedFile: File[] = []; 
  selectTab(index: number) {
    this.activeTab = index;
    this.activeModalTab = 'metadata';
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  handleThumbnail(event: any) {
    const file = event.target.files[0];
    this.courseThumbnail = file;
  }
  onFileSelected(event: any) {
    
    const files: FileList = event.target.files;

    this.selectedFile = [];

    for (let i = 0; i < files.length; i++) {
      this.selectedFiles.push({
      name: files[i].name,
      type: files[i].type,
      size: files[i].size,
      preview: URL.createObjectURL(files[i])
    });
      this.selectedFile.push(files[i]);
    }
 
    console.log("Selected Files:", this.selectedFile);
  }
  // -------------------------------------
  // SUBMIT COURSE DETAILS TO BACKEND
  // -------------------------------------
  submitForReview() {

    const metadata = {
      title: this.courseTitle,
      description: this.courseDesc,
      skill: this.courseSkill,
      category: this.courseCategory,
      level: this.courseLevel,
      language: this.courseLanguage,
      duration: this.courseDuration,
      thumbnail: this.courseThumbnail ? this.courseThumbnail.name : null
    };
   
      const formData = new FormData();

     const course = {
  title: this.courseTitle,
  description:this.courseDesc,
  level:this.courseLevel,
  category:this.courseCategory,
  skills: [this.courseSkill],
  status: "Active",
  language: this.courseLanguage
};
formData.append('course', JSON.stringify(course));
  this.selectedFile.forEach((file) => {
      formData.append('file', file);
    }); 
    console.log("SENDING BODY:", formData);

    this.courseService.postCourseDetails(formData).subscribe({
      next: (res) => {
        
        alert("Course submitted successfully!");
        // this.resetForm();
        this.showModal = false;
      },
      error: (err) => {
        console.error(err);
        alert("Failed to submit course!");
      }
    });
  }

  resetForm() {
    this.courseTitle = '';
    this.courseDesc = '';
    this.courseSkill = '';
    this.courseCategory = '';
    this.courseLevel = 'Beginner';
    this.courseLanguage = 'English';
    this.courseDuration = '';
    this.courseThumbnail = null;
  }

selectedFiles: any[] = [];
onFilesSelected(event: any) {
  const files: FileList = event.target.files;

  for (let i = 0; i < files.length; i++) {
    this.addFile(files[i]);
  }

  console.log("Selected Files:", this.selectedFiles);
}
onDragOver(event: DragEvent) {
  event.preventDefault();
}

// Drop handler
onDrop(event: DragEvent) {
  event.preventDefault();
  const files = event.dataTransfer?.files;

  if (files && files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      this.addFile(files[i]);
    }
  }
}

// Add file into selectedFiles array
addFile(file: File) {
  const preview = URL.createObjectURL(file);

  this.selectedFiles.push({
    name: file.name,
    type: file.type,
    size: file.size,
    preview: preview
  });
}

// Remove a single file
removeFile(index: number) {
  this.selectedFiles.splice(index, 1);
}

removeAllFiles() {
  this.selectedFiles = [];
}
}
