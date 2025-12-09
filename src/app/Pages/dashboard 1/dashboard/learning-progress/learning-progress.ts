import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-learning-progress',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './learning-progress.html',
  styleUrls: ['./learning-progress.css']
})
export class LearningProgress {

  progress = [
    { skill: 'Python', category: 'Programming', value: 85 },
    { skill: 'JavaScript', category: 'Programming', value: 78 },
    { skill: 'React', category: 'Frontend', value: 72 },
    { skill: 'Machine Learning', category: 'AI/ML', value: 45 },
    { skill: 'Data Analysis', category: 'Data Science', value: 60 }
  ];

}
