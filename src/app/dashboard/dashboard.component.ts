import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { ChecklistService } from 'src/services/checklist.service';
import { IrritantService } from 'src/services/irritant.service';
import { IdeeService } from 'src/services/idee.service';
import { StandardService } from 'src/services/standard.service';
import { ZoneService } from 'src/services/zone.service';
import { DataBaseService } from 'src/services/database.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
    @ViewChild('irritantAreaChart') irritantAreaChart!: ElementRef<HTMLCanvasElement>;
    irrChartArea!: Chart;

    @ViewChild('irritantPieChart') irritantPieChart!: ElementRef<HTMLCanvasElement>;
    irrChartPie!: Chart;

    @ViewChild('zonesIrritantAreaChart') zonesIrritantAreaChart!: ElementRef<HTMLCanvasElement>;
    zonesIrrChartArea!: Chart;

    @ViewChild('zonesIrritantPieChart') zonesIrritantPieChart!: ElementRef<HTMLCanvasElement>;
    zonesIrrChartPie!: Chart;

    @ViewChild('suggestionAreaChart') suggestionAreaChart!: ElementRef<HTMLCanvasElement>;
    sgChartArea!: Chart;

    @ViewChild('suggestionPieChart') suggestionPieChart!: ElementRef<HTMLCanvasElement>;
    sgChartPie!: Chart;

    nombreTachesATraiter: any;
    processingRateIrritant: any;
    bgColorTypeIrritant: any;
    borderTypeIrritant: any;
    textColorIrritant: any;
    emojiIrritant: any;


    borderTypeTachesATraiter: any;
    textColorTachesATraiter: any;
    emojiTachesATraiter: any;

    suggestionProcessingRate: any;
    bgColorTypeSuggestion: any;
    borderTypeSuggestion: any;
    textColorSuggestion: any;
    emojiSuggestion: any;

    nombreStandards: any;
    borderTypeStandards: any;
    textColorStandards: any;
    emojiStandards: any;

    nbIrritantsATraiter: number = 0;
    nbIrritantsEnCours: number = 0;
    nbIrritantsSoldes: number = 0;
    totalIrritantAnnuel: number = 0;

    totalIdeesAnnuel: number = 0;
    nbIdeesATraiter: number = 0;
    nbIdeesEnEtude: number = 0;
    nbIdeesAcceptees: number = 0;
    nbIdeesNonRetenues: number = 0;
    currentYear: number
    anneesList: any[]
    months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aout', 'Sept', 'Oct', 'Nov', 'Déc',]
    motifs: any = []
    valeurs: any = []

    varIrritantChartArea: any
    varIrritantChartPiedata: any
    varZoneChartArea: any
    varSgChartArea: any
    varSgChartPiedata: any


    constructor(private checklistServ: ChecklistService,
        private irrService: IrritantService,
        private ideeService: IdeeService,
        private standardService: StandardService,
        private zoneService: ZoneService,
        private dataBaseService: DataBaseService, private router: Router) {
        if (localStorage.getItem("accessToken") == null) {
            this.router.navigate(['/home'])
        }
    }


    ngAfterViewInit(): void {
        this.irrChartAreaInit(this.currentYear)
        this.irrChartPieInit(this.currentYear)
        this.sgChartAreaInit(this.currentYear)
        this.sgChartPieInit(this.currentYear)
        this.nbIrrByZoneChartAreaInit(this.currentYear)
    }

    ngOnInit(): void {
        this.currentYear = new Date().getFullYear()
        this.getNombreTachesATraiter()
        this.getProcesingRate()
        this.getSuggestionsProcessingRate()
        this.getStandardsMoisCourant()
        this.anneesListInit()
        this.getSortedCategoriesIrritant(this.currentYear)

    }

    /* liste les années sélectionnables */
    anneesListInit() {
        this.anneesList = []
        var currentYear = new Date().getFullYear()
        for (var i = currentYear; i > 2017; i--) {
            this.anneesList.push(i)
        }
    }

    /* mise à jour des données en fonction de l'année sélectionnée */
    selectYear(year: number) {

        this.varIrritantChartArea.destroy()
        this.varIrritantChartPiedata.destroy()
        this.varSgChartArea.destroy()
        this.varSgChartPiedata.destroy()
        this.varZoneChartArea.destroy()
        this.nbIdeesEnEtude = 0
        this.nbIdeesAcceptees = 0
        this.nbIdeesNonRetenues = 0
        this.nbIdeesATraiter = 0
        this.nbIrritantsATraiter = 0
        this.nbIrritantsEnCours = 0
        this.nbIrritantsSoldes = 0

        this.irrChartAreaInit(year)
        this.irrChartPieInit(year)
        this.sgChartAreaInit(year)
        this.sgChartPieInit(year)
        this.nbIrrByZoneChartAreaInit(year)
        this.getSortedCategoriesIrritant(year)
    }

    /* nombre de standards publiés ce mois*/
    getStandardsMoisCourant() {
        this.standardService.getstandardsMoisCourant().subscribe((data) => {
            this.colorManagement(data, 'standard')
        }
        )
    }

    /* nombre de taches à traiter issues des checklist de ctrl*/
    getNombreTachesATraiter() {
        this.checklistServ.getNombreTachesATraiter().subscribe((data) => {
            this.colorManagement(data, 'tache')
        })
    }



    /* % de traitement des suggestions */
    getProcesingRate() {
        this.irrService.getIrritantProcessingRate().subscribe((data) => {
            this.colorManagement(data, 'irritant')
        })
    }

    /* % de traitement des suggestions */
    getSuggestionsProcessingRate() {
        this.ideeService.getSuggestionsProcessingRate().subscribe((data) => {
            this.colorManagement(data, 'suggestion')
        })
    }

    /* graphique nombre d'irritants par mois (bars) */
    irrChartAreaInit(year: number) {
        this.irrService.getNbreIrritantsParMois(year).subscribe((data: any[]) => {
            this.varIrritantChartArea = this.generateChartAreaInit(this.irrChartArea, this.irritantAreaChart, data)
        })
    }

    /* graphique de la répartition des irritants par status (rond) */
    irrChartPieInit(year: number) {
        this.irrService.getIrritantsCurrentYear(year).subscribe((data) => {
            this.varIrritantChartPiedata = this.generateChartPieInit(this.irrChartPie, this.irritantPieChart, data, 'irr')
        })
    }

    /* graphique nb irr par zones (bars) */
    nbIrrByZoneChartAreaInit(year: number) {
        this.zoneService.getZonesSortedByNbIrritant(year).subscribe((data) => {
            this.varZoneChartArea = this.generateSortedZonesChart(this.zonesIrrChartArea, this.zonesIrritantAreaChart, data)
        })
    }

    /* graphique nombre de suggestions par mois (bars) */
    sgChartAreaInit(year: number) {
        this.ideeService.getNbreIdeesParMois(year).subscribe((data) => {
            this.varSgChartArea = this.generateChartAreaInit(this.sgChartArea, this.suggestionAreaChart, data)
        })
    }

    /* graphique de la répartition des suggestion par status (rond) */
    sgChartPieInit(year: number) {
        this.ideeService.getIdeesCurrentYear(year).subscribe((data) => {
            this.varSgChartPiedata = this.generateChartPieInit(this.sgChartPie, this.suggestionPieChart, data, 'sg')
        })
    }

    /* top 5 des motifs d'irritants */
    getSortedCategoriesIrritant(annee: number) {
        this.irrService.getSortedCategoriesIrritant(annee).subscribe((data) => {
            this.motifs = Object.keys(data)
            this.valeurs = Object.values(data)
        })
    }

    /* générer un fichier xlsx de la database */
    generateDB() {
        this.dataBaseService.exportDataBase().subscribe((data) => {
            window.location.href = data[0]
        })
    }



    /****************************************************************************************
    *******************************FONCTION FACTORISEES**************************************
    *****************************************************************************************/


    /*création des graphes à bar (Area Chart)*/
    generateChartAreaInit(varChartArea: any, htmlElement: any, data: any): any {
        return varChartArea = new Chart(htmlElement.nativeElement, {
            type: 'bar',
            data: {
                labels: this.months,
                datasets: [
                    {
                        label: 'Occurences',
                        lineTension: 0.3,
                        backgroundColor: '#B8E9FF',
                        borderColor: 'rgba(78, 115, 223, 1)',
                        pointRadius: 3,
                        pointBackgroundColor: 'rgba(2,117,216,1)',
                        pointBorderColor: 'rgba(2,117,216,1)',
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(2,117,216,1)',
                        pointHitRadius: 50,
                        pointBorderWidth: 2,
                        data: [
                            data[0],//jan
                            data[1],//fev
                            data[2],//mar
                            data[3],//avr
                            data[4],//mai
                            data[5],//juin
                            data[6],//juil
                            data[7],//aout
                            data[8],//sept
                            data[9],//oct
                            data[10],//nov
                            data[11]//dec
                        ],
                    },
                ],
            },
            options: {
                scales: {
                    xAxes: [
                        {
                            time: {
                                unit: 'month',
                            },
                            gridLines: {
                                display: false,
                                drawBorder: false
                            },
                            ticks: {
                                maxTicksLimit: 13,
                            },
                        },
                    ],
                    yAxes: [
                        {
                            ticks: {
                                min: 0,
                                max: data[12],//max
                                maxTicksLimit: 5,

                            },
                            gridLines: {
                                color: "rgb(234, 236, 244)",
                                zeroLineColor: "rgb(234, 236, 244)",
                                drawBorder: false,
                                borderDash: [2],
                                zeroLineBorderDash: [2]
                            },
                        },
                    ],
                },
                legend: {
                    display: false,
                },
            },
        });
    }

    /*création des graphes à bar (Area Chart)*/
    generateSortedZonesChart(varChartArea: any, htmlElement: any, data: any): any {
        var dataKeys = []
        var dataValues = []
        dataKeys = Object.keys(data)
        dataValues = Object.values(data)

        if (dataKeys.length > 5) {
            while (dataKeys.length > 5) {
                dataKeys.pop()
                dataValues.pop()
            }
        }
        return varChartArea = new Chart(htmlElement.nativeElement, {
            type: 'bar',
            data: {
                labels: dataKeys,
                datasets: [
                    {
                        label: 'Occurences',
                        lineTension: 0.3,
                        backgroundColor: '#B8E9FF',
                        borderColor: 'rgba(78, 115, 223, 1)',
                        pointRadius: 3,
                        pointBackgroundColor: 'rgba(2,117,216,1)',
                        pointBorderColor: 'rgba(2,117,216,1)',
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(2,117,216,1)',
                        pointHitRadius: 50,
                        pointBorderWidth: 2,
                        data: dataValues,
                    },
                ],
            },
            options: {
                scales: {
                    xAxes: [
                        {
                            time: {
                                unit: 'month',
                            },
                            gridLines: {
                                display: false,
                                drawBorder: false
                            },
                            ticks: {
                                maxTicksLimit: 13,
                            },
                        },
                    ],
                    yAxes: [
                        {
                            ticks: {
                                min: 0,
                                //max: data[12],//max
                                maxTicksLimit: 5,

                            },
                            gridLines: {
                                color: "rgb(234, 236, 244)",
                                zeroLineColor: "rgb(234, 236, 244)",
                                drawBorder: false,
                                borderDash: [2],
                                zeroLineBorderDash: [2]
                            },
                        },
                    ],
                },
                legend: {
                    display: false,
                },
            },
        });
    }

    /*création des graphiques circulaires (Pie Chart)*/
    generateChartPieInit(varChartPiedata: any, htmlEltPieChart: any, data: object, type: string): any {
        var dataArr = Object.values(data)
        var labelsArray = []
        var dataArray = []

        if (type === 'sg') {
            this.totalIdeesAnnuel = dataArr.length;
            for (var i = 0; i < dataArr.length; i++) {
                if (dataArr[i].status == "A traiter") { this.nbIdeesATraiter++ }
                if (dataArr[i].status == "En étude") { this.nbIdeesEnEtude++ }
                if (dataArr[i].status == "Acceptée") { this.nbIdeesAcceptees++ }
                if (dataArr[i].status == "Non retenue") { this.nbIdeesNonRetenues++ }
            }
            labelsArray = ['A traiter', 'En étude', 'Acceptées']
            dataArray = [this.nbIdeesATraiter, this.nbIdeesEnEtude, this.nbIdeesAcceptees]
        }

        if (type === 'irr') {
            this.totalIrritantAnnuel = dataArr.length;
            for (var i = 0; i < dataArr.length; i++) {
                if (dataArr[i].status == "A traiter") { this.nbIrritantsATraiter++ }
                if (dataArr[i].status == "En cours") { this.nbIrritantsEnCours++ }
                if (dataArr[i].status == "Soldé") { this.nbIrritantsSoldes++ }
            }
            labelsArray = ['A traiter', 'En cours', 'Soldés']
            dataArray = [this.nbIrritantsATraiter, this.nbIrritantsEnCours, this.nbIrritantsSoldes]
        }

        return varChartPiedata = new Chart(htmlEltPieChart.nativeElement, {
            type: 'doughnut',
            data: {
                labels: labelsArray,
                datasets: [
                    {
                        data: dataArray,
                        backgroundColor: ['#4e73df', '#36b9cc', '#1cc88a'],
                        hoverBackgroundColor: ['#2e59d9', '#2c9faf', '#17a673'],
                        hoverBorderColor: "rgba(234, 236, 244, 1)",
                    },
                ],
            },
            options: {
                maintainAspectRatio: false,
                tooltips: {
                    backgroundColor: "rgb(255,255,255)",
                    bodyFontColor: "#858796",
                    borderColor: '#dddfeb',
                    borderWidth: 1,
                    xPadding: 15,
                    yPadding: 15,
                    displayColors: false,
                    caretPadding: 10,
                },
                legend: {
                    display: false
                },
                cutoutPercentage: 80,
            },
        });
    }


    /*gestion des couleurs selon le niveau des données*/
    colorManagement(data: any, type: string) {
        if (type === 'standard') {
            this.nombreStandards = data;
            if (data > 2) {
                this.borderTypeStandards = "border-left-success"
                this.textColorStandards = "text-success"
                this.emojiStandards = "fa-grin-alt text-success"
            }
            if (data > 0 && data <= 2) {
                this.borderTypeStandards = "border-left-warning"
                this.textColorStandards = "text-warning"
                this.emojiStandards = "fa-meh text-warning"
            }
            if (data < 1) {
                this.borderTypeStandards = "border-left-danger"
                this.textColorStandards = "text-danger"
                this.emojiStandards = "fa-frown text-danger"
            }
        }

        if (type === 'tache') {
            this.nombreTachesATraiter = data;
            if (data >= 10) {
                this.borderTypeTachesATraiter = "border-left-danger"
                this.textColorTachesATraiter = "text-danger"
                this.emojiTachesATraiter = "fa-frown text-danger"
            }
            if (data > 0 && data < 10) {
                this.borderTypeTachesATraiter = "border-left-warning"
                this.textColorTachesATraiter = "text-warning"
                this.emojiTachesATraiter = "fa-meh text-warning"
            }
            if (data < 1) {
                this.borderTypeTachesATraiter = "border-left-success"
                this.textColorTachesATraiter = "text-success"
                this.emojiTachesATraiter = "fa-grin-alt text-success"
            }
        }

        if (type === 'irritant') {
            this.processingRateIrritant = data;
            if (data < 50) {
                this.bgColorTypeIrritant = "bg-danger"
                this.borderTypeIrritant = "border-left-danger"
                this.textColorIrritant = "text-danger"
                this.emojiIrritant = "fa-frown text-danger"
            }
            if (data >= 50 && data < 80) {
                this.bgColorTypeIrritant = "bg-warning"
                this.borderTypeIrritant = "border-left-warning"
                this.textColorIrritant = "text-warning"
                this.emojiIrritant = "fa-meh text-warning"
            }
            if (data >= 80) {
                this.bgColorTypeIrritant = "bg-success"
                this.borderTypeIrritant = "border-left-success"
                this.textColorIrritant = "text-success"
                this.emojiIrritant = "fa-grin-alt text-success"
            }
        }

        if (type === 'suggestion') {
            this.suggestionProcessingRate = data
            if (data < 50) {
                this.bgColorTypeSuggestion = "bg-danger"
                this.borderTypeSuggestion = "border-left-danger"
                this.textColorSuggestion = "text-danger"
                this.emojiSuggestion = "fa-frown text-danger"
            }
            if (data >= 50 && data < 80) {
                this.bgColorTypeSuggestion = "bg-warning"
                this.borderTypeSuggestion = "border-left-warning"
                this.textColorSuggestion = "text-warning"
                this.emojiSuggestion = "fa-meh text-warning"
            }
            if (data >= 80) {
                this.bgColorTypeSuggestion = "bg-success"
                this.borderTypeSuggestion = "border-left-success"
                this.textColorSuggestion = "text-success"
                this.emojiSuggestion = "fa-grin-alt text-success"
            }
        }
    }

}
