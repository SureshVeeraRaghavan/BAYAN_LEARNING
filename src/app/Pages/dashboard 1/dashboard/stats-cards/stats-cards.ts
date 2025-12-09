import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stats-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats-cards.html',
  styleUrl: './stats-cards.css'
})
export class StatsCards {

  stats = [
    {
      title: "Hours Learned",
      value: "127h",
      change: "+12%",
      subtitle: "from last month",
      icon: "⏱️"
    },
    {
      title: "Courses Completed",
      value: "23",
      change: "+3",
      subtitle: "from last month",
      icon: "📚"
    },
    {
      title: "Certificates Earned",
      value: "8",
      change: "+2",
      subtitle: "from last month",
      icon: "🎖️"
    },
    {
      title: "Skill Points",
      value: "1,247",
      change: "+89",
      subtitle: "from last month",
      icon: "🎯"
    }
  ];

}
