Feature('Review Restaurant');

Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('add a review to restaurant', async ({ I }) => {
  I.waitForElement('.restaurant-item', 5);
  I.click(locate('.restaurant-item').first());

  I.waitForElement('.review-form', 5);
  I.fillField('#review-name', 'E2E Tester');
  I.fillField('#review-content', 'This is an E2E test review');
  I.click('#submit-review');

  I.waitForElement('.review-item', 5);
  const lastReview = locate('.review-item').last();
  const reviewerName = await I.grabTextFrom(locate('.review-header strong').inside(lastReview));
  const reviewContent = await I.grabTextFrom(locate('p').inside(lastReview));

  assert.strictEqual(reviewerName, 'E2E Tester');
  assert.strictEqual(reviewContent, 'This is an E2E test review');
}); 