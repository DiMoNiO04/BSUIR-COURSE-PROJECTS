import * as yup from 'yup';
import { EValidateForm } from '@/utils';

const schemaSignUp = yup.object().shape({
  firstName: yup.string().required(EValidateForm.REQUIRED_FIELD),
  lastName: yup.string().required(EValidateForm.REQUIRED_FIELD),
  email: yup.string().email(EValidateForm.INVALID_EMAIL).required(EValidateForm.REQUIRED_FIELD),
  password: yup.string().min(6, EValidateForm.MIN_PASSWORD).required(EValidateForm.REQUIRED_FIELD),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], EValidateForm.PASSWORD_MUTCH)
    .required(EValidateForm.REQUIRED_FIELD),
});

export default schemaSignUp;
