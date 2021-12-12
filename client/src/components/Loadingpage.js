import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Typography } from "@material-ui/core";
import CircularProgress from '@mui/material/CircularProgress';

export default function Loadingpage() {
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
        <DialogTitle><Typography variant="h4" component="h4" align="center">
  Waiting for player to join
</Typography></DialogTitle>
        <DialogContent > <Typography variant="h4" component="h4" align="center"><CircularProgress color="secondary" algin="center" /></Typography></DialogContent>
        {/* <DialogActions>
          <Button>ooooh.</Button>
        </DialogActions> */}
      </Dialog>
      <Box
        sx={{
          minHeight: "100vh",
          background:
            "url(https://storage.getblock.io/web/blog/article-images/Polygon%20%281%29.svg) no-repeat center center",
          backgroundSize: "cover",
        }}
      ></Box>
    </>
  );
}
