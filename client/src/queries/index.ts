import { useLazyQuery } from "@apollo/client";
import { DocumentNode } from "graphql";

function useLazyQuerySingleObj<IDataInterface>(
  gqlQuery: DocumentNode,
  gqlDataType: string,
  gqlQueryVariable: Function
) {
  const [gqlGet, { loading, error, data }] = useLazyQuery(gqlQuery, {
    notifyOnNetworkStatusChange: true,
  });

  const executeQuery = (variables?: any) => {
    gqlGet({ variables: gqlQueryVariable(variables) });
  };

  return [
    executeQuery,
    {
      loading,
      error,
      data: !!data ? (data[gqlDataType] as IDataInterface[]) : undefined,
    },
  ] as const;
}

export { useLazyQuerySingleObj };
