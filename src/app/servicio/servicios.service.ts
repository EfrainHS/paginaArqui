import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { InterfazProyecto } from '../modelos/proyecto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  constructor(private afsAuth: AngularFireAuth, private afs: AngularFirestore) { }
  
  private coleccionProyectos: AngularFirestoreCollection<InterfazProyecto>;
  private proyectoDoc: AngularFirestoreDocument<InterfazProyecto>;
  private proyectos: Observable<InterfazProyecto[]>;

  /* Login de usuario */

  loginEmailUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.signInWithEmailAndPassword(email, pass)
        .then(userData => resolve(userData),
        err => reject(err));
    });
  }
  
  logoutUser() {
    return this.afsAuth.signOut();
  }

  isAuth() {
    return this.afsAuth.authState.pipe(map(auth => auth));
  }

  /* Obtener proyectos en sus diferentes categorias */

  obtenerProyectos() {
    this.coleccionProyectos = this.afs.collection<InterfazProyecto>('proyectos');
    return this.proyectos = this.coleccionProyectos.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as InterfazProyecto;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
  }

  obtenerProyectosConstructora() {
    this.coleccionProyectos = this.afs.collection('proyectos', ref => ref.where('tipo', '==', 'Constructora'));
    return this.proyectos = this.coleccionProyectos.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as InterfazProyecto;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
  }

  obtenerProyectosIndependientes() {
    this.coleccionProyectos = this.afs.collection('proyectos', ref => ref.where('tipo', '==', 'Independiente'));
    return this.proyectos = this.coleccionProyectos.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as InterfazProyecto;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
  }

  obtenerProyectosSimples() {
    this.coleccionProyectos = this.afs.collection('proyectos', ref => ref.where('tipo', '==', 'Simple'));
    return this.proyectos = this.coleccionProyectos.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as InterfazProyecto;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
  }

  /* Agregar, Modificar y Eliminar Proyectos */

  agregarProyecto(proyecto: InterfazProyecto):void{
    this.coleccionProyectos.add(proyecto);
  }

  modificarProyecto(proyecto: InterfazProyecto): void{
      let idProyecto = proyecto.id;
      this.proyectoDoc = this.afs.doc<InterfazProyecto>(`proyectos/${idProyecto}`);
      this.proyectoDoc.update(proyecto);
  }

  eliminarProyecto(idProyecto: string):void{
    this.proyectoDoc = this.afs.doc<InterfazProyecto>(`proyectos/${idProyecto}`);
    this.proyectoDoc.delete();
  }

}
