/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/preset-create-react-app",
    "@storybook/addon-onboarding",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-actions",
    "@storybook/addon-controls",
    "@storybook/addon-links",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  staticDirs: ["..\\public"],
  webpackFinal: async (config) => {
    // Adding the MDX loader configuration
    config.module.rules.push({
      test: /\.stories\.mdx$/,
      use: [
        {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"],
          },
        },
        {
          loader: "@mdx-js/loader",
        },
      ],
    });

    return config;
  },
};

export default config;
