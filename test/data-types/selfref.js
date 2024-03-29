
describe('self_ref', () => {
  before((done) => {
    client.truncate('self_ref', done, 'x')
  })
  it('should be empty', (done) => {
    $('a[href$="/self_ref"]')[0].click()
    page.load(() => {
      $('.x-table tbody tr').length.should.equal(0)
      $('a[href$="/self_ref/add"]')[0].click()
      page.load(done)
    })
  })
  it('add parent records', (done) => {
    async.series([
      (done) => {
        $('[name="view[self_ref][records][0][columns][name]"]').val('a')
        $('[name="action[another]"')[0].click()
        page.load(done)
      },
      (done) => {
        $('.alert-success strong').text().should.equal('Success:')
        $('[name="view[self_ref][records][0][columns][name]"]').val('b')
        $('[name="action[another]"')[0].click()
        page.load(done)
      },
      (done) => {
        $('.alert-success strong').text().should.equal('Success:')
        $('[name="view[self_ref][records][0][columns][name]"]').val('c')
        $('[name="action[save]"')[0].click()
        page.load(done)
      }
    ], () => {
      win.location.pathname.should.match(/\/self_ref$/)
      $('.alert-success strong').text().should.equal('Success:')
      $('.x-table tbody tr').length.should.equal(3)
      $('.x-table tbody tr:eq(0) a').text().should.equal('a')
      $('.x-table tbody tr:eq(1) a').text().should.equal('b')
      $('.x-table tbody tr:eq(2) a').text().should.equal('c')
      $('.x-table tbody tr:eq(0) td:eq(1)').text().trim().should.equal('')
      $('.x-table tbody tr:eq(1) td:eq(1)').text().trim().should.equal('')
      $('.x-table tbody tr:eq(2) td:eq(1)').text().trim().should.equal('')
      done()
    })
  })
  it('set parent fields', (done) => {
    async.series([
      (done) => {
        $('.x-table tbody tr:eq(0) a')[0].click()
        page.load(() => {
          $('[name="view[self_ref][records][0][columns][parent]"] option:contains(b)').attr('selected',true)
          $('[name="view[self_ref][records][0][columns][parent]"]').trigger('chosen:updated')
          $('[name="action[save]"')[0].click()
          page.load(done)
        })
      },
      (done) => {
        $('.x-table tbody tr:eq(1) a')[0].click()
        page.load(() => {
          $('[name="view[self_ref][records][0][columns][parent]"] option:contains(c)').attr('selected',true)
          $('[name="view[self_ref][records][0][columns][parent]"]').trigger('chosen:updated')
          $('[name="action[save]"')[0].click()
          page.load(done)
        })
      },
      (done) => {
        $('.x-table tbody tr:eq(2) a')[0].click()
        page.load(() => {
          $('[name="view[self_ref][records][0][columns][parent]"] option:contains(a)').attr('selected',true)
          $('[name="view[self_ref][records][0][columns][parent]"]').trigger('chosen:updated')
          $('[name="action[save]"')[0].click()
          page.load(done)
        })
      }
    ], () => {
      win.location.pathname.should.match(/\/self_ref$/)
      $('.alert-success strong').text().should.equal('Success:')
      $('.x-table tbody tr').length.should.equal(3)
      $('.x-table tbody tr:eq(0) a').text().should.equal('a')
      $('.x-table tbody tr:eq(1) a').text().should.equal('b')
      $('.x-table tbody tr:eq(2) a').text().should.equal('c')
      $('.x-table tbody tr:eq(0) td:eq(1)').text().trim().should.equal('b')
      $('.x-table tbody tr:eq(1) td:eq(1)').text().trim().should.equal('c')
      $('.x-table tbody tr:eq(2) td:eq(1)').text().trim().should.equal('a')
      done()
    })
  })
  after((done) => {
    $('a[href$="/"]')[0].click()
    page.load(done)
  })
})
