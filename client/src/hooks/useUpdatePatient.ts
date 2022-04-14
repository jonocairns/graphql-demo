import { gql, useMutation } from "@apollo/client";

interface PatientInput {
    id: string;
    givenName?: string;
    familyName?: string;
    birthDate?: string;
}

export const useUpdatePatient = () => {
    const [mutate, { data, loading, error }] = useMutation(UPDATE_PATIENT);

    const updatePatient = async (input: PatientInput) => {
        await mutate({variables: {input}, optimisticResponse: {
          updatePatient: 
          { __typename: 'Patient', id: input.id, givenName: input.givenName
        }}})
    }

    return {data, loading, error, updatePatient};
}

const UPDATE_PATIENT = gql`
  mutation UpdatePatient($input: PatientInput!) {
    updatePatient(input: $input) {
        id
        givenName
        familyName
        birthDate
    }
  }
`;