import { gql, useQuery } from "@apollo/client";
import { GetPatientQuery } from "../generated/graphql";


export const usePatient = (id: string) => {
    const { loading, error, data } = useQuery<GetPatientQuery>(GET_PATIENT, {variables: {id}});

    return {patient: data?.patient, loading, error};
}

const GET_PATIENT = gql`
  query GetPatient($id: String!) {
    patient(id: $id) {
      id
      givenName
      familyName
      birthDate
      appointments {
        id
        start
      }
    }
  }
`;