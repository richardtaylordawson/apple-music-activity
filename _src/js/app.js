import Base from './components/Base.js';
import Home from './components/Home.js';
import HowTo from './components/HowTo.js';
import FAQ from './components/FAQ.js';

new Base().initializeBaseEvents();
new Home().initializeHomeEvents();
new HowTo().initializeHowToEvents();
new FAQ().initializeFAQEvents();
