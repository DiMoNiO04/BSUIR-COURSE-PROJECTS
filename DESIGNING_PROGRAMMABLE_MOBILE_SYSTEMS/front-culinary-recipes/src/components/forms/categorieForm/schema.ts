import { EValidateForm } from '@/utils';
import * as yup from 'yup';

const schemaCategorie = yup.object().shape({
  name: yup.string().required(EValidateForm.REQUIRED_FIELD),
  description: yup.string().required(EValidateForm.REQUIRED_FIELD),
  image: yup.string().required(EValidateForm.REQUIRED_FIELD),
});

export default schemaCategorie;
