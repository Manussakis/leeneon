import "normalize.css";
import "./css/main.ltr.css";
import "./css/themes.css";
import "./css/purple.css";
import "./css/custom.css";

import SiteState from './js/SiteState';
import Site from './js/Site';

const siteState = new SiteState();
new Site(siteState);