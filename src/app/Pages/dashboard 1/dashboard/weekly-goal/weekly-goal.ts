import { Component } from '@angular/core';

@Component({
  selector: 'app-weekly-goals',
  standalone: true,
  templateUrl: './weekly-goal.html',
  styleUrls: ['./weekly-goal.css']
})
export class WeeklyGoals {

  weeklyGoal = 15;          // target hours
  completedHours = 8.5;     // user progress

  get progressPercent() {
    return Math.round((this.completedHours / this.weeklyGoal) * 100);
  }
}
