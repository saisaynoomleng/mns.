import { Toaster } from '@mns/ui';
import React from 'react';

const AgencyFrontLayout = ({ children }: LayoutProps<'/'>) => {
  return (
    <>
      {children}

      <Toaster
        richColors
        closeButton
        position="bottom-center"
        duration={3000}
      />
    </>
  );
};

export default AgencyFrontLayout;
