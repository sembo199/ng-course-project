import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiKeyService } from "./api-key.service";

interface AuthResponseData {
  kind: string;
  idtoken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';

  constructor(
    private http: HttpClient,
    private apiKeyService: ApiKeyService
  ) {}

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      this.url + this.apiKeyService.getApiKey(),
      {
        email,
        password,
        returnSecureToken: true
      }
    )
  }
}