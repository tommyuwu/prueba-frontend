import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Usuario } from '../usuarios/models/usuario';
import { UsuariosService } from '../usuarios/usuarios.service';

@Component({
  selector: 'app-usuarios-detalle',
  templateUrl: './usuarios-detalle.component.html',
  styleUrls: ['./usuarios-detalle.component.css']
})
export class UsuariosDetalleComponent {

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuariosService,
    private location: Location
  ) { }

  @Input() usuario?: Usuario;

  isDisabled() {
    if (this.usuario) {
      return !(this.usuario.nombre.length > 0 && this.usuario.apellido.length > 0 && this.usuario.correoElectronico.length > 0 && !(this.usuario.telefono.length > 0 && this.usuario.telefono.length < 5));
    } else {
      return false;
    }
  }

  ngOnInit(): void {
    this.getUsuario();
  }

  getUsuario(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.usuarioService.getUsuario(id)
      .subscribe(usuario => this.usuario = usuario);
  }

  save(): void {
    if (this.usuario) {
      this.usuarioService.updateUsuario(this.usuario)
        .subscribe(() => this.goBack());
    }
  }

  goBack(): void {
    this.location.back();
  }
}
