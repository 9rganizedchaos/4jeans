import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
}

const PORTAL_ID = 'portal';

function Portal({ children }: PortalProps) {
  const portal = useRef<HTMLDivElement | null>(null);
  const [, forceUpdate] = useState({});

  useEffect(() => {
    portal.current = document.createElement('div');
    portal.current.id = PORTAL_ID;
    document.body.appendChild(portal.current);
    forceUpdate({});

    const portalNode = portal.current;
    return () => {
      if (document.body.contains(portalNode)) {
        document.body.removeChild(portalNode);
      }
    };
  }, []);

  return portal.current ? createPortal(children, portal.current) : null;
}

export default Portal;
