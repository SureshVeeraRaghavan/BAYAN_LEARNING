import { Component, Type, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CourseService } from './service/course-service';
import { Login } from '../../login/login';
import { Auth } from '../../auth';
import { HttpClient } from '@angular/common/http';

import { subscribe } from 'node:diagnostics_channel';
interface courses {
  courseIds: string;
  id: string;
  title: string;
  description: string;
  instructor: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  enrollments: number;
  secureVideo?: string;
  duration?: string;
  status:string;
  metadata?: {
    fileName: string;
    mimeType: string;
  }[];
}
const MOCK_COURSES: courses[] = [
  
];
@Component({
  selector: 'app-courses-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './courses-page.html',
  styleUrls: ['./courses-page.scss'],
})
export class CoursesPage implements OnInit {
  searchControl!: FormControl;
  categoryControl: FormControl | undefined;
  levelControl!: FormControl;
  ownerIds: string[] = [];
  categories: any = [];
  levels: any = [];
  courseIds: string[] = [];
  secureVideoUrl: string = '';

  activatedCourses: { [id: string]: boolean } = {};
  approvedisable: { [id: string]: boolean } = {};
  rejectdisable: { [id: string]: boolean } = {};
  rejectCourses: { [id: string]: boolean } = {};
  courseid: any = [];
  userCourses: any[] = [];
  activationMessage: string = '';
   RejectedMessage: string = '';
  duration: string = '';
  message: string = '';
  courses = MOCK_COURSES;
  currentUser: any = null;
  isLoggedIn: boolean = false;
  loading: boolean = false;
  approved:boolean=true;

  showToast = false;
  token: string | null = '';
  constructor(
    private courseService: CourseService,
    private authService: Auth,
    private API: HttpClient
  ) {}

  activeTab: number = 0;
  activeCourseTab: 'Course 1' | 'Course 2' | 'Course 3' = 'Course 1';
  showModal = false;
  activeModalTab: string = 'content';
  ownerId: '' | undefined;
  courseTitle = '';
  courseDesc = '';
  courseSkill = '';
  courseCategory = '';
  videoCount = 0;
  audioCount = 0;
  documentCount = 0;
  imageCount = 0;

  courseLevel = 'Beginner';
  courseLanguage = 'English';
  userid: string | null = null;
  role: string | null = null;
  status:string|null=null;
  courseDuration = '';
  courseThumbnail: File | null = null;
  selectedFile: File[] = [];
  selectTab(index: number) {
    this.activeTab = index;
    this.activeModalTab = 'metadata';
  }

  ngOnInit(): void {
    this.role = this.authService.getrole()?.replace(/"/g, '') || null;
    this.userid = this.authService.getUserId();
    console.log('Role exact value:', this.role, 'length:', this.role?.length);

    if (this.role && this.userid) {
      this.checkRole(this.role);
    } else {
      console.warn('No role found. User may not be logged in.');
    }
  }

  checkRole(role: string): void {
    //  const token=localStorage.getItem(this.authService.getToken)
    const token = this.authService.getToken();
    console.log('token' + token);
    console.log('hhhhhhhhh');
    // console.log(this.authService.getAuthHeaders)
    if (role === 'TEACHER') {
      this.API.get(`http://localhost:8080/courses/coursesbyuserid/${this.userid}` ,{ headers: this.authService.getAuthHeaders() }  
      ).subscribe({
        next: (response: any) => {
          this.courses = response.data;
          console.log(response.data);
          if (response?.data?.length > 0) {
            response.data.forEach((obj: any) => {
              obj.duration = obj.durationMinutes + ' min';
              this.status=obj.status;
             
              if (Array.isArray(obj.skills)) {
                this.categories.push(...obj.skills);
              }

              if (Array.isArray(obj.tags)) {
                this.levels.push(...obj.tags);
              }
              const metadata = obj.metadata;
              if (Array.isArray(metadata) && metadata.length > 0) {
                console.log('File Name:', metadata[0].fileName);
                console.log("status"+this.status)
                const fileName = metadata[0].fileName;
                obj.secureVideo = `http://localhost:8080/uploads/${fileName}`;    
              }
            });
          }

          console.log('Courses:', this.courses + 'success');
        },
        error: (err) => {
          console.error('API error:', err);
        },
      });
      this.courseService.getCoursesforUserId(this.userid).subscribe({
        next: (response: any) => {
          console.log(response.data + 'fidnthe usercourses');
          if (response?.data?.length > 0) {
            response.data.forEach((obj: any) => {
              this.userCourses = response.data;
            });
          }
        },

        error: (err) => {
          console.error('API error:', err);
        },
      });
    } else if (role === 'ADMIN') {
      this.courseService.getinactivecourses().subscribe({
        next: (response: any) => {
          this.courses = response.data;
          if (response?.data?.length > 0) {
            response.data.forEach((obj: any) => {
              obj.duration = obj.durationMinutes + ' min';
              console.log(obj.id + 'i am getting the id succesfully');

              response.data.forEach((obj: any) => {
                if (obj.id) {
                  this.courseIds.push(obj.id);
                  console.log('Stored ID:', obj.id);
                }
              });

              if (Array.isArray(obj.skills)) {
                this.categories.push(...obj.skills);
              }
              if (Array.isArray(obj.tags)) {
                this.levels.push(...obj.tags);
              }
              const metadata = obj.metadata;
              console.log('a', metadata);
              if (Array.isArray(metadata) && metadata.length > 0) {
                console.log('File Name:', metadata[0].fileName);
                  const fileName = metadata[0].fileName;
                obj.secureVideo = `http://localhost:8080/uploads/${fileName}?${token}`;
                obj.duration = metadata[0].durationMinutes + ' min';
                
              }

              // if (obj.durationMinutes) {
              //   this.duration = obj.durationMinutes;
              //   console.log('Duration (minutes):', obj.durationMinutes);
              // }
            });
          }
          console.log(this.categories);
          console.log('Courses:', this.courses);
        },
        error: (err) => {
          console.error('API error:', err);
        },
      });
    }
  }
  idKey(idKey: any) {
    throw new Error('Method not implemented.');
  }
  activatecourse(courseIds: string) {
    console.log('activatecourse course with ownerId:', courseIds);
    this.courseService.activateCourse(courseIds).subscribe({
      next: (res: any) => {
        console.log('Course activated successfully', res);
        if (res.status === 200) {
          this.activationMessage = 'Course activated!';
          
           this.rejectdisable[courseIds]=true;
          this.activatedCourses[courseIds] = true;
        }
      },
      error: (err) => console.error(err),
    });
  }
  rejectthe(courseIds: string) {
    console.log('activatecourse course with ownerId:', courseIds);
    this.courseService.rejectcourses(courseIds).subscribe({
      next: (res: any) => {
        console.log('Course activated successfully', res);
        if (res.status === 200) {
          this.RejectedMessage = 'Course Rejected!';
        
            this.approvedisable[courseIds]=true;
          this.rejectCourses[courseIds] = true;
        }
      },
      error: (err) => console.error(err),
    });
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
        preview: URL.createObjectURL(files[i]),
      });
      this.selectedFile.push(files[i]);
    }

    this.updateFileCounts();
    console.log('Selected Files:', this.selectedFile);
    console.log('role suces' + this.role);
  }

  submitForReview() {
    this.loading = true;
    this.userid = this.authService.getUserId();
    const metadata = {
      title: this.courseTitle,
      description: this.courseDesc,
      skill: this.courseSkill,
      category: this.courseCategory,
      level: this.courseLevel,
      language: this.courseLanguage,
      duration: 320,
      thumbnail: this.courseThumbnail ? this.courseThumbnail.name : null,
    };

    const formData = new FormData();

    const course = {
      title: this.courseTitle,
      description: this.courseDesc,
      level: this.courseLevel,
      category: this.courseCategory,
      skills: [this.courseSkill],
      status: 'inactive',
      language: this.courseLanguage,
      ownerId: this.userid,
    };
    formData.append('course', JSON.stringify(course));
    this.selectedFile.forEach((file) => {
      formData.append('file', file);
    });
    console.log('SENDING BODY:', formData);
    this.courseService.postCourseDetails(formData).subscribe({
      next: (res) => {
        this.loading = false;
        this.checkRole(this.role!);

        this.showToast = true;
        this.resetForm();
        setTimeout(() => {
          this.showToast = false;
        }, 5000);
        this.showModal = false;
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
        alert('Failed to submit course!');
      },
    });
  }
  updateFileCounts() {
    this.videoCount = this.selectedFiles.filter((f) => f.type.startsWith('video')).length;

    this.audioCount = this.selectedFiles.filter((f) => f.type.startsWith('audio')).length;
    this.imageCount = this.selectedFiles.filter((f) => f.type.startsWith('image/')).length;
    this.documentCount = this.selectedFiles.filter(
      (f) =>
        f.type === 'application/pdf' ||
        f.type.includes('word') ||
        f.type.includes('document') ||
        f.name.endsWith('.doc') ||
        f.name.endsWith('.docx') ||
        f.name.toLowerCase().endsWith('.pdf')
    ).length;
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

    console.log('Selected Files:', this.selectedFiles);
  }
  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer?.files;

    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        this.addFile(files[i]);
      }
    }
  }
  addFile(file: File) {
    const preview = URL.createObjectURL(file);

    this.selectedFiles.push({
      name: file.name,
      type: file.type,
      size: file.size,
      preview: preview,
    });
  }

  removeFile(index: number) {
    this.selectedFiles.splice(index, 1);
    this.updateFileCounts();
  }
  removeAllFiles() {
    this.selectedFiles = [];
    this.updateFileCounts();
  }
  //api for get daata by userid
}
