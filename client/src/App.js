import * as React from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import './App.css';

const App = () => {

  return (
    <div className="App">
      <Container maxWidth="lg">
        <div>
          <TextField
            id="outlined-multiline-static"
            multiline
            disabled
            fullWidth 
            rows={4}
          />
        </div>
        <div>
          <TextField fullWidth id="input" />
        </div>
      </Container>
    </div>
  );
}

export default App;
