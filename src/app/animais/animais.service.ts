import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, mapTo, Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Animais, Animal } from './animais';

const API = environment.apiURL;
const NOT_MODIFIED = 304;

@Injectable({
  providedIn: 'root'
})
export class AnimaisService {

  constructor(
    private http: HttpClient
  ) { }

  listaDoUsuario(nomeUsuario: string): Observable<Animais> {
    return this.http.get<Animais>(`${API}/${nomeUsuario}/photos`);
  };

  buscaAnimalPorId(id: number): Observable<Animal> {
    return this.http.get<Animal>(`${API}/photos/${id}`);
  }

  excluiAnimal(id: number): Observable<Animal> {
    return this.http.delete<Animal>(`${API}/photos/${id}`);
  }

  curtirAnimal(id: number): Observable<boolean> {
    return this.http.post(`${API}/photos/${id}/like`, {}, {
      observe: 'response'
    }).pipe(
      mapTo(true),
      catchError((error) => {
        return error.status === NOT_MODIFIED ? of(false) : throwError(error)
      })
    )
  }

  uploadAnimal(descricao: string, permiteComentario: boolean, arquivo: File) {
    const formData = new FormData();
    formData.append('description', descricao);
    formData.append('allowComments', permiteComentario ? 'true' : 'false');
    formData.append('imageFile', arquivo);

    return this.http.post(`${API}/photos/upload`, formData, {
      observe: 'events',
      reportProgress: true
    })
  }
}
