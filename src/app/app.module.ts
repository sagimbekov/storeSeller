import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SellerService } from './services/seller.service';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AllComponent } from './main/all/all.component';
import { AddComponent } from './main/add/add.component';
import { OrdersComponent } from './main/orders/orders.component';
import { EditComponent } from './main/edit/edit.component';
import { TinymceModule } from 'angular4-tinymce-biznet';

const appRoutes: Routes = [
	{path: '', component: RegisterComponent},
	{path: 'login', component: LoginComponent},
	{path: 'register', component: RegisterComponent},
	{
		path: 'main', component: MainComponent,
		children: [
			{path: '', redirectTo: 'all', pathMatch: 'full'},
			{path: 'all', component: AllComponent},
			{path: 'add', component: AddComponent},
			{path: 'orders', component: OrdersComponent},
			{path: 'edit/:id', component: EditComponent},
		]
	},
	{path: '**', component: MainComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    OrdersComponent,
    LoginComponent,
    RegisterComponent,
    EditComponent,
    AllComponent,
    AddComponent
  	],
	imports: [
	    BrowserModule,
	    FormsModule,
	    ReactiveFormsModule,
	    HttpClientModule,
	    HttpModule,
	    TinymceModule.withConfig({
	    	language: 'ru'
	    }),
	    RouterModule.forRoot(
	      appRoutes,
	    ),
	  ],
  providers: [SellerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
