
describe('tbl', () => {
  before((done) => {
    async.eachSeries(['tbl','mto','tbl_has_mtm','mto_has_mtm'], (table, done) => {
      client.truncate(table, done, 'x')
    }, () => {
      $('a[href$="/tbl"]')[0].click()
      page.load(done)
    })
  })

  it('should be empty', (done) => {
    $('.x-table tbody tr').length.should.equal(0)
    $('a[href$="/tbl/add"]')[0].click()
    page.load(done)
  })

  it('empty fields', (done) => {
    $('[name="action[save]"')[0].click()
    page.load(() => {
      win.location.pathname.should.match(/\/tbl\/add$/)
      $('.alert-danger strong').text().should.equal('Error:')
      $('.has-error').length.should.equal(13)
      done()
    })
  })

  it('populate select controls', (done) => {
    // otm
    $('[name="view[tbl][records][0][columns][otm_id]"] option:eq(1)').val().should.equal('1')
    $('[name="view[tbl][records][0][columns][otm_id]"] option:eq(1)').text().trim().should.equal('a')
    $('[name="view[tbl][records][0][columns][otm_id]"] option:eq(2)').val().should.equal('2')
    $('[name="view[tbl][records][0][columns][otm_id]"] option:eq(2)').text().trim().should.equal('b')
    $('[name="view[tbl][records][0][columns][otm_id]"] option:eq(3)').val().should.equal('3')
    $('[name="view[tbl][records][0][columns][otm_id]"] option:eq(3)').text().trim().should.equal('c')
    // otm
    $('[name="view[tbl][records][0][columns][mtm]"] option:eq(1)').val().should.equal('1')
    $('[name="view[tbl][records][0][columns][mtm]"] option:eq(1)').text().trim().should.equal('a 1')
    $('[name="view[tbl][records][0][columns][mtm]"] option:eq(2)').val().should.equal('2')
    $('[name="view[tbl][records][0][columns][mtm]"] option:eq(2)').text().trim().should.equal('b')
    $('[name="view[tbl][records][0][columns][mtm]"] option:eq(3)').val().should.equal('3')
    $('[name="view[tbl][records][0][columns][mtm]"] option:eq(3)').text().trim().should.equal('c 3')
    // static
    $('[name="view[tbl][records][0][columns][static]"] option:eq(1)').val().should.equal('one')
    $('[name="view[tbl][records][0][columns][static]"] option:eq(1)').text().trim().should.equal('one')
    $('[name="view[tbl][records][0][columns][static]"] option:eq(2)').val().should.equal('two')
    $('[name="view[tbl][records][0][columns][static]"] option:eq(2)').text().trim().should.equal('two')
    $('[name="view[tbl][records][0][columns][static]"] option:eq(3)').val().should.equal('three')
    $('[name="view[tbl][records][0][columns][static]"] option:eq(3)').text().trim().should.equal('third option')
    done()
  })

  it('persist state', (done) => {
    // otm
    $('[name="view[tbl][records][0][columns][otm_id]"] option:eq(1)').attr('selected',true)
    $('[name="view[tbl][records][0][columns][otm_id]"]').trigger('chosen:updated')
    // mtm
    $('[name="view[tbl][records][0][columns][mtm]"] option:eq(1)').attr('selected',true)
    $('[name="view[tbl][records][0][columns][mtm]"]').trigger('chosen:updated')
    // static
    $('[name="view[tbl][records][0][columns][static]"] option:eq(1)').attr('selected',true)
    $('[name="view[tbl][records][0][columns][static]"]').trigger('chosen:updated')

    $('[name="view[tbl][records][0][columns][text]"]').val('one')
    $('[name="view[tbl][records][0][columns][boolean]"]:eq(0)').attr('checked', true)
    $('[name="view[tbl][records][0][columns][int]"]').val('1')
    $('[name="view[tbl][records][0][columns][decimal]"]').val('1.1')

    $('[name="view[tbl][records][0][columns][date]"]').val('2014-06-01').datetimepicker('update')
    $('[name="view[tbl][records][0][columns][time]"]').val('20:00:00').datetimepicker('update')
    $('[name="view[tbl][records][0][columns][datetime]"]').val('2014-06-01 20:00:00').datetimepicker('update')
    $('[name="view[tbl][records][0][columns][year]"]').val('2014')

    win.CKEDITOR.instances['view[tbl][records][0][columns][textarea]'].setData('<strong>one</strong>', () => {
      $('[name="action[save]"')[0].click()
      page.load(() => {
        win.location.pathname.should.match(/\/tbl\/add$/)
        $('.alert-danger strong').text().should.equal('Error:')
        $('.has-error').length.should.equal(1)

        // otm
        $('[name="view[tbl][records][0][columns][otm_id]"] option:eq(1)').attr('selected').should.equal('selected')
        // mtm
        $('[name="view[tbl][records][0][columns][mtm]"] option:eq(1)').attr('selected').should.equal('selected')
        // static
        $('[name="view[tbl][records][0][columns][static]"] option:eq(1)').attr('selected').should.equal('selected')

        $('[name="view[tbl][records][0][columns][text]"]').val().should.equal('one')
        $('[name="view[tbl][records][0][columns][boolean]"]:eq(0)').attr('checked').should.equal('checked')
        $('[name="view[tbl][records][0][columns][int]"]').val().should.equal('1')
        $('[name="view[tbl][records][0][columns][decimal]"]').val().should.equal('1.1')

        $('[name="view[tbl][records][0][columns][date]"]').val().should.equal('2014-06-01')
        $('[name="view[tbl][records][0][columns][time]"]').val().should.equal('20:00:00')
        $('[name="view[tbl][records][0][columns][datetime]"]').val().should.equal('2014-06-01 20:00:00')

        win.CKEDITOR.instances['view[tbl][records][0][columns][textarea]'].getData().trim().should.equal('<p><strong>one</strong></p>')

        done()
      })
    })
  })

  it('jq plugin init', (done) => {
    $('.add-another:eq(0)')[0].click()

    // chosen
    $('[name="manyToOne[mto][records][0][columns][otm_id]"]').trigger('chosen:open')
    $('[name="manyToOne[mto][records][0][columns][otm_id]"]').next().hasClass('chosen-container-active').should.equal(true)
    $('[name="manyToOne[mto][records][0][columns][otm_id]"]').next().find('.chosen-drop').is(':visible').should.equal(true)

    $('[name="manyToOne[mto][records][0][columns][mtm]"]').trigger('chosen:open')
    $('[name="manyToOne[mto][records][0][columns][mtm]"]').next().hasClass('chosen-container-active').should.equal(true)
    $('[name="manyToOne[mto][records][0][columns][mtm]"]').next().find('.chosen-drop').is(':visible').should.equal(true)

    $('[name="manyToOne[mto][records][0][columns][static]"]').trigger('chosen:open')
    $('[name="manyToOne[mto][records][0][columns][static]"]').next().hasClass('chosen-container-active').should.equal(true)
    $('[name="manyToOne[mto][records][0][columns][static]"]').next().find('.chosen-drop').is(':visible').should.equal(true)

    // datetime picker
    $('[name="manyToOne[mto][records][0][columns][date]"]').datetimepicker('show')
    $('.datetimepicker-dropdown-bottom-right:visible').length.should.equal(1)
    $('[name="manyToOne[mto][records][0][columns][date]"]').datetimepicker('hide')

    $('[name="manyToOne[mto][records][0][columns][time]"]').datetimepicker('show')
    $('.datetimepicker-dropdown-bottom-right:visible').length.should.equal(1)
    $('[name="manyToOne[mto][records][0][columns][time]"]').datetimepicker('hide')

    $('[name="manyToOne[mto][records][0][columns][datetime]"]').datetimepicker('show')
    $('.datetimepicker-dropdown-bottom-right:visible').length.should.equal(1)
    $('[name="manyToOne[mto][records][0][columns][datetime]"]').datetimepicker('hide')

    // editor
    Object.keys(win.CKEDITOR.instances).length.should.equal(2)
    done()
  })

  it('store inline record with all fields empty', (done) => {
    $('[type=text][name="view[tbl][records][0][columns][upload]"]').val('one')
    $('[name="action[continue]"')[0].click()
    page.load(() => {
      $('.alert-success strong').text().should.equal('Success:')
      $('[name="manyToOne[mto][records][0][remove]"]').length.should.equal(1)

      $('[name="view[tbl][records][0][columns][text]"]').val().should.equal('one')
      $('[name="view[tbl][records][0][columns][boolean]"]:eq(0)').attr('checked').should.equal('checked')
      $('[name="view[tbl][records][0][columns][int]"]').val().should.equal('1')
      $('[name="view[tbl][records][0][columns][decimal]"]').val().should.match(/1.10?/)

      $('[name="view[tbl][records][0][columns][date]"]').val().should.equal('2014-06-01')
      $('[name="view[tbl][records][0][columns][time]"]').val().should.equal('20:00:00')
      $('[name="view[tbl][records][0][columns][datetime]"]').val().should.equal('2014-06-01 20:00:00')
      $('[name="view[tbl][records][0][columns][year]"]').val().should.equal('2014')

      win.CKEDITOR.instances['view[tbl][records][0][columns][textarea]'].getData().trim().should.equal('<p><strong>one</strong></p>')

      $('[name="action[another]"')[0].click()
      page.load(done)
    })
  })

  it('add 3 more records', (done) => {
    async.series([
      (done) => {
        $('[name="view[tbl][records][0][columns][otm_id]"] option:eq(2)').attr('selected',true).trigger('chosen:updated')
        $('[name="view[tbl][records][0][columns][mtm]"] option:eq(2)').attr('selected',true).trigger('chosen:updated')
        $('[name="view[tbl][records][0][columns][static]"] option:eq(2)').attr('selected',true).trigger('chosen:updated')

        $('[name="view[tbl][records][0][columns][text]"]').val('two')
        $('[name="view[tbl][records][0][columns][boolean]"]:eq(1)').attr('checked', true)
        $('[name="view[tbl][records][0][columns][int]"]').val('2')
        $('[name="view[tbl][records][0][columns][decimal]"]').val('2.2')
        $('[name="view[tbl][records][0][columns][upload]"]:eq(0)').val('two')

        $('[name="view[tbl][records][0][columns][date]"]').val('2014-06-02').datetimepicker('update')
        $('[name="view[tbl][records][0][columns][time]"]').val('10:10:00').datetimepicker('update')
        $('[name="view[tbl][records][0][columns][datetime]"]').val('2014-06-02 10:10:00').datetimepicker('update')
        $('[name="view[tbl][records][0][columns][year]"]').val('2014')
        win.CKEDITOR.instances['view[tbl][records][0][columns][textarea]'].setData('<em>two</em>', () => {
          $('[name="action[another]"')[0].click()
          page.load(done)
        })
      },
      (done) => {
        $('[name="view[tbl][records][0][columns][otm_id]"] option:eq(3)').attr('selected',true).trigger('chosen:updated')
        $('[name="view[tbl][records][0][columns][mtm]"] option:eq(3)').attr('selected',true).trigger('chosen:updated')
        $('[name="view[tbl][records][0][columns][static]"] option:eq(3)').attr('selected',true).trigger('chosen:updated')

        $('[name="view[tbl][records][0][columns][text]"]').val('three')
        $('[name="view[tbl][records][0][columns][boolean]"]:eq(0)').attr('checked', true)
        $('[name="view[tbl][records][0][columns][int]"]').val('3')
        $('[name="view[tbl][records][0][columns][decimal]"]').val('3.3')
        $('[name="view[tbl][records][0][columns][upload]"]:eq(0)').val('three')

        $('[name="view[tbl][records][0][columns][date]"]').val('2014-06-03').datetimepicker('update')
        $('[name="view[tbl][records][0][columns][time]"]').val('12:00:00').datetimepicker('update')
        $('[name="view[tbl][records][0][columns][datetime]"]').val('2014-06-03 12:00:00').datetimepicker('update')
        $('[name="view[tbl][records][0][columns][year]"]').val('2014')
        win.CKEDITOR.instances['view[tbl][records][0][columns][textarea]'].setData('<u>three</u>', () => {
          $('[name="action[another]"')[0].click()
          page.load(done)
        })
      },
      (done) => {
        $('[name="view[tbl][records][0][columns][otm_id]"] option:eq(1)').attr('selected',true).trigger('chosen:updated')
        $('[name="view[tbl][records][0][columns][mtm]"] option:eq(1)').attr('selected',true).trigger('chosen:updated')
        $('[name="view[tbl][records][0][columns][mtm]"] option:eq(3)').attr('selected',true).trigger('chosen:updated')
        $('[name="view[tbl][records][0][columns][static]"] option:eq(1)').attr('selected',true).trigger('chosen:updated')

        $('[name="view[tbl][records][0][columns][text]"]').val('one')
        $('[name="view[tbl][records][0][columns][boolean]"]:eq(0)').attr('checked', true)
        $('[name="view[tbl][records][0][columns][int]"]').val('1')
        $('[name="view[tbl][records][0][columns][decimal]"]').val('1.1')
        $('[name="view[tbl][records][0][columns][upload]"]:eq(0)').val('one')

        $('[name="view[tbl][records][0][columns][date]"]').val('2014-06-04').datetimepicker('update')
        $('[name="view[tbl][records][0][columns][time]"]').val('20:30:00').datetimepicker('update')
        $('[name="view[tbl][records][0][columns][datetime]"]').val('2014-06-04 20:30:00').datetimepicker('update')
        $('[name="view[tbl][records][0][columns][year]"]').val('2014')
        win.CKEDITOR.instances['view[tbl][records][0][columns][textarea]'].setData('<strong>four</strong>', () => {
          $('[name="action[save]"')[0].click()
          page.load(done)
        })
      }
    ], () => {
      $('.x-table tbody tr').length.should.equal(2)

      $('.x-table tbody tr:eq(0) td:eq(1)').text().trim().should.equal('a')
      $('.x-table tbody tr:eq(0) td:eq(2)').html().trim().should.equal(
        '<span class="label label-default">a 1</span><span class="label label-default">c 3</span>'
      )
      $('.x-table tbody tr:eq(0) td:eq(3)').text().trim().should.equal('one')
      $('.x-table tbody tr:eq(0) td:eq(4)').text().trim().should.equal('one')
      $('.x-table tbody tr:eq(0) td:eq(5)').text().trim().should.equal('true')
      $('.x-table tbody tr:eq(0) td:eq(6)').text().trim().should.equal('1')
      $('.x-table tbody tr:eq(0) td:eq(7)').text().trim().should.match(/1.10?/)
      $('.x-table tbody tr:eq(0) td:eq(8)').text().trim().should.equal('one')
      $('.x-table tbody tr:eq(0) td:eq(9)').text().trim().should.equal('')
      $('.x-table tbody tr:eq(0) td:eq(10)').text().trim().should.equal('Wed Jun 04 2014')
      $('.x-table tbody tr:eq(0) td:eq(11)').text().trim().should.equal('20:30:00')
      $('.x-table tbody tr:eq(0) td:eq(12)').text().trim().should.equal('Wed Jun 04 2014 20:30:00')
      $('.x-table tbody tr:eq(0) td:eq(13)').text().trim().should.equal('2014')
      $('.x-table tbody tr:eq(0) td:eq(14)').text().trim().should.equal('<p><strong>four</strong></p>')

      $('.pagination li').length.should.equal(4)
      $('.pagination li:eq(0)').hasClass('active').should.equal(true)
      $('.pagination li:eq(1) a').text().should.equal('2')
      done()
    })
  })

  it('filter - logical and', (done) => {
    $('.glyphicon-filter')[0].click()

    $('[name="filter[otm_id]"] option:eq(1)').attr('selected',true)
    $('[name="filter[otm_id]"]').trigger('chosen:updated')

    $('[name="filter[mtm]"] option:eq(1)').attr('selected',true)
    $('[name="filter[mtm]"]').trigger('chosen:updated')

    $('[name="filter[static]"] option:eq(1)').attr('selected',true)
    $('[name="filter[static]"]').trigger('chosen:updated')

    $('[name="filter[text]"]').val('one')
    $('[name="filter[boolean]"]:eq(0)').attr('checked', true)
    $('[name="filter[int]"]').val('1')
    $('[name="filter[decimal]"]').val('1.1')
    $('[name="filter[upload]"]').val('one')
    $('[name="filter[textarea]"]').val('strong')

    $('[name="filter[date]"]:eq(0)').val('2014-06-01').datetimepicker('update')
    $('[name="filter[date]"]:eq(1)').val('2014-06-04').datetimepicker('update')
    $('[name="filter[time]"]:eq(0)').val('10:00:00').datetimepicker('update')
    $('[name="filter[time]"]:eq(1)').val('20:30:00').datetimepicker('update')
    $('[name="filter[datetime]"]:eq(0)').val('2014-06-01 10:00:00').datetimepicker('update')
    $('[name="filter[datetime]"]:eq(1)').val('2014-06-04 20:30:00').datetimepicker('update')
    $('[name="filter[year]"]').val('2014')

    $('[name="action[filter]"]')[0].click()
    page.load(() => {
      $('form').is(':visible').should.equal(true)

      $('[name="filter[otm_id]"] option:eq(1)').attr('selected').should.equal('selected')
      $('[name="filter[mtm]"] option:eq(1)').attr('selected').should.equal('selected')
      $('[name="filter[static]"] option:eq(1)').attr('selected').should.equal('selected')

      $('[name="filter[text]"]').val().should.equal('one')
      $('[name="filter[boolean]"]:eq(0)').attr('checked').should.equal('checked')
      $('[name="filter[int]"]').val().should.equal('1')
      $('[name="filter[decimal]"]').val().should.equal('1.1')
      $('[name="filter[upload]"]').val().should.equal('one')
      $('[name="filter[textarea]"]').val().should.equal('strong')

      $('[name="filter[date]"]:eq(0)').val().should.equal('2014-06-01')
      $('[name="filter[date]"]:eq(1)').val().should.equal('2014-06-04')
      $('[name="filter[time]"]:eq(0)').val().should.equal('10:00:00')
      $('[name="filter[time]"]:eq(1)').val().should.equal('20:30:00')
      $('[name="filter[datetime]"]:eq(0)').val().should.equal('2014-06-01 10:00:00')
      $('[name="filter[datetime]"]:eq(1)').val().should.equal('2014-06-04 20:30:00')

      $('.x-table tbody tr').length.should.equal(2)
      $('.x-table tbody tr:eq(0) td:eq(1)').text().trim().should.equal('a')
      $('.x-table tbody tr:eq(1) td:eq(1)').text().trim().should.equal('a')
      $('.pagination li').length.should.equal(0)

      $('[name="action[clear]"]')[0].click()
      page.load(done)
    })
  })

  it('filter - logical or', (done) => {
    $('.glyphicon-filter')[0].click()

    $('[name="filter[mtm]"] option:eq(3)').attr('selected',true)
    $('[name="filter[mtm]"]').trigger('chosen:updated')

    $('[name="filter[boolean]"]:eq(1)').attr('checked', true)

    $('[name=or]').attr('checked', true)
    $('[name="action[filter]"]')[0].click()
    page.load(() => {
      $('form').is(':visible').should.equal(true)

      $('[name="filter[mtm]"] option:eq(3)').attr('selected').should.equal('selected')
      $('[name="filter[boolean]"]:eq(1)').attr('checked').should.equal('checked')

      $('.x-table tbody tr').length.should.equal(2)
      $('.x-table tbody tr:eq(0) td:eq(1)').text().trim().should.equal('a')
      $('.x-table tbody tr:eq(1) td:eq(1)').text().trim().should.equal('c')

      $('.pagination li').length.should.equal(4)
      $('.pagination li:eq(0)').hasClass('active').should.equal(true)
      $('.pagination li:eq(1) a').text().should.equal('2')
      done()
    })
  })

  it('order by datetime - default/asc/desc', (done) => {
    $('[name=order] option:eq(13)').attr('selected', true)
    $('[name=order] option:eq(13)').trigger('chosen:updated')

    async.series([
      (done) => {
        $('[name="action[filter]"]')[0].click()
        page.load(done)
      },
      (done) => {
        $('.x-table tbody tr:eq(0) td:eq(1)').text().trim().should.equal('b')
        $('.x-table tbody tr:eq(1) td:eq(1)').text().trim().should.equal('c')

        $('[name=direction]:eq(0)').attr('checked', true)
        $('[name="action[filter]"]')[0].click()
        page.load(done)
      },
      (done) => {
        $('.x-table tbody tr:eq(0) td:eq(1)').text().trim().should.equal('b')
        $('.x-table tbody tr:eq(1) td:eq(1)').text().trim().should.equal('c')

        $('[name=direction]:eq(1)').attr('checked', true)
        $('[name="action[filter]"]')[0].click()
        page.load(done)
      }
    ], () => {
      $('.x-table tbody tr:eq(0) td:eq(1)').text().trim().should.equal('a')
      $('.x-table tbody tr:eq(1) td:eq(1)').text().trim().should.equal('c')
      done()
    })
  })

  it('navigate to another page, return back, persist state', (done) => {
    async.series([
      (done) => {
        $('[href$="/"')[0].click()
        page.load(done)
      },
      (done) => {
        $('[href$="/tbl"]')[0].click()
        page.load(done)
      }
    ], () => {
      $('form').is(':visible').should.equal(true)
      $('[name=or]').attr('checked').should.equal('checked')

      $('[name="filter[mtm]"] option:eq(3)').attr('selected').should.equal('selected')
      $('[name="filter[boolean]"]:eq(1)').attr('checked').should.equal('checked')

      $('[name=order] option:eq(13)').attr('selected').should.equal('selected')
      $('[name=direction]:eq(1)').attr('checked').should.equal('checked')

      $('.x-table tbody tr:eq(0) td:eq(1)').text().trim().should.equal('a')
      $('.x-table tbody tr:eq(1) td:eq(1)').text().trim().should.equal('c')

      $('.pagination li').length.should.equal(4)
      $('.pagination li:eq(0)').hasClass('active').should.equal(true)
      $('.pagination li:eq(1) a').text().should.equal('2')
      done()
    })
  })

  it('navigate to page 2, store record, redirect back to page 2', (done) => {
    async.series([
      (done) => {
        $('[href$="/tbl/?p=2"]')[0].click()
        page.load(done)
      },
      (done) => {
        $('.x-table tbody tr:eq(0) td:eq(0) a')[0].click()
        page.load(done)
      },
      (done) => {
        $('[name="action[save]"]')[0].click()
        page.load(done)
      }
    ], () => {
      win.location.pathname.should.match(/\/tbl$/)
      win.location.search.should.equal('?p=2')
      $('.alert-success strong').text().should.equal('Success:')

      $('form').is(':visible').should.equal(true)
      $('[name=or]').attr('checked').should.equal('checked')

      $('[name="filter[mtm]"] option:eq(3)').attr('selected').should.equal('selected')
      $('[name="filter[boolean]"]:eq(1)').attr('checked').should.equal('checked')

      $('[name=order] option:eq(13)').attr('selected').should.equal('selected')
      $('[name=direction]:eq(1)').attr('checked').should.equal('checked')

      $('.x-table tbody tr:eq(0) td:eq(1)').text().trim().should.equal('b')

      $('.pagination li').length.should.equal(4)
      $('.pagination li:eq(3)').hasClass('active').should.equal(true)
      $('.pagination li:eq(3) a').text().should.equal('2')
      done()
    })
  })

  after((done) => {
    $('a[href$="/"]')[0].click()
    page.load(done)
  })
})
