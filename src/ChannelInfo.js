import React from 'react';

function ChannelInfo({ channelId }) {
  return (
    <div className="ChannelInfo">
      <div className="Topic">
        Topic: <input className="TopicInput" defaultValue="Awesome stuff" />
      </div>
      <div className="ChannelName">#{channelId}</div>
    </div>
  );
}

export default ChannelInfo;
