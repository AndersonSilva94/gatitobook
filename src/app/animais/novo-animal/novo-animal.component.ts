import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AnimaisService } from '../animais.service';

@Component({
  selector: 'app-novo-animal',
  templateUrl: './novo-animal.component.html',
  styleUrls: ['./novo-animal.component.css']
})
export class NovoAnimalComponent implements OnInit {

  animalForm!: FormGroup;
  file!: File;
  preview!: string;
  percentual = 0;

  constructor(
    private animaisService: AnimaisService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.criaForm();
  }

  criaForm() {
    this.animalForm = this.fb.group({
      file: ['', Validators.required],
      description: ['', Validators.maxLength(300)],
      allowComments: [true],
    })
  }

  upload() {
    const allowComments = this.animalForm.get('allowComments')?.value ?? false;
    const description = this.animalForm.get('description')?.value ?? '';

    this.animaisService.uploadAnimal(description, allowComments, this.file).pipe(
      finalize(() => this.router.navigate(['animais']))
    ).subscribe(
      (event: HttpEvent<any>) => {
        if(event.type === HttpEventType.UploadProgress) {
          const total = event.total ?? 1;
          this.percentual = Math.round(100 * (event.loaded / total))
        }
      },
      (error) => console.error(error)
    )
  }

  gravaArquivo(arquivo: any): void {
    const [file] = arquivo?.files[0];
    this.file = file;
    const reader = new FileReader();
    reader.onload = (event: any) => (this.preview = event.target.result);
    reader.readAsDataURL(file);
  }

}
