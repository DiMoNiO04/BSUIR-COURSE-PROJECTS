import { EValidateForm } from '@/utils';
import * as Yup from 'yup';

export const schemaChangePassword = Yup.object().shape({
  currentPassword: Yup.string().required(EValidateForm.REQUIRED_FIELD).min(6, EValidateForm.MIN_PASSWORD),

  newPassword: Yup.string().required(EValidateForm.REQUIRED_FIELD).min(6, EValidateForm.MIN_PASSWORD),

  confirmPassword: Yup.string()
    .required(EValidateForm.REQUIRED_FIELD)
    .oneOf([Yup.ref('newPassword')], EValidateForm.PASSWORD_MUTCH),
});
