import { Badge } from 'components/badge';
import { ButtonRemove } from 'components/button-remove';
import { IconButtonRemove } from 'components/icon-button-remove ';
import { IconButtonView } from 'components/icon-button-view';

import { useModal } from 'features/modal';
import { useRouter } from 'features/router';
import { useUserApi } from 'features/user/api';

import { RowActionsContainer } from 'pages/@common/row-actions-container';
import { Post } from 'types/post';
import { getPostRoute } from 'utils/business';

export interface RowActionsProps {
  rowData: Post;
  routeName: string;
  onRefresh: () => void;
}
export const RowActions = ({ rowData, onRefresh, routeName }: RowActionsProps) => {
  const { pushModal } = useModal();
  const { pushRoute } = useRouter();

  const handleDelete = () => {
    pushModal('Confirmation', {
      useProps: () => {
        const userApi = useUserApi();
        const { onClose } = useModal();

        return {
          content: 'Seguro que desea eliminar este post?',
          badge: <Badge variant="error" />,
          primaryBtn: (
            <ButtonRemove
              isBusy={userApi.removeOnePost.status.isBusy}
              onClick={() =>
                userApi.removeOnePost.fetch(
                  { id: rowData._id },
                  {
                    onAfterSuccess: () => {
                      onClose();
                      onRefresh();
                    },
                  },
                )
              }
            />
          ),
        };
      },
    });
  };

  return (
    <RowActionsContainer>
      <IconButtonRemove onClick={handleDelete} />
      <IconButtonView
        title="Ver página"
        stopPropagation
        onClick={() => pushRoute(getPostRoute({ routeName, postId: rowData._id }))}
      />
    </RowActionsContainer>
  );
};
