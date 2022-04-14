export interface Patient {
    id: string;
    givenName: string;
    familyName: string;
    birthDate: string;
}

let patientDb = [{
    id: '1',
    givenName: "Bobby",
    familyName: "McBobberson",
    birthDate: "24-03-1989"
}];

const getById = (id: string): Patient  => (
    patientDb.find(p => p.id === id)!
);

const update = (patient: Patient): Patient => {
    const old = patientDb.find(p => p.id === patient.id);
    const rest = patientDb.filter(p => p.id !== patient.id);
    patientDb = [...rest, {...old, ...patient}];
    return patientDb.find(p => p.id === patient.id)!;
}

const auth = (_token: string) => {
    // do auth stuff here
    return patientDb.find(p => p);
}

export const patientClient = {
    getById,
    update,
    auth,
}