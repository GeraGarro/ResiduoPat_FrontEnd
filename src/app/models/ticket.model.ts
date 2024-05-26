export interface ITicket {
    id_Ticket?:      number;
    codigo: string;
    transportista:  Transportista;
    fechaEmisionTk: Date | null;
    estado:   boolean;
    generador:      Generador;
    listaResiduos:  ListaResiduo[];
};



export interface Transportista {
    id_transportista: number;
    nombre:    string;
    apellido:  string;
    cuit:      string;
    telefono:  string;
    domicilio: string;
    estado:    boolean;
}

export interface Generador {
    id?:               number;
    nombre:           string;
    cuit:             string;
    direccion:        string;
    telefono:         string;
    estado: boolean;
}

export interface ListaResiduo {
    id: number;
    tipoResiduo:  TipoResiduo ;
    peso:       number;
}
export interface TipoResiduo {
    id?:     number;
    nombre: String;
    estado:       boolean;
}

