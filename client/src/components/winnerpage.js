import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Typography } from "@material-ui/core";
import CircularProgress from '@mui/material/CircularProgress';
import { useHistory } from "react-router-dom";

export default function WinnerPage() {
  const history = useHistory();

  return (
    <>
      <CssBaseline />
      <Dialog
        fullWidth
        onClose={() => {}}
        open={true}
        maxWidth="xs"
        sx={{
          backdropFilter: "blur(5px)",
          //other styles here
        }}
      >
        <DialogTitle><Typography variant="h5" component="h4" align="center">
 Congratulation 🎉
</Typography></DialogTitle>
        <DialogContent > <Typography variant="h6" display="block" align="center" gutterBottom>
      GG Keep Grinding..............
      </Typography></DialogContent>
        <DialogActions>
          <Button onClick={() => {history.push("/");}}>Home</Button>
        </DialogActions>
      </Dialog>
      <Box
        sx={{
          minHeight: "100vh",
          background:
            "url(https://stepico.com/wp-content/uploads/2021/09/Group-21.png) no-repeat center center",
          backgroundSize: "cover",
        }}
      ></Box>
    </>
  );
}