import { ErrorMessage } from "@hookform/error-message";
import { Typography } from "@mui/material";
import { FieldErrors } from "react-hook-form";

export default function ValidationFeedback({
  error,
  name,
}: {
  error: FieldErrors;
  name: string;
}) {
  const messageComponent = (message: string) => {
    if (message.length === 0) {
      return (
        <Typography sx={{ ml: 1, mt: 1 }} fontSize="small">
          Empty message
        </Typography>
      );
    }
    return (
      <Typography sx={{ ml: 1, mt: 1 }} color="error" fontSize="small">
        {message}
      </Typography>
    );
  };
  return (
    <>
      <ErrorMessage
        name={name}
        errors={error}
        render={({ message }) => messageComponent(message)}
      />
    </>
  );
}
