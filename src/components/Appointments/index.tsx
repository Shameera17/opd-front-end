import { EmojiPeopleOutlined, ManageAccounts } from "@mui/icons-material";
import {
  Box,
  Button,
  ButtonGroup,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { IAppointment } from "../../common/interface";
import {
  createAppointment,
  createBooking,
  getAllAppointments,
  isAuthenticated,
} from "../../helper/ApiCalls";

const Appointments = () => {
  const [Appointment, setAppointments] = useState<IAppointment[] | null>(null);

  const [values, setValues] = useState({
    title: "",
    duration: "",
    date: "",
    startTime: "",
    endTime: "",
    redirect: false,
  });
  const [OpenModal, setOpenModal] = useState<{
    data?: IAppointment;
    patientData?: any;
    visible: boolean;
    reload?: boolean;
  }>({
    visible: false,
    patientData: {
      patientName: "",
      mobileNo: "",
      email: "",
      address: "",
    },
  });

  useEffect(() => {
    getAllAppointments().then((data) => setAppointments(data));
  }, [values.redirect, OpenModal.reload]);

  const AppointmentList = (Items: IAppointment[]) => {
    return (
      <List
        sx={{
          width: "100%",
          maxWidth: 560,
          height: "100%",
        }}
      >
        {Items.map((item) => (
          <>
            <ListItem
              sx={{ bgcolor: "background.paper" }}
              alignItems="flex-start"
            >
              <ListItemAvatar>
                <EmojiPeopleOutlined />
              </ListItemAvatar>
              <div>
                <ListItemText primary={`Doctor :  ${item.title}`} />
                <ListItemText secondary={`Duration :  ${item.duration}hr`} />
                <ListItemText secondary={`Start Time :  ${item.startTime}`} />
                <ListItemText secondary={`End Time :  ${item.endTime}`} />
                <ListItemText secondary={`Count :  ${item.count}`} />
              </div>
              {!isAuthenticated() && (
                <Button
                  onClick={() =>
                    setOpenModal({ ...OpenModal, visible: true, data: item })
                  }
                >
                  Book
                </Button>
              )}
            </ListItem>
            <Modal
              open={OpenModal.visible}
              onClose={() => setOpenModal({ ...OpenModal, visible: false })}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              style={{
                width: 500,
                height: 500,
                backgroundColor: "white",
                margin: "auto",
                borderRadius: 5,
              }}
            >
              <Box
                style={{
                  backgroundColor: "white",
                  width: "100%",
                  height: "100%",
                  borderRadius: 5,
                  padding: 20,
                }}
              >
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  {`Create Booking for : ${item.title} on ${item.date}`}
                </Typography>
                <form
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: 200,
                  }}
                >
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    id="patientName"
                    label="patientName"
                    name="PatientName"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(event) =>
                      setOpenModal({
                        ...OpenModal,
                        patientData: {
                          ...OpenModal.patientData,
                          patientName: event.target.value,
                        },
                      })
                    }
                  />
                  <TextField
                    label="mobileNo"
                    type="number"
                    name="mobileNo"
                    id="mobileNo"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(event) =>
                      setOpenModal({
                        ...OpenModal,
                        patientData: {
                          ...OpenModal.patientData,
                          mobileNo: event.target.value,
                        },
                      })
                    }
                  />
                  <TextField
                    size="small"
                    variant="outlined"
                    margin="normal"
                    required
                    id="email"
                    type="email"
                    name="email"
                    label="Email"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(event) =>
                      setOpenModal({
                        ...OpenModal,
                        patientData: {
                          ...OpenModal.patientData,
                          email: event.target.value,
                        },
                      })
                    }
                  />
                  <TextField
                    size="small"
                    variant="outlined"
                    margin="normal"
                    required
                    label="Address"
                    id="address"
                    name="address"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(event) =>
                      setOpenModal({
                        ...OpenModal,
                        patientData: {
                          ...OpenModal.patientData,
                          address: event.target.value,
                        },
                      })
                    }
                  />
                </form>
                <ButtonGroup>
                  <Button
                    size="medium"
                    variant="contained"
                    onClick={() => {
                      createBooking({
                        ...OpenModal.patientData,
                        appointmentId: OpenModal.data?._id,
                        count: OpenModal.data?.count,
                      }).then(() =>
                        setOpenModal({
                          ...OpenModal,
                          reload: true,
                          visible: false,
                          data: undefined,
                          patientData: {
                            patientName: "",
                            mobileNo: "",
                            email: "",
                            address: "",
                          },
                        })
                      );
                    }}
                  >
                    Create Booking
                  </Button>
                  <Button
                    variant="contained"
                    children="Cancel"
                    color="warning"
                    onClick={() =>
                      setOpenModal({
                        ...OpenModal,
                        visible: false,
                        data: undefined,
                        patientData: {
                          patientName: "",
                          mobileNo: "",
                          email: "",
                          address: "",
                        },
                      })
                    }
                  />
                </ButtonGroup>
              </Box>
            </Modal>
            <Divider variant="inset" component="li" />
          </>
        ))}
      </List>
    );
  };
  return (
    <div
      style={{
        overflowY: "scroll",
        height: "70vh",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "peachpuff",
        margin: 10,
      }}
    >
      {Appointment?.length ? (
        AppointmentList(Appointment)
      ) : (
        <>No Appointments</>
      )}
      {isAuthenticated() && (
        <CardContent>
          <ManageAccounts fontSize="large" />

          <Typography gutterBottom variant="h5" component="div">
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                width: 200,
                margin: 5,
              }}
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                id="title"
                label="Title"
                name="title"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(event) =>
                  setValues({ ...values, title: event.target.value })
                }
              />
              <TextField
                label="Duration"
                type="number"
                name="duration"
                id="duration"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(event) =>
                  setValues({ ...values, duration: event.target.value })
                }
              />
              <TextField
                size="small"
                variant="outlined"
                margin="normal"
                required
                id="date"
                type="date"
                name="date"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(event) =>
                  setValues({ ...values, date: event.target.value })
                }
              />
              <TextField
                size="small"
                variant="outlined"
                margin="normal"
                required
                label="Start Time"
                id="startTime"
                type="time"
                name="startTime"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(event) =>
                  setValues({ ...values, startTime: event.target.value })
                }
              />
              <TextField
                size="small"
                placeholder=""
                variant="outlined"
                margin="normal"
                required
                label="End Time"
                id="endTime"
                type="time"
                name="endTime"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(event) =>
                  setValues({ ...values, endTime: event.target.value })
                }
              />
            </form>
            <Button
              size="medium"
              variant="contained"
              onClick={() => {
                createAppointment(localStorage.getItem("jwt"), values).then(
                  () =>
                    setValues({
                      ...values,
                      title: "",
                      duration: "",
                      date: "",
                      startTime: "",
                      endTime: "",
                      redirect: true,
                    })
                );
              }}
            >
              Create Appointment
            </Button>
          </Typography>
        </CardContent>
      )}
    </div>
  );
};

export default Appointments;
