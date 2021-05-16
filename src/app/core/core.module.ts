// Anglar
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Layout Directives
// Services
import {
	ContentAnimateDirective,
	FirstLetterPipe,
	GetObjectPipe,
	HeaderDirective,
	JoinPipe,
	MenuDirective,
	OffcanvasDirective,
	SafePipe,
	ScrollTopDirective,
	SparklineChartDirective,
	StickyDirective,
	TabClickEventDirective,
	TimeElapsedPipe,
	ToggleDirective
} from './_base/layout';
import { InterceptService } from './_base/crud';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
	imports: [CommonModule],
	declarations: [
		// directives
		ScrollTopDirective,
		HeaderDirective,
		OffcanvasDirective,
		ToggleDirective,
		MenuDirective,
		TabClickEventDirective,
		SparklineChartDirective,
		ContentAnimateDirective,
		StickyDirective,
		// pipes
		TimeElapsedPipe,
		JoinPipe,
		GetObjectPipe,
		SafePipe,
		FirstLetterPipe,
	],
	exports: [
		// directives
		ScrollTopDirective,
		HeaderDirective,
		OffcanvasDirective,
		ToggleDirective,
		MenuDirective,
		TabClickEventDirective,
		SparklineChartDirective,
		ContentAnimateDirective,
		StickyDirective,
		// pipes
		TimeElapsedPipe,
		JoinPipe,
		GetObjectPipe,
		SafePipe,
		FirstLetterPipe,
	],
	providers: [
		InterceptService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: InterceptService,
			multi: true,
		},
	]
})
export class CoreModule {
}
