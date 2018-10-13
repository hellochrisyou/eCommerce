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
  createCoolingfan(coolingfan)
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
  createUser(user)
  {
    return this.http.post('/api/Account', user);
  }  

  //added
  updateAccount(account)
  {
    return this.http.put('/api/Account/' + account.id, account).map(res => res.json());
  }
  updateCPU(cpu)
  {
    return this.http.put('/api/CPU/' + cpu.id, cpu).map(res => res.json());
  }
  updateCase(caseItem)
  {
    return this.http.put('/api/Case/' + caseItem.id, caseItem).map(res => res.json());
  }
  updateCoolingFan(coolingFan)
  {
    return this.http.put('/api/CoolingFan/' + coolingFan.id, coolingFan).map(res => res.json());
  }
  updatePowerSupply(powerSupply)
  {
    return this.http.put('/api/PowerSupply/' + powerSupply.id, powerSupply).map(res => res.json());
  }
  updateGPU(gpu)
  {
    return this.http.put('/api/GPU/' + gpu.id, gpu).map(res => res.json());
  }
  updateMotherboard(motherboard)
  {
    return this.http.put('/api/Motherboard/' + motherboard.id, motherboard).map(res => res.json());
  }
  updateRAM(ram)
  {
    return this.http.put('/api/RAM/' + ram.id, ram).map(res => res.json());
  }
  updateStorage(storage)
  {
    return this.http.put('/api/Storage/' + storage.id, storage).map(res => res.json());
  }

  deleteCPU(id) {
    return this.http.delete('/api/CPU/' + id).map(res =>res.json());
  }
  deleteCase(id) {
    return this.http.delete('/api/Case/' + id).map(res =>res.json());
  }
  deleteCoolingFan(id) {
    return this.http.delete('/api/CoolingFan/' + id).map(res =>res.json());
  }
  deletePowerSupply(id) {
    return this.http.delete('/api/PowerSupply/' + id).map(res =>res.json());
  }
  deleteGPU(id) {
    return this.http.delete('/api/GPU/' + id).map(res =>res.json());
  }
  deleteMotherboard(id) {
    return this.http.delete('/api/Motherboard/' + id).map(res =>res.json());
  }
  deleteRAM(id) {
    return this.http.delete('/api/RAM/' + id).map(res =>res.json());
  }
  deleteStorage(id) {
    return this.http.delete('/api/Storage/' + id).map(res =>res.json());
  }
  //end
}
