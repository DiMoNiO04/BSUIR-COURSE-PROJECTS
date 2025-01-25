import { EValidateForm } from '@/utils';
import * as yup from 'yup';

const schemaRecipe = yup.object().shape({
  title: yup.string().required(EValidateForm.REQUIRED_FIELD),
  shortDescription: yup.string().required(EValidateForm.REQUIRED_FIELD),
  cookingTime: yup.number().required(EValidateForm.REQUIRED_FIELD).positive().integer(),
  calories: yup.number().required(EValidateForm.REQUIRED_FIELD).positive().integer(),
  image: yup.string().required(EValidateForm.REQUIRED_FIELD),
  ingredients: yup.string().required(EValidateForm.REQUIRED_FIELD),
  instructions: yup.string().required(EValidateForm.REQUIRED_FIELD),
  categoryId: yup.number().required(EValidateForm.REQUIRED_FIELD),
});

export default schemaRecipe;
