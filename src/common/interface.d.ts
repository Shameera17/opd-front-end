export interface IBooking {
  _id: string;
  appointmentNo: number;
  patientName: string;
  mobileNo: string;
  email: string;
  address: string;
  appointment: string;
  createdAt: string;
  updatedAt: string;
  __v: 0;
}

export interface IAppointment {
  _id: string;
  title: string;
  startTime: string;
  endTime: string;
  duration: string;
  count: number;
  date: string;
  createdAt: string;
  updatedAt: string;
  __v: 0;
}
