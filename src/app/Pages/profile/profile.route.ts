import { Routes } from '@angular/router';
import { Profile } from './profile';
import { Certificates } from './certificates/certificates';
import { Achievements } from './achievements/achievements';
import { Skills } from './skills/skills';
import { LearningActivity } from './learning-activity/learning-activity';

export const PROFILE_ROUTES: Routes = [
  {
    path: '',
    component: Profile,
    children: [
      { path: 'certificates', component: Certificates },
      { path: 'achievements', component: Achievements },
      { path: 'skills', component: Skills },
      { path: 'learning-activity', component: LearningActivity },

      { path: '', redirectTo: 'certificates', pathMatch: 'full' }
    ],
  }
];
