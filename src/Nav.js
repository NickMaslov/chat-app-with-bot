import React from 'react';
import useCollection from './useCollection'
import {firebase} from './firebase'
import { sign } from 'crypto';

function Nav({ user: { uid, photoUrl, displayName } }) {
  const channels = useCollection('channels');
  return (
    <div className="Nav">
      <div className="User">
        <img
          className="UserImage"
          alt="whatever"
          src={photoUrl}
        />
        <div>
          <div>{displayName}</div>
          <div>
            <button onClick={()=>firebase.auth().signOut()} className="text-button">log out</button>
          </div>
        </div>
      </div>
      <nav className="ChannelNav">
        {channels.map(channel => (
          <a key={channel.id} href={`/channel/${channel.id}`}># {channel.id}</a>
        ))}
      </nav>
    </div>
  );
}

export default Nav;
