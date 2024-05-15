import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CompanySpecificQuestionsComponent } from './company-specific-questions/company-specific-questions.component';
import { DSSelectionComponent } from './dsselection/dsselection.component';
import { AuthServiceService } from './services/auth-service.service';
import { PracticeOptionsComponent } from './practice-options/practice-options.component';

const routes: Routes = [
  {path:'' ,component: SignupComponent},
  {path: 'signup', component :SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate : [AuthServiceService]},
  {path: 'companySpecificQuestion/:title/:diffLevel/:company', component: CompanySpecificQuestionsComponent, canActivate : [AuthServiceService]},
  {path: 'dsselection/:company', component: DSSelectionComponent, canActivate : [AuthServiceService]},
  {path: 'practiceOptions', component: PracticeOptionsComponent, canActivate  :[AuthServiceService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
