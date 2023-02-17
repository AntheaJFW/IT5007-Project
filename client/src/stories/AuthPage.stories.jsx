import React from 'react';

import Auth from '../pages/Auth';

export default {
    title: 'Pages/Page',
    component: Auth,
    parameters: {
        // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen',
    },
};

const Template = (args) => <Auth {...args} />;

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const LoggedOut = Template.bind({});