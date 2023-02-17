import React from 'react';

import Button from '../components/Button';

export default {
    title: 'Components/Button',
    component: Button
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
    variant: 'primary',
    label: 'Bootstrap Button',
};

export const Danger = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Danger.args = {
    variant: 'danger',
    label: 'Bootstrap Button',
};