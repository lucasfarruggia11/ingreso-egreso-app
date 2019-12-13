import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
// import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { List } from 'linqts';


import * as fromIngresoEgreso from '../ingreso-egreso.reducer';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [],
  providers: [DatePipe]
})
  
export class EstadisticaComponent implements OnInit {

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels: String[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: String = 'bar';
  public barChartLegend: Boolean = true;

  public barChartData: any[] = [
    {data: [1, 2, 2, 1], label: 'Ingresos'},
    {data: [0, 1, 1, 1], label: 'Egresos'}
  ];

  ingresos: number;
  egresos: number;

  cuantosIngresos: number;
  cuantosEgresos: number;

  subscription: Subscription = new Subscription();

  public doughnutChartLabels: string[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: number[] = [];

  constructor( private store: Store<fromIngresoEgreso.AppState>, private datePipe: DatePipe) { }

  ngOnInit() {
    this.subscription = this.store.select('ingresoEgreso')
            .subscribe( ingresoEgreso => {
              this.contarIngresoEgreso( ingresoEgreso.items );
            });
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  contarIngresoEgreso( items: IngresoEgreso[] ) {

    this.ingresos = 0;
    this.egresos = 0;

    this.cuantosEgresos = 0;
    this.cuantosIngresos = 0;

    const trasnsacciones = new List<IngresoEgreso>();

    const hoy = new Date();
    hoy.setMinutes(hoy.getMinutes() + hoy.getTimezoneOffset());
    const start = new Date(hoy.getFullYear(), hoy.getMonth());
    const end = new Date(hoy.getFullYear(), hoy.getMonth() + 1);

    this.cuantosEgresos = trasnsacciones.Where(item => item.tipo === 'ingreso').Count();
    this.ingresos = trasnsacciones.Where(item => item.tipo === 'ingreso').Sum(x => x.monto);

    items.forEach(item => {
      trasnsacciones.Add(item);
      // if (item.fechaPago > start && item.fechaPago < end) {
      //   if ( item.tipo === 'ingreso' ) {
      //     this.cuantosIngresos ++;
      //     this.ingresos += item.monto;
      //   } else {
      //     this.cuantosEgresos ++;
      //     this.egresos += item.monto;
      //   }
      // }
    });

    const transaccionesPorMes = trasnsacciones.GroupBy(item => this.datePipe.transform(item.fechaPago, 'yyyy/MM'));

    if (transaccionesPorMes) {
      this.barChartLabels = Object.keys(transaccionesPorMes);
      // this.barChartData = Object.values(transaccionesPorMes);
      // console.log(Object.keys(transaccionesPorMes));     // > ['1', '4', '8']
      // console.log(Object.values(transaccionesPorMes));  // > [['Whiskers'], ['Boots', 'Daisy'], ['Barley']]
      // console.log(Object.entries(transaccionesPorMes));

      console.log(this.barChartLabels[0]);

      // for (let [key, value] of Object.entries(transaccionesPorMes)) {
      //   console.log(key + ' ' + value); // "a 5", "b 7", "c 9"
      //   value.forEach(element => {
      //     console.log(element);
      //   });
      // }
    }

    // transaccionesPorMes.array.forEach(element => {
    //   console.log(element);
    // });

    this.cuantosIngresos = trasnsacciones.Where(item => item.tipo === 'ingreso').Count();
    this.ingresos = trasnsacciones.Where(item => item.tipo === 'ingreso').Sum(x => x.monto);

    this.cuantosEgresos = trasnsacciones.Where(item => item.tipo === 'egreso').Count();
    this.egresos = trasnsacciones.Where(item => item.tipo === 'egreso').Sum(x => x.monto);

    this.doughnutChartData = [ this.ingresos, this.egresos ];

  }
}
