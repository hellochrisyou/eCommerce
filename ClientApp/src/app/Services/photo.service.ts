import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: Http) {}

  Upload(itemId, photo) {
      const formData = new FormData();
      formData.append('file', photo);
      return this.http.post(`/api/ItemForSale/${itemId}/photos`, formData)
          .map(res => res.json());
  }

  GetPhotos(itemId) {
      return this.http.get(`/api/ItemForSale/${itemId}/photos`)
          .map(res => res.json());
  }
}
