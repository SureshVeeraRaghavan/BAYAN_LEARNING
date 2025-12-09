import { Component } from '@angular/core';
import { StatsCards } from './stats-cards/stats-cards'
import { LearningProgress } from './learning-progress/learning-progress';
import { RecentActivity } from './recent-activity/recent-activity';
import { WeeklyGoals } from './weekly-goal/weekly-goal';
import { Achievements } from './achievements/achievements';
import { AiInsights } from './ai-insights/ai-insights';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    LearningProgress,
    RecentActivity,
    WeeklyGoals,
    Achievements,
    AiInsights,
    StatsCards,
    StatsCards
],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {}
