import * as React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import './App.css';

const defaultMessage = "Type here to send messages";
const username = `User ${Math.floor(Math.random() * (1000 - 0 + 1))}`;

const App = () => {  
  const [content, setContent] = React.useState("");
  const [input, setInput] = React.useState(defaultMessage);
  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleClick = (_) => {
    if (input === "") {
      return;
    }

    const newContent = `${content}\n${username}: ${input}`;
    setInput("");
    setContent(newContent);
  };

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      handleClick()
    }
  }

  const clearIfDefault = () => {
    if (input === defaultMessage) {
      setInput("");
    }
  }

  return (
    <div className="App">
      <Grid container direction="column" justifyContent="space-between" alignItems="stretch">
        <Grid>
          <TextField
            fullWidth
            id="outlined-multiline-static"
            multiline
            minRows={35}
            value={content}
          />
        </Grid>
        <Grid container direction="row" alignItems="center" justifyContent="space-between">
          <Grid xs={11}>
            <TextField 
              fullWidth
              id="input" 
              color="success" 
              onChange={handleChange}
              onKeyUp={handleEnter}
              onClick={clearIfDefault}
              value={input}
              focused />
          </Grid>
          <Grid xs={1}>
            <Button variant="text" variant="contained" sx={{ height: "100%"}} onClick={handleClick}>Send</Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
