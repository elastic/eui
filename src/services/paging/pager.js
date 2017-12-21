export class Pager {
  constructor(totalItems, itemsPerPage, initialPageIndex = 0) {
    if (isNaN(parseInt(totalItems, 10))) {
      throw new Error('Please provide a number of totalItems');
    }

    if (isNaN(parseInt(itemsPerPage, 10))) {
      throw new Error('Please provide a number of itemsPerPage');
    }

    if (isNaN(parseInt(initialPageIndex, 10))) {
      throw new Error('Please provide a number of initialPageIndex');
    }

    this.totalItems = totalItems;
    this.itemsPerPage = itemsPerPage;
    this.currentPageIndex = initialPageIndex;

    this.update();
  }

  setTotalItems = (totalItems) => {
    this.totalItems = totalItems;
    this.update();
  };

  setItemsPerPage = (itemsPerPage) => {
    this.itemsPerPage = itemsPerPage;
    this.update();
  };

  isPageable = () => this.firstItemIndex !== -1;

  getTotalPages = () => this.totalPages;

  getCurrentPageIndex = () => this.currentPageIndex;

  getFirstItemIndex = () => this.firstItemIndex;

  getLastItemIndex = () => this.lastItemIndex;

  hasNextPage = () => this.currentPageIndex < this.totalPages - 1;

  hasPreviousPage = () => this.currentPageIndex > 0;

  goToNextPage = () => {
    this.goToPageIndex(this.currentPageIndex + 1);
  };

  goToPreviousPage = () => {
    this.goToPageIndex(this.currentPageIndex - 1);
  };

  goToPageIndex = (pageIndex) => {
    this.currentPageIndex = pageIndex;
    this.update();
  }

  update = () => {
    if (this.totalItems <= 0) {
      this.totalPages = 0;
      this.currentPageIndex = 0;
      this.firstItemIndex = -1;
      this.lastItemIndex = -1;
      return;
    }

    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);

    // Ensure the current page falls within our range of total pages.
    this.currentPageIndex = Math.min(Math.max(0, this.currentPageIndex), this.totalPages - 1);

    // Find the range of visible items on the current page.
    this.firstItemIndex = this.currentPageIndex * this.itemsPerPage;
    this.lastItemIndex = Math.min(this.firstItemIndex + this.itemsPerPage, this.totalItems) - 1;
  };
}
