describe('institution', () => {
  it('create', require('./use-cases/create'));
  it('update', require('./use-cases/update'));
  it('active', require('./use-cases/active'));
  it('save draft', require('./use-cases/save-draft'));
  it('history', require('./use-cases/history'));
});
