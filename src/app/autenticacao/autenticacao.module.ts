import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AutenticacaoInterceptor } from './autenticacao.interceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AutenticacaoInterceptor,
      multi: true,
    }
  ]
})
export class AutenticacaoModule { }

// os interceptors passam por toda a aplicação
// ao criar uma cadeia de interceptors, é bom ter em mente que elas nõa seguem uma ordem de execução
