import { ArduinoAngular2Page } from './app.po';

describe('arduino-angular2 App', () => {
  let page: ArduinoAngular2Page;

  beforeEach(() => {
    page = new ArduinoAngular2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
