import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from '../ingreso-egreso.model';



import { List } from 'linqts';


import * as fromIngresoEgreso from '../ingreso-egreso.reducer';
import { DlDateTimePickerChange } from 'angular-bootstrap-datetimepicker';


@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html'
})

export class EstadisticaComponent implements OnInit {

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  selectedDate: Date;

  public barChartLabels: String[] = ['Enero', 'Febrero', 'Marzo', 'Abril',
    'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre',
    'Octubre', 'Noviembre', 'Diciembre'];
  public barChartType: String = 'bar';
  public barChartLegend: Boolean = true;

  public barChartData: any[] = [
    {data: [], label: 'Ingresos'},
    {data: [], label: 'Egresos'}
  ];

  ingresos: number;
  egresos: number;

  cuantosIngresos: number;
  cuantosEgresos: number;

  public trasnsacciones = new List<IngresoEgreso>();

  subscription: Subscription = new Subscription();

  public doughnutChartLabels: string[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: number[] = [];

  constructor(private store: Store<fromIngresoEgreso.AppState>) {
    this.selectedDate = new Date();
  }

  ngOnInit() {
    this.subscription = this.store.select('ingresoEgreso')
            .subscribe( ingresoEgreso => {
              this.contarIngresoEgreso( ingresoEgreso.items );
            });
  }
  // events
  public chartClicked(e: any): void {
  }

  public chartHovered(e: any): void {
  }

  public onCustomDateChange(event: DlDateTimePickerChange<Date>) {
    this.actualiarGraficas();
  }

  contarIngresoEgreso(items: IngresoEgreso[]) {

    items.forEach(item => {
      this.trasnsacciones.Add(item);
    });
    this.actualiarGraficas();
  }

  actualiarGraficas() {

    this.ingresos = 0;
    this.egresos = 0;

    this.cuantosEgresos = 0;
    this.cuantosIngresos = 0;

    this.cuantosEgresos = this.trasnsacciones.Where(item => item.tipo === 'ingreso').Count();
    this.ingresos = this.trasnsacciones.Where(item => item.tipo === 'ingreso').Sum(x => x.monto);

    const newResult = [... this.barChartData];

    this.barChartLabels.forEach((item, index) => {
      const ingresos = this.trasnsacciones.Where(x => x.fechaPago.getFullYear() === this.selectedDate.getFullYear() &&
                                            x.fechaPago.getMonth() === index && x.tipo === 'ingreso').Sum(x => x.monto);
      const egresos = this.trasnsacciones.Where(x => x.fechaPago.getFullYear() === this.selectedDate.getFullYear() &&
        x.fechaPago.getMonth() === index && x.tipo === 'egreso').Sum(x => x.monto);
      newResult[0].data[index] = ingresos;
      newResult[1].data[index] = egresos;
    });

    this.barChartData = [...newResult];


    this.cuantosIngresos = this.trasnsacciones.Where(x => x.fechaPago.getFullYear() === this.selectedDate.getFullYear() &&
                                                          x.tipo === 'ingreso').Count();
    this.ingresos = this.trasnsacciones.Where(x => x.fechaPago.getFullYear() === this.selectedDate.getFullYear() &&
                                              x.tipo === 'ingreso').Sum(x => x.monto);

    this.cuantosEgresos = this.trasnsacciones.Where(x => x.fechaPago.getFullYear() === this.selectedDate.getFullYear() &&
                                                    x.tipo === 'egreso').Count();
    this.egresos = this.trasnsacciones.Where(x => x.fechaPago.getFullYear() === this.selectedDate.getFullYear() &&
                                             x.tipo === 'egreso').Sum(x => x.monto);

    const newResult1 = [... this.barChartData];

    newResult1[0] = this.ingresos;
    newResult1[1] = this.egresos;

    this.doughnutChartData = [... newResult1];
  }
}
