'use strict';

page('/', navigation.loadHomePage, inventoryController.index);;
page('/search', navigation.loadSearchPage);
page('/inventory', navigation.loadInventoryPage);
page('/new', navigation.loadNewPage);
page();
