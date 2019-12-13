

export class IngresoEgreso {

    descripcion: string;
    monto: number;
    tipo: string;
    uid?: string;
    fechaPago: Date;

    constructor(obj) {

        this.descripcion = obj && obj.descripcion || null;
        this.monto       = obj && obj.monto       || null;
        this.tipo        = obj && obj.tipo        || null;
        this.fechaPago = obj && new Date(obj.fechaPago) || null;

        this.fechaPago.setMinutes(this.fechaPago.getMinutes() + this.fechaPago.getTimezoneOffset());
    }

}
