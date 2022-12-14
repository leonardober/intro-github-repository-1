import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ModeloIdentificar } from '../modelos/identificar.modelo';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {
   url='http://localhost:3000';
   datosUsuarioEnSesion = new BehaviorSubject<ModeloIdentificar>(new ModeloIdentificar());

  constructor(private http: HttpClient) { 
  this.VerificarSesionActual();
  }
  VerificarSesionActual(){
    let datos = this.ObtenerInformacionSesion();
    if(datos){
      this.datosUsuarioEnSesion.next(datos);
    }

  }

  OptenerDatosUsuarioEnSesion(){
    return this.datosUsuarioEnSesion.asObservable();
  }

  Identificar(usuario: string, clave: string): Observable<ModeloIdentificar>{
   
    return this.http.post<ModeloIdentificar>("${this.url}/IdentificarUsuario",{
      usuario: usuario,
      clave: clave

    },{
      headers: new HttpHeaders({

      })
    })
  }
  AmacenarSesion(datos: ModeloIdentificar){

    let stringDatos = JSON.stringify(datos);
   localStorage.setItem("datosSesion", stringDatos);
  }
  ObtenerInformacionSesion(){
    let datosString = localStorage.getItem("datosSesion");
    if(datosString){
      let datos = JSON.parse(datosString);
      return datos;
    }else{
      return null;
    }
  }
  EliminarInformacionSesion(){
    localStorage.removeItem("datosSesion");
  }
  seHaIniciadoSesion(){
    let datosString = localStorage.getItem("datosSesion");
    return datosString;
  }
}
