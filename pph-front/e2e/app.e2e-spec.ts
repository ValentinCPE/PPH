import { PphFrontPage } from './app.po';

describe('pph-front App', () => {
  let page: PphFrontPage;

  beforeEach(() => {
    page = new PphFrontPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
