
describe('mtm2', () => {
  before((done) => {
    client.truncate('mtm2', done)
  })
  it('should be empty', (done) => {
    $('a[href$="/mtm2"]')[0].click()
    page.load(() => {
      $('.x-table tbody tr').length.should.equal(0)
      $('a[href$="/mtm2/add"]')[0].click()
      page.load(done)
    })
  })
  it('save and add another', (done) => {
    $('[name="view[mtm2][records][0][columns][name1]"]').val('mtm')
    $('[name="view[mtm2][records][0][columns][name2]"]').val('1')
    $('[name="action[another]"')[0].click()
    page.load(() => {
      win.location.pathname.should.match(/\/mtm2\/add$/)
      $('.alert-success strong').text().should.equal('Success:')
      $('[name="view[mtm2][records][0][columns][name1]"]').val().should.equal('')
      $('[name="view[mtm2][records][0][columns][name2]"]').val().should.equal('')
      done()
    })
  })
  it('save and continue editing', (done) => {
    $('[name="view[mtm2][records][0][columns][name1]"]').val('mtm')
    $('[name="view[mtm2][records][0][columns][name2]"]').val('2')
    $('[name="action[continue]"')[0].click()
    page.load(() => {
      $('.alert-success strong').text().should.equal('Success:')
      $('[name="view[mtm2][records][0][columns][name1]"]').val().should.equal('mtm')
      $('[name="view[mtm2][records][0][columns][name2]"]').val().should.equal('2')
      $('[name="action[another]"')[0].click()
      page.load(done)
    })
  })
  it('save', (done) => {
    $('[name="view[mtm2][records][0][columns][name1]"]').val('mtm')
    $('[name="view[mtm2][records][0][columns][name2]"]').val('3')
    $('[name="action[save]"')[0].click()
    page.load(() => {
      win.location.pathname.should.match(/\/mtm2$/)
      $('.alert-success strong').text().should.equal('Success:')
      $('.x-table tbody tr').length.should.equal(3)
      $('.x-table tbody tr:eq(0) td:eq(1)').text().trim().should.equal('1')
      $('.x-table tbody tr:eq(1) td:eq(1)').text().trim().should.equal('2')
      $('.x-table tbody tr:eq(2) td:eq(1)').text().trim().should.equal('3')
      done()
    })
  })
  after((done) => {
    $('a[href$="/"]')[0].click()
    page.load(done)
  })
})
