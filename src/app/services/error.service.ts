import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';

@Injectable({
	providedIn: 'root'
})
export class ErrorsService
{
	alertActive = false;

	constructor(
		private toastController: ToastController,
		private alertController: AlertController,
		private navController: NavController
	) { }

	public handleError(error: any, errorType: 'toast' | 'log' | 'alert-ok' | 'alert-back' | 'alert-reload' | 'alert-logout' = 'toast'): void 
	{
		var statusCode = 0;
		var errorTitle = '';
		var errorMessage = '';
		// server-side error
		if (error instanceof HttpErrorResponse)
		{
			statusCode = error.status;

			if (error.error)
			{
				errorTitle = (error.error.title) ? error.error.title : '';
				errorMessage = (error.error.detail) ? ' ' + error.error.detail : '';

				if (error.error.errors)
				{
					console.error(error.error.errors);
				}
			}

		}
		else if (error.status)
		{
			statusCode = parseInt(error.status, 10);
		} if (!errorMessage)
		{
			if (error.Message)
			{
				errorMessage = error.Message;
			}
			if (error.detail)
			{
				errorMessage = error.detail;
			}
		}

		switch (statusCode)
		{
			case 404:
				errorTitle = errorTitle ? errorTitle : 'Not Found Error';
				errorMessage = (errorMessage) ? errorMessage : 'Resource not found';
				break;
			case 400:
			case 422:
				errorTitle = 'Validation Error';
				errorMessage = (errorMessage) ? errorMessage : 'There was a problem sending information to our systems.';
				break;
			case 401:
				errorTitle = errorTitle ? errorTitle : 'Login Error';
				break;
			case 403:
				errorTitle = errorTitle ? errorTitle : 'Security Error';
				break;
			case 500:
			default:
				errorTitle = errorTitle ? errorTitle : 'Internal Error';
				if (error.name === 'TimeoutError')
				{
					errorTitle = errorTitle ? errorTitle : 'Timeout Error';
					if (!errorMessage)
					{
						errorMessage = 'Unable to load information from our systems in a timely manner. There may be a problem with your internet connection, or with our systems.<br/><br/>If this error continues please contact our support team.';
					}
				}
				else if (error.name === 'HttpErrorResponse')
				{
					errorTitle = errorTitle ? errorTitle : 'Resource Error';
					if (!errorMessage)
					{
						errorMessage = 'Failed to connect to our systems. Please check your internet connection.<br/><br/>If this error continues please contact our support team.';
					}
				}
				break;
		}

		if (!navigator.onLine)
		{
			this.presentDeviceOfflineToast();
		}
		else if (errorType === 'toast')
		{
		}
		else if (!this.alertActive && errorType !== 'log')
		{
			this.alertActive = true;
			this.presentAlert(errorTitle, errorMessage, errorType);
		}

		console.error(error);
		switch (errorType)
		{
			case 'toast':

				this.presentToast(errorTitle + (errorTitle ? '<br/><br/>' : '') + errorMessage);

				break;
			case 'alert-ok':
			case 'alert-back':
			case 'alert-reload':
			case 'alert-logout':

				break;
			case 'log':
			default:
				console.log(error);
				break;
		}
	}
	public async presentToast(message: string, color: string = 'danger', duration: number = 5000, position: 'top' | 'middle' | 'bottom' = 'bottom')
	{
		const toast = await this.toastController.create({
			message,
			duration,
			position,
			animated: true,
			color,
			translucent: false,
			// buttons: [
			// 	{
			// 		text: 'X',
			// 		role: 'cancel',
			// 		handler: () =>
			// 		{
			// 			console.log('Close clicked');
			// 		}
			// 	}
			// ],
		});
		toast.present();
	}

	public async presentAlert(header: string, message: string, errorNotifyType: 'alert-ok' | 'alert-back' | 'alert-reload' | 'alert-logout', timeout = 300000)
	{
		const buttons = [];

		buttons.push({
			text: 'OK',
			role: 'cancel',
			cssClass: errorNotifyType === 'alert-ok' ? 'primary' : 'secondary',
			handler: () =>
			{
				this.alertActive = false;
			}
		});
		if (errorNotifyType === 'alert-back')
		{
			buttons.push({
				text: 'Go Back',
				role: '',
				cssClass: 'secondary',
				handler: () =>
				{
					this.alertActive = false;
					history.go(-1);
				}
			});
		}
		if (errorNotifyType === 'alert-logout')
		{
			buttons.push({
				text: 'Logout',
				role: '',
				cssClass: 'secondary',
				handler: () =>
				{
					this.navController.navigateRoot('/logout');
				}
			});
		}

		if (errorNotifyType === 'alert-reload')
		{
			buttons.push({
				text: 'Reload',
				role: '',
				cssClass: 'secondary',
				handler: () =>
				{
					this.alertActive = false;
					location.reload();
				}
			});
		}

		const alert = await this.alertController.create({
			header,
			message,
			buttons
		});

		await alert.present();

		setTimeout(() =>
		{
			alert.dismiss();
		}, timeout);
	}

	public presentDeviceOfflineToast()
	{
		const errorTitle = 'No Internet Connection';
		const errorMessage = 'Your device appears to be offline.<br/><br/>This app needs an internet connection in order to connect to our systems.';
		this.presentToast(errorTitle + (errorTitle ? '<br/><br/>' : '') + errorMessage, 'danger');
	}
}