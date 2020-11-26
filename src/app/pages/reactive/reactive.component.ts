import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma: FormGroup;

  constructor(private fb: FormBuilder) {
    this.crearFormulario();
    this.cargarDataAlFormulario();
  }

  ngOnInit(): void {
  }

  get pasatiempos(){
    return this.forma.get('pasatiempos') as FormArray;
  }

  get nombreNoValido(){
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
  }

  get apellidoNoValido(){
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched;
  }

  get correoNoValido(){
    return this.forma.get('correo').invalid && this.forma.get('correo').touched;
  }

  get distritoNoValido(){
    return this.forma.get('direccion.distrito').invalid && this.forma.get('direccion.distrito').touched;
  }

  get ciudadNoValido(){
    return this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched;
  }

  crearFormulario(){
    this.forma = this.fb.group({
      nombre  : ['', [Validators.required, Validators.minLength(5)]],
      apellido: ['', [Validators.required, Validators.minLength(5)]],
      correo  : ['', [Validators.required ,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      direccion: this.fb.group({
        distrito: ['', Validators.required],
        ciudad: ['', Validators.required]
      }),
      pasatiempos: this.fb.array([])
    });
  }

  cargarDataAlFormulario(){
    // this.forma.setValue({
    //   nombre: 'Irwin',
    //   apellido: 'Estrada',
    //   correo: 'irwinet@hotmail.com',
    //   direccion: {
    //     distrito: 'San Juan de Miraflores',
    //     ciudad: 'Lima'
    //   }
    // });

    this.forma.reset({
      nombre: 'Irwin',
      apellido: 'Estrada',
      correo: 'irwinet@hotmail.com',
      direccion: {
        distrito: 'San Juan de Miraflores',
        ciudad: 'Lima'
      }
    });

    ['Comer', 'Dormir'].forEach(valor => this.pasatiempos.push(this.fb.control(valor)));
  }

  agregarPasatiempo(){
    this.pasatiempos.push(this.fb.control(''));
  }

  borrarPasatiempo(i: number){
    this.pasatiempos.removeAt(i);
  }

  guardar(){
    console.log(this.forma);

    if(this.forma.invalid){ 
      return Object.values(this.forma.controls).forEach(control=>{        
        
        if(control instanceof FormGroup){
          Object.values(control.controls).forEach(control => control.markAsTouched());
        }
        else{
          control.markAsTouched();
        }        
        //console.log(control);
      });
    }


    //Posteo de informacion CALL SERVICE
    this.forma.reset({
      nombre: 'Sin nombre'
    });

  }
}
