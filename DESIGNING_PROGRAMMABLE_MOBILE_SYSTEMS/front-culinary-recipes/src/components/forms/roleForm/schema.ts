import { EValidateForm } from '@/utils';
import * as yup from 'yup';

const schemaRole = yup.object().shape({
  value: yup.string().required(EValidateForm.REQUIRED_FIELD),
  description: yup.string().required(EValidateForm.REQUIRED_FIELD),
});

export default schemaRole;
