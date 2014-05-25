
tests.otm2 = function () {

describe('otm2', function () {
    it('should be empty', function (done) {
        win.location.href = '/otm2';
        page.load(function () {
            $('.ex-table tbody tr').length.should.equal(0);
            win.location.href = '/otm2/add';
            page.load(done);
        });
    });
    it('save and add another', function (done) {
        $('[name="view[otm2][records][0][columns][name1]"]').val('otm');
        $('[name="view[otm2][records][0][columns][name2]"]').val('1');
        $('[name="action[another]"').trigger('click');
        page.load(function () {
            $('h2').text().should.equal('otm2');
            $('.alert-success strong').text().should.equal('Success:');
            $('[name="view[otm2][records][0][columns][name1]"]').val().should.equal('');
            $('[name="view[otm2][records][0][columns][name2]"]').val().should.equal('');
            done();
        });
    });
    it('save and continue editing', function (done) {
        $('[name="view[otm2][records][0][columns][name1]"]').val('otm');
        $('[name="view[otm2][records][0][columns][name2]"]').val('2');
        $('[name="action[continue]"').trigger('click');
        page.load(function () {
            $('h2').text().should.equal('otm2');
            $('.alert-success strong').text().should.equal('Success:');
            $('[name="view[otm2][records][0][columns][name1]"]').val().should.equal('otm');
            $('[name="view[otm2][records][0][columns][name2]"]').val().should.equal('2');
            win.location.href = '/otm2/add';
            page.load(done);
        });
    });
    it('save', function (done) {
        $('[name="view[otm2][records][0][columns][name1]"]').val('otm');
        $('[name="view[otm2][records][0][columns][name2]"]').val('3');
        $('[name="action[save]"').trigger('click');
        page.load(function () {
            win.location.pathname.should.equal('/otm2')
            $('.alert-success strong').text().should.equal('Success:');
            $('.x-table tbody tr').length.should.equal(3);
            $('.x-table tbody tr:eq(0) td:eq(1)').text().trim().should.equal('1');
            $('.x-table tbody tr:eq(1) td:eq(1)').text().trim().should.equal('2');
            $('.x-table tbody tr:eq(2) td:eq(1)').text().trim().should.equal('3');
            done();
        });
    });
});

}
