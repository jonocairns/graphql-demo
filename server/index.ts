import { appointmentClient } from './clients';
import { ApolloServer, gql } from "apollo-server";
import { Patient, patientClient } from "./clients/patientClient";
import { ExpressContext } from 'apollo-server-express';

const typeDefs = gql`
  type Query {
    patient(id: String!): Patient
  }

  type Mutation {
      updatePatient(input: PatientInput!): Patient!
  }

  input PatientInput {
    id: String!
    givenName: String
    familyName: String
    birthDate: String
  }

  type Patient {
    id: String!
    givenName: String!
    familyName: String!
    birthDate: String!
    optional: String
    appointments: [Appointment!]!
  }

  type Appointment {
    id: String!
    start: String!
    end: String!
  }
`;

const resolvers = {
  Query: {
    patient: (_root: {}, args: {id: string}) => {
        return patientClient.getById(args.id);
    }
  }, 
  Mutation: {
    updatePatient: (_root: {}, args: {input: Patient}) => {
        return patientClient.update(args.input);
    }
  },
  Patient: {
      appointments: (patient: Patient) => {
        return appointmentClient.getByPatientId(patient.id);
    }
  }
};

const context = ({ req }: ExpressContext) => {
  const token = req.headers.authorization || '';
  const user = patientClient.auth(token);
  return { user };
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
