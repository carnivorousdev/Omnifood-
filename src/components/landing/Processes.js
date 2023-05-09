import React from 'react';
import processList from '../data/processList';
import Section from 'components/common/Section';
import Process from './Process';
import SectionHeader from './SectionHeader';
import { isIterableArray } from 'helpers/utils';

const Processes = () => (
  <Section className='bg-soft-white'>
    <SectionHeader
      title="HOW IT WORKS"
      subtitle="Your daily dose of health in 3 simple steps"
    />
    {isIterableArray(processList) &&
      processList.map((process, index) => (
        <Process key={process.color} isFirst={index === 0} {...process} />
      ))}
  </Section>
);

export default Processes;
