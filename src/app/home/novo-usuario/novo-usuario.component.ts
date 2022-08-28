import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NovoUsuario } from './novo-usuario';
import { NovoUsuarioService } from './novo-usuario.service';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.css']
})
export class NovoUsuarioComponent implements OnInit {

  novoUsuarioForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private novoUsuarioService: NovoUsuarioService
  ) { }

  ngOnInit(): void {
    this.criaFormBuild();
  }

  criaFormBuild() {
    this.novoUsuarioForm = this.fb.group({
      email: [''],
      fullName: [''],
      userName: [''],
      password: ['']
    })
  }

  cadastrar() {
    const novoUsuario = this.novoUsuarioForm.getRawValue() as NovoUsuario;
    console.log(novoUsuario)
  }

}
