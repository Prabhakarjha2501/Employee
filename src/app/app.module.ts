import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeService } from './commonservice/employee.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RateLimitingInterceptor } from './commonservice/ratelimitinginterceptor';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule

  ],
  providers: [EmployeeService,
    { provide:HTTP_INTERCEPTORS, useClass: RateLimitingInterceptor, multi: true }
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
