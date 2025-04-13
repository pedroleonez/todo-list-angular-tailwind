import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { toast } from 'ngx-sonner';
import { AuthService } from '../../data-access/auth.service';
import { FormFieldName, getErrorMessage } from '../../utils/validators';

export interface AuthForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-auth-form',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss'
})
export default class AuthFormComponent implements OnInit {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);

  isSignIn = false;
  pageTitle = '';
  submitButtonText = '';
  altActionText = '';
  altActionLink = '';
  altActionLinkText = '';

  form = this._formBuilder.group<AuthForm>({
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

  ngOnInit() {
    // Determina o modo de autenticação com base na URL
    const currentUrl = this._router.url;
    this.isSignIn = currentUrl.includes('sign-in');

    // Configura textos baseados no modo
    if (this.isSignIn) {
      this.pageTitle = 'Faça login na sua conta';
      this.submitButtonText = 'Entrar';
      this.altActionText = 'Não tem uma conta?';
      this.altActionLink = '/auth/sign-up';
      this.altActionLinkText = 'Cadastre-se';
    } else {
      this.pageTitle = 'Crie uma conta na plataforma!';
      this.submitButtonText = 'Criar conta';
      this.altActionText = 'Já possui uma conta?';
      this.altActionLink = '/auth/sign-in';
      this.altActionLinkText = 'Login';
    }
  }

  errorMessage(fieldName: FormFieldName): string | null {
    return getErrorMessage(fieldName, this.form);
  }

  async onSubmit() {
    if (this.form.invalid) return;
    const { email, password } = this.form.value;
    try {
      if (!email || !password) return;

      if (this.isSignIn) {
        // Lógica de login
        await this._authService.signIn({ email, password} );
        toast.success('Login realizado com sucesso!');
      } else {
        // Lógica de cadastro
        await this._authService.signUp({ email, password });
        toast.success('Usuário cadastrado com sucesso!');
      }

      this._router.navigateByUrl('/tasks');
    } catch (error) {
      const errorMessage = this.isSignIn
        ? 'Erro ao fazer login!'
        : 'Erro ao cadastrar usuário!';

      toast.error(errorMessage);
    }
  }
}
