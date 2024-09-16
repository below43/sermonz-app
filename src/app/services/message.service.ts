import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService
{

  constructor() { }

  public activeTalk = new BehaviorSubject<string>('');
  
}
