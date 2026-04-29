import { Component, effect, inject, output, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faSearch,
  faUserCircle,
  faShoppingCart,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import { CategoriesStoreItem } from '../services/categories/categories.store-item';
import { SearchType } from '../types/searchType.interface';
import { Router,NavigationEnd, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CartStoreItem } from '../services/cart/cart.store-item';
import { AuthService } from '../services/auth/auth-service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-header',
  imports: [FontAwesomeModule,RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  faSearch = faSearch;
  faUserCircle = faUserCircle;
  faShoppingCart = faShoppingCart;
  faChevronDown = faChevronDown;

  dropdownVisible = false;
  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }
  // Event
  onSearchClicked = output<SearchType>();
  displayOptions = signal<boolean>(true);
  displaySearch = signal(true);
  isUserAuthenticated = signal(false);
  userName = signal('');

  constructor(
    public categoryStore: CategoriesStoreItem,
    private router:Router,
    public cartStore: CartStoreItem,
    public authService: AuthService
  ) {
     this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.displayOptions.set(event.url === '/home/products');
    });

    const isUserAuthenticatedSignal = toSignal(
      this.authService.isUserAuthenticated$,
      { initialValue: false }
    );
    const loggedInUserSignal = toSignal(this.authService.loggedInUser$, {
      initialValue: {
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        pin: '',
        email: '',
      },
    });

    effect(() => {
      this.isUserAuthenticated.set(isUserAuthenticatedSignal());
      this.userName.set(loggedInUserSignal().firstName);
    });
  }

  onCategorySelect(categoryId: string, keyword: string): void {
    if(!categoryId || !keyword) {
      return;
    }
    this.onSearchClicked.emit({ categoryId: +categoryId, keyword });
  }

  navigateToCart(): void {
    this.router.navigate(['home/cart']);
  }

  logout() {
    this.authService.logout();
  }
}
