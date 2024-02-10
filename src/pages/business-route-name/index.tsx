import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useBusinessApi } from 'features/business/api';

import { LayoutSingle } from 'pages/@common/layout-single';
import { ModulePosts } from 'pages/@common/module-posts';

export const BusinessRouteName = () => {
  const { routeName } = useParams();

  const businessApis = useBusinessApi();

  useEffect(() => {
    if (routeName) {
      businessApis.getAll.fetch({ routeName });
    }
  }, [routeName]);

  const business = businessApis.getAll.data?.[0];

  if (!business) return <></>;

  return (
    <LayoutSingle title={business.name}>
      <ModulePosts title="Recientes" businessIds={[business._id]} className="w-full" />
    </LayoutSingle>
  );
};