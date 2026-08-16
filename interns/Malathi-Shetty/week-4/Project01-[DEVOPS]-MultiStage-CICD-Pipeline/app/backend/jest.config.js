module.exports = {
  testEnvironment: "node",

  coverageDirectory: "coverage",

  coverageReporters: [
    "text",
    "lcov",
    "cobertura"
  ],

  reporters: [
    "default",
    [
      "jest-junit",
      {
        outputDirectory: "coverage",
        outputName: "junit.xml"
      }
    ]
  ]
};