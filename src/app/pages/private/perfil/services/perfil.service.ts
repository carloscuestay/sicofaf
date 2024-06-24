import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PATH_SERVER } from 'src/app/constants';
import { ResponseInterface } from 'src/app/interfaces/response.interface';
import { IPerfil } from '../../interfaces/perfil.interface';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private api = PATH_SERVER;

  constructor(private http: HttpClient) { }

  public getActividades(): Observable<ResponseInterface> {
    return this.http.get<ResponseInterface>(
      `${this.api}/PerfilPermisos/ObtenerListaActividades`
    );
  }

  public registrarPerfil(request: IPerfil): Observable<ResponseInterface> {
    return this.http.post<ResponseInterface>(
      `${this.api}/PerfilPermisos/CrearPerfil`,request
    );
  }
}
