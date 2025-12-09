import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-learninggoal',
  imports: [CommonModule],
  templateUrl: './learninggoal.html',
  styleUrl: './learninggoal.scss',
})
export class Learninggoal {
progress: number = 50;

learing=[
  {
     icon:"assets/information.png",
     title:"python"
  },
    {
     icon:"assets/information.png",
     title:"Statistics"
  },
    {
     icon:"assets/information.png",
     title:"Machine Learning"
  },
 
 
];

}
