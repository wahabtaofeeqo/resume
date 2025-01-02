import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms'
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ObserveDirective } from './observe.directive';
import { IndexComponent } from './pages/index/index.component';

@NgModule({ declarations: [
        AppComponent,
        HomeComponent,
        IndexComponent
    ],
    bootstrap: [AppComponent], 
    imports: [
        BrowserModule,
        AboutComponent,
        SkillsComponent,
        ObserveDirective,
        AppRoutingModule,
        ProjectsComponent,
        ReactiveFormsModule,
    ], 
    providers: [provideHttpClient(withInterceptorsFromDi())] 
})
export class AppModule { }
