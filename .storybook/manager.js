import { addons } from '@storybook/addons';
import { create } from '@storybook/theming/create';
import logo from './public/logo.png';

const theme = create({
  base: 'light',

  // Update this if the repo allows docs
  brandUrl: 'https://antheajfw.github.io/IT5007-Project/',
  brandImage: `/${logo}`,
  brandTitle: 'IT5007 project',
});

addons.setConfig({
  panelPosition: 'bottom',
  theme,
});
