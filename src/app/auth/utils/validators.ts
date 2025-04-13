import { FormGroup } from "@angular/forms";

export type FormFieldName = 'name' | 'email' | 'password';

// mapa centralizado de mensagens de erro
const ERROR_MESSAGES: Record<string, string> = {
  required: 'O campo é obrigatório.',
  minlength: 'O campo deve ter no mínimo 6 caracteres.',
  maxlength: 'O campo deve ter no máximo 100 caracteres.',
  email: 'E-mail inválido.',
};


// verifica se um campo deve mostrar erro de validação
export const shouldShowError = (fieldName: FormFieldName, form: FormGroup): boolean => {
  const control = form.get(fieldName);
  return !!control && (control.touched || control.dirty) && control.invalid;
};


// obtém a mensagem de erro para um campo específico
export const getErrorMessage = (fieldName: FormFieldName, form: FormGroup): string | null => {
  const field = form.get(fieldName);

  if (!field || (!field.touched && !field.dirty)) {
    return null;
  }

  for (const [errorType, message] of Object.entries(ERROR_MESSAGES)) {
    if (field.hasError(errorType)) {
      return message;
    }
  }

  if (field.invalid) {
    return 'Campo inválido';
  }

  return null;
};
