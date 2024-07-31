const config = {
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
    core: {
        disableTelemetry: true,
    },
    stories: [
        {
            directory: '../src/docs/',
            titlePrefix: 'Ficticious Design System',
            files: '**/*.mdx',
        },
        {
            directory: '../src/components/',
            titlePrefix: 'All components',
            files: '**/*.stories.ts',
        },
    ],
    addons: [
        '@storybook/addon-a11y',
        '@storybook/addon-links',
        {
            name: '@storybook/addon-essentials',
            options: {
                controls: false,
                actions: false,
            },
        },
        '@storybook/addon-toolbars',
        '@storybook/addon-viewport',
    ],
};
export default config;
