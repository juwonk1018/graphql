import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "./src/typeDefs.ts",
  generates: {
    "src/types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        contextType: "any", // or define your context type path
      },
    },
  },
  require: ["ts-node/register"],
};

export default config;
