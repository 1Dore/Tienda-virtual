import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './service/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Front-end';
  email: string;
  password: string;
  constructor(private router: Router, public auth: AuthService, public dialog: MatDialog) {

  }
  irA(ruta: string) {
    this.router.navigateByUrl(ruta);
  }

  logout() {
    this.auth.logout();
  }
  userDisplayName = '';

  ngOnInit() {
    this.userDisplayName = localStorage.getItem('loggedUser');
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '500px',
      data: { name: this.email, animal: this.password }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.email = result;
    });
  }
}
