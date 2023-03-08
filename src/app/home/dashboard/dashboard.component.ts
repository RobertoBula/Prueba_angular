import { Component, Injectable, OnInit } from "@angular/core";
import { findMinAndMaxState } from "src/app/utils/min-max-state";
import { DashboardItem } from "../../interfaces/dashboard.item.type";
import { DashboardService } from "../../services/dashboard.service";
import { ToastService } from "../../services/toast.service";
import { Excel } from '../../utils/excel';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
@Injectable({
  providedIn: "root",
})
export class DashboardComponent implements OnInit {
  public elements: DashboardItem[] = [];
  public loading = false;
  public ngxLoadingAnimationTypes = {
    chasingDots: "chasing-dots",
    circle: "sk-circle",
    circleSwish: "circleSwish",
    cubeGrid: "sk-cube-grid",
    doubleBounce: "double-bounce",
    none: "none",
    pulse: "pulse",
    rectangleBounce: "rectangle-bounce",
    rotatingPlane: "rotating-plane",
    threeBounce: "three-bounce",
    wanderingCubes: "wandering-cubes",
  };

  constructor(
    private dashboardService: DashboardService,
    private toast: ToastService
  ) {}

  element = true; 
  elementwo = false; 
  public ngOnInit() {
    this.getData();
  }

  showData(){
    return (this.element = true , this.elementwo = false);
  }
  
  hidenData(){
    return (this.element = false , this.elementwo = true);

  }

  /**
   * getMetrics
   */
  public getData() {
    try {
      this.loading = true;
      this.elements = this.dashboardService.getNewDashboardData();
      this.loading = false;
    } catch (e) {
      console.log(e);
      this.toast.error(
        "No se pudieron obtener los indicadores del dashboard, revise su conexión"
      );
    }
  }

  getFile(event: any): void{
    const file = event.target.files[0];
    Excel.convertExcelToArray(file, (result) => {
      console.log(result);
      
      console.log(findMinAndMaxState(result))
    })
  }
}
