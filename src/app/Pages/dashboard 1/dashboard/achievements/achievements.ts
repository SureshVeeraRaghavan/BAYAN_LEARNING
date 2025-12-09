import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-achievements',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './achievements.html',
  styleUrls: ['./achievements.css']
})
export class Achievements {

  achievements = [
    { title: "Python Master", date: "2 days ago" },
    { title: "Fast Learner", date: "1 week ago" },
    { title: "React Developer", date: "2 weeks ago" }
  ];

}

