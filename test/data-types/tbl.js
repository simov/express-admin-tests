
describe('tbl', function () {
    before(function (done) {
        async.eachSeries(['tbl','mto','tbl_has_mtm','mto_has_mtm'], function (table, done) {
            client.query(sql.truncate(table, 'x'), done);
        }, function () {
            $('a[href="/tbl"]')[0].click();
            page.load(done);
        });
    });
    
    it('should be empty', function (done) {
        $('.x-table tbody tr').length.should.equal(0);
        $('a[href="/tbl/add"]')[0].click();
        page.load(done);
    });

    it('empty fields', function (done) {
        $('[name="action[save]"')[0].click();
        page.load(function () {
            win.location.pathname.should.equal('/tbl/add');
            $('.alert-danger strong').text().should.equal('Error:');
            $('.has-error').length.should.equal(13);
            done();
        });
    });

    it('persist state', function (done) {
        // otm
        $('[name="view[tbl][records][0][columns][otm_id]"] option:eq(1)').attr('selected',true);
        $('[name="view[tbl][records][0][columns][otm_id]"]').trigger('chosen:updated');
        // mtm
        $('[name="view[tbl][records][0][columns][mtm]"] option:eq(1)').attr('selected',true);
        $('[name="view[tbl][records][0][columns][mtm]"]').trigger('chosen:updated');
        // static
        $('[name="view[tbl][records][0][columns][static]"] option:eq(1)').attr('selected',true);
        $('[name="view[tbl][records][0][columns][static]"]').trigger('chosen:updated');

        $('[name="view[tbl][records][0][columns][text]"]').val('one');
        $('[name="view[tbl][records][0][columns][boolean]"]:eq(0)').attr('checked', true);
        $('[name="view[tbl][records][0][columns][int]"]').val('1');
        $('[name="view[tbl][records][0][columns][decimal]"]').val('1.1');

        $('[name="view[tbl][records][0][columns][date]"]').val('2014-06-01').datetimepicker('update');
        $('[name="view[tbl][records][0][columns][time]"]').val('10:00').datetimepicker('update');
        $('[name="view[tbl][records][0][columns][datetime]"]').val('2014-06-01 10:00').datetimepicker('update');
        $('[name="view[tbl][records][0][columns][year]"]').val('2014');

        win.CKEDITOR.instances['view[tbl][records][0][columns][textarea]'].setData('<strong>one</strong>', function () {
            $('[name="action[save]"')[0].click();
            page.load(function () {
                win.location.pathname.should.equal('/tbl/add');
                $('.alert-danger strong').text().should.equal('Error:');
                $('.has-error').length.should.equal(1);

                // otm
                $('[name="view[tbl][records][0][columns][otm_id]"] option:eq(1)').attr('selected').should.equal('selected');
                // mtm
                $('[name="view[tbl][records][0][columns][mtm]"] option:eq(1)').attr('selected').should.equal('selected');
                // static
                $('[name="view[tbl][records][0][columns][static]"] option:eq(1)').attr('selected').should.equal('selected');

                $('[name="view[tbl][records][0][columns][text]"]').val().should.equal('one');
                $('[name="view[tbl][records][0][columns][boolean]"]:eq(0)').attr('checked').should.equal('checked');
                $('[name="view[tbl][records][0][columns][int]"]').val().should.equal('1');
                $('[name="view[tbl][records][0][columns][decimal]"]').val().should.equal('1.1');

                $('[name="view[tbl][records][0][columns][date]"]').val().should.equal('2014-06-01');
                $('[name="view[tbl][records][0][columns][time]"]').val().should.equal('10:00');
                $('[name="view[tbl][records][0][columns][datetime]"]').val().should.equal('2014-06-01 10:00:00');

                win.CKEDITOR.instances['view[tbl][records][0][columns][textarea]'].getData().trim().should.equal('<p><strong>one</strong></p>');

                done();
            });
        });
    });

    it('jq plugin init', function (done) {
        $('.add-another:eq(0)')[0].click();

        // chosen
        $('[name="manyToOne[mto][records][0][columns][otm_id]"]').trigger('chosen:open');
        $('[name="manyToOne[mto][records][0][columns][otm_id]"]').next().hasClass('chosen-container-active').should.equal(true);
        $('[name="manyToOne[mto][records][0][columns][otm_id]"]').next().find('.chosen-drop').is(':visible').should.equal(true);

        $('[name="manyToOne[mto][records][0][columns][mtm]"]').trigger('chosen:open');
        $('[name="manyToOne[mto][records][0][columns][mtm]"]').next().hasClass('chosen-container-active').should.equal(true);
        $('[name="manyToOne[mto][records][0][columns][mtm]"]').next().find('.chosen-drop').is(':visible').should.equal(true);

        $('[name="manyToOne[mto][records][0][columns][static]"]').trigger('chosen:open');
        $('[name="manyToOne[mto][records][0][columns][static]"]').next().hasClass('chosen-container-active').should.equal(true);
        $('[name="manyToOne[mto][records][0][columns][static]"]').next().find('.chosen-drop').is(':visible').should.equal(true);

        // datetime picker
        $('[name="manyToOne[mto][records][0][columns][date]"]').datetimepicker('show');
        $('.datetimepicker-dropdown-bottom-right:visible').length.should.equal(1);
        $('[name="manyToOne[mto][records][0][columns][date]"]').datetimepicker('hide');

        $('[name="manyToOne[mto][records][0][columns][time]"]').datetimepicker('show');
        $('.datetimepicker-dropdown-bottom-right:visible').length.should.equal(1);
        $('[name="manyToOne[mto][records][0][columns][time]"]').datetimepicker('hide');

        $('[name="manyToOne[mto][records][0][columns][datetime]"]').datetimepicker('show');
        $('.datetimepicker-dropdown-bottom-right:visible').length.should.equal(1);
        $('[name="manyToOne[mto][records][0][columns][datetime]"]').datetimepicker('hide');

        // editor
        Object.keys(win.CKEDITOR.instances).length.should.equal(2);
        done();
    });

    it('store inline record with all fields empty', function (done) {
        $('[type=text][name="view[tbl][records][0][columns][upload]"]').val('one');
        $('[name="action[another]"')[0].click();
        page.load(function () {
            win.location.pathname.should.equal('/tbl/add');
            $('.alert-success strong').text().should.equal('Success:');
            done();
        });
    });

    it('add 3 more records', function (done) {
        $('a[href="/tbl"]')[0].click();
        page.load(done);
    });

    after(function (done) {
        $('a[href="/"]')[0].click();
        page.load(done);
    });
});
