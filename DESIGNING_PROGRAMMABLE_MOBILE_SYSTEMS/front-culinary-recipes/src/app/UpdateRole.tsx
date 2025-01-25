import React from 'react';
import { Helmet } from 'react-helmet';
import { EActionType, EUrls, FRONT_URL } from '@/utils';
import { useParams } from 'react-router-dom';
import { RoleForm } from '@/components/forms';
import { CreateUpdatePageLayout } from '@/components/layouts';

const UpdateRolePage: React.FC = () => {
  const { value } = useParams<{ value: string }>();

  return (
    <>
      <Helmet>
        <title>Update Role | Tastebite</title>
        <link rel="canonical" href={`${FRONT_URL}${EUrls.UPDATE_ROLE}/${value}`} />
      </Helmet>
      <main>
        <CreateUpdatePageLayout title={`Update Role ${name}`}>
          <RoleForm actionType={EActionType.UPDATE} />
        </CreateUpdatePageLayout>
      </main>
    </>
  );
};

export default UpdateRolePage;
