import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthStateService } from '../../data-access/auth-state.service';

@Component({
  selector: 'app-layout',
  imports: [RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  private readonly _authState = inject(AuthStateService);
  private readonly _router = inject(Router);

  async logout() {
    await this._authState.logout();
    this._router.navigateByUrl('/auth/sign-in');
  }
}
