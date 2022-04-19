import React from 'react';

interface JSONcomponentProps {
  json: object;
  title?: string;
}

const JSONcomponent: React.FC<JSONcomponentProps> = ({ json, title }) => {
  return (
    <div>
      {title && <h2 className="mb-2 pb-2 border-b-2">{title}</h2>}
      <div className="break-all overflow-y-scroll mb-4 pb-2 border-b-2 mt-2" style={{ maxWidth: 400, maxHeight: 200 }}>
        {Object.keys(json).map((data, index) => (
          <div key={index}>
            <pre>
              <b>{data}:</b> {JSON.stringify((json as never)[data], null, 2)}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JSONcomponent;
