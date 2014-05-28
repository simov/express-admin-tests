
tests.edit = function () {

describe('edit', function () {
    before(function (done) {
        $('a[href="/tbl"]')[0].click();
        page.load(function () {
            $('a[href="/tbl/1"]')[0].click();
            page.load(done);
        });
    });

    it('persist state', function (done) {
        // tbl
        // mtm1
        $('[name="view[tbl][records][0][columns][mtm1]"] option:eq(1)').attr('selected',false);
        $('[name="view[tbl][records][0][columns][mtm1]"] option:eq(3)').attr('selected',true);
        // mtm2
        $('[name="view[tbl][records][0][columns][mtm2]"] option:eq(1)').attr('selected',false);
        $('[name="view[tbl][records][0][columns][mtm2]"] option:eq(3)').attr('selected',true);
        
        // mto1-0
        // mark for removal
        $('[name="manyToOne[mto1][records][0][remove]"]')[0].click();
        // mtm1
        $('[name="manyToOne[mto1][records][0][columns][mtm1]"] option:eq(1)').attr('selected',false);
        $('[name="manyToOne[mto1][records][0][columns][mtm1]"] option:eq(3)').attr('selected',true);
        $('[name="manyToOne[mto1][records][0][columns][mtm1]"]').trigger('chosen:updated');
        // mtm2
        $('[name="manyToOne[mto1][records][0][columns][mtm2]"] option:eq(1)').attr('selected',false);
        $('[name="manyToOne[mto1][records][0][columns][mtm2]"] option:eq(3)').attr('selected',true);
        $('[name="manyToOne[mto1][records][0][columns][mtm2]"]').trigger('chosen:updated');

        // mto1-1
        // otm
        $('[name="manyToOne[mto1][records][1][columns][otm1_id]"]').val(2).trigger('chosen:updated');
        $('[name="manyToOne[mto1][records][1][columns][otm2_id]"]').val(2).trigger('chosen:updated');

        // mto1-2
        $('.add-another:eq(0)')[0].click();
        // otm
        $('[name="manyToOne[mto1][records][2][columns][otm1_id]"]').val(1).trigger('chosen:updated');
        $('[name="manyToOne[mto1][records][2][columns][otm2_id]"]').val(1).trigger('chosen:updated');

        // mtm1
        $('[name="manyToOne[mto1][records][2][columns][mtm1]"] option:eq(1)').attr('selected',true);
        $('[name="manyToOne[mto1][records][2][columns][mtm1]"] option:eq(2)').attr('selected',true);
        $('[name="manyToOne[mto1][records][2][columns][mtm1]"]').trigger('chosen:updated');
        // mtm2
        $('[name="manyToOne[mto1][records][2][columns][mtm2]"] option:eq(1)').attr('selected',true);
        $('[name="manyToOne[mto1][records][2][columns][mtm2]"] option:eq(2)').attr('selected',true);
        $('[name="manyToOne[mto1][records][2][columns][mtm2]"]').trigger('chosen:updated');

        // mto1-3
        $('.add-another:eq(0)')[0].click();
        // otm
        $('[name="manyToOne[mto1][records][3][columns][otm1_id]"]').val(1).trigger('chosen:updated');
        $('[name="manyToOne[mto1][records][3][columns][otm2_id]"]').val(1).trigger('chosen:updated');
        // mtm1
        $('[name="manyToOne[mto1][records][3][columns][mtm1]"] option:eq(1)').attr('selected',true);
        $('[name="manyToOne[mto1][records][3][columns][mtm1]"]').trigger('chosen:updated');
        // mtm2
        // empty - should return validation error

        // mto2-0
        // mtm1
        $('[name="manyToOne[mto2][records][0][columns][mtm1]"] option:eq(1)').attr('selected',false);
        $('[name="manyToOne[mto2][records][0][columns][mtm1]"] option:eq(3)').attr('selected',true);
        $('[name="manyToOne[mto2][records][0][columns][mtm1]"]').trigger('chosen:updated');
        // mtm2
        $('[name="manyToOne[mto2][records][0][columns][mtm2]"] option:eq(1)').attr('selected',false);
        $('[name="manyToOne[mto2][records][0][columns][mtm2]"] option:eq(3)').attr('selected',true);
        $('[name="manyToOne[mto2][records][0][columns][mtm2]"]').trigger('chosen:updated');

        // mto2-1
        // otm
        $('[name="manyToOne[mto2][records][1][columns][otm1_id]"]').val(2).trigger('chosen:updated');
        $('[name="manyToOne[mto2][records][1][columns][otm2_id]"]').val(2).trigger('chosen:updated');

        $('[name="action[save]"')[0].click();
        page.load(function () {
            $('.alert-danger strong').text().should.equal('Error:');

            // tbl
            // mtm1
            $('[name="view[tbl][records][0][columns][mtm1]"] option:eq(2)').attr('selected').should.equal('selected');
            $('[name="view[tbl][records][0][columns][mtm1]"] option:eq(3)').attr('selected').should.equal('selected');
            // mtm2
            $('[name="view[tbl][records][0][columns][mtm2]"] option:eq(2)').attr('selected').should.equal('selected');
            $('[name="view[tbl][records][0][columns][mtm2]"] option:eq(3)').attr('selected').should.equal('selected');

            // mto1-0
            // marked for removal
            $('[name="manyToOne[mto1][records][0][remove]"]').attr('checked').should.equal('checked');
            // mtm1
            $('[name="manyToOne[mto1][records][0][columns][mtm1]"] option:eq(2)').attr('selected').should.equal('selected');
            $('[name="manyToOne[mto1][records][0][columns][mtm1]"] option:eq(3)').attr('selected').should.equal('selected');
            // mtm2
            $('[name="manyToOne[mto1][records][0][columns][mtm2]"] option:eq(2)').attr('selected').should.equal('selected');
            $('[name="manyToOne[mto1][records][0][columns][mtm2]"] option:eq(3)').attr('selected').should.equal('selected');

            // mto1-1
            // otm
            $('[name="manyToOne[mto1][records][1][columns][otm1_id]"] option:eq(2)').attr('selected').should.equal('selected');
            $('[name="manyToOne[mto1][records][1][columns][otm2_id]"] option:eq(2)').attr('selected').should.equal('selected');

            // mto1-2
            // otm
            $('[name="manyToOne[mto1][records][2][columns][otm1_id]"] option:eq(1)').attr('selected').should.equal('selected');
            $('[name="manyToOne[mto1][records][2][columns][otm2_id]"] option:eq(1)').attr('selected').should.equal('selected');
            // mtm1
            $('[name="manyToOne[mto1][records][2][columns][mtm1]"] option:eq(1)').attr('selected').should.equal('selected');
            $('[name="manyToOne[mto1][records][2][columns][mtm1]"] option:eq(2)').attr('selected').should.equal('selected');
            // mtm2
            $('[name="manyToOne[mto1][records][2][columns][mtm2]"] option:eq(1)').attr('selected').should.equal('selected');
            $('[name="manyToOne[mto1][records][2][columns][mtm2]"] option:eq(2)').attr('selected').should.equal('selected');

            // mto1-3
            // otm
            $('[name="manyToOne[mto1][records][3][columns][otm1_id]"] option:eq(1)').attr('selected').should.equal('selected');
            $('[name="manyToOne[mto1][records][3][columns][otm2_id]"] option:eq(1)').attr('selected').should.equal('selected');
            // mtm1
            $('[name="manyToOne[mto1][records][3][columns][mtm1]"] option:eq(1)').attr('selected').should.equal('selected');
            // mtm2
            // has error
            $('[name="manyToOne[mto1][records][3][columns][mtm2]"]').parents('td').find('.form-horizontal').hasClass('has-error').should.equal(true);

            // mto2-0
            // mtm1
            $('[name="manyToOne[mto2][records][0][columns][mtm1]"] option:eq(2)').attr('selected').should.equal('selected');
            $('[name="manyToOne[mto2][records][0][columns][mtm1]"] option:eq(3)').attr('selected').should.equal('selected');
            // mtm2
            $('[name="manyToOne[mto2][records][0][columns][mtm2]"] option:eq(2)').attr('selected').should.equal('selected');
            $('[name="manyToOne[mto2][records][0][columns][mtm2]"] option:eq(3)').attr('selected').should.equal('selected');

            // mto2-1
            // otm
            $('[name="manyToOne[mto2][records][1][columns][otm1_id]"] option:eq(2)').attr('selected').should.equal('selected');
            $('[name="manyToOne[mto2][records][1][columns][otm2_id]"] option:eq(2)').attr('selected').should.equal('selected');
            done();
        });
    });

    it('execute', function (done) {
        // tbl
        // otm
        $('[name="view[tbl][records][0][columns][otm1_id]"]').val(2).trigger('chosen:updated');
        $('[name="view[tbl][records][0][columns][otm2_id]"]').val(2).trigger('chosen:updated');
        
        // mto1-0
        // marked for removal
        
        // mto1-1
        // mtm1
        $('[name="manyToOne[mto1][records][1][columns][mtm1]"] option:eq(1)').attr('selected',false);
        $('[name="manyToOne[mto1][records][1][columns][mtm1]"] option:eq(3)').attr('selected',true);
        $('[name="manyToOne[mto1][records][1][columns][mtm1]"]').trigger('chosen:updated');
        // mtm2
        $('[name="manyToOne[mto1][records][1][columns][mtm2]"] option:eq(1)').attr('selected',false);
        $('[name="manyToOne[mto1][records][1][columns][mtm2]"] option:eq(3)').attr('selected',true);
        $('[name="manyToOne[mto1][records][1][columns][mtm2]"]').trigger('chosen:updated');

        $('.x-table[data-table=mto1] .glyphicon-remove-sign:eq(0)')[0].click();

        // mto1-2
        // otm
        $('[name="manyToOne[mto1][records][2][columns][otm1_id]"]').val(2).trigger('chosen:updated');
        $('[name="manyToOne[mto1][records][2][columns][otm2_id]"]').val(2).trigger('chosen:updated');
        // mtm1
        $('[name="manyToOne[mto1][records][2][columns][mtm1]"] option:eq(1)').attr('selected',false);
        $('[name="manyToOne[mto1][records][2][columns][mtm1]"] option:eq(2)').attr('selected',true);
        $('[name="manyToOne[mto1][records][2][columns][mtm1]"] option:eq(3)').attr('selected',true);
        $('[name="manyToOne[mto1][records][2][columns][mtm1]"]').trigger('chosen:updated');
        // mtm2
        $('[name="manyToOne[mto1][records][2][columns][mtm2]"] option:eq(2)').attr('selected',true);
        $('[name="manyToOne[mto1][records][2][columns][mtm2]"] option:eq(3)').attr('selected',true);
        $('[name="manyToOne[mto1][records][2][columns][mtm2]"]').trigger('chosen:updated');

        // mto2-0
        // otm
        $('[name="manyToOne[mto2][records][0][columns][otm1_id]"]').val(2).trigger('chosen:updated');
        $('[name="manyToOne[mto2][records][0][columns][otm2_id]"]').val(2).trigger('chosen:updated');

        // mto2-1
        // mtm1
        $('[name="manyToOne[mto2][records][1][columns][mtm1]"] option:eq(1)').attr('selected',false);
        $('[name="manyToOne[mto2][records][1][columns][mtm1]"] option:eq(3)').attr('selected',true);
        $('[name="manyToOne[mto2][records][1][columns][mtm1]"]').trigger('chosen:updated');
        // mtm2
        $('[name="manyToOne[mto2][records][1][columns][mtm2]"] option:eq(1)').attr('selected',false);
        $('[name="manyToOne[mto2][records][1][columns][mtm2]"] option:eq(3)').attr('selected',true);
        $('[name="manyToOne[mto2][records][1][columns][mtm2]"]').trigger('chosen:updated');

        // mto2-2
        $('.add-another:eq(1)')[0].click();
        // otm
        $('[name="manyToOne[mto2][records][2][columns][otm1_id]"]').val(2).trigger('chosen:updated');
        $('[name="manyToOne[mto2][records][2][columns][otm2_id]"]').val(2).trigger('chosen:updated');
        // mtm1
        $('[name="manyToOne[mto2][records][2][columns][mtm1]"] option:eq(2)').attr('selected',true);
        $('[name="manyToOne[mto2][records][2][columns][mtm1]"] option:eq(3)').attr('selected',true);
        $('[name="manyToOne[mto2][records][2][columns][mtm1]"]').trigger('chosen:updated');
        // mtm2
        $('[name="manyToOne[mto2][records][2][columns][mtm2]"] option:eq(2)').attr('selected',true);
        $('[name="manyToOne[mto2][records][2][columns][mtm2]"] option:eq(3)').attr('selected',true);
        $('[name="manyToOne[mto2][records][2][columns][mtm2]"]').trigger('chosen:updated');

        $('[name="action[continue]"')[0].click();
        page.load(function () {
            $('.alert-success strong').text().should.equal('Success:');
            // tbl
            $('[name="view[tbl][records][0][columns][otm1_id]"] option:eq(2)').attr('selected').should.equal('selected');
            $('[name="view[tbl][records][0][columns][otm2_id]"] option:eq(2)').attr('selected').should.equal('selected');
            $('[name="view[tbl][records][0][columns][mtm1]"] option:eq(2)').attr('selected').should.equal('selected');
            $('[name="view[tbl][records][0][columns][mtm1]"] option:eq(3)').attr('selected').should.equal('selected');
            $('[name="view[tbl][records][0][columns][mtm2]"] option:eq(2)').attr('selected').should.equal('selected');
            $('[name="view[tbl][records][0][columns][mtm2]"] option:eq(3)').attr('selected').should.equal('selected');
            // mto1-0
            $('[name="manyToOne[mto1][records][0][columns][otm1_id]"] option:eq(2)').attr('selected').should.equal('selected');
            $('[name="manyToOne[mto1][records][0][columns][otm2_id]"] option:eq(2)').attr('selected').should.equal('selected');
            $('[name="manyToOne[mto1][records][0][columns][mtm1]"] option:eq(2)').attr('selected').should.equal('selected');
            $('[name="manyToOne[mto1][records][0][columns][mtm1]"] option:eq(3)').attr('selected').should.equal('selected');
            $('[name="manyToOne[mto1][records][0][columns][mtm2]"] option:eq(2)').attr('selected').should.equal('selected');
            $('[name="manyToOne[mto1][records][0][columns][mtm2]"] option:eq(3)').attr('selected').should.equal('selected');
            // mto1-1
            $('[name="manyToOne[mto1][records][1][columns][otm1_id]"] option:eq(2)').attr('selected').should.equal('selected');
            $('[name="manyToOne[mto1][records][1][columns][otm2_id]"] option:eq(2)').attr('selected').should.equal('selected');
            $('[name="manyToOne[mto1][records][1][columns][mtm1]"] option:eq(2)').attr('selected').should.equal('selected');
            $('[name="manyToOne[mto1][records][1][columns][mtm1]"] option:eq(3)').attr('selected').should.equal('selected');
            $('[name="manyToOne[mto1][records][1][columns][mtm2]"] option:eq(2)').attr('selected').should.equal('selected');
            $('[name="manyToOne[mto1][records][1][columns][mtm2]"] option:eq(3)').attr('selected').should.equal('selected');
            // mto2-0
            $('[name="manyToOne[mto2][records][0][columns][otm1_id]"] option:eq(2)').attr('selected').should.equal('selected');
            $('[name="manyToOne[mto2][records][0][columns][otm2_id]"] option:eq(2)').attr('selected').should.equal('selected');
            $('[name="manyToOne[mto2][records][0][columns][mtm1]"] option:eq(2)').attr('selected').should.equal('selected');
            $('[name="manyToOne[mto2][records][0][columns][mtm1]"] option:eq(3)').attr('selected').should.equal('selected');
            $('[name="manyToOne[mto2][records][0][columns][mtm2]"] option:eq(2)').attr('selected').should.equal('selected');
            $('[name="manyToOne[mto2][records][0][columns][mtm2]"] option:eq(3)').attr('selected').should.equal('selected');
            // mto2-1
            $('[name="manyToOne[mto2][records][1][columns][otm1_id]"] option:eq(2)').attr('selected').should.equal('selected');
            $('[name="manyToOne[mto2][records][1][columns][otm2_id]"] option:eq(2)').attr('selected').should.equal('selected');
            $('[name="manyToOne[mto2][records][1][columns][mtm1]"] option:eq(2)').attr('selected').should.equal('selected');
            $('[name="manyToOne[mto2][records][1][columns][mtm1]"] option:eq(3)').attr('selected').should.equal('selected');
            $('[name="manyToOne[mto2][records][1][columns][mtm2]"] option:eq(2)').attr('selected').should.equal('selected');
            $('[name="manyToOne[mto2][records][1][columns][mtm2]"] option:eq(3)').attr('selected').should.equal('selected');
            // mto2-2
            $('[name="manyToOne[mto2][records][2][columns][otm1_id]"] option:eq(2)').attr('selected').should.equal('selected');
            $('[name="manyToOne[mto2][records][2][columns][otm2_id]"] option:eq(2)').attr('selected').should.equal('selected');
            $('[name="manyToOne[mto2][records][2][columns][mtm1]"] option:eq(2)').attr('selected').should.equal('selected');
            $('[name="manyToOne[mto2][records][2][columns][mtm1]"] option:eq(3)').attr('selected').should.equal('selected');
            $('[name="manyToOne[mto2][records][2][columns][mtm2]"] option:eq(2)').attr('selected').should.equal('selected');
            $('[name="manyToOne[mto2][records][2][columns][mtm2]"] option:eq(3)').attr('selected').should.equal('selected');
            done();
        });
    });

    after(function (done) {
        $('a[href="/"]')[0].click();
        page.load(done);
    });
});

}
