import { Component } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './product';
import { FormBuilder, Validators } from '@angular/forms';
import {MessageService} from 'primeng/api';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  providers: [MessageService]
})
export class ProductComponent {
  product: Product[] = [];
  displayModal = false;
  productForm = this.fb.group({    
    title: ["", Validators.required],
    price: [0, Validators.required],
    category: ["", Validators.required],
    image: ["", Validators.required]   
  });
dt: any;
  constructor(private productService: ProductService,
    private fb: FormBuilder,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.getProductList();
  }
  getProductList() {
    this.productService.getProduct().subscribe(response => {
      //console.log(response);
      this.product = response;
      console.log(this.product);
    })
  }
  showAddModal(){
   this.displayModal = true;
  }
  closeModal(){   
    this.productForm.reset();
    this.displayModal = false;
  }
  addProduct(){
    //console.log(this.productForm.value);
    this.productService.saveProduct(this.productForm.value).subscribe(
      (res: any)=> {
        console.log(res);
        this.product.unshift(res)
        this.closeModal();
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Product added successfully'});
      },
    error =>{
      this.messageService.add({severity:'error', summary: 'Error', detail: error});
      console.log("Error occured");
    })
  }

  getEventValue($event: any){
    return $event.target.value;
  }

}
