import 'reflect-metadata';
import 'zone.js';
import 'bootstrap/dist/css/bootstrap.css'
import './index.scss';

import {bootstrap} from '@angular/platform-browser-dynamic';


import {provideRouter} from '@angular/router';
import {enableProdMode} from '@angular/core';
// import {routes, RootComponent} from './routes';
import {MainViewComponent} from './components/main-view.component';


if (process.env.NODE_ENV === 'production') {
  enableProdMode();
}

// const routes = [
//   {
//     path: '',
//     component: MainViewComponent
//   }
// ]

bootstrap(MainViewComponent, [
  // provideRouter(routes)
])