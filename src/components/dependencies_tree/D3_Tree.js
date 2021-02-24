import React, { useEffect, useState, useRef } from 'react';
import Tree from 'react-d3-tree';

export default function D3_Tree(props) {
  const { data } = props;

  return (
    <div id="treeWrapper" style={{ width: '100vw', height: '50vw', backgroundColor: '#fff' }}>
      <Tree
        data={data}
        shouldCollapseNeighborNodes
        allowForeignObjects
        initialDepth={1}
        separation={{ siblings: 1, nonSiblings: 3 }}
      />
    </div>
  );
}
