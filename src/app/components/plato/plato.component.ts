import { Component, OnInit } from '@angular/core';
import { PlatoService } from 'src/app/services/plato.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Plato } from 'src/app/model/plato';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-plato',
  templateUrl: './plato.component.html',
  styleUrls: ['./plato.component.css']
})
export class PlatoComponent implements OnInit {
  plato: Plato = {
    id: null,
    denominacion: '',
    imagen: '',
    tiempoPreparacion: null, //null  para no reemplazar lo que dice el placeholder
    precioVenta: null


  }

  isValid: boolean = true;

  constructor(
    private platoService: PlatoService,
    private router: Router,
    private currentRoute: ActivatedRoute) { }

  ngOnInit() {

    let idRuta: number
    this.currentRoute.params.subscribe(params => {
      idRuta = params['id']
      if (idRuta != 0) {  //la condición va adentro porque se espera hasta que llegue el id, y ahi se decide

        this.getOne(idRuta)
      }
    },
      err => console.log(err)
    );

  }

  getOne(id: number) {
    this.platoService.getOne(id).subscribe(data => {
      this.plato = data
    },
      err => console.log(err)
    );
  }



  submit(form: NgForm) { //form.value para obtener valor del formulario, en este caso no se usa

    this.platoService.post(this.plato).subscribe(res => {
      console.log("post correcto de plato")
      console.log(res)
      this.router.navigate(['/tabla']);
    },
      err => console.log(err)
    )

  }
}
