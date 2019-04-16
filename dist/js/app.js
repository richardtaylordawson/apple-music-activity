import Base from './classes/Base.js';
import Nav from './classes/Nav.js';
import Home from './classes/pages/Home.js';
import Upload from './classes/pages/Upload.js';
import HowTo from './classes/pages/HowTo.js';

// Global
new Base().initializeBaseEvents();

// Components
new Nav().initializeNavEvents();

// Pages
new Home().initializeHomeEvents();
new Upload().initializeUploadEvents();
new HowTo().initializeHowToEvents();
