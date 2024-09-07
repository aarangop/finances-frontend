import { ErrorMessage } from "@hookform/error-message";
import { Typography } from "@mui/material";
import { useCallback } from "react";
import { FieldErrors } from "react-hook-form";

interface ValidationFeedbackProps {
  errors: FieldErrors;
  name: string;
}

export default function ValidationFeedback({
  errors,
  name,
}: ValidationFeedbackProps) {
  const messageComponent = useCallback(
    (message: string) => {
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
    },
    [errors, name]
  );

  return (
    <>
      <ErrorMessage
        name={name}
        errors={errors}
        render={({ message }) => messageComponent(message)}
      />
    </>
  );
}
