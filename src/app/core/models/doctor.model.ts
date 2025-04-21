export interface Doctor {
        doct_IdDoctor:  string
        doct_Nombre: string
        doct_Estatus: string
        doct_ConsultaDom: boolean
        doct_ConsultaLun: boolean
        doct_ConsultaMar: boolean
        doct_ConsultaMie: boolean
        doct_ConsultaJue: boolean
        doct_ConsultaVie: boolean
        doct_ConsultaSab: boolean
      
        doct_HorIniConDom?: string
        doct_HorIniConLun?: string
        doct_HorIniConMar?: string
        doct_HorIniConMie?: string
        doct_HorIniConJue?: string
        doct_HorIniConVie?: string
        doct_HorIniConSab?: string
      
        doct_HorFinConDom?: string
        doct_HorFinConLun?: string
        doct_HorFinConMar?: string
        doct_HorFinConMie?: string
        doct_HorFinConJue?: string
        horFinConVie?: string
        doct_HorFinConSab?: string
      
        isAvailable?: boolean
        nextAvailability: {
          nextDate: Date
          startTime: string
          endTime: string
        }
      }
      
