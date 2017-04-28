import { ActivatedRoute } from '@angular/router';
import { MicroControllerService } from '../../../services/micro-controller.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-nodemcu',
  templateUrl: './nodemcu.component.html',
  styleUrls: ['./nodemcu.component.css']
})
export class NodemcuComponent implements OnInit, OnDestroy {

  nodemcu: any;
  nodemcuId: string;
  private sub: any;

  constructor(
    private microControllerService: MicroControllerService,
    private route: ActivatedRoute
  ) {

    this.sub = this.route.params.subscribe((params) => {
      this.nodemcuId = params['id'];
    });

  }

  ngOnInit() {

    this.microControllerService.listenMicrocontrollerInformations(this.nodemcuId).subscribe((nodeInfo) => {
      this.nodemcu = nodeInfo;      
    });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
