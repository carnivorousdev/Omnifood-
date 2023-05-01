import PageHeader from 'components/common/PageHeader';
import React from 'react';
import CreateRecipeBg from 'assets/img/illustrations/corner-1.png'

const RecipeHeader = () => {
  return (
    <PageHeader
      title="Create a New Recipe"
      image={CreateRecipeBg}
    >
    </PageHeader>
  );
};

export default RecipeHeader;
