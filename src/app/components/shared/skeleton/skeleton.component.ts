import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-skeleton',
    templateUrl: './skeleton.component.html',
    styleUrls: ['./skeleton.component.scss'],
    standalone: false
})
export class SkeletonComponent implements OnInit
{

	@Input() type!: 'list' | 'header' | 'cards';
	
	constructor() { }

	ngOnInit() { }

}
