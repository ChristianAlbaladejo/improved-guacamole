import { Component, ViewChild } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild('signatureCanvas', { static: true }) signaturePad: SignaturePad;

  public signaturePadOptions: Object = {
    'canvasWidth': 350,
    'canvasHeight': 300,
    'backgroundColor': 'white',
  };

  signature;
  products = [{}]
  isItemAvailable = false;
  items = [];
  product: any;
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  addRow() {
    this.products.push({})
  }

  onDelete(_event) {
    console.log(_event)
    this.products = this.products.filter((i: any) => i.id !== _event.id)
  }

  drawStart() {
    console.log('drawStart');
  }

  drawComplete() {
    this.signature = this.signaturePad.toDataURL("image/jpeg", 0.5)
  }

  async logout() {
    console.log("sdfsklsdf");
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  getItems(ev: any) {
    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      this.isItemAvailable = true;
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.isItemAvailable = false;
    }
  }

  obraSelected(selected: any): void {
   /*  this.products = selected.DESCRIPCION;
    this.obra_id = selected.OBRA
    this.isItemAvailable = false;
    this.http.get(environment.API + '/empresa/' + selected.EMPRESA).subscribe((response) => {
      this.empresa = response;
      this.empresa = JSON.parse(this.empresa)
      this.empresa = this.empresa[0]
    }); */
  }
}
