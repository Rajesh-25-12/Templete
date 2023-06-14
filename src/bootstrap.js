// Import required dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App';

// Mount function to start up the app
const mount = (el, { onNavigate, defaultHistory, initialPath }) => {
  // Create a history object using provided defaultHistory or create a new memory history
  const history = defaultHistory || createMemoryHistory({
    initialEntries: [initialPath]
  });

  // If onNavigate callback is provided, listen to history changes
  if (onNavigate) {
    history.listen(onNavigate);
  }

  // Render the app component with the history object
  ReactDOM.render(<App history={history} />, el);

  // Return an object with onParentNavigate method to handle navigation from parent
  return {
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location;
      if (pathname !== nextPathname) {
        // Push the new pathname to the history object
        history.push(nextPathname);
      }
    }
  };
};

// If we are in development environment or isolation
// Call mount immediately
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#vehicles-root');
  if (devRoot) {
    // Mount the app on the devRoot element using a browser history
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

// We are running through a container
// and we should import the mount function
export { mount };
