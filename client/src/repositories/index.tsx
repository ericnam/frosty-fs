import {
  FetchResult,
  QueryResult,
  useLazyQuery,
  useMutation,
} from "@apollo/client";
import { DocumentNode } from "graphql";
import { useEffect, useState } from "react";

interface RepositoryParam {
  onLoad: Function;
}

function RepositoryHOF(
  gqlQuery: DocumentNode,
  dataType: string,
  repoParam?: RepositoryParam
) {
  // Apollo Query
  const [getInit, setGetInit] = useState<boolean>(false);
  const [gqlGet, gqlRes] = useLazyQuery(gqlQuery, {
    notifyOnNetworkStatusChange: true,
  });

  // API
  function get(variables?: any) {
    gqlRes.data = undefined;
    if (!!variables) {
      gqlGet({ variables: variables });
    } else {
      gqlGet();
    }
    setGetInit(!getInit);
  }

  // Callbacks
  if (!!repoParam && typeof repoParam.onLoad === "function") {
    useEffect(() => {
      if (!gqlRes.loading && !!gqlRes.data && !!gqlRes.data[dataType]) {
        repoParam.onLoad(gqlRes.data[dataType]);
      }
    }, [gqlRes.data, gqlRes.loading, getInit]);
  }

  return { api: { get }, data: gqlRes.data, loading: gqlRes.loading };
}

function AsyncRepositoryHOF2(gqlQuery: DocumentNode, dataType: string) {
  // Apollo Query
  const [gqlGet, { loading, error, data }] = useLazyQuery(gqlQuery, {
    notifyOnNetworkStatusChange: true,
  });

  return [gqlGet, { loading, error, data }];

  return {
    loading,
    error,
    data,
    fetch: (variables: any) => {
      gqlGet({ variables: variables }).then(
        (res: QueryResult) => res.data[dataType]
      );
    },
  };

  // return (variables: any) => {
  //   gqlGet({ variables: variables }).then(
  //     (res: QueryResult) => res.data[dataType]
  //   );

  //   return { loading, error, data };
  // };
}

function AsyncRepositoryHOF(gqlQuery: DocumentNode, dataType: string) {
  // Apollo Query
  const [gqlGet] = useLazyQuery(gqlQuery, {
    notifyOnNetworkStatusChange: true,
  });

  return (variables: any) => {
    return gqlGet({ variables: variables }).then(
      (res: QueryResult) => res.data[dataType]
    );
  };
}

function MutationHOF(gqlQuery: DocumentNode, dataType: string) {
  const [gqlMutate] = useMutation(gqlQuery);
  return (variables: any) => {
    return gqlMutate({ variables }).then(
      (res: FetchResult) => res.data?.[dataType]
    );
  };
}

/* class decorator */
function staticImplements<T>() {
  return <U extends T>(constructor: U) => {
    constructor;
  };
}

function useLazyQuerySingleObj<IDataInterface>(
  gqlQuery: DocumentNode,
  gqlDataType: string
) {
  const [gqlGet, { loading, error, data }] = useLazyQuery(gqlQuery, {
    notifyOnNetworkStatusChange: true,
  });

  const executeQuery = (variables?: any) => {
    gqlGet({ variables: variables });
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

export {
  RepositoryHOF,
  RepositoryParam,
  MutationHOF,
  AsyncRepositoryHOF,
  AsyncRepositoryHOF2,
  useLazyQuerySingleObj,
  staticImplements,
};
