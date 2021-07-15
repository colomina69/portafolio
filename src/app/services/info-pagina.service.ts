import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {
  info:InfoPagina={};
  cargada=false;
  equipo:any[]=[];
  
  
  constructor(private http:HttpClient) { 
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo(){
    this.http.get<InfoPagina>('assets/data/data-pagina.json')
            .subscribe(resp=>{
              this.cargada=true;
              this.info=resp;
            
            });
  }
  private cargarEquipo(){
    this.http.get<any>('https://angular-html-54801-default-rtdb.europe-west1.firebasedatabase.app/equipo.json')
    .subscribe(resp=>{
      this.cargada=true;
      this.equipo=resp;
    
    });
  }

}
