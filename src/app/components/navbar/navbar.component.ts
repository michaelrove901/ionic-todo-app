import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { homeOutline, listOutline, layersOutline } from 'ionicons/icons';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [IonicModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  homeOutline = homeOutline;
  listOutline = listOutline;
  layersOutline = layersOutline;
}
