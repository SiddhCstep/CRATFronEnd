import { Component, OnInit } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { latLng, tileLayer } from 'leaflet';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, LeafletModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
  });
  optionsDisone = {
    layers: [
      this.googleStreets
    ],
    zoom: 12,
    center: latLng(11.9416, 79.8083)
  };

  optionsDistwo = {
    layers: [
      L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
      })
    ],
    zoom: 12,
    center: latLng(10.9337, 79.7961)
  };

  optionsDisthree = {
    layers: [
      L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
      })
    ],
    zoom: 12,
    center: latLng(16.7143, 82.2638)
  };

  optionsDisfour = {
    layers: [
      L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
      })
    ],
    zoom: 15,
    center: latLng(11.7002, 75.5343)
  };

  isOpen = false;
  selectedOption: any;
  showRCP: boolean = false;
  isHazardsContentVisible: boolean = false;
  isVulnerabilityContentVisible = false;
  isExposureContentVisible: boolean = false;
  radioForm!: FormGroup;
  checkboxForm: FormGroup;
  checkboxFormVulnerability: FormGroup;
  expandedBox: string = '';
  map: any;
  isButtonDisabled: boolean = true;
  VulnerabilitValue: boolean = false;
  Exposurevalue: boolean = false;
  Hazardsvalue: boolean = false;


  optionsoftime = [
    { label: 'Historical', value: 'Historical' },
    { label: 'Future', value: 'Future' }
  ];
  optionsoftypeoftime = [
    { label: 'RCP 4.5', value: 'RCP 4.5' },
    { label: 'RCP 8.5', value: 'RCP 8.5' }
  ];
  optionsofeffectedfield = [
    { label: 'Select Sector', value: 'Select Sector' },
    { label: 'Agriculture', value: 'Agriculture' },
    { label: 'Fisheries', value: 'Fisheries' },
    { label: 'Forest', value: 'Forest' },
    { label: 'Health', value: 'Health' },
    { label: 'Livestock', value: 'Livestock' },
    { label: 'Tourism', value: 'Tourism' },
    { label: 'Urban', value: 'Urban' },
    { label: 'Water', value: 'Water' }
  ];
  hazardoptions = [
    { label: 'Drought', value: 'Drought' },
    { label: 'Flood', value: 'Flood' },
    { label: 'Heatwave', value: 'Heatwave' },
    { label: 'Sea level rise', value: 'Sea level rise' },
  ];
  Exposureoptions = [
    { value: 'Agriculture Area', label: 'Agriculture Area' },
    { value: 'Storage Units', label: 'Storage Units' },
    { value: 'Irrigation Networks', label: 'Irrigation Networks' },
    { value: 'Polyhouses and Greenhouses ', label: 'Polyhouses and Greenhouses ' },
    { value: "Agriculture Markets (Mandi's)", label: "Agriculture Markets (Mandi's)" },
  ];
  Vulnerabilityoptions = [
    { value: 'Cropping Intensity ', label: 'Cropping Intensity ' },
    { value: 'Percentage Area Under Cluster - Based Farming', label: 'Percentage Area Under Cluster - Based Farming' },
    { value: 'Percentage of Gross Cropped Area Insured', label: 'Percentage of Gross Cropped Area Insured' },
    { value: 'Stage of Ground Water Development', label: 'Stage of Ground Water Development' },
    { value: "Access to Agricultural Inputs", label: "Access to Agricultural Inputs" },
    { value: 'Access and use of Information and Technology', label: 'Access and use of Information and Technology' },
    { value: 'Percentage of Workforce Primarily Employed in Agriculture', label: 'Percentage of Workforce Primarily Employed in Agriculture' },
    { value: 'Percentage of Small and Marginal Farmers', label: 'Percentage of Small and Marginal Farmers' },
    { value: 'Percentage of Net Sown Area that is Solely Rainfed​', label: 'Percentage of Net Sown Area That is Solely Rainfed​' },
    { value: "Yield Variability of Main Food Crops ​", label: "Yield Variability of Main Food Crops ​" },
    { value: 'Income Inequity', label: 'Income Inequity' },
    { value: 'Salinity Intrusion​', label: 'Salinity Intrusion​' },
    { value: "Soil Moisture and ET ​", label: "Soil Moisture and ET ​" },
  ];
  constructor(private fb: FormBuilder) {
    this.radioForm = this.fb.group({
      selectedOption: 'Historical'
    });
    this.checkboxForm = this.fb.group({
      selectedOptionsForExposure: this.fb.array(this.Exposureoptions.map(() => new FormControl(false)))
    });
    // Initialize checkboxFormVulnerability with controls for each vulnerability option
    this.checkboxFormVulnerability = this.fb.group({
      selectedOptionsforVulnerability: this.fb.array(
        this.Vulnerabilityoptions.map(() => this.fb.control(false))
      )
    });
  }

  expandBox(boxName: string) {
    this.expandedBox = boxName;
  }
  shrinkBox(event: Event) {
    event.stopPropagation();
    this.expandedBox = '';
  }
  isExpanded(boxName: string) {
    return this.expandedBox === boxName;
  }
  // Toggles the visibility of the hazards content section
  toggleHazardsContent() {
    this.isHazardsContentVisible = !this.isHazardsContentVisible;
  }
  // Toggles the visibility of the exposure content section
  toggleExposureContent() {
    this.isExposureContentVisible = !this.isExposureContentVisible;
  }
  // Toggles the visibility of the vulnerability content section
  toggleVulnerabilityContent() {
    this.isVulnerabilityContentVisible = !this.isVulnerabilityContentVisible;
  }
  // Getter for selected options of exposure
  get selectedOptionsForExposure(): FormArray {
    return this.checkboxForm.get('selectedOptionsForExposure') as FormArray;
  }
  // Getter for selected options of vulnerability
  get selectedOptionsforVulnerability(): FormArray {
    return this.checkboxFormVulnerability.get('selectedOptionsforVulnerability') as FormArray;
  }
  // Initialize selected option and handle any initial logic needed on component initialization
  ngOnInit(): void {
    this.selectedOption = this.optionsofeffectedfield[0];
    // this.configmap();
  }
  // Handle changes in the time selection radio buttons
  onSelectionChange(value: string) {
    console.log(value);
    // this.showRCP = value === "Future";
    if (value === "Future") {
      this.showRCP = true;
    }
    if (value === "Historical") {
      this.showRCP = false;
    }
  }
  // Toggle the dropdown menu
  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
  // Select an option from the dropdown
  selectOption(option: any) {
    this.selectedOption = option;
    console.log(option);
  }

  onSelectionChangeHazards(option: any){
    console.log(option);
    const Hazardsvalue = option;

    function hasValueAssigned(variable: string) {
      return !!variable;
    }

    this.Hazardsvalue = hasValueAssigned(Hazardsvalue)
    this.showriskbuttonactive(this.VulnerabilitValue, this.Exposurevalue, this.Hazardsvalue)
  }
  // Handle changes in hazard options checkboxes
  onSelectionChangehazardoptions(index: number, event: Event): void {
    const selectedOptionsForExposure = this.selectedOptionsForExposure;
    selectedOptionsForExposure.at(index).setValue((<HTMLInputElement>event.target).checked);
    console.log('Selected values:', this.checkboxForm.value.selectedOptionsForExposure);
    const arr = this.checkboxForm.value.selectedOptionsForExposure;
    this.Exposurevalue = arr.includes(true);
    console.log(this.Exposurevalue);
    this.showriskbuttonactive(this.VulnerabilitValue, this.Exposurevalue, this.Hazardsvalue)
  }
  // Handle changes in vulnerability options checkboxes
  onSelectionChangeVulnerabilityoptions(index: number, event: Event): void {
    const selectedOptionsforVulnerability = this.selectedOptionsforVulnerability;
    selectedOptionsforVulnerability.at(index).setValue((<HTMLInputElement>event.target).checked);
    console.log('Selected values:', this.checkboxFormVulnerability.value.selectedOptionsforVulnerability);

    const arr = this.checkboxFormVulnerability.value.selectedOptionsforVulnerability;
    this.VulnerabilitValue = arr.includes(true);
    console.log(this.VulnerabilitValue); // Output: true
    this.showriskbuttonactive(this.VulnerabilitValue, this.Exposurevalue, this.Hazardsvalue)

  }

  showriskbuttonactive(VulnerabilitValue: boolean, Exposurevalue: boolean, Hazardsvalue: boolean) {
    console.log(VulnerabilitValue, Exposurevalue, Hazardsvalue); 
    var allValuesTrue = VulnerabilitValue && Exposurevalue && Hazardsvalue;
    console.log('All values are true:', allValuesTrue);
    if (allValuesTrue) {
      this.isButtonDisabled = false
    } else {
       this.isButtonDisabled = true;
    }
}

  showriskbutton() {
    console.log("show risk button");
  }
}
