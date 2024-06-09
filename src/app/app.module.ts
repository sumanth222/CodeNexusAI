import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {APP_BASE_HREF} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CompanySpecificQuestionsComponent } from './company-specific-questions/company-specific-questions.component';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CodeEditorComponent } from './code-editor/code-editor.component';
import { VerdictResponseDialogExampleComponent } from './verdict-response-dialog-example/verdict-response-dialog-example.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DSSelectionComponent } from './dsselection/dsselection.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { CodeEditorModule } from '@ngstack/code-editor';
import {MatRadioModule} from '@angular/material/radio';
import { AngularFireModule } from '@angular/fire/compat';
import { firebaseConfig } from './environment';
import { UserContextService } from './userContext/user-context.service';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { PracticeOptionsComponent } from './practice-options/practice-options.component';
import { SqlPracticeComponent } from './sql-practice/sql-practice.component';
import { DataService } from './services/data-service.service';
import {MatMenuModule} from '@angular/material/menu';
import { ProfilePageComponent } from './profile-page/profile-page.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    CompanySpecificQuestionsComponent,
    CodeEditorComponent,
    VerdictResponseDialogExampleComponent,
    DSSelectionComponent,
    PracticeOptionsComponent,
    SqlPracticeComponent,
    ProfilePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    CodeEditorModule.forRoot(),
    MatDialogModule,
    MatGridListModule,
    MatRadioModule,
    AngularFireModule.initializeApp(firebaseConfig),
    MatToolbarModule,
    MatProgressBarModule,
    MatMenuModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}, UserContextService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
