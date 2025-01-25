import React from 'react';
import { Helmet } from 'react-helmet';
import { EActionType, EUrls, FRONT_URL } from '@/utils';
import { useParams } from 'react-router-dom';
import { CategorieForm } from '@/components/forms';
import { CreateUpdatePageLayout } from '@/components/layouts';

const UpdateCategoriePage: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  return (
    <>
      <Helmet>
        <title>Update Category | Tastebite</title>
        <link rel="canonical" href={`${FRONT_URL}${EUrls.UPDATE_CATEGORIE}/${name?.toLowerCase()}`} />
      </Helmet>
      <main>
        <CreateUpdatePageLayout title={`Update Category ${name?.toLowerCase()}`}>
          <CategorieForm actionType={EActionType.UPDATE} />
        </CreateUpdatePageLayout>
      </main>
    </>
  );
};

export default UpdateCategoriePage;
