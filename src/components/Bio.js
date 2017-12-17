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
          Silicon Valley.
        </p>
      </div>
    );
  }
}

export default Bio;
