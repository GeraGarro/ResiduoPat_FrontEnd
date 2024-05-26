export interface ResiduoDTO {
    id:   number;
    tipo_residuo: TipoResiduo;
    peso:         number;
    ticket:           Ticket_Control;
}

export interface TipoResiduo {
    id?:     number;
    nombre: string;
    estado:       boolean;
}

export interface Ticket_Control {
    id_Ticket?:      number;
    transportista:  Transportista;
    fechaEmisionTk: Date;
    estadoTicket:   boolean;
    generador:      Generador;
    listaResiduos:  ListaResiduo[];
}

export interface Generador {
    id?:               number;
    nombre:           string;
    cuit:             string;
    direccion:        string;
    estado: boolean;
}

export interface ListaResiduo {
    id?: number;
    tipo_residuo:  TipoResiduo;
    peso:       number;
}

export interface Transportista {
    id?: number;
    nombre:    string;
    apellido:  string;
    cuit:             string;
    estado:    boolean;
}
