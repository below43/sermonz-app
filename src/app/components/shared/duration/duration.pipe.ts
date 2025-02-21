import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'duration',
    standalone: false
})
export class DurationPipe implements PipeTransform
{

	transform(input: string): string
	{
        // Check if value is in hh:mm:ss format
        if (typeof input === 'string' && /^\d{2}:\d{2}:\d{2}$/.test(input))
        {
            return input;
        }

		const value = parseInt(input, 10);

		if (!value)
		{
			return '00:00:00';
		}

		const hours = Math.floor(value / 3600);
		const minutes = Math.floor((value % 3600) / 60);
		const seconds = value % 60;

		const hoursString = hours < 10 ? '0' + hours : hours;
		const minutesString = minutes < 10 ? '0' + minutes : minutes;
		const secondsString = seconds < 10 ? '0' + seconds : seconds;

		return `${hoursString}:${minutesString}:${secondsString}`;
	}
}