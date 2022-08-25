import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { SubjectComponent } from './subject/subject.component';

const routes: Routes = [
  {path: 'search', component: SearchComponent},
  {path: 'subject', component: SubjectComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
