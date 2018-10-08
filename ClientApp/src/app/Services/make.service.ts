import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import 'rxjs/operators/map';


@Injectable({
  providedIn: 'root'
})
export class MakeService {

  constructor(private http: Http) { }

  getCase() {
    return this.http.get('/api/Case').map(res => res.json());
  }
  getCoolingfan() {
    return this.http.get('/api/CoolingFan').map(res => res.json());
  }
  getCPU() {
    return this.http.get('/api/CPU').map(res => res.json());
  }
  getGPU() {
    return this.http.get('/api/GPU').map(res => res.json());
  }
  getMotherboard() {
    return this.http.get('/api/Motherboard').map(res => res.json());
  }
  getPowersupply() {
    return this.http.get('/api/PowerSupply').map(res => res.json());
  }
  getRAM() {
    return this.http.get('/api/RAM').map(res => res.json());
  }
  getStorage() {
    return this.http.get('/api/Storage').map(res => res.json());
  }
  getOrder() {
    return this.http.get('/api/Order').map(res => res.json());
  }
  getAccount() {
    return this.http.get('/api/Account').map(res => res.json());
  }
  getAllSaleItem() {
    return this.http.get('/api/ItemForSale').map(res => res.json());
  }
  getSaleItem(itemId) {
    return this.http.get('/api/ItemForSale').map(res => res.json());
  }

  createCase(caseItem)
  {
    return this.http.post('/api/Case', caseItem).map(res=>res.json());
  }
  creatCoolingfan(coolingfan)
  {
    return this.http.post('/api/Coolingfan', coolingfan).map(res=>res.json());
  }
  createCPU(cpu)
  {
    return this.http.post('/api/CPU', cpu).map(res=>res.json());
  }
  createGPU(gpu)
  {
    return this.http.post('/api/GPU', gpu).map(res=>res.json());
  }
  createMotherboard(motherboard)
  {
    return this.http.post('/api/Motherboard', motherboard).map(res=>res.json());
  }
  createPowersupply(powersupply)
  {
    return this.http.post('/api/Powersupply', powersupply).map(res=>res.json());
  }
  createRAM(ram)
  {
    return this.http.post('/api/RAM', ram).map(res=>res.json());
  }
  createStorage(storage)
  {
    return this.http.post('/api/Storage', storage).map(res=>res.json());
  }
  createAccount(account)
  {
    return this.http.post('/api/Account', account);
  }
  createOrder(order)
  {
    return this.http.post('/api/Order', order);
  }
  createSaleItem(saleItem)
  {
    return this.http.post('/api/ItemForSale', saleItem);
  }
}
