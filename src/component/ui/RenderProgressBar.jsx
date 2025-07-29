import React from 'react'

const RenderProgressBar = ({target, actual, rejected}) => {
 const total = Number(target);
    const actualPercent = Math.min((actual / total) * 100, 100);
    const rejectedPercent = Math.min((rejected / total) * 100, 100);
    const remainingPercent = Math.max(100 - actualPercent - rejectedPercent, 0);

    return (
      <div className="w-full space-y-1">
        <div className="w-full flex text-xs  font-medium">
          <div className="text-left" style={{ width: `${rejectedPercent}%` }}>
            {`${rejected}`}
          </div>
          <div className="text-right w-full">{`${target}`}</div>
        </div>
        <div className="w-full h-3 rounded flex overflow-hidden shadow-inner">
          <div className="bg-[#EF4444] h-full" style={{ width: `${rejectedPercent}%` }} />
          <div className="bg-[#3B82F6] h-full" style={{ width: `${actualPercent}%` }} />
          <div className="bg-[#ffff] h-full" style={{ width: `${remainingPercent}%` }} />
        </div>
        <div className="w-full flex text-xs font-medium">
          <div className="text-center" style={{ width: `${actualPercent}%` }}>
            {`${actual}`}
          </div>
        </div>
      </div>
    );
  };

export default RenderProgressBar