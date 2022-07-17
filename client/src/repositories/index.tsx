import { useLazyQuery } from "@apollo/client";
import { DocumentNode } from "graphql";
import { useEffect } from "react";

interface RepositoryParam {
  onLoad: Function;
}

function RepositoryHOF(
  gqlQuery: DocumentNode,
  dataType: string,
  repoParam?: RepositoryParam
) {
  // Apollo Query
  const [gqlGet, gqlRes] = useLazyQuery(gqlQuery);

  // API
  function get(variables?: any) {
    if (!!variables) {
      gqlGet({ variables: variables });
    } else {
      gqlGet();
    }
  }

  // Callbacks
  if (!!repoParam && typeof repoParam.onLoad === "function") {
    useEffect(() => {
      if (!gqlRes.loading && !!gqlRes.data && !!gqlRes.data[dataType]) {
        repoParam.onLoad(gqlRes.data[dataType]);
      }
    }, [gqlRes.data, gqlRes.loading]);
  }

  return { api: { get }, data: gqlRes.data, loading: gqlRes.loading };
}

export { RepositoryHOF, RepositoryParam };
