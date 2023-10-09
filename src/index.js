import "normalize.css";
import "./scss/main.ltr.scss";
import "./scss/themes.scss";
import "./scss/purple.scss";
import "./scss/custom.scss";

import imagesLoaded from "imagesloaded";

import SiteState from './js/SiteState';
import Site from './js/Site';

imagesLoaded('.preloadimage', function() {    
    const siteState = new SiteState();
    new Site(siteState);
});