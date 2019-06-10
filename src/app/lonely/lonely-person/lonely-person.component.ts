import { Component, OnInit, Input } from '@angular/core';
import { Profile } from 'src/app/shared/models/profile';

@Component({
  selector: 'app-lonely-person',
  templateUrl: './lonely-person.component.html',
  styleUrls: ['./lonely-person.component.scss']
})
export class LonelyPersonComponent implements OnInit {

  @Input()
  profile: Profile;

  constructor() { }

  ngOnInit() {
  }

}
