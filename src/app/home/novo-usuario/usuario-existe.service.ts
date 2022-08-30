import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { first, map, switchMap } from 'rxjs';
import { NovoUsuarioService } from './novo-usuario.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioExisteService {

  constructor(
    private novoUsuarioService: NovoUsuarioService
  ) { }

  usuarioJaExiste() {
    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
        switchMap((nomeUsuario) => this.novoUsuarioService.verificaUsuarioExistente(nomeUsuario)), // recebe um observable e retorna outro - troca o fluxo
        map((usuarioExiste) => (
          usuarioExiste ? { existe: true } : null
        )), // troca um valor por outro do resultado
        first() // depois da requisição fecha o fluxo de validação
      )
    }
  }
}
