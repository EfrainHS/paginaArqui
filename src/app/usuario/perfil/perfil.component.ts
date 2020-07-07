import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ServiciosService } from 'src/app/servicio/servicios.service';
import { InterfazUsuario } from 'src/app/modelos/usuario';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  user: InterfazUsuario = {
    email: '',
    photoUrl: ''
  };
  public providerId: string = 'null';
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;

  constructor(private router: Router, private authService: ServiciosService, private storage: AngularFireStorage) { }
  @ViewChild('imageUser') inputImageUser: ElementRef;

  ngOnInit() {
    this.authService.isAuth().subscribe(user => {
      if (user) {
        this.user.email = user.email;
        this.user.photoUrl = user.photoURL;
        this.providerId = user.providerData[0].providerId;
        console.log('USER', user);
      }
    })
  }

  onUpload(e) {
    // console.log('subir', e.target.files[0]);
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `uploads/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
  }
}
