import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../sidebar-component/sidebar-component";

@Component({
  selector: 'app-layout-component',
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './layout-component.html',
  styleUrl: './layout-component.scss',
})
export class LayoutComponent {}
