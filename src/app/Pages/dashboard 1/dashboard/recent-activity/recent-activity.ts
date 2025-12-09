import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recent-activity',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recent-activity.html',
  styleUrl: './recent-activity.css'
})
export class RecentActivity {

  activities = [
    {
      title: "Python Programming Fundamentals",
      time: "2 hours ago",
      points: "+150pts",
      color: "#d4fbe3",
      iconColor: "#2ecc71",
      icon: "🎖️"
    },
    {
      title: "Machine Learning with Python",
      time: "1 day ago",
      points: "+120pts",
      color: "#e3edff",
      iconColor: "#4a6cff",
      icon: "📘"
    },
    {
      title: "React.js Complete Guide",
      time: "3 days ago",
      points: "+200pts",
      color: "#f5e1ff",
      iconColor: "#c04bff",
      icon: "🎯"
    }
  ];

}
