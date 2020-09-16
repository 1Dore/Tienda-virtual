import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuPrincipalComponent } from './components/menu-principal/menu-principal.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ListadoProductosComponent } from './components/listado-productos/listado-productos.component';
import { MatMenuModule } from '@angular/material/menu';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { MatCardModule } from '@angular/material/card';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { AdminComponent } from './components/admin/admin.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EmisoresComponent } from './components/emisores/emisores.component';
import { CourierComponent } from './components/courier/courier.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { DireccionUsuarioComponent } from './components/direccion-usuario/direccion-usuario.component';
import { TarjetaUsuarioComponent } from './components/tarjeta-usuario/tarjeta-usuario.component';
import { AgregarProductosComponent } from './components/agregar-productos/agregar-productos.component';
import { ExistenciasComponent } from './components/existencias/existencias.component';
import { MatSelectModule } from '@angular/material/select';
import { PagoProductoComponent } from './components/pago-producto/pago-producto.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuPrincipalComponent,
    RegisterComponent,
    LoginComponent,
    ListadoProductosComponent,
    CheckoutComponent,
    AdminComponent,
    EmisoresComponent,
    CourierComponent,
    UserPageComponent,
    DireccionUsuarioComponent,
    TarjetaUsuarioComponent,
    AgregarProductosComponent,
    ExistenciasComponent,
    PagoProductoComponent,
    PedidosComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatDialogModule,
    MatCardModule,
    ReactiveFormsModule,
    MatMenuModule,
    HttpClientModule,
    MatListModule,
    MatDividerModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatSelectModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
