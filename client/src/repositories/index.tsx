import { useLazyQuery } from "@apollo/client";
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

  if (dataType === "favorite") {
    console.log(gqlRes);
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

export { RepositoryHOF, RepositoryParam };
