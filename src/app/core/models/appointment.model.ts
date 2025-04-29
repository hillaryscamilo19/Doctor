export interface Appointment {
  expe_NumeroExpediente: string | number;
  expe_Nombres: string;
  expe_Apellidos: string;
  expe_Sexo: string;
  expe_EstadoCivil: string;
  expe_FechaNacimiento: Date;
  expe_Direccion: string;
  expe_Sector: string;
  expe_Ciudad: string;
  expe_TelefonoCasa: string;
  expe_TelefonoOficina: string;
  expe_ExtensionOficina: string;
  expe_Celular: string;
  expe_Cedula: string;
  expe_Ocupacion: string;
  expe_LugarNacimiento: Date;
  expe_ReferidoPor: string;
  expe_AntecedentesPersonales: string;
  expe_AntecedentesFamiliares: string;
  expe_IdSeguroMedico: string;
  expe_NombreSeguro: string;
  expe_IdPlanSeguro: string;
  expe_NumeroAfiliado: string;
  expe_NumeroPoliza: string;
  expe_Observacion: string;
  expe_TieneGlaucoma: string;
  expe_IdDoctor: string;
  expe_FechaCreacion: string;
  expe_IdUsuarioRegistro: string;
  expe_Email: string;
  expe_Estatus: string;
  expe_NombreMadre: string;
  expe_NombrePadre: string;
}

export interface CreateAppointmentDto {
  lisp_IdDoctor: string;
  lisp_Fecha: Date;
  lisp_Nombre: string;
  lisP_Apellido: string;
  lisp_NumeroExpediente: number;
  lisp_Secuencia: number;
  NumLista: number;
}

export interface CreateAppointmentDto2 {
  fecha: string;
  horaInicio: string;
  horaFin: string;
  doctorId: string;
  pacienteId: number;
}
