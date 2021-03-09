import React from 'react';

import { Spinner, Modal } from 'react-bootstrap';

function SpinnerFullscreen() {
  return (
    <div class="modal-backdrop" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
      <div style={{ position: 'fixed', top: '50vh', left: '50vw' }}>
        <Spinner animation="border" role="status" size="lg">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    </div>
  );
}

export default SpinnerFullscreen;
