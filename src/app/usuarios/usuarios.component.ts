import { Component } from '@angular/core';
import { Usuario } from './models/usuario';
import { UsuarioDTO } from './models/usuarioDTO';
import { UsuariosService } from './usuarios.service';

//routerLink="/detail/{{row.id}}
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {

  constructor(
    private usuarioService: UsuariosService) { }

  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'telefono', 'correoElectronico', 'actions'];
  usuarios: Usuario[] = [];
  nuevoUsuario: UsuarioDTO = {
    nombre: '',
    apellido: '',
    correoElectronico: '',
    telefono: ''
  };

  isDisabled() {
    return !(this.nuevoUsuario.nombre.length > 0 && this.nuevoUsuario.apellido.length > 0 && this.nuevoUsuario.correoElectronico.length > 0 && !(this.nuevoUsuario.telefono.length > 0 && this.nuevoUsuario.telefono.length < 5)
    );
  }

  getUsuarios(): void {
    this.usuarioService.getUsuariosFromDb()
      .subscribe(usuarios => this.usuarios = usuarios);
  }

  addUsuario(): void {
    this.usuarioService.addUsuario(this.nuevoUsuario)
      .subscribe(usuario => {
        alert('Usuario registrado, token: ' + usuario.token);
        this.usuarios.push(usuario);
        this.getUsuarios();
        this.nuevoUsuario = {
          nombre: '',
          apellido: '',
          correoElectronico: '',
          telefono: ''
        };
      });
  }

  deleteUsuario(id: Number): void {    
    this.usuarioService.deleteUsuario(id).subscribe(() => {
      this.usuarios = this.usuarios.filter(u => u.id !== id);
    });
  }

  ngOnInit(): void {
    this.getUsuarios();
  }
}
