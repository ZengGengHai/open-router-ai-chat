import Button from "@mui/material/Button";
import React, {
  Fragment,
  useCallback,
  useState,
  type Dispatch,
  type SetStateAction,
  Component,
  KeyboardEventHandler,
  ChangeEvent,
} from "react";
import { postAi } from "../../api/ai/ai";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Telegram } from "@mui/icons-material";

interface ChatInputProps {
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  handleInputClick: () => void;
}

export const ChatInput = (props: ChatInputProps) => {
  const { inputValue, setInputValue, handleInputClick } = props;

  return (
    <div className="w-full">
      <TextField
        fullWidth
        hiddenLabel
        value={inputValue}
        // label="DD"
        id="fullWidth"
        autoFocus
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="fingerprint"
                color="success"
                onClick={() => {
                  handleInputClick();
                }}
              >
                <Telegram />
              </IconButton>
            </InputAdornment>
          ),
          style: {
            borderRadius: 10,
            marginBottom: 15,
          },
        }}
        onChange={(
          event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        ) => {
          setInputValue(event.target.value);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleInputClick();
          }
        }}
      />
    </div>
  );
};
