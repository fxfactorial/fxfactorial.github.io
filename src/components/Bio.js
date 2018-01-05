import React from 'react';

// Import typefaces
import 'typeface-montserrat';
import 'typeface-merriweather';

import profilePic from './profile-pic.jpg';
import { rhythm } from '../utils/typography';

const pic_style = {
  marginRight: rhythm(1 / 2),
  marginBottom: 0,
  width: rhythm(2),
  height: rhythm(2),
};
const wrapper_style = {
  display: 'flex',
  marginBottom: rhythm(2.5),
};

const move_to_resume = () => {
  if (typeof window !== 'undefined') {
    window.location = '/resume.html';
  }
};

export default () => (
  <div style={wrapper_style}>
    <img src={profilePic} alt={`Edgar Aroutiounian`} style={pic_style} />
    <p>
      My name is
      <strong>
        <a onClick={move_to_resume} href={'#'}>
          {' '}
          Edgar Aroutiounian
        </a>
      </strong>, I'm an Armenian-American programmer in Silicon Valley. I love functional
      programming, OCaml old timer. Currently I work at <a href={'https://expo.io'}>expo.io</a>{' '}
      working to make your mobile development experience with ReactNative that much better. Catch me
      on <a href={'https://twitter.com/@edgararout'}>twitter</a>, or on{' '}
      <a href={'https://github.com/fxfactorial'}>github</a>
    </p>
  </div>
);
