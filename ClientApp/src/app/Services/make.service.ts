import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import 'rxjs/operators/map';

@Injectable({
  providedIn: 'root'
})
export class MakeService {

  constructor(private http: Http) {}

  //get
  GetCase() {
      return this.http.get('/api/Case').map(res => res.json());
  }
  GetCoolingFan() {
      return this.http.get('/api/CoolingFan').map(res => res.json());
  }
  GetCpu() {
      return this.http.get('/api/CPU').map(res => res.json());
  }
  GetGpu() {
      return this.http.get('/api/GPU').map(res => res.json());
  }
  GetMotherboard() {
      return this.http.get('/api/Motherboard').map(res => res.json());
  }
  GetPowersupply() {
      return this.http.get('/api/PowerSupply').map(res => res.json());
  }
  GetRam() {
      return this.http.get('/api/RAM').map(res => res.json());
  }
  GetStorage() {
      return this.http.get('/api/Storage').map(res => res.json());
  }
  GetOrder() {
      return this.http.get('/api/Order').map(res => res.json());
  }
  GetAccount() {
      return this.http.get('/api/Account').map(res => res.json());
  }
  GetAllSaleItem() {
      return this.http.get('/api/ItemForSale').map(res => res.json());
  }
  GetSaleItem(itemId) {
      return this.http.get('/api/ItemForSale').map(res => res.json());
  }
  //create
  CreateCase(caseItem) {
      return this.http.post('/api/Case', caseItem).map(res => res.json());
  }
  CreateCoolingFan(coolingfan) {
      return this.http.post('/api/Coolingfan', coolingfan).map(res => res.json());
  }
  CreateCpu(cpu) {
      return this.http.post('/api/CPU', cpu).map(res => res.json());
  }
  CreateGpu(gpu) {
      return this.http.post('/api/GPU', gpu).map(res => res.json());
  }
  CreateMotherboard(motherboard) {
      return this.http.post('/api/Motherboard', motherboard).map(res => res.json());
  }
  CreatePowersupply(powersupply) {
      return this.http.post('/api/Powersupply', powersupply).map(res => res.json());
  }
  CreateRam(ram) {
      return this.http.post('/api/RAM', ram).map(res => res.json());
  }
  CreateStorage(storage) {
      return this.http.post('/api/Storage', storage).map(res => res.json());
  }
  CreateAccount(account) {
      return this.http.post('/api/Account', account);
  }
  CreateOrder(order) {
      return this.http.post('/api/Order', order);
  }
  CreateSaleItem(saleItem) {
      return this.http.post('/api/ItemForSale', saleItem);
  }
  CreateUser(user) {
      return this.http.post('/api/Account', user);
  }

  //update
  UpdateAccount(account) {
      return this.http.put('/api/Account/' + account.id, account).map(res => res.json());
  }
  UpdateCpu(cpu) {
      return this.http.put('/api/CPU/' + cpu.id, cpu).map(res => res.json());
  }
  UpdateCase(caseItem) {
      return this.http.put('/api/Case/' + caseItem.id, caseItem).map(res => res.json());
  }
  UpdateCoolingFan(coolingFan) {
      return this.http.put('/api/CoolingFan/' + coolingFan.id, coolingFan).map(res => res.json());
  }
  UpdatePowerSupply(powerSupply) {
      return this.http.put('/api/PowerSupply/' + powerSupply.id, powerSupply).map(res => res.json());
  }
  UpdateGpu(gpu) {
      return this.http.put('/api/GPU/' + gpu.id, gpu).map(res => res.json());
  }
  UpdateMotherboard(motherboard) {
      return this.http.put('/api/Motherboard/' + motherboard.id, motherboard).map(res => res.json());
  }
  UpdateRam(ram) {
      return this.http.put('/api/RAM/' + ram.id, ram).map(res => res.json());
  }
  UpdateStorage(storage) {
      return this.http.put('/api/Storage/' + storage.id, storage).map(res => res.json());
  }
  //delete
  DeleteCpu(id) {
      return this.http.delete('/api/CPU/' + id).map(res => res.json());
  }
  DeleteCase(id) {
      return this.http.delete('/api/Case/' + id).map(res => res.json());
  }
  DeleteCoolingFan(id) {
      return this.http.delete('/api/CoolingFan/' + id).map(res => res.json());
  }
  DeletePowersupply(id) {
      return this.http.delete('/api/PowerSupply/' + id).map(res => res.json());
  }
  DeleteGpu(id) {
      return this.http.delete('/api/GPU/' + id).map(res => res.json());
  }
  DeleteMotherboard(id) {
      return this.http.delete('/api/Motherboard/' + id).map(res => res.json());
  }
  DeleteRam(id) {
      return this.http.delete('/api/RAM/' + id).map(res => res.json());
  }
  DeleteStorage(id) {
      return this.http.delete('/api/Storage/' + id).map(res => res.json());
  }
  DeleteUsed(id) {
      return this.http.delete('/api/ItemForSale/' + id).map(res => res.json());
  }
}