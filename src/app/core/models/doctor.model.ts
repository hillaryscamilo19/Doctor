export interface Doctor {
        id: string
        nombre: string
        estatus: string
        consultaDom: boolean
        consultaLun: boolean
        consultaMar: boolean
        consultaMie: boolean
        consultaJue: boolean
        consultaVie: boolean
        consultaSab: boolean
      
        horIniConDom?: string
        horIniConLun?: string
        horIniConMar?: string
        horIniConMie?: string
        horIniConJue?: string
        horIniConVie?: string
        horIniConSab?: string
      
        horFinConDom?: string
        horFinConLun?: string
        horFinConMar?: string
        horFinConMie?: string
        horFinConJue?: string
        horFinConVie?: string
        horFinConSab?: string
      
        isAvailable?: boolean
        nextAvailability?: {
          nextDate: Date
          startTime: string
          endTime: string
        }
      }
      
