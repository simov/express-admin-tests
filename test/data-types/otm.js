
describe('otm', () => {
  before((done) => {
    client.truncate('otm', done, 'y')
  })
  it('should be empty', (done) => {
    $('a[href$="/otm"]')[0].click()
    page.load(() => {
      $('.x-table tbody tr').length.should.equal(0)
      $('a[href$="/otm/add"]')[0].click()
      page.load(done)
    })
  })
  it('add otm', (done) => {
    async.series([
      (done) => {
        $('[name="view[otm][records][0][columns][name1]"]').val('a')
        $('[name="action[another]"')[0].click()
        page.load(done)
      },
      (done) => {
        $('.alert-success strong').text().should.equal('Success:')
        $('[name="view[otm][records][0][columns][name1]"]').val('b')
        $('[name="action[another]"')[0].click()
        page.load(done)
      },
      (done) => {
        $('.alert-success strong').text().should.equal('Success:')
        $('[name="view[otm][records][0][columns][name1]"]').val('c')
        $('[name="action[save]"')[0].click()
        page.load(done)
      }
    ], () => {
      win.location.pathname.should.match(/\/otm$/)
      $('.alert-success strong').text().should.equal('Success:')
      $('.x-table tbody tr').length.should.equal(3)
      $('.x-table tbody tr:eq(0) a').text().should.equal('a')
      $('.x-table tbody tr:eq(1) a').text().should.equal('b')
      $('.x-table tbody tr:eq(2) a').text().should.equal('c')
      done()
    })
  })
  after((done) => {
    $('a[href$="/"]')[0].click()
    page.load(done)
  })
})
