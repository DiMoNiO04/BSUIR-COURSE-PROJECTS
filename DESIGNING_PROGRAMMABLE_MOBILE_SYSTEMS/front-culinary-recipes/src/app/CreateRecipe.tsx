import React from 'react';
import { Helmet } from 'react-helmet';
import { EActionType, EUrls, FRONT_URL } from '@/utils';
import { RecipeForm } from '@/components/forms';
import { CreateUpdatePageLayout } from '@/components/layouts';

const CreateRecipePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Create New Recipe | Tastebite</title>
        <link rel="canonical" href={`${FRONT_URL}${EUrls.CREATE_RECIPE}`} />
      </Helmet>
      <main>
        <CreateUpdatePageLayout title="Create New Recipe">
          <RecipeForm actionType={EActionType.CREATE} />
        </CreateUpdatePageLayout>
      </main>
    </>
  );
};

export default CreateRecipePage;
