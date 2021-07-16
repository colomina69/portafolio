import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductoDescripcion } from '../interfaces/producto-descripcion.interface';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando:boolean=true;
  productos:Producto[]=[];
  productosFiltrado:Producto[]=[];

  constructor(private http:HttpClient) {
    this.cargarProductos();
   }


  private cargarProductos(){

      return new Promise<void>((resolve,reject)=>{
        this.http.get<Producto[]>('https://angular-html-54801-default-rtdb.europe-west1.firebasedatabase.app/productos_idx.json')
                .subscribe(resp=>{
                  this.productos=resp;
                  this.cargando=false;
                  resolve();
                });

      });

  }

  getProducto(id:string){
    return this.http.get<ProductoDescripcion>(`https://angular-html-54801-default-rtdb.europe-west1.firebasedatabase.app/productos/${id}.json`);
  }
  buscarProducto(termino:string){
    if(this.productos.length===0){
      this.cargarProductos().then(()=>{
        this.filtrarProductos(termino);
      })

    }else{
      this.filtrarProductos(termino);
    }  
  }
  private filtrarProductos(termino:string){
   
    this.productosFiltrado=[];
    termino=termino.toLocaleLowerCase();
    this.productos.forEach(prod=>{
      const tituloLower=prod.titulo.toLocaleLowerCase();
      if(prod.categoria.indexOf(termino)>=0 || tituloLower.indexOf(termino)>=0){
        this.productosFiltrado.push(prod);
      }
    })
    
  }
}
