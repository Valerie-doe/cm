import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart/cart';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-add-to-cart-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-to-cart-button.html',
  styleUrls: ['./add-to-cart-button.css']
})
export class AddToCartButtonComponent {

  @Input() product: any;
  @Input() shopId?: string;

  @Output() productAdded = new EventEmitter<any>();

  loading = false;
showAuthModal = false;

constructor(
  private cartService: CartService,
  private router: Router,
  private cdr: ChangeDetectorRef
) {}
  
get clientId(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('customerId');
  }
  return null;
}

add() {
  console.log("========== ADD TO CART DEBUG ==========");

  console.log("Product object:", this.product);
  console.log("ShopId:", this.shopId);
  console.log("ClientId:", this.clientId);

  if (!this.product) {
    console.error("❌ product est undefined");
    return;
  }

  if (!this.shopId) {
    console.error("❌ shopId est undefined");
    return;
  }

  if (!this.clientId) {
    console.error("❌ clientId est undefined");
  this.router.navigate(['/auth']);
    return;
  }

  this.loading = true;

  const payload = {
    clientId: this.clientId,
    shopId: this.shopId,
    productId: this.product._id,
    quantity: 1
  };

  console.log("📦 Payload envoyé au backend:", payload);
  console.log("Payload JSON:", JSON.stringify(payload));

  this.cartService.addToCart(payload).subscribe({
    next: (cart) => {
      console.log("✅ Réponse SUCCESS du backend:", cart);
      this.loading = false;

      this.productAdded.emit({
        product: this.product,
        cart: cart
      });

      console.log("=======================================");
    },
    error: (err) => {
      console.error("❌ ERREUR COMPLETE:", err);
      console.error("❌ Status:", err.status);
      console.error("❌ Message backend:", err.error);
      console.error("❌ Full error object:", JSON.stringify(err));

      this.loading = false;

      console.log("=======================================");
    }
  });
}
goToLogin() {
  this.router.navigate(['/auth']);
}

goToRegister() {
  this.router.navigate(['/register']);
}
}
