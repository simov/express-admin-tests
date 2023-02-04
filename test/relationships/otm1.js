
describe('otm1', () => {
  before((done) => {
    client.truncate('otm1', done)
  })
  it('should be empty', (done) => {
    $('a[href$="/otm1"]')[0].click()
    page.load(() => {
      $('.x-table tbody tr').length.should.equal(0)
      $('a[href$="/otm1/add"]')[0].click()
      page.load(done)
    })
  })
  it('save and add another', (done) => {
    $('[name="view[otm1][records][0][columns][name1]"]').val('otm1')
    $('[name="action[another]"')[0].click()
    page.load(() => {
      win.location.pathname.should.match(/\/otm1\/add$/)
      $('.alert-success strong').text().should.equal('Success:')
      $('[name="view[otm1][records][0][columns][name1]"]').val().should.equal('')
      done()
    })
  })
  it('save and continue editing', (done) => {
    $('[name="view[otm1][records][0][columns][name1]"]').val('otm2')
    $('[name="action[continue]"')[0].click()
    page.load(() => {
      $('.alert-success strong').text().should.equal('Success:')
      $('[name="view[otm1][records][0][columns][name1]"]').val().should.equal('otm2')
      $('[name="action[another]"')[0].click()
      page.load(done)
    })
  })
  it('save', (done) => {
    $('[name="view[otm1][records][0][columns][name1]"]').val('otm3')
    $('[name="action[save]"')[0].click()
    page.load(() => {
      win.location.pathname.should.match(/\/otm1$/)
      $('.alert-success strong').text().should.equal('Success:')
      $('.x-table tbody tr').length.should.equal(3)
      $('.x-table tbody tr:eq(0) a').text().should.equal('otm1')
      $('.x-table tbody tr:eq(1) a').text().should.equal('otm2')
      $('.x-table tbody tr:eq(2) a').text().should.equal('otm3')
      done()
    })
  })
  after((done) => {
    $('a[href$="/"]')[0].click()
    page.load(done)
  })
})
