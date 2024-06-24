import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PATH_SERVER } from 'src/app/constants';
import { ResponseInterface } from 'src/app/interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private api = PATH_SERVER;

  constructor(private http: HttpClient) { }

  /**
   * @description obtiene la informacion del select de entidad.
   * @returns observable
   */
  public getPerfiles(): Observable<ResponseInterface> {
    return this.http.get<ResponseInterface>(
      `${this.api}/PerfilPermisos/ObtenerListaActividades`
    );
  }
}
