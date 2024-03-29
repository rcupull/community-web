import { Link } from 'react-router-dom';

import { EmptyImage } from 'components/empty-image';
import { IconButtonUpdate } from 'components/icon-button-update';

import { useModal } from 'features/modal/useModal';

import { CallAfarResources } from 'hooks/useCallFromAfar';

import { Post } from 'types/post';
import { cn } from 'utils/general';
export interface Props {
  className?: string;
  post: Post;
  href: string;
  enabledUpdate?: boolean;
  getImageUrl?: (src: string) => string;
  callAfarResources?: CallAfarResources;
}

export const ProductSimple = ({
  className,
  post,
  getImageUrl,
  href,
  enabledUpdate,
  callAfarResources,
}: Props) => {
  const { price, name, images, currency } = post;

  const image = images?.[0];

  const { pushModal } = useModal();

  return (
    <Link data-id="ProductSimple" className={cn('group', className)} to={href}>
      <div className="border border-gray-300 w-full overflow-hidden rounded-lg bg-gray-50 flex items-center justify-center h-80">
        {image ? (
          <img
            src={getImageUrl?.(image.src) || image.src}
            alt={image.alt}
            className="object-contain group-hover:opacity-75"
          />
        ) : (
          <div className="flex items-center justify-center h-64 w-64">
            <EmptyImage className="h-32 w-32" />
          </div>
        )}
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="mt-4 text-sm text-gray-700">{name}</h3>
          <p className="mt-1 text-lg font-medium text-gray-900">{`${price} ${currency}`}</p>
        </div>

        {enabledUpdate && (
          <IconButtonUpdate
            onClick={(e) => {
              e.preventDefault();
              pushModal('PostNew', { postId: post._id, callAfarResources });
            }}
          />
        )}
      </div>
    </Link>
  );
};
