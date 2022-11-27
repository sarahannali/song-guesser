/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, useRef } from 'react';
import Stack from '@mui/material/Stack';
import { Grid, TextField, useMediaQuery } from '@mui/material';
import PropTypes from 'prop-types';
import client from '@urturn/client';

function GuessScreen({ song }) {
  const refs = useRef([]);
  const [answer, setAnswer] = useState(['', '', '']);
  const [error, setError] = useState(false);

  const setFocus = (idx) => refs.current[idx].focus();
  const submitAnswer = () => {
    try {
      client.makeMove({ type: 'guess', data: answer.join(' ') });
    } catch (e) {
      console.log('ERROR: ', e);
      setError(true);
    }
  };

  return (
    <Stack
      spacing={2}
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Grid
        spacing={1}
        container
        justifyContent="center"
      >
        <Grid item>
          <WordField
            idx={0}
            setFocus={setFocus}
            answer={answer}
            submitAnswer={submitAnswer}
            setAnswer={setAnswer}
            innerRef={(el) => { refs.current[0] = el; }}
            sx={{ backgroundColor: error ? 'red' : 'white' }}
          />
        </Grid>
        <Grid item>
          <WordField
            idx={1}
            setFocus={setFocus}
            answer={answer}
            submitAnswer={submitAnswer}
            setAnswer={setAnswer}
            innerRef={(el) => { refs.current[1] = el; }}
          />
        </Grid>
        <Grid item>
          <WordField
            idx={2}
            setFocus={setFocus}
            answer={answer}
            submitAnswer={submitAnswer}
            setAnswer={setAnswer}
            innerRef={(el) => { refs.current[2] = el; }}
          />
        </Grid>
      </Grid>
      <audio controls autoPlay>
        <source src={`songs/${song}.mp3`} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </Stack>
  );
}

function WordField({
  idx,
  setFocus,
  innerRef,
  answer,
  setAnswer,
  submitAnswer,
}) {
  return (
    <TextField
      autoFocus={idx === 0}
      inputRef={innerRef}
      variant="outlined"
      autoComplete="off"
      inputProps={{ style: { fontSize: useMediaQuery('(max-width:600px)') ? '1.5em' : '2rem' } }}
      sx={{
        backgroundColor: 'white',
        borderRadius: '5px',
      }}
      value={answer[idx]}
      onChange={(e) => {
        setAnswer(answer.map((val, i) => (i === idx ? e.target.value : val)));
      }}
      onKeyDown={(e) => {
        if ((e.code === 'Space' || e.code === 'Enter')) {
          e.preventDefault();
          if (idx < 2) {
            setFocus(idx + 1);
          } else {
            submitAnswer();
          }
        }
        if (e.code === 'Backspace' && answer[idx].length === 0 && idx > 0) {
          e.preventDefault();
          setFocus(idx - 1);
        }
      }}
    />
  );
}
GuessScreen.propTypes = {
  song: PropTypes.string.isRequired,
};
WordField.propTypes = {
  idx: PropTypes.number.isRequired,
  setFocus: PropTypes.func.isRequired,
  innerRef: PropTypes.func.isRequired,
  answer: PropTypes.arrayOf(PropTypes.string).isRequired,
  setAnswer: PropTypes.func.isRequired,
  submitAnswer: PropTypes.func.isRequired,
};

export default GuessScreen;
