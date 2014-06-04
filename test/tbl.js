
tests.tbl = function () {

describe('tbl', function () {
    before(function (done) {
        async.eachSeries(['tbl','mto1','mto2',
            'tbl_has_mtm1', 'tbl_has_mtm2',
            'mto1_has_mtm1', 'mto1_has_mtm2',
            'mto2_has_mtm1', 'mto2_has_mtm2'], function (table, done) {
            client.query(sql.truncate(table), done);
        }, function () {
            $('a[href="/tbl"]')[0].click();
            page.load(done);
        });
        // call just this when calling delete
        // $('a[href="/tbl"]')[0].click();
        // page.load(done);
    });
    it.skip('delete all records', function (done) {
        // should reset tbl auto increment id at the end
        async.whilst(
            function () {
                return $('.x-table tbody tr').length;
            },
            function (done) {
                $('.x-table tbody tr:eq(0) td:eq(0) a')[0].click();
                page.load(function () {
                    $('[name="action[remove]"]')[0].click();
                    page.load(function () {
                        $('.alert-success strong').text().should.equal('Success:');
                        done();
                    });
                });
            },
            done
        );
    });
    it('should be empty', function (done) {
        $('.x-table tbody tr').length.should.equal(0);
        $('a[href="/tbl/add"]')[0].click();
        page.load(done);
    });

    // persist state
    function tbl () {
        $('.alert-danger strong').text().should.equal('Error:');
        // tbl otm1
        $('[name="view[tbl][records][0][columns][otm1_id]"] option:eq(1)').attr('selected').should.equal('selected');
        // tbl otm2
        var ctx = $('[name="view[tbl][records][0][columns][otm2_id]"]').parents('td');
        $('.form-horizontal',ctx).hasClass('has-error').should.equal(true);
        $('.help-block',ctx).text().should.equal('Column otm2_id cannot be empty.');
        // tbl mtm1
        $('[name="view[tbl][records][0][columns][mtm1]"] option:eq(1)').attr('selected').should.equal('selected');
        $('[name="view[tbl][records][0][columns][mtm1]"] option:eq(2)').attr('selected').should.equal('selected');
        // tbl mtm2
        var ctx = $('[name="view[tbl][records][0][columns][mtm2]"]').parents('td');
        $('.form-horizontal',ctx).hasClass('has-error').should.equal(true);
        $('.help-block',ctx).text().should.equal('Column mtm2 cannot be empty.');
    }
    function mto1 () {
        // mto1 otm1
        $('[name="manyToOne[mto1][records][0][columns][otm1_id]"] option:eq(1)').attr('selected').should.equal('selected');
        // mto1 otm2
        var ctx = $('[name="manyToOne[mto1][records][0][columns][otm2_id]"]').parents('td');
        $('.form-horizontal',ctx).hasClass('has-error').should.equal(true);
        $('.help-block',ctx).text().should.equal('Column otm2_id cannot be empty.');
        
        // mto1 mtm1
        $('[name="manyToOne[mto1][records][0][columns][mtm1]"] option:eq(1)').attr('selected').should.equal('selected');
        $('[name="manyToOne[mto1][records][0][columns][mtm1]"] option:eq(2)').attr('selected').should.equal('selected');
        // mto1 mtm2
        var ctx = $('[name="manyToOne[mto1][records][0][columns][mtm2]"]').parents('td');
        $('.form-horizontal',ctx).hasClass('has-error').should.equal(true);
        $('.help-block',ctx).text().should.equal('Column mtm2 cannot be empty.');

        // mto1 mtm1
        $('[name="manyToOne[mto1][records][1][columns][mtm1]"] option:eq(1)').attr('selected').should.equal('selected');
        $('[name="manyToOne[mto1][records][1][columns][mtm1]"] option:eq(2)').attr('selected').should.equal('selected');
        // mto1 mtm2
        var ctx = $('[name="manyToOne[mto1][records][1][columns][mtm2]"]').parents('td');
        $('.form-horizontal',ctx).hasClass('has-error').should.equal(true);
        $('.help-block',ctx).text().should.equal('Column mtm2 cannot be empty.');
    }
    function mto2 () {
        // mto2 otm1
        $('[name="manyToOne[mto2][records][0][columns][otm1_id]"] option:eq(1)').attr('selected').should.equal('selected');
        // mto2 otm2
        var ctx = $('[name="manyToOne[mto2][records][0][columns][otm2_id]"]').parents('td');
        $('.form-horizontal',ctx).hasClass('has-error').should.equal(true);
        $('.help-block',ctx).text().should.equal('Column otm2_id cannot be empty.');

        // mto2 mtm1
        $('[name="manyToOne[mto2][records][0][columns][mtm1]"] option:eq(1)').attr('selected').should.equal('selected');
        $('[name="manyToOne[mto2][records][0][columns][mtm1]"] option:eq(2)').attr('selected').should.equal('selected');
        // mto2 mtm2
        var ctx = $('[name="manyToOne[mto2][records][0][columns][mtm2]"]').parents('td');
        $('.form-horizontal',ctx).hasClass('has-error').should.equal(true);
        $('.help-block',ctx).text().should.equal('Column mtm2 cannot be empty.');

        // mto2 mtm1
        $('[name="manyToOne[mto2][records][1][columns][mtm1]"] option:eq(1)').attr('selected').should.equal('selected');
        $('[name="manyToOne[mto2][records][1][columns][mtm1]"] option:eq(2)').attr('selected').should.equal('selected');
        // mto2 mtm2
        var ctx = $('[name="manyToOne[mto2][records][1][columns][mtm2]"]').parents('td');
        $('.form-horizontal',ctx).hasClass('has-error').should.equal(true);
        $('.help-block',ctx).text().should.equal('Column mtm2 cannot be empty.');
    }

    it('set tbl fields', function (done) {
        // tbl otm1
        $('[name="view[tbl][records][0][columns][otm1_id]"] option:eq(1)').attr('selected',true);
        $('[name="view[tbl][records][0][columns][otm1_id]"]').trigger('chosen:updated');
        // tbl mtm1
        $('[name="view[tbl][records][0][columns][mtm1]"] option:eq(1)').attr('selected',true);
        $('[name="view[tbl][records][0][columns][mtm1]"] option:eq(2)').attr('selected',true);
        $('[name="view[tbl][records][0][columns][mtm1]"]').trigger('chosen:updated');
        $('[name="action[save]"')[0].click();
        page.load(function () {
            tbl();
            done();
        });
    });
    it('set mto1 fields', function (done) {
        $('.add-another:eq(0)')[0].click();
        // mto1 otm1
        $('[name="manyToOne[mto1][records][0][columns][otm1_id]"] option:eq(1)').attr('selected',true);
        $('[name="manyToOne[mto1][records][0][columns][otm1_id]"]').trigger('chosen:updated');
        // mto1 mtm1
        $('[name="manyToOne[mto1][records][0][columns][mtm1]"] option:eq(1)').attr('selected',true);
        $('[name="manyToOne[mto1][records][0][columns][mtm1]"] option:eq(2)').attr('selected',true);
        $('[name="manyToOne[mto1][records][0][columns][mtm1]"]').trigger('chosen:updated');

        $('.add-another:eq(0)')[0].click();
        // mto1 otm1
        $('[name="manyToOne[mto1][records][1][columns][otm1_id]"] option:eq(1)').attr('selected',true);
        $('[name="manyToOne[mto1][records][1][columns][otm1_id]"]').trigger('chosen:updated');
        // mto1 mtm1
        $('[name="manyToOne[mto1][records][1][columns][mtm1]"] option:eq(1)').attr('selected',true);
        $('[name="manyToOne[mto1][records][1][columns][mtm1]"] option:eq(2)').attr('selected',true);
        $('[name="manyToOne[mto1][records][1][columns][mtm1]"]').trigger('chosen:updated');

        $('[name="action[save]"')[0].click();
        page.load(function () {
            tbl();
            mto1();
            done();
        });
    });
    it('remove first mto1 inline and add another', function (done) {
        $('.x-table[data-table=mto1] .glyphicon-remove-sign:eq(0)')[0].click();

        $('.add-another:eq(0)')[0].click();
        // mto1 otm1
        $('[name="manyToOne[mto1][records][1][columns][otm1_id]"] option:eq(1)').attr('selected',true);
        $('[name="manyToOne[mto1][records][1][columns][otm1_id]"]').trigger('chosen:updated');
        // mto1 mtm1
        $('[name="manyToOne[mto1][records][1][columns][mtm1]"] option:eq(1)').attr('selected',true);
        $('[name="manyToOne[mto1][records][1][columns][mtm1]"] option:eq(2)').attr('selected',true);
        $('[name="manyToOne[mto1][records][1][columns][mtm1]"]').trigger('chosen:updated');
        done();
    });
    it('set mto2 fields', function (done) {
        $('.add-another:eq(1)')[0].click();
        // mto2 otm1
        $('[name="manyToOne[mto2][records][0][columns][otm1_id]"] option:eq(1)').attr('selected',true);
        $('[name="manyToOne[mto2][records][0][columns][otm1_id]"]').trigger('chosen:updated');
        // mto2 mtm1
        $('[name="manyToOne[mto2][records][0][columns][mtm1]"] option:eq(1)').attr('selected',true);
        $('[name="manyToOne[mto2][records][0][columns][mtm1]"] option:eq(2)').attr('selected',true);
        $('[name="manyToOne[mto2][records][0][columns][mtm1]"]').trigger('chosen:updated');

        $('.add-another:eq(1)')[0].click();
        // mto2 otm1
        $('[name="manyToOne[mto2][records][1][columns][otm1_id]"] option:eq(1)').attr('selected',true);
        $('[name="manyToOne[mto2][records][1][columns][otm1_id]"]').trigger('chosen:updated');
        // mto2 mtm1
        $('[name="manyToOne[mto2][records][1][columns][mtm1]"] option:eq(1)').attr('selected',true);
        $('[name="manyToOne[mto2][records][1][columns][mtm1]"] option:eq(2)').attr('selected',true);
        $('[name="manyToOne[mto2][records][1][columns][mtm1]"]').trigger('chosen:updated');

        $('[name="action[save]"')[0].click();
        page.load(function () {
            tbl();
            mto1();
            mto2();
            done();
        });
    });
    // END persist state

    it('save and add another', function (done) {
        // tbl otm2
        $('[name="view[tbl][records][0][columns][otm2_id]"] option:eq(1)').attr('selected',true);
        $('[name="view[tbl][records][0][columns][otm2_id]"]').trigger('chosen:updated');
        // tbl mtm2
        $('[name="view[tbl][records][0][columns][mtm2]"] option:eq(1)').attr('selected',true);
        $('[name="view[tbl][records][0][columns][mtm2]"] option:eq(2)').attr('selected',true);
        $('[name="view[tbl][records][0][columns][mtm2]"]').trigger('chosen:updated');

        // mto1 otm2
        $('[name="manyToOne[mto1][records][0][columns][otm2_id]"] option:eq(1)').attr('selected',true);
        $('[name="manyToOne[mto1][records][0][columns][otm2_id]"]').trigger('chosen:updated');
        // mto1 mtm2
        $('[name="manyToOne[mto1][records][0][columns][mtm2]"] option:eq(1)').attr('selected',true);
        $('[name="manyToOne[mto1][records][0][columns][mtm2]"] option:eq(2)').attr('selected',true);
        $('[name="manyToOne[mto1][records][0][columns][mtm2]"]').trigger('chosen:updated');
        // mto1 otm2
        $('[name="manyToOne[mto1][records][1][columns][otm2_id]"] option:eq(1)').attr('selected',true);
        $('[name="manyToOne[mto1][records][1][columns][otm2_id]"]').trigger('chosen:updated');
        // mto1 mtm2
        $('[name="manyToOne[mto1][records][1][columns][mtm2]"] option:eq(1)').attr('selected',true);
        $('[name="manyToOne[mto1][records][1][columns][mtm2]"] option:eq(2)').attr('selected',true);
        $('[name="manyToOne[mto1][records][1][columns][mtm2]"]').trigger('chosen:updated');

        // mto2 otm2
        $('[name="manyToOne[mto2][records][0][columns][otm2_id]"] option:eq(1)').attr('selected',true);
        $('[name="manyToOne[mto2][records][0][columns][otm2_id]"]').trigger('chosen:updated');
        // mto2 mtm2
        $('[name="manyToOne[mto2][records][0][columns][mtm2]"] option:eq(1)').attr('selected',true);
        $('[name="manyToOne[mto2][records][0][columns][mtm2]"] option:eq(2)').attr('selected',true);
        $('[name="manyToOne[mto2][records][0][columns][mtm2]"]').trigger('chosen:updated');
        // mto2 otm2
        $('[name="manyToOne[mto2][records][1][columns][otm2_id]"] option:eq(1)').attr('selected',true);
        $('[name="manyToOne[mto2][records][1][columns][otm2_id]"]').trigger('chosen:updated');
        // mto2 mtm2
        $('[name="manyToOne[mto2][records][1][columns][mtm2]"] option:eq(1)').attr('selected',true);
        $('[name="manyToOne[mto2][records][1][columns][mtm2]"] option:eq(2)').attr('selected',true);
        $('[name="manyToOne[mto2][records][1][columns][mtm2]"]').trigger('chosen:updated');

        $('[name="action[another]"')[0].click();
        page.load(function () {
            win.location.pathname.should.equal('/tbl/add');
            $('.alert-success strong').text().should.equal('Success:');
            $('[name="view[tbl][records][0][columns][otm1_id]"] option:selected').val().should.equal('');
            $('[name="view[tbl][records][0][columns][otm2_id]"] option:selected').val().should.equal('');
            $('[name="view[tbl][records][0][columns][mtm1]"] option:selected').length.should.equal(0);
            $('[name="view[tbl][records][0][columns][mtm2]"] option:selected').length.should.equal(0);
            $('[data-table=mto1] tbody tr:not(.blank)').length.should.equal(0);
            $('[data-table=mto2] tbody tr:not(.blank)').length.should.equal(0);
            done();
        });
    });

    it('save and continue editing', function (done) {
        // tbl otm1
        $('[name="view[tbl][records][0][columns][otm1_id]"] option:eq(2)').attr('selected',true);
        $('[name="view[tbl][records][0][columns][otm1_id]"]').trigger('chosen:updated');
        // tbl otm2
        $('[name="view[tbl][records][0][columns][otm2_id]"] option:eq(2)').attr('selected',true);
        $('[name="view[tbl][records][0][columns][otm2_id]"]').trigger('chosen:updated');
        // tbl mtm1
        $('[name="view[tbl][records][0][columns][mtm1]"] option:eq(2)').attr('selected',true);
        $('[name="view[tbl][records][0][columns][mtm1]"] option:eq(3)').attr('selected',true);
        $('[name="view[tbl][records][0][columns][mtm1]"]').trigger('chosen:updated');
        // tbl mtm2
        $('[name="view[tbl][records][0][columns][mtm2]"] option:eq(2)').attr('selected',true);
        $('[name="view[tbl][records][0][columns][mtm2]"] option:eq(3)').attr('selected',true);
        $('[name="view[tbl][records][0][columns][mtm2]"]').trigger('chosen:updated');

        $('.add-another:eq(0)')[0].click();
        // mto1 otm1
        $('[name="manyToOne[mto1][records][0][columns][otm1_id]"] option:eq(2)').attr('selected',true);
        $('[name="manyToOne[mto1][records][0][columns][otm1_id]"]').trigger('chosen:updated');
        // mto1 otm2
        $('[name="manyToOne[mto1][records][0][columns][otm2_id]"] option:eq(2)').attr('selected',true);
        $('[name="manyToOne[mto1][records][0][columns][otm2_id]"]').trigger('chosen:updated');
        // mto1 mtm1
        $('[name="manyToOne[mto1][records][0][columns][mtm1]"] option:eq(2)').attr('selected',true);
        $('[name="manyToOne[mto1][records][0][columns][mtm1]"] option:eq(3)').attr('selected',true);
        $('[name="manyToOne[mto1][records][0][columns][mtm1]"]').trigger('chosen:updated');
        // mto1 mtm2
        $('[name="manyToOne[mto1][records][0][columns][mtm2]"] option:eq(2)').attr('selected',true);
        $('[name="manyToOne[mto1][records][0][columns][mtm2]"] option:eq(3)').attr('selected',true);
        $('[name="manyToOne[mto1][records][0][columns][mtm2]"]').trigger('chosen:updated');

        $('.add-another:eq(0)')[0].click();
        // mto1 otm1
        $('[name="manyToOne[mto1][records][1][columns][otm1_id]"] option:eq(2)').attr('selected',true);
        $('[name="manyToOne[mto1][records][1][columns][otm1_id]"]').trigger('chosen:updated');
        // mto1 otm2
        $('[name="manyToOne[mto1][records][1][columns][otm2_id]"] option:eq(2)').attr('selected',true);
        $('[name="manyToOne[mto1][records][1][columns][otm2_id]"]').trigger('chosen:updated');
        // mto1 mtm1
        $('[name="manyToOne[mto1][records][1][columns][mtm1]"] option:eq(2)').attr('selected',true);
        $('[name="manyToOne[mto1][records][1][columns][mtm1]"] option:eq(3)').attr('selected',true);
        $('[name="manyToOne[mto1][records][1][columns][mtm1]"]').trigger('chosen:updated');
        // mto1 mtm2
        $('[name="manyToOne[mto1][records][1][columns][mtm2]"] option:eq(2)').attr('selected',true);
        $('[name="manyToOne[mto1][records][1][columns][mtm2]"] option:eq(3)').attr('selected',true);
        $('[name="manyToOne[mto1][records][1][columns][mtm2]"]').trigger('chosen:updated');

        $('.add-another:eq(1)')[0].click();
        // mto2 otm1
        $('[name="manyToOne[mto2][records][0][columns][otm1_id]"] option:eq(2)').attr('selected',true);
        $('[name="manyToOne[mto2][records][0][columns][otm1_id]"]').trigger('chosen:updated');
        // mto2 otm2
        $('[name="manyToOne[mto2][records][0][columns][otm2_id]"] option:eq(2)').attr('selected',true);
        $('[name="manyToOne[mto2][records][0][columns][otm2_id]"]').trigger('chosen:updated');
        // mto2 mtm1
        $('[name="manyToOne[mto2][records][0][columns][mtm1]"] option:eq(2)').attr('selected',true);
        $('[name="manyToOne[mto2][records][0][columns][mtm1]"] option:eq(3)').attr('selected',true);
        $('[name="manyToOne[mto2][records][0][columns][mtm1]"]').trigger('chosen:updated');
        // mto2 mtm2
        $('[name="manyToOne[mto2][records][0][columns][mtm2]"] option:eq(2)').attr('selected',true);
        $('[name="manyToOne[mto2][records][0][columns][mtm2]"] option:eq(3)').attr('selected',true);
        $('[name="manyToOne[mto2][records][0][columns][mtm2]"]').trigger('chosen:updated');

        $('.add-another:eq(1)')[0].click();
        // mto2 otm1
        $('[name="manyToOne[mto2][records][1][columns][otm1_id]"] option:eq(2)').attr('selected',true);
        $('[name="manyToOne[mto2][records][1][columns][otm1_id]"]').trigger('chosen:updated');
        // mto2 otm2
        $('[name="manyToOne[mto2][records][1][columns][otm2_id]"] option:eq(2)').attr('selected',true);
        $('[name="manyToOne[mto2][records][1][columns][otm2_id]"]').trigger('chosen:updated');
        // mto2 mtm1
        $('[name="manyToOne[mto2][records][1][columns][mtm1]"] option:eq(2)').attr('selected',true);
        $('[name="manyToOne[mto2][records][1][columns][mtm1]"] option:eq(3)').attr('selected',true);
        $('[name="manyToOne[mto2][records][1][columns][mtm1]"]').trigger('chosen:updated');
        // mto2 mtm2
        $('[name="manyToOne[mto2][records][1][columns][mtm2]"] option:eq(2)').attr('selected',true);
        $('[name="manyToOne[mto2][records][1][columns][mtm2]"] option:eq(3)').attr('selected',true);
        $('[name="manyToOne[mto2][records][1][columns][mtm2]"]').trigger('chosen:updated');
        
        $('[name="action[continue]"')[0].click();
        page.load(function () {
            $('.alert-success strong').text().should.equal('Success:');
            
            // tbl otm1
            $('[name="view[tbl][records][0][columns][otm1_id]"] option:eq(2)').attr('selected').should.equal('selected');
            // tbl otm2
            $('[name="view[tbl][records][0][columns][otm2_id]"] option:eq(2)').attr('selected').should.equal('selected');
            // tbl mtm1
            $('[name="view[tbl][records][0][columns][mtm1]"] option:eq(2)').attr('selected').should.equal('selected');
            $('[name="view[tbl][records][0][columns][mtm1]"] option:eq(3)').attr('selected').should.equal('selected');
            // tbl mtm2
            $('[name="view[tbl][records][0][columns][mtm2]"] option:eq(2)').attr('selected').should.equal('selected');
            $('[name="view[tbl][records][0][columns][mtm2]"] option:eq(3)').attr('selected').should.equal('selected');

            // mto1 otm1
            $('[name="manyToOne[mto1][records][0][columns][otm1_id]"] option:eq(2)').attr('selected').should.equal('selected');
            // mto1 otm2
            $('[name="manyToOne[mto1][records][0][columns][otm2_id]"] option:eq(2)').attr('selected').should.equal('selected');
            // mto1 mtm1
            $('[name="manyToOne[mto1][records][0][columns][mtm1]"] option:eq(2)').attr('selected').should.equal('selected');
            $('[name="manyToOne[mto1][records][0][columns][mtm1]"] option:eq(3)').attr('selected').should.equal('selected');
            // mto1 mtm2
            $('[name="manyToOne[mto1][records][0][columns][mtm2]"] option:eq(2)').attr('selected').should.equal('selected');
            $('[name="manyToOne[mto1][records][0][columns][mtm2]"] option:eq(3)').attr('selected').should.equal('selected');

            // mto1 otm1
            $('[name="manyToOne[mto1][records][1][columns][otm1_id]"] option:eq(2)').attr('selected').should.equal('selected');
            // mto1 otm2
            $('[name="manyToOne[mto1][records][1][columns][otm2_id]"] option:eq(2)').attr('selected').should.equal('selected');
            // mto1 mtm1
            $('[name="manyToOne[mto1][records][1][columns][mtm1]"] option:eq(2)').attr('selected').should.equal('selected');
            $('[name="manyToOne[mto1][records][1][columns][mtm1]"] option:eq(3)').attr('selected').should.equal('selected');
            // mto1 mtm2
            $('[name="manyToOne[mto1][records][1][columns][mtm2]"] option:eq(2)').attr('selected').should.equal('selected');
            $('[name="manyToOne[mto1][records][1][columns][mtm2]"] option:eq(3)').attr('selected').should.equal('selected');

            // mto2 otm1
            $('[name="manyToOne[mto2][records][0][columns][otm1_id]"] option:eq(2)').attr('selected').should.equal('selected');
            // mto2 otm2
            $('[name="manyToOne[mto2][records][0][columns][otm2_id]"] option:eq(2)').attr('selected').should.equal('selected');
            // mto2 mtm1
            $('[name="manyToOne[mto2][records][0][columns][mtm1]"] option:eq(2)').attr('selected').should.equal('selected');
            $('[name="manyToOne[mto2][records][0][columns][mtm1]"] option:eq(3)').attr('selected').should.equal('selected');
            // mto2 mtm2
            $('[name="manyToOne[mto2][records][0][columns][mtm2]"] option:eq(2)').attr('selected').should.equal('selected');
            $('[name="manyToOne[mto2][records][0][columns][mtm2]"] option:eq(3)').attr('selected').should.equal('selected');

            // mto2 otm1
            $('[name="manyToOne[mto2][records][1][columns][otm1_id]"] option:eq(2)').attr('selected').should.equal('selected');
            // mto2 otm2
            $('[name="manyToOne[mto2][records][1][columns][otm2_id]"] option:eq(2)').attr('selected').should.equal('selected');
            // mto2 mtm1
            $('[name="manyToOne[mto2][records][1][columns][mtm1]"] option:eq(2)').attr('selected').should.equal('selected');
            $('[name="manyToOne[mto2][records][1][columns][mtm1]"] option:eq(3)').attr('selected').should.equal('selected');
            // mto2 mtm2
            $('[name="manyToOne[mto2][records][1][columns][mtm2]"] option:eq(2)').attr('selected').should.equal('selected');
            $('[name="manyToOne[mto2][records][1][columns][mtm2]"] option:eq(3)').attr('selected').should.equal('selected');

            $('[name="action[another]"')[0].click();
            page.load(done);
        });
    });

    it('save', function (done) {
        // tbl otm1
        $('[name="view[tbl][records][0][columns][otm1_id]"] option:eq(3)').attr('selected',true);
        $('[name="view[tbl][records][0][columns][otm1_id]"]').trigger('chosen:updated');
        // tbl otm2
        $('[name="view[tbl][records][0][columns][otm2_id]"] option:eq(3)').attr('selected',true);
        $('[name="view[tbl][records][0][columns][otm2_id]"]').trigger('chosen:updated');
        // tbl mtm1
        $('[name="view[tbl][records][0][columns][mtm1]"] option:eq(1)').attr('selected',true);
        $('[name="view[tbl][records][0][columns][mtm1]"] option:eq(3)').attr('selected',true);
        $('[name="view[tbl][records][0][columns][mtm1]"]').trigger('chosen:updated');
        // tbl mtm2
        $('[name="view[tbl][records][0][columns][mtm2]"] option:eq(1)').attr('selected',true);
        $('[name="view[tbl][records][0][columns][mtm2]"] option:eq(3)').attr('selected',true);
        $('[name="view[tbl][records][0][columns][mtm2]"]').trigger('chosen:updated');

        $('.add-another:eq(0)')[0].click();
        // mto1 otm1
        $('[name="manyToOne[mto1][records][0][columns][otm1_id]"] option:eq(3)').attr('selected',true);
        $('[name="manyToOne[mto1][records][0][columns][otm1_id]"]').trigger('chosen:updated');
        // mto1 otm2
        $('[name="manyToOne[mto1][records][0][columns][otm2_id]"] option:eq(3)').attr('selected',true);
        $('[name="manyToOne[mto1][records][0][columns][otm2_id]"]').trigger('chosen:updated');
        // mto1 mtm1
        $('[name="manyToOne[mto1][records][0][columns][mtm1]"] option:eq(1)').attr('selected',true);
        $('[name="manyToOne[mto1][records][0][columns][mtm1]"] option:eq(3)').attr('selected',true);
        $('[name="manyToOne[mto1][records][0][columns][mtm1]"]').trigger('chosen:updated');
        // mto1 mtm2
        $('[name="manyToOne[mto1][records][0][columns][mtm2]"] option:eq(1)').attr('selected',true);
        $('[name="manyToOne[mto1][records][0][columns][mtm2]"] option:eq(3)').attr('selected',true);
        $('[name="manyToOne[mto1][records][0][columns][mtm2]"]').trigger('chosen:updated');

        $('.add-another:eq(0)')[0].click();
        // mto1 otm1
        $('[name="manyToOne[mto1][records][1][columns][otm1_id]"] option:eq(3)').attr('selected',true);
        $('[name="manyToOne[mto1][records][1][columns][otm1_id]"]').trigger('chosen:updated');
        // mto1 otm2
        $('[name="manyToOne[mto1][records][1][columns][otm2_id]"] option:eq(3)').attr('selected',true);
        $('[name="manyToOne[mto1][records][1][columns][otm2_id]"]').trigger('chosen:updated');
        // mto1 mtm1
        $('[name="manyToOne[mto1][records][1][columns][mtm1]"] option:eq(1)').attr('selected',true);
        $('[name="manyToOne[mto1][records][1][columns][mtm1]"] option:eq(3)').attr('selected',true);
        $('[name="manyToOne[mto1][records][1][columns][mtm1]"]').trigger('chosen:updated');
        // mto1 mtm2
        $('[name="manyToOne[mto1][records][1][columns][mtm2]"] option:eq(1)').attr('selected',true);
        $('[name="manyToOne[mto1][records][1][columns][mtm2]"] option:eq(3)').attr('selected',true);
        $('[name="manyToOne[mto1][records][1][columns][mtm2]"]').trigger('chosen:updated');

        $('.add-another:eq(1)')[0].click();
        // mto2 otm1
        $('[name="manyToOne[mto2][records][0][columns][otm1_id]"] option:eq(3)').attr('selected',true);
        $('[name="manyToOne[mto2][records][0][columns][otm1_id]"]').trigger('chosen:updated');
        // mto2 otm2
        $('[name="manyToOne[mto2][records][0][columns][otm2_id]"] option:eq(3)').attr('selected',true);
        $('[name="manyToOne[mto2][records][0][columns][otm2_id]"]').trigger('chosen:updated');
        // mto2 mtm1
        $('[name="manyToOne[mto2][records][0][columns][mtm1]"] option:eq(1)').attr('selected',true);
        $('[name="manyToOne[mto2][records][0][columns][mtm1]"] option:eq(3)').attr('selected',true);
        $('[name="manyToOne[mto2][records][0][columns][mtm1]"]').trigger('chosen:updated');
        // mto2 mtm2
        $('[name="manyToOne[mto2][records][0][columns][mtm2]"] option:eq(1)').attr('selected',true);
        $('[name="manyToOne[mto2][records][0][columns][mtm2]"] option:eq(3)').attr('selected',true);
        $('[name="manyToOne[mto2][records][0][columns][mtm2]"]').trigger('chosen:updated');

        $('.add-another:eq(1)')[0].click();
        // mto2 otm1
        $('[name="manyToOne[mto2][records][1][columns][otm1_id]"] option:eq(3)').attr('selected',true);
        $('[name="manyToOne[mto2][records][1][columns][otm1_id]"]').trigger('chosen:updated');
        // mto2 otm2
        $('[name="manyToOne[mto2][records][1][columns][otm2_id]"] option:eq(3)').attr('selected',true);
        $('[name="manyToOne[mto2][records][1][columns][otm2_id]"]').trigger('chosen:updated');
        // mto2 mtm1
        $('[name="manyToOne[mto2][records][1][columns][mtm1]"] option:eq(1)').attr('selected',true);
        $('[name="manyToOne[mto2][records][1][columns][mtm1]"] option:eq(3)').attr('selected',true);
        $('[name="manyToOne[mto2][records][1][columns][mtm1]"]').trigger('chosen:updated');
        // mto2 mtm2
        $('[name="manyToOne[mto2][records][1][columns][mtm2]"] option:eq(1)').attr('selected',true);
        $('[name="manyToOne[mto2][records][1][columns][mtm2]"] option:eq(3)').attr('selected',true);
        $('[name="manyToOne[mto2][records][1][columns][mtm2]"]').trigger('chosen:updated');

        $('[name="action[save]"')[0].click();
        page.load(function () {
            win.location.pathname.should.equal('/tbl');
            $('.alert-success strong').text().should.equal('Success:');
            $('.x-table tbody tr').length.should.equal(2);

            $('.x-table tbody tr:eq(0) a').text().should.equal('otm1');
            $('.x-table tbody tr:eq(0) td:eq(1)').text().trim().should.equal('otm 1');
            $('.x-table tbody tr:eq(0) td:eq(2) span:eq(0)').text().should.equal('mtm1');
            $('.x-table tbody tr:eq(0) td:eq(2) span:eq(1)').text().should.equal('mtm2');
            $('.x-table tbody tr:eq(0) td:eq(3) span:eq(0)').text().should.equal('mtm 1');
            $('.x-table tbody tr:eq(0) td:eq(3) span:eq(1)').text().should.equal('mtm 2');

            $('.x-table tbody tr:eq(1) a').text().should.equal('otm2');
            $('.x-table tbody tr:eq(1) td:eq(1)').text().trim().should.equal('otm 2');
            $('.x-table tbody tr:eq(1) td:eq(2) span:eq(0)').text().should.equal('mtm2');
            $('.x-table tbody tr:eq(1) td:eq(2) span:eq(1)').text().should.equal('mtm3');
            $('.x-table tbody tr:eq(1) td:eq(3) span:eq(0)').text().should.equal('mtm 2');
            $('.x-table tbody tr:eq(1) td:eq(3) span:eq(1)').text().should.equal('mtm 3');

            $('.pagination li').length.should.equal(4);
            $('.pagination li:eq(0)').hasClass('active').should.equal(true);
            $('.pagination li:eq(1) a').text().should.equal('2');

            done();
        });
    });

    after(function (done) {
        $('a[href="/"]')[0].click();
        page.load(done);
    });
});
    
}
