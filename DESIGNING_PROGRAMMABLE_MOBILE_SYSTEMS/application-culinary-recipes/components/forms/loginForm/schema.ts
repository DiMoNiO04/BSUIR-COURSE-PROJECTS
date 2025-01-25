import { EValidateForm } from '@/utils';
import * as yup from 'yup';

const schemaLogin = yup.object().shape({
  email: yup.string().required(EValidateForm.REQUIRED_FIELD),
  password: yup.string().required(EValidateForm.REQUIRED_FIELD),
});

export default schemaLogin;
