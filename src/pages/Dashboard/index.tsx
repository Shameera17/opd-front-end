import {
  EmojiPeopleOutlined,
  ErrorOutline,
  ManageAccounts,
} from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authenticate, isAuthenticated, signin } from "../../helper/ApiCalls";

const Dashboard = () => {
  let navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const onSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    if (!values.username || !values.password) {
      setValues({ ...values, error: "Enter required fields" });
      return;
    }
    signin({ username: values.username, password: values.password }).then(
      (data: any) => {
        if (data?.status !== 200) {
          setValues({ ...values, error: data.response.data.message });
          return;
        } else {
          const successdata: {
            token: string;
            user: {
              _id: string;
              username: string;
            };
          } = data.data;
          authenticate(successdata, () => {
            setValues({
              ...values,
              error: "",
              didRedirect: true,
            });
          });
        }
      }
    );
  };

  useEffect(() => {
    if (values.didRedirect && isAuthenticated()) {
      navigate("/staff");
    }
  }, [values.didRedirect]);

  // view the error message
  const errorMessage = () => {
    return (
      <div style={{ display: values.error ? "" : "none" }}>
        <ErrorOutline />
        <Typography color={"red"} style={{ marginLeft: "10px", width: "auto" }}>
          {values.error}
        </Typography>
      </div>
    );
  };
  return (
    <Container
      style={{
        height: "100vh",
        // position: "fixed",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
      <Card
        sx={{
          height: "50vh",
          width: "40%",
        }}
      >
        <CardContent>
          <EmojiPeopleOutlined fontSize="large" />
          <Typography gutterBottom variant="h5" component="div">
            Patient
          </Typography>
          <Button
            size="medium"
            variant="contained"
            component={Link}
            to="/patient"
            style={{ marginTop: 20 }}
          >
            Book appointment
          </Button>
        </CardContent>
      </Card>
      <Card
        sx={{
          height: "50vh",
          width: "40%",
        }}
      >
        <CardContent>
          <ManageAccounts fontSize="large" />
          <Typography gutterBottom variant="h5" component="div">
            Staff
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {errorMessage()}
            <form>
              <TextField
                size="small"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={values.username}
                onChange={(event) =>
                  setValues({ ...values, username: event.target.value })
                }
              />
              <TextField
                size="small"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="password"
                label="Password"
                type="password"
                name="password"
                autoComplete="current-password"
                value={values.password}
                onChange={(event) =>
                  setValues({ ...values, password: event.target.value })
                }
              />
            </form>
            <Button onClick={onSubmit} size="medium" variant="contained">
              Sign In
            </Button>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Dashboard;
