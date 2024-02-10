import { useEffect } from 'react';

import { ButtonNew } from 'components/button-new';
import { ButtonRefresh } from 'components/button-refresh';
import { Table } from 'components/table';

import { useModal } from 'features/modal';
import { useRouter } from 'features/router';
import { useUserApi } from 'features/user/api';

import { RowActions } from './RowActions';

import { LayoutSection } from 'pages/@common/layout-section';
import { LayoutSectionSub } from 'pages/@common/layout-section-sub';
import { TableTopActions } from 'pages/dashboard/components/table-top-actions';
import { getDateString } from 'utils/date';

export const DashboardBusiness = () => {
  const userApi = useUserApi();

  const { pushModal } = useModal();
  const { pushRoute, pathname } = useRouter();

  const onRefresh = () => userApi.getAllBussiness.fetch({});

  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <LayoutSection title="Negocios">
      <LayoutSectionSub>
        <TableTopActions>
          <ButtonNew
            label="Nuevo negocio"
            onClick={() =>
              pushModal('BusinessNew', {
                onAfterSuccess: onRefresh,
              })
            }
            className="ml-auto"
          />

          <ButtonRefresh onClick={onRefresh} />
        </TableTopActions>

        <Table
          heads={[null, 'Nombre', 'Categoría', 'Fecha de creación']}
          getRowProps={(rowData) => {
            const { name, category, createdAt, routeName } = rowData;

            return {
              onClick: () => pushRoute(`${pathname}/${routeName}`),
              nodes: [
                <RowActions key="RowActions" rowData={rowData} onRefresh={onRefresh} />,
                name,
                category,
                getDateString({ date: createdAt, showTime: true }),
              ],
            };
          }}
          data={userApi.getAllBussiness.data}
        />
      </LayoutSectionSub>
    </LayoutSection>
  );
};