import React from 'react';
import { Helmet } from 'react-helmet';
import { EActionType, EUrls, FRONT_URL } from '@/utils';
import { useParams } from 'react-router-dom';
import { RecipeForm } from '@/components/forms';
import { CreateUpdatePageLayout } from '@/components/layouts';

const UpdateRecipePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <Helmet>
        <title>Update Recipe | Tastebite</title>
        <link rel="canonical" href={`${FRONT_URL}${EUrls.UPDATE_RECIPE}/${id}`} />
      </Helmet>
      <main>
        <CreateUpdatePageLayout title={`Update Recipe №${id}`}>
          <RecipeForm actionType={EActionType.UPDATE} />
        </CreateUpdatePageLayout>
      </main>
    </>
  );
};

export default UpdateRecipePage;