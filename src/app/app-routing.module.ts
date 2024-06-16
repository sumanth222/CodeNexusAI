import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CompanySpecificQuestionsComponent } from './company-specific-questions/company-specific-questions.component';
import { DSSelectionComponent } from './dsselection/dsselection.component';
import { AuthServiceService } from './services/auth-service.service';
import { PracticeOptionsComponent } from './practice-options/practice-options.component';
import { SqlPracticeComponent } from './sql-practice/sql-practice.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { SqlTopicScreenComponent } from './sql-topic-screen/sql-topic-screen.component';
import { PremiumInfoComponent } from './premium-info/premium-info.component';
import { TosComponent } from './tos/tos.component';

const routes: Routes = [
  {path:'' ,component: SignupComponent},
  {path: 'signup', component :SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate : [AuthServiceService]},
  {path: 'companySpecificQuestion/:title/:diffLevel/:company/:timedMode', component: CompanySpecificQuestionsComponent, canActivate : [AuthServiceService]},
  {path: 'dsselection/:company', component: DSSelectionComponent, canActivate : [AuthServiceService]},
  {path: 'practiceOptions', component: PracticeOptionsComponent, canActivate  :[AuthServiceService]},
  {path: 'sqlPractice/:title/:diffLevel/:timedMode', component:SqlPracticeComponent, canActivate: [AuthServiceService]},
  {path: 'profilePage', component: ProfilePageComponent, canActivate: [AuthServiceService]},
  {path: 'sqlTopics', component: SqlTopicScreenComponent, canActivate: [AuthServiceService]},
  {path: 'premiumInformation', component: PremiumInfoComponent, canActivate: [AuthServiceService]},
  {path: 'tos', component: TosComponent, canActivate: [AuthServiceService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
