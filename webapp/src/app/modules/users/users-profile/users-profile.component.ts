import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.css']
})
export class UsersProfileComponent implements OnInit {

  id: Observable<string>;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.paramMap.pipe(map(params => params.get('id')));
  }

}
