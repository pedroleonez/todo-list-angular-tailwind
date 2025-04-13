import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormFieldName, getErrorMessage } from '../../utils/validators';
import { AuthService } from '../../data-access/auth.service';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export default class SignUpComponent {
  private readonly _formBuilder = inject(NonNullableFormBuilder);
  private readonly _authService = inject(AuthService);

  form = this._formBuilder.group({
    email: this._formBuilder.control('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(100),
    ]),
    password: this._formBuilder.control('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(100),
    ]),
  });

  errorMessage(fieldName: FormFieldName): string | null {
    return getErrorMessage(fieldName, this.form);
  }

  async onSubmit() {
    if (this.form.invalid) return;
    const { email, password } = this.form.value;
    try {
      if (!email || !password) return;
      console.log({ email, password });
      await this._authService.signUp({ email, password });
      toast.success('Usuário cadastrado com sucesso!');
    } catch (error) {
      toast.error('Erro ao cadastrar usuário!');
    }
  }
}
