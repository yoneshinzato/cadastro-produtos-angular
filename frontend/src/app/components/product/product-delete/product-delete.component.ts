import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {
  product!: Product


  constructor(private productService: ProductService,
        private router: Router,
        private route: ActivatedRoute) { }

  //ao entrar na tela para deletar o formulário, dados já estarão preenchidos
  //pega id do produto que selecionou pra excluir
    //subscribe recebe os dados do produt
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.productService.readById(id)
      .subscribe((product) => {
        this.product = product
      })
  }

  deleteProduct(): void {
    this.productService.delete(this.product.id)
      .subscribe(() => {
        this.productService.showMessage("Produto excluído com sucesso!")
        this.router.navigate(['/products'])
      })
  }

  cancel(): void {
    this.router.navigate(['/products'])
  }

}
