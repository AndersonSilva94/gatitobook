import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Animais, Animal } from './animais';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class AnimaisService {

  constructor(
    private http: HttpClient
  ) { }

  listaDoUsuario(nomeUsuario: string): Observable<Animais> {
    return this.http.get<Animais>(`${API}/${nomeUsuario}/photos`)
  };

  buscaAnimalPorId(id: number): Observable<Animal> {
    return this.http.get<Animal>(`${API}/photos/${id}`)
  }
}
