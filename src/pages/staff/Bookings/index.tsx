import { EmojiPeopleOutlined } from "@mui/icons-material";
import {
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { useEffect, useState } from "react";
import { IBooking } from "../../../common/interface";
import { getAllBookings } from "../../../helper/ApiCalls";
const Bookings = () => {
  const [Booking, setBookings] = useState<IBooking[] | null>(null);

  useEffect(() => {
    getAllBookings().then((data) => setBookings(data));
  });

  const BookingList = (Items: IBooking[]) => {
    return (
      <List sx={{ width: "100%", maxWidth: 560 }}>
        {Items.map((item) => (
          <>
            <ListItem
              sx={{ bgcolor: "background.paper" }}
              alignItems="flex-start"
            >
              <ListItemAvatar>
                <EmojiPeopleOutlined />
              </ListItemAvatar>
              <ListItemText primary={`Appointment ${item.appointmentNo}`} />
              <ListItemText secondary={`Phone Number: ${item.mobileNo}`} />
            </ListItem>
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
      {Booking?.length ? BookingList(Booking) : <>No Bookings</>}
    </div>
  );
};

export default Bookings;
