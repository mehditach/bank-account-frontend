import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Chatbot {

  private apiUrl = 'http://localhost:8081/chatbot/ask';

  constructor(private http: HttpClient) {}

  askQuestion(question: string): Observable<string> {
    return this.http.get(this.apiUrl, {
      params: { question },
      responseType: 'text'
    });
  }
}