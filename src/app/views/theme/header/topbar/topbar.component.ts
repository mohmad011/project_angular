// Angular
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
	selector: 'kt-topbar',
	templateUrl: './topbar.component.html',
	styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit, OnDestroy {
	notificationSound = true;
	socket: any;
	audio = new Audio();
	audioSoundLink: string;
	constructor() {
	}



	ngOnInit() {



	}

	ngOnDestroy(): void {
		this.socket.disconnect();
	}
}
