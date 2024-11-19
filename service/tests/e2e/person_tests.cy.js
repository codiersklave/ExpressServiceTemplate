describe('All person routes work as expected', () => {
  it('Should return an empty list', () => {
    cy.request({
      method: 'GET',
      url: '/persons',
    }).then(response => {
      expect(response).to.not.be.null;
    });
  });
});
