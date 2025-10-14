import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "../lcai-dao-api/.checkpoint/schema.gql",
  documents: ["graphqlApi/queries.ts"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./graphqlApi/gql/": {
      preset: "client",
      config: {
        enumsAsTypes: true,
        skipTypename: true,
        avoidOptionals: {
          field: true,
          inputValue: false,
        },
      },
      presetConfig: {
        gqlTagName: "gql",
        fragmentMasking: false,
      },
    },
  },
};

export default config;
