import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from '../ingreso-egreso.model';



import { List } from 'linqts';


import * as fromIngresoEgreso from '../ingreso-egreso.reducer';


@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html'
})

export class EstadisticaComponent implements OnInit {

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

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

  subscription: Subscription = new Subscription();

  public doughnutChartLabels: string[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: number[] = [];

  

  constructor(private store: Store<fromIngresoEgreso.AppState>) {}

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

  contarIngresoEgreso(items: IngresoEgreso[]) {

    this.ingresos = 0;
    this.egresos = 0;

    this.cuantosEgresos = 0;
    this.cuantosIngresos = 0;

    const trasnsacciones = new List<IngresoEgreso>();

    this.cuantosEgresos = trasnsacciones.Where(item => item.tipo === 'ingreso').Count();
    this.ingresos = trasnsacciones.Where(item => item.tipo === 'ingreso').Sum(x => x.monto);

    items.forEach(item => {
      trasnsacciones.Add(item);
    });

    this.barChartLabels.forEach((item, index) => {
      console.log(`item:${item} index:${index}`);
      const ingresos = trasnsacciones.Where(x => x.fechaPago.getFullYear() === 2019 &&
                                            x.fechaPago.getMonth() === index && x.tipo === 'ingreso').Sum(x => x.monto);
      const egresos = trasnsacciones.Where(x => x.fechaPago.getFullYear() === 2019 &&
        x.fechaPago.getMonth() === index && x.tipo === 'egreso').Sum(x => x.monto);
        console.log(`ingresos:${ingresos} egresos:${egresos}`);
      this.barChartData[0].data[index] = ingresos;
      this.barChartData[1].data[index] = egresos;
    });

    this.cuantosIngresos = trasnsacciones.Where(item => item.tipo === 'ingreso').Count();
    this.ingresos = trasnsacciones.Where(item => item.tipo === 'ingreso').Sum(x => x.monto);

    this.cuantosEgresos = trasnsacciones.Where(item => item.tipo === 'egreso').Count();
    this.egresos = trasnsacciones.Where(item => item.tipo === 'egreso').Sum(x => x.monto);

    this.doughnutChartData = [ this.ingresos, this.egresos ];

  }
}
