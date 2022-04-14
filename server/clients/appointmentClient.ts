export interface Appointment {
    id: string;
    start: string;
    end: string;
    patientId: string;
}

const getByPatientId = (patientId: string): Appointment[]  => 
    ([{id: 'asdasdasd', start: 'sometime', end: 'someothertime', patientId}]);

export const appointmentClient = {
    getByPatientId,
}