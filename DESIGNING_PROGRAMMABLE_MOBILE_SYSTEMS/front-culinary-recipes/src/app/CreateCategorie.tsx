import React from 'react';
import { Helmet } from 'react-helmet';
import { EActionType, EUrls, FRONT_URL } from '@/utils';
import { CategorieForm } from '@/components/forms';
import { CreateUpdatePageLayout } from '@/components/layouts';

const CreateCategoriePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Create New Category | Tastebite</title>
        <link rel="canonical" href={`${FRONT_URL}${EUrls.CREATE_CATEGORIE}`} />
      </Helmet>
      <main>
        <CreateUpdatePageLayout title="Create New Category">
          <CategorieForm actionType={EActionType.CREATE} />
        </CreateUpdatePageLayout>
      </main>
    </>
  );
};

export default CreateCategoriePage;
