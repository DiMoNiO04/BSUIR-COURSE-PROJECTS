import * as yup from 'yup';
import { EValidateForm } from '@/utils';

const schemaProfile = yup.object().shape({
  firstName: yup.string().required(EValidateForm.REQUIRED_FIELD),
  lastName: yup.string().required(EValidateForm.REQUIRED_FIELD),
  email: yup.string().email(EValidateForm.INVALID_EMAIL).required(EValidateForm.REQUIRED_FIELD),
});

export default schemaProfile;
