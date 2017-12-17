import React from 'react';

// Import typefaces
import 'typeface-montserrat';
import 'typeface-merriweather';

import profilePic from './profile-pic.jpg';
import { rhythm } from '../utils/typography';

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: rhythm(2.5),
        }}>
        <img
          src={profilePic}
          alt={`Edgar Aroutiounian`}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2),
          }}
        />
        <p>
          My name is <strong>Edgar Aroutiounian</strong>, I'm an Armenian-American programmer in
          Silicon Valley. I love functional programming, OCaml old timer. Currently I work at{' '}
          <a href={'https://expo.io'}>expo.io</a> working to make your mobile development experience
          with ReactNative that much better.
          <p>
            Catch me on <a href={'https://twitter.com/@edgararout'}>twitter</a>, or on{' '}
            <a href={'https://github.com/fxfactorial'}>github</a>
          </p>
        </p>
      </div>
    );
  }
}

export default Bio;
