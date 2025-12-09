import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Learninggoal } from './learninggoal/learninggoal';
import { Aigoalinsights } from './aigoalinsights/aigoalinsights';
import { Populargoal } from './populargoal/populargoal';

@Component({
  selector: 'app-goal',
  imports: [CommonModule,Learninggoal,Aigoalinsights,Populargoal],
  templateUrl: './goal.html',
  styleUrl: './goal.scss',
})
export class Goal {

data = [
  {
    title: "Active Goals",
    icon: "assets/trend.png",
    total: "3",
    learningTime: "0 paused",
  },
  {
    title: "Average Progress",
    icon: "Courses",
    total: "47%",
    learningTime: "Across all goals",
  }
  ,
   {
    title: "Skills Acquired",
    icon: "Courses",
    total: "47%",
    learningTime: "Total skill mastered",
  }
 
];
}