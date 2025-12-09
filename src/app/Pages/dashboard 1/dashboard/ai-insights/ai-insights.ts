import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ai-insights',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ai-insights.html',
  styleUrls: ['./ai-insights.css']
})
export class AiInsights {

  heading = "AI Learning Insights";

  recommendations = [
    { icon: "📈", text: "Focus on advanced Python concepts to reach expert level" },
    { icon: "⚙️", text: "Consider learning Docker for DevOps skills" },
    { icon: "👥", text: "Join the React study group for peer learning" }
  ];

  patterns = [
    "Most productive learning time: 9-11 AM",
    "Preferred learning style: Video + Practice",
    "Best retention: 15-20 minute sessions"
  ];
}
