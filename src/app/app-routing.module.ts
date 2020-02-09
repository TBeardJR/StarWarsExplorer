import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {StarWarsDataComponent} from './star-wars-data/star-wars-data.component';

const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'people', component: StarWarsDataComponent},
  {path: 'people/:id', component: StarWarsDataComponent},
  {path: 'films', component: StarWarsDataComponent},
  {path: 'films/:id', component: StarWarsDataComponent},
  {path: 'planets', component: StarWarsDataComponent},
  {path: 'planets/:id', component: StarWarsDataComponent},
  {path: 'starships', component: StarWarsDataComponent},
  {path: 'starships/:id', component: StarWarsDataComponent},
  {path: 'vehicles', component: StarWarsDataComponent},
  {path: 'vehicles/:id', component: StarWarsDataComponent},
  {path: 'species', component: StarWarsDataComponent},
  {path: 'species/:id', component: StarWarsDataComponent},
  {path: '**', component: LandingPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
