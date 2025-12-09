import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, Form, FormsModule } from '@angular/forms';
import { HttpService } from '../../../services/api-service';

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  enrollments: number;
  duration?: string;
  metadata?: {
    fileName: string;
    mimeType: string;
  }[];
}

const MOCK_COURSES: Course[] = [
 
];



@Component({
  selector: 'app-library-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './library.html',
})
export class Library implements OnInit {
  searchControl!: FormControl;
  categoryControl: FormControl;
  levelControl!: FormControl;
  viewMode: 'grid' | 'list' = 'grid';
  categories: any = [];
  levels: any = [];
  selectedCategories: string = '';
  selectedLevel: string = '';
  duration: string = '';
  courses = MOCK_COURSES;
  metadata?: {
    fileName: string;
    mimeType: string;
  }[];
  constructor(private API: HttpService) {
    this.categoryControl = new FormControl('');
    this.levelControl = new FormControl('all');
    this.searchControl = new FormControl('all');
  }

  get filteredCourses(): Course[] {
    return this.courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(this.searchControl.value?.toLowerCase() || '') ||
        course.instructor.toLowerCase().includes(this.searchControl.value?.toLowerCase() || '');
      const matchesCategory =
        this.categoryControl.value === 'all' || course.category === this.categoryControl.value;
      const matchesLevel =
        this.levelControl.value === 'all' || course.level === this.levelControl.value;

      return matchesSearch && matchesCategory && matchesLevel;
    });
  }

  ngOnInit(): void {
    this.API.get('courses/getactivecourses').subscribe({
      next: (response: any) => {
        this.courses = response.data;
        if (response?.data?.length > 0) {
          response.data.forEach((obj: any) => {
            obj.duration = obj.durationMinutes + ' min';

            if (Array.isArray(obj.skills)) {
              this.categories.push(...obj.skills);
            }
            if (Array.isArray(obj.tags)) {
              this.levels.push(...obj.tags);
            }
            const metadata = obj.metadata;

            if (Array.isArray(metadata) && metadata.length > 0) {
              console.log('File Name:', metadata[0].fileName);
              obj.duration=metadata[0].durationMinutes+' min';

            }

          
            //duration
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
