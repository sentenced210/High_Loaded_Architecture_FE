import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {interval} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'simple-web-site';
  response; my_time; my_date: any;
  constructor(private elementRef: ElementRef, private http: HttpClient) {
  }


  ngOnInit(): void {
    this.get_colors();
    this.set_date();
    this.set_time();
    const myInterval = interval(5000);
    myInterval.subscribe(_ => {
      this.set_time();
      this.set_date();
    });

    }

  get_colors() {
    this.http.request('GET', 'http://localhost:8100/theme/colors')
      .subscribe((response) => {
        this.response = response;
        this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = this.response.background_color;
        this.elementRef.nativeElement.ownerDocument.body.style.color = this.response.font_color;

      });
  }

  set_time() {
    this.http.request('GET', 'http://localhost:8100/calendar/time')
      .subscribe((response) => {
        this.response = response;
        this.my_time = this.response.time;
      });
  }

  set_date() {
    this.http.request('GET', 'http://localhost:8100/calendar/date')
      .subscribe((response) => {
        this.response = response;
        this.my_date = this.response.date;
      });
  }


}
