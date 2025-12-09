import { Component } from '@angular/core';
// import { Routes } from '@angular/router';
// import { CoursesPage } from './Pages/courses-page/courses-page';
// import { Library } from './Pages/library/library';
// import { Login } from './login/login';
// import { Layout1} from './layout1/layout1';

// export const routes: Routes = [
//   // Landing page → Login
//   { path: '', component: Login },

//   // Authenticated area
//   {
//     path: 'app',
//     component: Layout1,
//     children: [
//       { path: '', redirectTo: 'home', pathMatch: 'full' },
//       { path: 'home', component: CoursesPage },   // temporary home page
//       { path: 'courses', component: CoursesPage },
//       { path: 'library', component: Library },
//       { path: 'paths', component: Library },
//       { path: 'goals', component: Library },
//     ],
//   },

//   // Redirect unknown paths to login
//   { path: '**', redirectTo: '' },
// ];
 import { Routes } from '@angular/router';
import { CoursesPage } from './Pages/courses-page/courses-page';
import { Library } from './Pages/library/library';
import { Login } from './login/login';
import { Layout1 } from './layout1/layout1';
import { Register } from './register/register';
import { authGuard } from '../services/auth-guard';
import { Profile } from './Pages/profile/profile';
import { PROFILE_ROUTES } from './Pages/profile/profile.route';
import { Dashboard } from './Pages/dashboard 1/dashboard/dashboard';
import { Home } from './Pages/home/home';
import { Goal } from './Pages/goal/goal';

export const routes: Routes = [

  { path: '',component:Login},
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  // Authenticated area
  {
        path: 'app',
        component: Layout1,
        canActivate: [authGuard],
         children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: Home },   // temporary home page
      { path: 'courses', component: CoursesPage},
      { path: 'library', component: Library},
      { path: 'dashboard', component: Dashboard},
      { path: 'profile', children: PROFILE_ROUTES },
      {path: 'paths', component: Library},
      { path: 'goals', component: Goal},
    ],
  },
  { path: '**', redirectTo: '' },
];