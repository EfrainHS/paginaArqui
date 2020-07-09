import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/app/servicio/servicios.service';
import { InterfazProyecto } from 'src/app/modelos/proyecto';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private servi: ServiciosService) { }
  public proyects: InterfazProyecto [];

  ngOnInit(): void {
    this.obtenerListaProyectos();
  }

  obtenerListaProyectos(){
    this.servi.obtenerProyectos().subscribe(proyectos => {
      this.proyects = proyectos;
    });
  }

  borrarProyecto(idProyecto: string):void{
    const confirmacion = confirm('¿Esta usted seguro que desea eliminar este proyecto?');
    if (confirmacion){
      this.servi.eliminarProyecto(idProyecto);
    }
  }

  actualizarProyecto(proyecto: InterfazProyecto):void{
    console.log('Proyecto', proyecto);
    
  }

}
