"use strict";
// This plugin will count and display the number of pages in the Figma file
// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).
console.log('Plugin starting...');
// This shows the HTML page in "ui.html".
figma.showUI(__html__, { width: 300, height: 200 });
console.log('UI shown');
try {
    // Get the number of pages and send it to the UI
    const pageCount = figma.root.children.length;
    console.log('Number of pages:', pageCount);
    console.log('Root children:', figma.root.children);
    // Send the count to the UI
    figma.ui.postMessage({
        type: 'page-count',
        count: pageCount
    });
    console.log('Message sent to UI');
}
catch (error) {
    console.error('Error counting pages:', error);
    figma.ui.postMessage({
        type: 'error',
        message: 'Failed to count pages: ' + ((error === null || error === void 0 ? void 0 : error.message) || 'Unknown error')
    });
}
// Handle messages from the UI
figma.ui.onmessage = (msg) => {
    console.log('Received message from UI:', msg);
    if (msg.type === 'cancel') {
        console.log('Closing plugin');
        figma.closePlugin();
    }
};
