import Base from './classes/Base.js';
import Nav from './classes/Nav.js';
import Home from './classes/Home.js';
import Upload from './classes/Upload.js';
import HowTo from './classes/HowTo.js';
import Demo from './classes/Demo.js';
import FAQ from './classes/FAQ.js';

// Global
new Base().initializeBaseEvents();

// Components
new Nav().initializeNavEvents();

// Screens/Pages
new Home().initializeHomeEvents();
new Upload().initializeUploadEvents();
new HowTo().initializeHowToEvents();
new Demo();
new FAQ().initializeFAQEvents();
