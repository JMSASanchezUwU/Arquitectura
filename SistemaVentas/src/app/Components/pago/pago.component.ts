import { AfterViewInit, Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { StripeService } from 'src/app/Services/stripe.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements AfterViewInit {

  @ViewChild('cardInfo')
  cardInfo!: ElementRef;
  cardError: string = '';
  card: any;

  constructor(private ngZone: NgZone, // Error en la inyección de dependencia
  private stripeService: StripeService
  ) { }

  ngAfterViewInit(){
    this.card = elements.create('card');
    this.card.mount(this.cardInfo.nativeElement);
    this.card.addEventListener('change', this.onChange.bind(this));
  }

  onChange({ error }: { error: any }) {
    if (error) {
      this.ngZone.run(() => this.cardError = error.message);
    } else {
      this.cardError = '';
    }
  }
  
  

  async onClick(){
    const { token, error} = await stripe.createToken(this.card);
    if (token){
    const response = await this.stripeService.charge(100, token.id);
    console.log(response);
    }else {
      this.ngZone.run(()=> this.cardError = error.message)  
    }
  }
}
