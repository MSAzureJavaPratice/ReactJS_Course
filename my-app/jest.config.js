const config = {
    verbose: true,
    "moduleNameMapper": {
        "\\.(css|less|scss)$": "identity-obj-proxy"
    },
    transformIgnorePatterns: [
        "/node_modules/(?!(axios)/)" // Specify other packages here if needed
    ],
    transform: {
        // "^.+\\.[t|j]sx?$": "babel-jest" // Ensure Babel transforms both .js/.jsx and .ts/.tsx files
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{js,jsx}'],
    coverageDirectory: 'coverage',
    testEnvironment: 'jsdom',
};

module.exports = config;