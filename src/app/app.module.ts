import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms'
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './components/about/about.component';

@NgModule({ declarations: [
        AppComponent,
        HomeComponent,
    ],
    bootstrap: [AppComponent], 
    imports: [
        BrowserModule,
        AboutComponent,
        AppRoutingModule,
        ReactiveFormsModule
    ], 
    providers: [provideHttpClient(withInterceptorsFromDi())] 
})
export class AppModule { }
