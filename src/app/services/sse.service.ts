import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { data } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class SseService {
  
  private subscriptionUrl = '/api/subscription';
  private notificationUrl = '/api/notification/';

  constructor(private http: HttpClient, private zone: NgZone) { }

  getEventSource(): Observable<MessageEvent> {
      
    return new Observable(observer => {
      const eventSource = this.generateEventSource(this.subscriptionUrl);
  
      eventSource.addEventListener('Max', event => {
        this.zone.run(() => {
          observer.next(event);
        });
      });

  
        eventSource.onerror = error => {
          this.zone.run(() => {
            observer.error(error);
          });
        };
  
        return () => {
          eventSource.close();
        };
      });
    }
  
    private generateEventSource(url: string): EventSource {
      return new EventSource(url);
    }
}
