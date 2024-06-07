import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { MainComponent } from './main/main.component';

import { RecepcionComponent } from './recepcion/recepcion.component';
import { CiudadanoModule } from './ciudadano/ciudadano.module';
import { SolicitudModule } from './solicitud/solicitud.module';
import { AbogadoModule } from './abogado/abogado.module';
import { TrabajadorSocialModule } from './trabajador-social/trabajador-social.module';

@NgModule({
  declarations: [MainComponent, RecepcionComponent],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    CiudadanoModule,
    SolicitudModule,
    SharedModule,
    AbogadoModule,
    TrabajadorSocialModule,
  ],
})
export class PrivateModule {}
