import Link from "next/link";
import { Button, TextField } from "@material-ui/core";

function loginAction() {
  alert("pig!");
}
export default function IndexPage() {
  return (
    <div>
      <form noValidate autoComplete="off">
        <div>
          <TextField id="standard-basic" label="Email" />
          <br />
          <TextField id="filled-basic" label="Password" type="password" />
          <br />
          <TextField id="filled-basic" label="Two Factor Code" />
          <br />
        </div>
        <br />
        <Button onClick={loginAction} variant="contained">
          Login to Facebook
        </Button>
      </form>
    </div>
  );
}
