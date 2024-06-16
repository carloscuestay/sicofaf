import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { switchMap } from 'rxjs';
import { CiudadanoService } from '../../ciudadano/services/ciudadano.service';
import { CodigosRespuesta, Mensajes, Regex } from 'src/app/constants';
import * as validaciones from '../../ciudadano/registrar-ciudadano/validators';
import { ModalInfoComponent } from 'src/app/shared/modal-info/modal-info.component';
import { Modales } from '../../../../shared/modals';

import { SharedService } from '../../../../services/shared.service';
import * as interfaces from '../../interfaces/ciudadano.interface';
import { CiudadanoCompletoInterface } from '../../interfaces/ciudadano.interface';
import { ResponseInterface } from '../../../../interfaces/response.interface';
import { SharedFunctions } from 'src/app/shared/functions';


@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.scss'],
  providers: [DatePipe],
})
export class RegistrarUsuarioComponent implements OnInit {

  public myForms!: FormGroup;
  public minDate!: Date;
  public maxDate!: Date;
  public mostrarValidaciones: boolean = false;
  public msgObligatorio: string = Mensajes.CAMPO_OBLIGATORIO;
  public msgObligatorioContacto: string = Mensajes.MENSAJE_DATOS_CONTACTO;
  public msgObligatorioCorreo: string = Mensajes.MENSAJE_CORREO;
  public msgObligatorioAfiliacion: string = Mensajes.MENSAJE_DATOS_AFILIACION;
  public existe: boolean = false;
  public selectTipoDocumento: interfaces.DominioInterface[] = [];
  public selectLugarExpedicion: interfaces.LugarExpedicionInterface[] = [];
  public selectPaises: interfaces.PaisInterface[] = [];
  public selectDepartamento: interfaces.DepartamentoInterface[] = [];
  public selectMunicipio: interfaces.MunicipioInterface[] = [];
  public selectLocalidad: interfaces.DominioInterface[] = [];
  public selectSexo: interfaces.DominioInterface[] = [];
  public selectGenero: interfaces.DominioInterface[] = [];
  public selectOrientacion: interfaces.DominioInterface[] = [];
  public selectNivel_Academico: interfaces.DominioInterface[] = [];
  public selectDiscapacidad: interfaces.DominioInterface[] = [];
  public cColombiano: boolean = false;
  public cDiscapacidad: boolean = false;
  public cEmbarazo: boolean = false;
  public cAfiliado: boolean = false;
  public ciudadano!: interfaces.CiudadanoInterface;
  public idCiudadano!: number;
  public titulo: string = 'REGISTRO DE NUEVO CIUDADANO';

  /**
   * @description valida si viene en modo editar
   */
  private get isUpdate(): boolean {
    return this.activedRoute.snapshot.params['id_ciudadano'] !== undefined;
  }

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    private sharedService: SharedService,
    private ciudadanoService: CiudadanoService,
    private activedRoute: ActivatedRoute,
    private datePipe: DatePipe
  ) {

  }

  ngOnInit(): void {
    //this.valoresMaxMinDatePicker();
    this.cargarForm();
    //this.habilitarCampos();
    //this.resetValueChange();
    //this.cargarSelects();
    //this.cargarFormEdit();
  }

  /**
   * @description carga form
   */
  private cargarForm() {
    this.myForms = this.fb.group(
      {
        pnombre: ['', [Validators.required, Validators.pattern(Regex.ALFA)]],
        snombre: ['', [Validators.pattern(Regex.ALFA)]],
        papellidos: ['', [Validators.required, Validators.pattern(Regex.ALFA)]],
        sapellidos: ['', [Validators.pattern(Regex.ALFA)]],
        tipDoc: ['', [Validators.required]],
        nroDoc: ['', [Validators.required, Validators.pattern(Regex.ALFA)]],
        fechaExp: '',
        lugarExp: '',
        fechaNac: '',
        edad: ['', [Validators.required]],
        pais: '',
        departamento: '',
        municipio: '',
        localidad: '',
        barrio: ['', [Validators.pattern(Regex.ALFA)]],
        sexo: '',
        idGenero: '',
        orientacionSexual: '',
        nivAcademico: ['', [Validators.required]],
        telefono: ['', [Validators.pattern(Regex.ALFA)]],
        celular: ['', [Validators.pattern(Regex.ALFA)]],
        correoElectronico: '',
        dirResidencia: '',
        rDiscapacidad: ['no', [Validators.required]],
        discapacidad: '',
        rEmbarazo: ['no', [Validators.required]],
        embarazo: '',
        rAfiliado: ['no', [Validators.required]],
        eps: '',
        ips: '',
        chkLGBTI: false,
        chkNinoAdolecente: false,
        chkMigrante: false,
        chkVictimaComArm: false,
        chkPerLideresa: false,
        chkPerHabitalidad: false,
        chkIndigena: false,
        indigena: '',
        aceptaTratamiento: [false, [Validators.requiredTrue]],
      },
      {
        validators: [
          validaciones.validarDatosContacto,
          validaciones.validarCorreo,
          validaciones.validarDiscapacidad,
          validaciones.validarEmbarazo,
          validaciones.validarIndigena,
        ],
      }
    );
  }
}
