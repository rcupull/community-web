import { useEffect } from 'react';

import { Badge } from 'components/badge';
import { Button } from 'components/button';
import { ButtonClose } from 'components/button-close';
import { FieldInputImages } from 'components/field-input-images';
import { Modal } from 'components/modal';

import { useAddManyUserImages } from 'features/api/useAddManyUserImages';
import { useAddOneUserBusiness } from 'features/api/useAddOneUserBusiness';
import { useGetOneUser } from 'features/api/useGetOneUser';
import { useUpdateOneUser } from 'features/api/useUpdateOneUser';
import { useModal } from 'features/modal/useModal';

import { CallAfarResources, useCallFromAfar } from 'hooks/useCallFromAfar';
import { useSubmitPortal } from 'hooks/useSubmitPortal';

import { Formik } from 'formik';
import { Image } from 'types/general';
import { getImageEndpoint } from 'utils/api';

export interface ProfileUpdateProps {
  userId: string;
  callAfarResources?: CallAfarResources;
}

export const ProfileUpdate = ({ userId, callAfarResources }: ProfileUpdateProps) => {
  const { onClose } = useModal();

  const { getOneUser } = useGetOneUser();

  const { onCallAfar } = useCallFromAfar();

  useEffect(() => {
    getOneUser.fetch({ userId });
  }, []);

  const { addOneUserBusiness } = useAddOneUserBusiness();
  const { updateOneUser } = useUpdateOneUser();
  const { addManyUserImages } = useAddManyUserImages();

  const user = getOneUser.data;

  const submitPortal = useSubmitPortal();

  const content = (
    <Formik
      initialValues={{
        profileImages: user?.profileImage ? [user?.profileImage] : [],
      }}
      enableReinitialize
      validate={() => {}}
      onSubmit={() => {}}
    >
      {({ values, isValid }) => {
        return (
          <form>
            <FieldInputImages
              id="profileImages"
              name="profileImages"
              label="Imagen del perfil"
              getImageSrc={getImageEndpoint}
            />

            {submitPortal.getPortal(
              <Button
                label="Guardar"
                isBusy={addOneUserBusiness.status.isBusy}
                disabled={!isValid}
                onClick={() => {
                  const { profileImages } = values;

                  const handleSubmit = (profileImage?: Image) => {
                    updateOneUser.fetch(
                      {
                        userId,
                        update: {
                          profileImage,
                        },
                      },
                      {
                        onAfterSuccess: () => {
                          onClose();

                          callAfarResources && onCallAfar(callAfarResources);
                        },
                      },
                    );
                  };

                  if (profileImages.length) {
                    addManyUserImages.fetch(
                      { images: profileImages, userId },
                      {
                        onAfterSuccess: (images) => {
                          handleSubmit(images[0]);
                        },
                      },
                    );
                  } else {
                    handleSubmit(undefined);
                  }
                }}
                variant="primary"
                className="w-full"
              />,
            )}
          </form>
        );
      }}
    </Formik>
  );

  return (
    <Modal
      title="Editar perfil"
      content={content}
      badge={<Badge variant="info" />}
      primaryBtn={<div ref={submitPortal.ref} />}
      secondaryBtn={<ButtonClose />}
    />
  );
};
