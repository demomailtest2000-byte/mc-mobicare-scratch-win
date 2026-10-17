'use client';

import { useEffect, useState } from 'react';

const sparks = Array.from({ length: 48 }, (_, index) => ({
  left: `${8 + ((index * 23) % 84)}%`,
  top: `${10 + ((index * 37) % 50)}%`,
  delay: `${(index % 8) * 0.09}s`,
  color: ['#f6c916', '#1627a8', '#ef6c73', '#43b98d'][index % 4],
}));

const balloons = [
  { left: '8%', color: '#f6c916', delay: '0s' },
  { left: '22%', color: '#ef6c73', delay: '.45s' },
  { left: '74%', color: '#43b98d', delay: '.2s' },
  { left: '88%', color: '#4056cf', delay: '.65s' },
];

export function Celebration() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 6200);
    return () => window.clearTimeout(timer);
  }, []);
  if (!visible) return null;
  return <div className="celebration" aria-hidden="true">
    <div className="celebration-burst">🎉</div>
    <span className="celebration-firework firework-one">✦</span><span className="celebration-firework firework-two">✦</span><span className="celebration-firework firework-three">✦</span>
    {sparks.map((spark, index) => <i key={index} className="celebration-spark" style={{ left: spark.left, top: spark.top, animationDelay: spark.delay, backgroundColor: spark.color }} />)}
    {balloons.map((balloon, index) => <i key={index} className="celebration-balloon" style={{ left: balloon.left, backgroundColor: balloon.color, animationDelay: balloon.delay }} />)}
  </div>;
}
