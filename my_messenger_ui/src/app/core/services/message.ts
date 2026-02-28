import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Message {
  private readonly apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  send(to: string, body: string) {
    return this.http.post(`${this.apiUrl}/messages`, { to, body });
  }

  getAll() {
    return this.http.get<any[]>(`${this.apiUrl}/messages`);
  }
}
