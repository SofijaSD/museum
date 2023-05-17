import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BirajObilazakComponent } from '@app/biraj-obilazak/biraj-obilazak.component';
import { User } from '@app/_models';
import { Obilazak } from '@app/_models/obilazak';
import { AccountService, AlertService } from '@app/_services';
import { PlanerService } from '@app/_services/planer.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-sve-postavke',
  templateUrl: './sve-postavke.component.html',
  styleUrls: ['./sve-postavke.component.css']
})
export class SvePostavkeComponent implements OnInit {

  id: string | any;
  vraceniObilasci: any;
  eksponati = [];
  user: User;

  constructor(private route: ActivatedRoute, public dialog: MatDialog, private planerService: PlanerService,private _snackBar: MatSnackBar, private accountService:AccountService,
    private router: Router, private alertService: AlertService) { 
      this.accountService.user.subscribe(x => this.user = x);
    }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.planerService.getObilazak(this.id)
    .pipe(first())
    .subscribe(obilasci => this.vraceniObilasci = obilasci);
  }

  postavke = [
    { uq: "1", url: "assets/images/1.png", naziv: " Paleolit i Mezolit ",  eksponati: "skulpture", brEksponata: "3", cena: 200, vreme: 30, link: "/jedan" },
    { uq: "2", url: "assets/images/2.png", naziv: " Lepenski Vir ", eksponati: "skulpture", brEksponata: "5", cena: 500, vreme: 50, link: "/dva" },
    { uq: "16", url: "assets/images/3.png", naziv: " Stariji neolit ",  eksponati: "skulpture", brEksponata: "7", cena: 350, vreme: 40, link: "/tri" },
    { uq: "3", url: "assets/images/4.png", naziv: " Mlađi neolit i eneolit ", eksponati: "skulpture", brEksponata: "4", cena: 450, vreme: 80, link: "/cetiri" },
    { uq: "4", url: "assets/images/5.png", naziv: " Bronzano doba ", eksponati: "skulpture", brEksponata: "3", cena: 200, vreme: 30, link: "/pet" },
    { uq: "5", url: "assets/images/6.png", naziv: " Gvozdeno doba  ", eksponati: "skulpture", brEksponata: "5", cena: 500, vreme: 50, link: "/sest" },
    { uq: "6", url: "assets/images/7.png", naziv: " Đerdap  ",  eksponati: "skulpture", brEksponata: "7", cena: 350, vreme: 40, link: "/sedam" },
    { uq: "7", url: "assets/images/8.png", naziv: " Srpsko slikarstvo 18. i 19. veka ", eksponati: "slike", brEksponata: "4", cena: 450, vreme: 80, link: "/osam" },
    { uq: "8", url: "assets/images/9.jpg", naziv: " Crteži i grafike srpskih autora 18. i 19. veka  ", eksponati: "grafikaIcrtezi", brEksponata: "3", cena: 200, vreme: 30, link: "/devet" },
    { uq: "9", url: "assets/images/10.png", naziv: " Jugoslovensko slikarstvo 20. veka  ", eksponati: "slike", brEksponata: "5", cena: 500, vreme: 50, link: "/deset" },
    { uq: "10", url: "assets/images/11.png", naziv: " Crteži i grafike jugoslovenskih autora   ",  eksponati: "grafikaIcrtezi", brEksponata: "7", cena: 350, vreme: 40, link: "/jedanaest" },
    { uq: "11", url: "assets/images/12.png", naziv: " Jugoslovenska skulptura ", eksponati: "skulpture", brEksponata: "4", cena: 450, vreme: 80, link: "/dvanaest" },
    { uq: "12", url: "assets/images/13.png", naziv: " Strana umetnost  ", eksponati: "slike", brEksponata: "3", cena: 200, vreme: 30, link: "/trinaest" },
    { uq: "13", url: "assets/images/14.png", naziv: " Crteži i grafike stranih umetnika  ", eksponati: "grafikaIcrtezi", brEksponata: "5", cena: 500, vreme: 50, link: "/cetrnaest" },
    { uq: "14", url: "assets/images/15.png", naziv: " Novac, medalje i odlikovanja ",  eksponati: "skulpture", brEksponata: "7", cena: 350, vreme: 40, link: "/petnaest" },
    { uq: "15", url: "assets/images/16.png", naziv: " Nadežda i Rastko Petrović", eksponati: "slike", brEksponata: "4", cena: 450, vreme: 80, link: "/sesnaest" },
    { uq: "16", url: "assets/images/17.png", naziv: " Vuk i Dositej ", eksponati: "skulpture", brEksponata: "3", cena: 200, vreme: 30, link: "/sedamnaest" },
    { uq: "17", url: "assets/images/18.png", naziv: " Rani srednji vek  ", eksponati: "skulpture", brEksponata: "5", cena: 500, vreme: 50, link: "/osamnaest" },
    { uq: "18", url: "assets/images/19.png", naziv: " Pozni srednji vek  ",  eksponati: "slike", brEksponata: "7", cena: 350, vreme: 40, link: "/devetnaest" },
    { uq: "19", url: "assets/images/20.png", naziv: " Srpska i vizantijska umetnost ", eksponati: "skulpture", brEksponata: "4", cena: 450, vreme: 80, link: "/dvadeset" }
  ];

  tekst: any;

  addIzlozbaToObilazak(izlozba: any) {

    if(!this.user){
      this._snackBar.open("Morate biti ulogovani!", "",  {duration: 2500});}else{


    let dialogRef = this.dialog.open(BirajObilazakComponent, {
      data: { prosledjenID: this.id }
    });

    let prosledjenoImeObilaska;

    let izabranObilazak;

    this.planerService.getObilazak(this.id)
    .pipe(first())
    .subscribe(obilasci => this.vraceniObilasci = obilasci);

    dialogRef.afterClosed().subscribe((result) => {

    prosledjenoImeObilaska = result

   
    if (this.vraceniObilasci.find(x => x.naziv === prosledjenoImeObilaska)) {

      izabranObilazak = this.vraceniObilasci.filter( x=> x.naziv === prosledjenoImeObilaska)

      izabranObilazak.id = izabranObilazak.map( x=> x.id)

      this.planerService.addToObilazak(this.id, izabranObilazak.id, izlozba)
      .pipe(first())
      .subscribe({
          next: () => {
              this.alertService.success('Izlozba je dodata!');
          },
          error: error => {
              this.alertService.error(error);
          }
      });

      this.planerService.getObilazak(this.id)
      .pipe(first())
      .subscribe(obilasci => this.vraceniObilasci = obilasci);


    } else {

       if(prosledjenoImeObilaska != undefined){

          let obilazak = new Obilazak();

          obilazak.izlozbe = [];

          obilazak.naziv = prosledjenoImeObilaska;
          obilazak.izlozbe.push(izlozba);

          // zovemo create new obilazak
          this.planerService.createNewObilazak(this.id, obilazak)
          .pipe(first())
          .subscribe({
              next: () => {
                  this.alertService.success('Obilazak je kreiran uspesno !');
              },
              error: error => {
                  this.alertService.error(error);
              }
          });
        }
      }
    });
  }
  }


  sortiraj(nesto: any) {

    if(nesto === "vreme"){

      console.log( "Vreme radi ")
      this.postavke = this.postavke.sort((a, b) => (a.vreme < b.vreme) ? -1 : 1);
      return this.postavke;

    }else if(nesto === "cena"){

      console.log( "cena radi")
      this.postavke = this.postavke.sort((a, b) => (a.cena < b.cena) ? -1 : 1);
      return this.postavke;

    }
}



    

 /* Vrste eksponata filter*/
  doFilter1(typecc: String) {
  console.log(typecc);
  var tofilter1 = [
    { uq: "1", url: "assets/images/1.png", naziv: " Paleolit i Mezolit ",  eksponati: "skulpture", brEksponata: "3", cena: 200, vreme: 30, link: "/jedan" },
    { uq: "2", url: "assets/images/2.png", naziv: " Lepenski Vir ", eksponati: "skulpture", brEksponata: "5", cena: 500, vreme: 50, link: "/dva" },
    { uq: "16", url: "assets/images/3.png", naziv: " Stariji neolit ",  eksponati: "skulpture", brEksponata: "7", cena: 350, vreme: 40, link: "/tri" },
    { uq: "3", url: "assets/images/4.png", naziv: " Mlađi neolit i eneolit ", eksponati: "skulpture", brEksponata: "4", cena: 450, vreme: 80, link: "/cetiri" },
    { uq: "4", url: "assets/images/5.png", naziv: " Bronzano doba ", eksponati: "skulpture", brEksponata: "3", cena: 200, vreme: 30, link: "/pet" },
    { uq: "5", url: "assets/images/6.png", naziv: " Gvozdeno doba  ", eksponati: "skulpture", brEksponata: "5", cena: 500, vreme: 50, link: "/sest" },
    { uq: "6", url: "assets/images/7.png", naziv: " Đerdap  ",  eksponati: "skulpture", brEksponata: "7", cena: 350, vreme: 40, link: "/sedam" },
    { uq: "7", url: "assets/images/8.png", naziv: " Srpsko slikarstvo 18. i 19. veka ", eksponati: "slike", brEksponata: "4", cena: 450, vreme: 80, link: "/osam" },
    { uq: "8", url: "assets/images/9.jpg", naziv: " Crteži i grafike srpskih autora 18. i 19. veka  ", eksponati: "grafikaIcrtezi", brEksponata: "3", cena: 200, vreme: 30, link: "/devet" },
    { uq: "9", url: "assets/images/10.png", naziv: " Jugoslovensko slikarstvo 20. veka  ", eksponati: "slike", brEksponata: "5", cena: 500, vreme: 50, link: "/deset" },
    { uq: "10", url: "assets/images/11.png", naziv: " Crteži i grafike jugoslovenskih autora   ",  eksponati: "grafikaIcrtezi", brEksponata: "7", cena: 350, vreme: 40, link: "/jedanaest" },
    { uq: "11", url: "assets/images/12.png", naziv: " Jugoslovenska skulptura ", eksponati: "skulpture", brEksponata: "4", cena: 450, vreme: 80, link: "/dvanaest" },
    { uq: "12", url: "assets/images/13.png", naziv: " Strana umetnost  ", eksponati: "slike", brEksponata: "3", cena: 200, vreme: 30, link: "/trinaest" },
    { uq: "13", url: "assets/images/14.png", naziv: " Crteži i grafike stranih umetnika  ", eksponati: "grafikaIcrtezi", brEksponata: "5", cena: 500, vreme: 50, link: "/cetrnaest" },
    { uq: "14", url: "assets/images/15.png", naziv: " Novac, medalje i odlikovanja ",  eksponati: "skulpture", brEksponata: "7", cena: 350, vreme: 40, link: "/petnaest" },
    { uq: "15", url: "assets/images/16.png", naziv: " Nadežda i Rastko Petrović", eksponati: "slike", brEksponata: "4", cena: 450, vreme: 80, link: "/sesnaest" },
    { uq: "16", url: "assets/images/17.png", naziv: " Vuk i Dositej ", eksponati: "skulpture", brEksponata: "3", cena: 200, vreme: 30, link: "/sedamnaest" },
    { uq: "17", url: "assets/images/18.png", naziv: " Rani srednji vek  ", eksponati: "skulpture", brEksponata: "5", cena: 500, vreme: 50, link: "/osamnaest" },
    { uq: "18", url: "assets/images/19.png", naziv: " Pozni srednji vek  ",  eksponati: "slike", brEksponata: "7", cena: 350, vreme: 40, link: "/devetnaest" },
    { uq: "19", url: "assets/images/20.png", naziv: " Srpska i vizantijska umetnost ", eksponati: "skulpture", brEksponata: "4", cena: 450, vreme: 80, link: "/dvadeset" }];
  
  
  
  this.postavke = tofilter1.filter(m => m.eksponati == typecc);
  console.log(this.postavke);
  
  
  
  }


  /* Broj eksponata filter */



  doFilter3(typecc: String) {

  console.log(typecc);
  var tofilter1 = [
    { uq: "1", url: "assets/images/1.png", naziv: " Paleolit i Mezolit ",  eksponati: "skulpture", brEksponata: "3", cena: 200, vreme: 30, link: "/jedan" },
    { uq: "2", url: "assets/images/2.png", naziv: " Lepenski Vir ", eksponati: "skulpture", brEksponata: "5", cena: 500, vreme: 50, link: "/dva" },
    { uq: "16", url: "assets/images/3.png", naziv: " Stariji neolit ",  eksponati: "skulpture", brEksponata: "7", cena: 350, vreme: 40, link: "/tri" },
    { uq: "3", url: "assets/images/4.png", naziv: " Mlađi neolit i eneolit ", eksponati: "skulpture", brEksponata: "4", cena: 450, vreme: 80, link: "/cetiri" },
    { uq: "4", url: "assets/images/5.png", naziv: " Bronzano doba ", eksponati: "skulpture", brEksponata: "3", cena: 200, vreme: 30, link: "/pet" },
    { uq: "5", url: "assets/images/6.png", naziv: " Gvozdeno doba  ", eksponati: "skulpture", brEksponata: "5", cena: 500, vreme: 50, link: "/sest" },
    { uq: "6", url: "assets/images/7.png", naziv: " Đerdap  ",  eksponati: "skulpture", brEksponata: "7", cena: 350, vreme: 40, link: "/sedam" },
    { uq: "7", url: "assets/images/8.png", naziv: " Srpsko slikarstvo 18. i 19. veka ", eksponati: "slike", brEksponata: "4", cena: 450, vreme: 80, link: "/osam" },
    { uq: "8", url: "assets/images/9.jpg", naziv: " Crteži i grafike srpskih autora 18. i 19. veka  ", eksponati: "grafikaIcrtezi", brEksponata: "3", cena: 200, vreme: 30, link: "/devet" },
    { uq: "9", url: "assets/images/10.png", naziv: " Jugoslovensko slikarstvo 20. veka  ", eksponati: "slike", brEksponata: "5", cena: 500, vreme: 50, link: "/deset" },
    { uq: "10", url: "assets/images/11.png", naziv: " Crteži i grafike jugoslovenskih autora   ",  eksponati: "grafikaIcrtezi", brEksponata: "7", cena: 350, vreme: 40, link: "/jedanaest" },
    { uq: "11", url: "assets/images/12.png", naziv: " Jugoslovenska skulptura ", eksponati: "skulpture", brEksponata: "4", cena: 450, vreme: 80, link: "/dvanaest" },
    { uq: "12", url: "assets/images/13.png", naziv: " Strana umetnost  ", eksponati: "slike", brEksponata: "3", cena: 200, vreme: 30, link: "/trinaest" },
    { uq: "13", url: "assets/images/14.png", naziv: " Crteži i grafike stranih umetnika  ", eksponati: "grafikaIcrtezi", brEksponata: "5", cena: 500, vreme: 50, link: "/cetrnaest" },
    { uq: "14", url: "assets/images/15.png", naziv: " Novac, medalje i odlikovanja ",  eksponati: "skulpture", brEksponata: "7", cena: 350, vreme: 40, link: "/petnaest" },
    { uq: "15", url: "assets/images/16.png", naziv: " Nadežda i Rastko Petrović", eksponati: "slike", brEksponata: "4", cena: 450, vreme: 80, link: "/sesnaest" },
    { uq: "16", url: "assets/images/17.png", naziv: " Vuk i Dositej ", eksponati: "skulpture", brEksponata: "3", cena: 200, vreme: 30, link: "/sedamnaest" },
    { uq: "17", url: "assets/images/18.png", naziv: " Rani srednji vek  ", eksponati: "skulpture", brEksponata: "5", cena: 500, vreme: 50, link: "/osamnaest" },
    { uq: "18", url: "assets/images/19.png", naziv: " Pozni srednji vek  ",  eksponati: "slike", brEksponata: "7", cena: 350, vreme: 40, link: "/devetnaest" },
    { uq: "19", url: "assets/images/20.png", naziv: " Srpska i vizantijska umetnost ", eksponati: "skulpture", brEksponata: "4", cena: 450, vreme: 80, link: "/dvadeset" }];
    
  if (typecc == '3') {
  this.postavke = tofilter1.filter(d => d.brEksponata == '3');
  } else if (typecc == '3-5') {
  this.postavke = tofilter1.filter(d => d.brEksponata == '4'|| d.brEksponata == '5');
  } else {
  this.postavke = tofilter1.filter(d => d.brEksponata == '6' || d.brEksponata == '7');
  }
  
  
  
  console.log(this.postavke);
  
  
  
  }



  restartFilters() {
    this.postavke = [  { uq: "1", url: "assets/images/1.png", naziv: " Paleolit i Mezolit ",  eksponati: "skulpture", brEksponata: "3", cena: 200, vreme: 30, link: "/jedan" },
    { uq: "2", url: "assets/images/2.png", naziv: " Lepenski Vir ", eksponati: "skulpture", brEksponata: "5", cena: 500, vreme: 50, link: "/dva" },
    { uq: "16", url: "assets/images/3.png", naziv: " Stariji neolit ",  eksponati: "skulpture", brEksponata: "7", cena: 350, vreme: 40, link: "/tri" },
    { uq: "3", url: "assets/images/4.png", naziv: " Mlađi neolit i eneolit ", eksponati: "skulpture", brEksponata: "4", cena: 450, vreme: 80, link: "/cetiri" },
    { uq: "4", url: "assets/images/5.png", naziv: " Bronzano doba ", eksponati: "skulpture", brEksponata: "3", cena: 200, vreme: 30, link: "/pet" },
    { uq: "5", url: "assets/images/6.png", naziv: " Gvozdeno doba  ", eksponati: "skulpture", brEksponata: "5", cena: 500, vreme: 50, link: "/sest" },
    { uq: "6", url: "assets/images/7.png", naziv: " Đerdap  ",  eksponati: "skulpture", brEksponata: "7", cena: 350, vreme: 40, link: "/sedam" },
    { uq: "7", url: "assets/images/8.png", naziv: " Srpsko slikarstvo 18. i 19. veka ", eksponati: "slike", brEksponata: "4", cena: 450, vreme: 80, link: "/osam" },
    { uq: "8", url: "assets/images/9.jpg", naziv: " Crteži i grafike srpskih autora 18. i 19. veka  ", eksponati: "grafikaIcrtezi", brEksponata: "3", cena: 200, vreme: 30, link: "/devet" },
    { uq: "9", url: "assets/images/10.png", naziv: " Jugoslovensko slikarstvo 20. veka  ", eksponati: "slike", brEksponata: "5", cena: 500, vreme: 50, link: "/deset" },
    { uq: "10", url: "assets/images/11.png", naziv: " Crteži i grafike jugoslovenskih autora   ",  eksponati: "grafikaIcrtezi", brEksponata: "7", cena: 350, vreme: 40, link: "/jedanaest" },
    { uq: "11", url: "assets/images/12.png", naziv: " Jugoslovenska skulptura ", eksponati: "skulpture", brEksponata: "4", cena: 450, vreme: 80, link: "/dvanaest" },
    { uq: "12", url: "assets/images/13.png", naziv: " Strana umetnost  ", eksponati: "slike", brEksponata: "3", cena: 200, vreme: 30, link: "/trinaest" },
    { uq: "13", url: "assets/images/14.png", naziv: " Crteži i grafike stranih umetnika  ", eksponati: "grafikaIcrtezi", brEksponata: "5", cena: 500, vreme: 50, link: "/cetrnaest" },
    { uq: "14", url: "assets/images/15.png", naziv: " Novac, medalje i odlikovanja ",  eksponati: "skulpture", brEksponata: "7", cena: 350, vreme: 40, link: "/petnaest" },
    { uq: "15", url: "assets/images/16.png", naziv: " Nadežda i Rastko Petrović", eksponati: "slike", brEksponata: "4", cena: 450, vreme: 80, link: "/sesnaest" },
    { uq: "16", url: "assets/images/17.png", naziv: " Vuk i Dositej ", eksponati: "skulpture", brEksponata: "3", cena: 200, vreme: 30, link: "/sedamnaest" },
    { uq: "17", url: "assets/images/18.png", naziv: " Rani srednji vek  ", eksponati: "skulpture", brEksponata: "5", cena: 500, vreme: 50, link: "/osamnaest" },
    { uq: "18", url: "assets/images/19.png", naziv: " Pozni srednji vek  ",  eksponati: "slike", brEksponata: "7", cena: 350, vreme: 40, link: "/devetnaest" },
    { uq: "19", url: "assets/images/20.png", naziv: " Srpska i vizantijska umetnost ", eksponati: "skulpture", brEksponata: "4", cena: 450, vreme: 80, link: "/dvadeset" }];
    
  }



  /* Search filter */

  searchFilter(vrednostIzInputa: string) {

    var tofilter = [  { uq: "1", url: "assets/images/1.png", naziv: " Paleolit i Mezolit ",  eksponati: "skulpture", brEksponata: "3", cena: 200, vreme: 30, link: "/jedan" },
    { uq: "2", url: "assets/images/2.png", naziv: " Lepenski Vir ", eksponati: "skulpture", brEksponata: "5", cena: 500, vreme: 50, link: "/dva" },
    { uq: "16", url: "assets/images/3.png", naziv: " Stariji neolit ",  eksponati: "skulpture", brEksponata: "7", cena: 350, vreme: 40, link: "/tri" },
    { uq: "3", url: "assets/images/4.png", naziv: " Mlađi neolit i eneolit ", eksponati: "skulpture", brEksponata: "4", cena: 450, vreme: 80, link: "/cetiri" },
    { uq: "4", url: "assets/images/5.png", naziv: " Bronzano doba ", eksponati: "skulpture", brEksponata: "3", cena: 200, vreme: 30, link: "/pet" },
    { uq: "5", url: "assets/images/6.png", naziv: " Gvozdeno doba  ", eksponati: "skulpture", brEksponata: "5", cena: 500, vreme: 50, link: "/sest" },
    { uq: "6", url: "assets/images/7.png", naziv: " Đerdap  ",  eksponati: "skulpture", brEksponata: "7", cena: 350, vreme: 40, link: "/sedam" },
    { uq: "7", url: "assets/images/8.png", naziv: " Srpsko slikarstvo 18. i 19. veka ", eksponati: "slike", brEksponata: "4", cena: 450, vreme: 80, link: "/osam" },
    { uq: "8", url: "assets/images/9.jpg", naziv: " Crteži i grafike srpskih autora 18. i 19. veka  ", eksponati: "grafikaIcrtezi", brEksponata: "3", cena: 200, vreme: 30, link: "/devet" },
    { uq: "9", url: "assets/images/10.png", naziv: " Jugoslovensko slikarstvo 20. veka  ", eksponati: "slike", brEksponata: "5", cena: 500, vreme: 50, link: "/deset" },
    { uq: "10", url: "assets/images/11.png", naziv: " Crteži i grafike jugoslovenskih autora   ",  eksponati: "grafikaIcrtezi", brEksponata: "7", cena: 350, vreme: 40, link: "/jedanaest" },
    { uq: "11", url: "assets/images/12.png", naziv: " Jugoslovenska skulptura ", eksponati: "skulpture", brEksponata: "4", cena: 450, vreme: 80, link: "/dvanaest" },
    { uq: "12", url: "assets/images/13.png", naziv: " Strana umetnost  ", eksponati: "slike", brEksponata: "3", cena: 200, vreme: 30, link: "/trinaest" },
    { uq: "13", url: "assets/images/14.png", naziv: " Crteži i grafike stranih umetnika  ", eksponati: "grafikaIcrtezi", brEksponata: "5", cena: 500, vreme: 50, link: "/cetrnaest" },
    { uq: "14", url: "assets/images/15.png", naziv: " Novac, medalje i odlikovanja ",  eksponati: "skulpture", brEksponata: "7", cena: 350, vreme: 40, link: "/petnaest" },
    { uq: "15", url: "assets/images/16.png", naziv: " Nadežda i Rastko Petrović", eksponati: "slike", brEksponata: "4", cena: 450, vreme: 80, link: "/sesnaest" },
    { uq: "16", url: "assets/images/17.png", naziv: " Vuk i Dositej ", eksponati: "skulpture", brEksponata: "3", cena: 200, vreme: 30, link: "/sedamnaest" },
    { uq: "17", url: "assets/images/18.png", naziv: " Rani srednji vek  ", eksponati: "skulpture", brEksponata: "5", cena: 500, vreme: 50, link: "/osamnaest" },
    { uq: "18", url: "assets/images/19.png", naziv: " Pozni srednji vek  ",  eksponati: "slike", brEksponata: "7", cena: 350, vreme: 40, link: "/devetnaest" },
    { uq: "19", url: "assets/images/20.png", naziv: " Srpska i vizantijska umetnost ", eksponati: "skulpture", brEksponata: "4", cena: 450, vreme: 80, link: "/dvadeset" }];
    
    var vvalue = vrednostIzInputa.trim().toLowerCase();
    this.postavke = tofilter.filter(s => ((s.naziv).trim().toLowerCase()).includes(vvalue)); 
    console.log(this.postavke);



  }




}
