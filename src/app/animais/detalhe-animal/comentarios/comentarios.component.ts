import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, switchMap, tap } from 'rxjs';
import { Comentarios } from './comentarios';
import { ComentariosService } from './comentarios.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css'],
})
export class ComentariosComponent implements OnInit {
  @Input() id!: number;

  comentarios$!: Observable<Comentarios>;
  comentarioForm!: FormGroup;

  constructor(
    private comentariosService: ComentariosService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.criaFB();
    this.comentarios$ = this.comentariosService.buscarComentario(this.id);
  }

  criaFB() {
    this.comentarioForm = this.fb.group({
      comentario: ['', Validators.maxLength(300)],
    });
  }

  gravar() {
    const comentario = this.comentarioForm.get('comentario')?.value ?? '';
    this.comentarios$ = this.comentariosService
      .adicionaComentario(this.id, comentario)
      .pipe(
        switchMap(() => this.comentariosService.buscarComentario(this.id)),
        tap(()=> {
          this.comentarioForm.reset();
          alert("Comentário salvo!")
        })
      );
  }
}
