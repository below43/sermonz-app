import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { EmbeddableWidgetComponent } from './embeddable-widget.component';

describe('EmbeddableWidgetComponent', () =>
{
	let component: EmbeddableWidgetComponent;
	let fixture: ComponentFixture<EmbeddableWidgetComponent>;

	beforeEach(waitForAsync(() =>
	{
		TestBed.configureTestingModule({
			declarations: [EmbeddableWidgetComponent],
			imports: [IonicModule.forRoot()]
		}).compileComponents();

		fixture = TestBed.createComponent(EmbeddableWidgetComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	}));

	it('should create', () =>
	{
		expect(component).toBeTruthy();
	});
});