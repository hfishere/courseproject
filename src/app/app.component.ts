import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent implements OnInit {
  title = 'courseproject';
  featureSelected: string;

  ngOnInit() {
    this.featureSelected = 'recipe';
  }

  onNavigate(feature: string) {
    this.featureSelected = feature;    
  }
}
