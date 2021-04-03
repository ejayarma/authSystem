import { Component, Injector, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  title = 'authSystem';
  auth = this.injector.get(AuthService);

  constructor(private injector: Injector) { }

  ngOnInit(): void {
  }
  
}
