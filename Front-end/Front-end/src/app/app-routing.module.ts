import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuPrincipalComponent } from './components/menu-principal/menu-principal.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ListadoProductosComponent } from './components/listado-productos/listado-productos.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

const routes: Routes = [
  { path: '', component: MenuPrincipalComponent },
  { path: 'menu-principal', component: MenuPrincipalComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'listado-productos', component: ListadoProductosComponent },
  { path: 'checkout', component: CheckoutComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
