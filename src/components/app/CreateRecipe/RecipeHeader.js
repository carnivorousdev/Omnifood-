import PageHeader from 'components/common/PageHeader';
import React from 'react';

const RecipeHeader = () => {
  const CreateRecipeBg = 'https://i.ibb.co/pPCDTst/corner-1.png'
  return (
    <PageHeader
      title="Create a New Recipe"
      image={CreateRecipeBg}
    >
    </PageHeader>
  );
};

export default RecipeHeader;
