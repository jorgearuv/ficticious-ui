import { create } from '@storybook/theming/create'
import { ThemeVars } from '@storybook/theming'

export default create({
  base: 'light',
  brandTitle: 'Moffin UI',
  brandUrl: '/',
  brandImage: '../public/logo.png',
  brandTarget: '_self',
}) as ThemeVars
