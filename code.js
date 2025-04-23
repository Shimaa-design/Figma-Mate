"use strict";
// This plugin will create a new Index page at the top of the pages list
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).
console.log('Plugin starting...');
// This shows the HTML page in "ui.html".
figma.showUI(__html__, { width: 300, height: 200 });
console.log('UI shown');
try {
    // Create a new page called "Index"
    const indexPage = figma.createPage();
    indexPage.name = "Index";
    // Move the Index page to the top of the list
    figma.root.insertChild(0, indexPage);
    // Switch to the new Index page using the async method
    figma.setCurrentPageAsync(indexPage).then(() => __awaiter(void 0, void 0, void 0, function* () {
        console.log('Index page created and moved to top');
        // Load all pages first
        yield figma.loadAllPagesAsync();
        console.log('All pages loaded');
        // Load the font
        yield figma.loadFontAsync({ family: "Inter", style: "Regular" });
        console.log('Font loaded');
        // Count total pages (including the new Index page)
        const totalPages = figma.root.children.length;
        // Find all components in the file
        const components = figma.root.findAll(node => node.type === "COMPONENT");
        const componentCount = components.length;
        // Create first text layer for page count
        const pageCountText = figma.createText();
        pageCountText.characters = `Total Pages: ${totalPages}`;
        pageCountText.fontSize = 120;
        pageCountText.x = 100;
        pageCountText.y = 100;
        figma.currentPage.appendChild(pageCountText);
        // Create second text layer for component count
        const componentCountText = figma.createText();
        componentCountText.characters = `Total Components: ${componentCount}`;
        componentCountText.fontSize = 120;
        componentCountText.x = 100;
        componentCountText.y = pageCountText.y + pageCountText.height + 50; // Position below the first text
        figma.currentPage.appendChild(componentCountText);
        // Center both text layers in the viewport
        figma.viewport.scrollAndZoomIntoView([pageCountText, componentCountText]);
        console.log('Text layers created with counts');
        // Send success message to UI
        figma.ui.postMessage({
            type: 'success',
            message: 'Index page created with page and component counts!'
        });
    })).catch((error) => {
        console.error('Error switching to Index page:', error);
        figma.ui.postMessage({
            type: 'error',
            message: 'Failed to switch to Index page: ' + ((error === null || error === void 0 ? void 0 : error.message) || 'Unknown error')
        });
    });
}
catch (error) {
    console.error('Error creating Index page:', error);
    figma.ui.postMessage({
        type: 'error',
        message: 'Failed to create Index page: ' + ((error === null || error === void 0 ? void 0 : error.message) || 'Unknown error')
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
