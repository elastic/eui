import {
  Pager,
} from './pager';

describe('Pager', () => {
  describe('constructor', () => {
    test('throws error if missing totalItems', () => {
      // @ts-ignore
      expect(() => new Pager()).toThrow();
    });

    test('throws error if missing itemsPerPage', () => {
      // @ts-ignore
      expect(() => new Pager(10)).toThrow();
    });

    test('throws error if non-number initialPageIndex', () => {
      // @ts-ignore
      expect(() => new Pager(10, 3, 'invalid argument')).toThrow();
    });
  });

  describe('methods', () => {
    const totalItems = 10;
    const itemsPerPage = 3;
    const initialPageIndex = 1;
    // Initialising this to a Pager straight away keep TS happy.
    let pager = new Pager(totalItems, itemsPerPage, initialPageIndex);

    beforeEach(() => {
      pager = new Pager(totalItems, itemsPerPage, initialPageIndex);
    });

    describe('getTotalPages', () => {
      test('returns total pages', () => {
        expect(pager.getTotalPages()).toBe(4);
      });
    });

    describe('getCurrentPageIndex', () => {
      test('returns initial page index', () => {
        expect(pager.getCurrentPageIndex()).toBe(initialPageIndex);
      });
    });

    describe('isPageable', () => {
      test('returns true when there are pages', () => {
        expect(pager.isPageable()).toBe(true);
      });

      test('returns false when there no pages', () => {
        pager.setTotalItems(0);
        expect(pager.isPageable()).toBe(false);
      });
    });

    describe('getFirstItemIndex', () => {
      test('returns first item index', () => {
        expect(pager.getFirstItemIndex()).toBe(3);
      });

      test('defaults to -1 when there are no items', () => {
        pager.setTotalItems(0);
        expect(pager.getFirstItemIndex()).toBe(-1);
      });
    });

    describe('getLastItemIndex', () => {
      test('returns last item index', () => {
        expect(pager.getLastItemIndex()).toBe(5);
      });

      test('defaults to -1 when there are no items', () => {
        pager.setTotalItems(0);
        expect(pager.getLastItemIndex()).toBe(-1);
      });
    });

    describe('hasNextPage', () => {
      test('returns true', () => {
        expect(pager.hasNextPage()).toBe(true);
      });

      test('returns false', () => {
        pager.goToPageIndex(3);
        expect(pager.hasNextPage()).toBe(false);
      });
    });

    describe('hasPreviousPage', () => {
      test('returns true', () => {
        expect(pager.hasPreviousPage()).toBe(true);
      });

      test('returns false', () => {
        pager.goToPageIndex(0);
        expect(pager.hasPreviousPage()).toBe(false);
      });
    });

    describe('goToNextPage', () => {
      test('goes to next page', () => {
        pager.goToNextPage();
        expect(pager.getCurrentPageIndex()).toBe(2);
      });

      test('stops at last page', () => {
        pager.goToNextPage();
        pager.goToNextPage();
        pager.goToNextPage();
        pager.goToNextPage();
        expect(pager.getCurrentPageIndex()).toBe(3);
      });
    });

    describe('goToPreviousPage', () => {
      test('goes to previous page', () => {
        pager.goToPreviousPage();
        expect(pager.getCurrentPageIndex()).toBe(0);
      });

      test('stops at first page', () => {
        pager.goToPreviousPage();
        pager.goToPreviousPage();
        expect(pager.getCurrentPageIndex()).toBe(0);
      });
    });

    describe('goToPageIndex', () => {
      test('goes to page index', () => {
        pager.goToPageIndex(0);
        expect(pager.getCurrentPageIndex()).toBe(0);
      });
    });

    describe('setTotalItems', () => {
      test('updates total pages', () => {
        pager.setTotalItems(20);
        expect(pager.getTotalPages()).toBe(7);
      });

      test('updates current page', () => {
        pager.setTotalItems(2);
        expect(pager.getCurrentPageIndex()).toBe(0);
      });
    });

    describe('setItemsPerPage', () => {
      test('updates total pages', () => {
        pager.setItemsPerPage(1);
        expect(pager.getTotalPages()).toBe(totalItems);
      });

      test('updates last item index', () => {
        pager.setItemsPerPage(2);
        expect(pager.getLastItemIndex()).toBe(3);
      });

      test("doesn't update current page", () => {
        pager.setItemsPerPage(2);
        expect(pager.getCurrentPageIndex()).toBe(initialPageIndex);
      });
    });
  });

  describe('behavior', () => {
    describe('when there are no items', () => {
      // TODO
    });
  });
});
