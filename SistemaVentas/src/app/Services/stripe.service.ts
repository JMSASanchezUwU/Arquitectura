import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StripeService {

  constructor(private http: HttpClient) { }

  charge(total: number, tokenId: string): Promise<any> {
    return this.http.post('http://localhost:4000/stripe_checkout', {
      stripeToken: tokenId,
      total: total
    }).toPromise();
  }
  

}
