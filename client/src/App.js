import * as React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import './App.css';

const defaultMessage = 'Type here to send messages';
const username = `User ${Math.floor(Math.random() * (1000 - 0 + 1))}`;

function App() {
  const [content, setContent] = React.useState('');
  const [input, setInput] = React.useState(defaultMessage);
  const [webSocket, setWebSocket] = React.useState({ readyState: WebSocket.CLOSED });

  React.useEffect(() => {
    if (!webSocket || webSocket.readyState === WebSocket.CLOSED) {
      console.log('Attempted to connect');
      const ws = new WebSocket(`ws://localhost:8080?user=${username}`);
      console.log('After connection attempt');

      ws.onopen = () => {
        console.log('Connected');
      };

      ws.onclose = () => {
        console.log('Disconnected');
      };

      setWebSocket(ws);
    }
  }, [webSocket.readyState]);

  if (webSocket) {
    webSocket.onmessage = (message) => {
      const messageJson = JSON.parse(message.data);
      const newContent = `${content}${messageJson.user}: ${messageJson.message}\n`;
      setContent(newContent);
    };
  }

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleClick = () => {
    if (input === '') {
      return;
    }

    if (webSocket.readyState === WebSocket.OPEN) {
      webSocket.send(JSON.stringify({ user: username, message: input }));
    }

    setInput('');
  };

  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      handleClick();
    }
  };

  const clearIfDefault = () => {
    if (input === defaultMessage) {
      setInput('');
    }
  };

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
          <Grid item xs={11}>
            <TextField
              fullWidth
              id="input"
              color="success"
              onChange={handleChange}
              onKeyUp={handleEnter}
              onClick={clearIfDefault}
              value={input}
              focused
            />
          </Grid>
          <Grid item xs={1}>
            <Button variant="contained" sx={{ height: '100%' }} onClick={handleClick}>Send</Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
