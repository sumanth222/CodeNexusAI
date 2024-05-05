import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CompanySpecificQuestionsComponent } from './company-specific-questions/company-specific-questions.component';
import { DSSelectionComponent } from './dsselection/dsselection.component';

const routes: Routes = [
  {path:'' ,component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'companySpecificQuestion/:title/:diffLevel', component: CompanySpecificQuestionsComponent},
  {path: 'dsselection', component: DSSelectionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
