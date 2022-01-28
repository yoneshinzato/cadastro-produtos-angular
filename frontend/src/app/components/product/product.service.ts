import { HttpClient } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = "http://localhost:3001/products"

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string, isError: boolean = false):void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }
  //insere um novo produto no backend POST
  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product).pipe(
      //pegar o objeto para tratar o erro
      map(obj => obj),
      //caso ocorra o erro
      catchError(e => this.errorHandler(e))
    )
  }



  //interagir com backend pra ler os dados de produtos GET
  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl).pipe(
      //pegar o objeto para tratar o erro
      map(obj => obj),
      //caso ocorra o erro
      catchError(e => this.errorHandler(e))
    )
  }

  //interagir com backend para ler por id - get de um produto
  readById(id: any): Observable<Product> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Product>(url).pipe(
      //pegar o objeto para tratar o erro
      map(obj => obj),
      //caso ocorra o erro
      catchError(e => this.errorHandler(e))
    )
  }

  //atualização update faz PUT
  update(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${product.id}`
    return this.http.put<Product>(url, product).pipe(
      //pegar o objeto para tratar o erro
      map(obj => obj),
      //caso ocorra o erro
      catchError(e => this.errorHandler(e))
    )
  }

  delete(id: any): Observable<Product> {
    const url = `${this.baseUrl}/${id}`
    return this.http.delete<Product>(url).pipe(
      //pegar o objeto para tratar o erro
      map(obj => obj),
      //caso ocorra o erro
      catchError(e => this.errorHandler(e))
    )
  }

  errorHandler(e: any): Observable<any> {
    //mostra msg e o EMPTY é o retorno de um objeto vazio
    this.showMessage('Ocorreu um erro!', true) //isError = true
    return EMPTY
}

}
