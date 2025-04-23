// This plugin will count and display the number of pages in the Figma file

// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

// This shows the HTML page in "ui.html".
figma.showUI(__html__, { width: 300, height: 200 });

try {
  // Get the number of pages and send it to the UI
  const pageCount = figma.root.children.length;
  console.log('Number of pages:', pageCount);
  
  // Send the count to the UI
  figma.ui.postMessage({ 
    type: 'page-count', 
    count: pageCount 
  });
} catch (error: any) {
  console.error('Error counting pages:', error);
  figma.ui.postMessage({ 
    type: 'error', 
    message: 'Failed to count pages: ' + (error?.message || 'Unknown error') 
  });
}

// Handle messages from the UI
figma.ui.onmessage = (msg: { type: string }) => {
  if (msg.type === 'cancel') {
    figma.closePlugin();
  }
};
