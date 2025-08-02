'use client';
import React from 'react';

import List from './list';

export default function dashboard({ name }: { name: string }) {
  console.log('Dashboard component rendered with name:', name);
  return (
    <div>
      <List author={name} />
    </div>
  );
}
