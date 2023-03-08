import { Component, Input, OnInit } from "@angular/core";
import { DashboardItem } from "src/app/interfaces/dashboard.item.type";
import { DashboardService } from "../../../services/dashboard.service";
import { DashboardComponent } from "../dashboard.component";

@Component({
  selector: "app-dashboard-box",
  templateUrl: "./dashboard-box.component.html",
  styleUrls: ["./dashboard-box.component.css"],
})
export class DashboardBoxComponent implements OnInit {
  public expanded = false;
  @Input() public data: DashboardItem;
  @Input() public mainRef!: DashboardComponent;
  // must be changed for real data from dashboard component, does not make sense call a service from this component
  public fixedData: DashboardItem;

  constructor(
    private dashboardService: DashboardService) {
    this.fixedData = this.dashboardService.getNewDashboardData()[0];
  }

  public ngOnInit(): void {
  }

  /**
   * changePanel
   */
  public changePanel() {
    this.expanded = !this.expanded;
  }
}
