
import { usePatient } from './hooks/usePatient';
import { useUpdatePatient } from './hooks/useUpdatePatient';
import { Layout } from './Layout';
import { Spinner } from './Spinner';

const App = () => {
  const {patient, loading} = usePatient('1');
  const {updatePatient} = useUpdatePatient();

  if(loading || !patient) {
    return <Layout><Spinner /></Layout>
  }

  const update = () => {
    updatePatient({id: patient.id, givenName: getRandomName()});
  }

  return (
    <Layout>
      <p> from the server: {patient.givenName} {patient?.familyName}</p>

      <div>appointments: {patient.appointments.map(a => <span>{a.id}</span>)}</div>

      {patient && <button onClick={update}>NEW NAME</button>}
    </Layout>
  );
}

const randomNames = ['Bob', 'Jono', 'Bilbo', 'Yolo', 'Kylie', 'Thanos', 'Blah', 'Blug', 'Wat'];
const getRandomName = () => randomNames[Math.floor(Math.random() * randomNames.length)]



export default App;
