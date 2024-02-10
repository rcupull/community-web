import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { ProductSimple } from 'components/product-simple';

import { usePostsApi } from 'features/post/api';

import { LayoutPage } from 'pages/@common/layout-page';

export const BusinessRouteNamePostId = () => {
  const { postId } = useParams();

  const postApi = usePostsApi();

  useEffect(() => {
    if (postId) {
      postApi.getOne.fetch({ id: postId });
    }
  }, [postId]);

  const post = postApi.getOne.data;

  return (
    <LayoutPage title={post?.name} backButton>
      {'<Improve>'}
      {post && <ProductSimple name={post.name} price={`${post.price} ${post.currency}`} href="#" />}
    </LayoutPage>
  );
};