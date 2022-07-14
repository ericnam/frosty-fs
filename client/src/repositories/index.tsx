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
  const [gqlGet, gqlRes] = useLazyQuery(gqlQuery);

  function get(variables?: any) {
    if (!!variables) {
      gqlGet({ variables: variables });
    } else {
      gqlGet();
    }
  }

  if (!!repoParam && typeof repoParam.onLoad === "function")
    useEffect(() => {
      console.log(gqlRes);
      if (!gqlRes.loading && !!gqlRes.data && !!gqlRes.data[dataType]) {
        repoParam.onLoad(gqlRes.data[dataType]);
      }
    }, [gqlRes.data, gqlRes.loading]);

  return { api: { get }, data: gqlRes };
}

export { RepositoryHOF, RepositoryParam };
